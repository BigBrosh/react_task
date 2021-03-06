import React from 'react';
import ReactDOM from 'react-dom';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {goClick, locationClick} from '../reducer/actions';

import {Header} from '../header/Header';
import {Instructional} from '../header/Instructional';

// buttons
import {GoButton} from '../search/buttons/GoButton';
import {MyLocationButton} from '../search/buttons/MyLocationButton';

// controllers
import {RequestController} from '../controllers/RequestController';

// search results
import {RecentSearches} from '../search/SearchResults/RecentSearches';
import {SelectLocation} from '../search/SearchResults/SelectLocation';
import {ErrorResult} from '../search/SearchResults/ErrorResult';

// styles
import {styles} from '../styles/mainStyles';

class SearchPage extends React.Component {
	state = {
		page: 'RecentSearches',
		inputValue: ''
	};

	RequestController = new RequestController();
	timer = 0;

	onInput = e => {
		this.setState({
			inputValue: e.target.value
		});
	};

	setSelectComponent = response => {
		this.setState({
			page: 'SelectLocation',
			response: response
		});
	};

	setErrorComponent = response => {
		this.setState({
			page: 'ErrorResult',
			response: response
		});
	};

	TimeOut = name => {
		return (
			setInterval( () => {
				if (this.timer === 5)
				{
					let error = {
						name: 'Timeout',
						message: 'an error occurred while searching. Please check your network connection and try again'
					}

					this.ClearInterval(name);
					this.catchError(error);
				}

				else this.timer++;
			}), 1000);
	};

	ClearInterval = name => {
		clearInterval(this[name]);
		this.timer = 0;
	};

	sendByUrl = inputData => {
		this.timing = this.TimeOut('timing');

		this.RequestController.send({
			url: inputData.url,
			method: 'GET',
			headers: {
				contentType: "text/plain"
			}
		}).then(response => {
			this.RequestController.getResponse(response).then(data => 
			{
				if (data.response.application_response_code >= 100 &&
					data.response.application_response_code < 200 &&
					data.response.total_results !== 0)
				{
					this.ClearInterval('timing');

					if (inputData.showItem === true)
					{
						this.ItemController.renderComponent({
							response: data.response.listings,
							event: inputData.numberInList,
							numberInList: inputData.index
						});
					}
				}				
				
				else 
				{
					let error = {
						name: data.response.application_response_code,
						message: data.response.application_response_text
					};

					this.showError(error);
				}
			});
		}).catch(error => {
			this.showError(error);
		});
	};

	send = inputData => {
		// input data should contain info about search's type - action (e.g. place_name, centre_point),
		// extra information - info, that comes after action and
		// number of page (1 by default)

		let extraData = inputData.info,
			url = 'https://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=' + (inputData.page || 1) + '&' + inputData.action + '=' + extraData.toLowerCase();

		this.timing = this.TimeOut('timing');

		this.RequestController.send({
			url: url,
			method: 'GET',
			headers: {
				contentType: "text/plain"
			}
		}).then(response => {
			this.RequestController.getResponse(response).then(data => 
			{
				if (data.response.application_response_code >= 100 &&
					data.response.application_response_code < 200 &&
					data.response.total_results !== 0)
				{
					this.ClearInterval('timing');

					if (inputData.getResponse === true && data){
						this.ClearInterval('timing');
						inputData.onSuccess(data);
					}

					this.setSelectComponent({
						list: data.response.listings,
						index: inputData.index,
						info: inputData.info
					});

					this.RequestController.sendToLocal('recentSearches', {
						url: url,
						totalResults: data.response.total_results,
						searchValue: extraData,
						uniqueKey: 'searchValue'
					})
				}

				else if (inputData.action === 'centre_point' && data.response.total_results === 0)
				{					
					let error = {
						name: 'Location not matched',
						message: 'the location given was not recognised'
					};

					this.catchError(error);
				}

				else if (data.response.total_results === 0)
				{
					let error = {
						name: 'Empty',
						message: 'there were no results returned'
					};

					this.catchError(error);
				}
				
				else 
				{
					let error = {
						name: data.response.application_response_code,
						message: data.response.application_response_text
					};

					this.catchError(error);
				}
			});
		}).catch(error => {
			this.catchError(error);
		})
	};

	showError = error => {
		this.ClearInterval('timing');
		throw new Error(`${error.name} : ${error.message}`);
	}

	catchError = error => {
		// input data should contain object with error's name and
		// error's message

		this.ClearInterval('timing');
		this.setErrorComponent(error);
		this.showError(error);
	};

	render = () => {
		let current;
		switch(this.state.page)
		{
			case 'RecentSearches':
				current = <RecentSearches showResults={this.send} sendByUrl={this.sendByUrl} />;
				break;

			case 'SelectLocation':
				current = <SelectLocation response={this.state.response}/>
				break;

			case 'ErrorResult':
				current = <ErrorResult response={this.state.response}/>
				break;

			default: return false;
		}

		return (
			<div>
				<Header.MainHeader />
				<Instructional />
				<div>
					<input 	onInput={this.onInput}
							style={styles.searchWrapp.input}
							type="text"
							value={this.state.inputValue}></input>
					<GoButton onClick={this.send} />
					<MyLocationButton onClick={this.send} />
				</div>
				{current}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		clicks: state
	};
}

function mapDispatchToProps (dispatch) {
	return {
		goClick: bindActionCreators(goClick, dispatch),
		locationClick: bindActionCreators(locationClick, dispatch)
	};
}

export default connect (mapStateToProps, mapDispatchToProps)(SearchPage);