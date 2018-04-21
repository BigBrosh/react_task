import React from 'react';
import ReactDOM from 'react-dom';

// buttons
import {GoButton} from './buttons/GoButton';
import {MyLocationButton} from './buttons/MyLocationButton';

// controllers
import {RequestController} from '../controllers/RequestController';

// search results
import {RecentSearches} from './SearchResults/RecentSearches';
import {SelectLocation} from './SearchResults/SelectLocation';
import {ErrorResult} from './SearchResults/ErrorResult';

// pages
import {RecentSearchesPage} from '../views/RecentSearchesPage';

// styles
import {styles} from '../styles/mainStyles';

export class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 'RecentSearches',
			inputValue: ''
		};

		this.onInput = this.onInput.bind(this);

		this.RequestController = new RequestController();
		this.timer = 0;

		this.send = this.send.bind(this);
		this.setSelectComponent = this.setSelectComponent.bind(this);
		this.setErrorComponent = this.setErrorComponent.bind(this);
		this.sendByUrl = this.sendByUrl.bind(this);
	}

	onInput(e) {
		this.setState({
			inputValue: e.target.value
		});
	}

	setSelectComponent(response) {
		this.setState({
			page: 'SelectLocation',
			response: response
		});
	}

	setErrorComponent(response) {
		this.setState({
			page: 'ErrorResult',
			response: response
		});
	}

	TimeOut(name) {
		return (
			setInterval(( () => {
				if (this.timer === 5)
				{
					let error = {
						name: 'Timeout',
						message: 'an error occurred while searching. Please check your network connection and try again'
					}

					this.ClearInterval(name);
					this.catchError(error);
				}

				this.timer++;
			}), 1000)
		);
	}

	ClearInterval(name) {
		clearInterval(this[name]);
		this.timer = 0;
	}

	sendByUrl(inputData) {
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
					data.response.application_response_code < 200)
				{
					this.ClearInterval('timing');
					return data;
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
		})
	}

	send(inputData) {
		// input data should contain info about search's type - action (e.g. place_name, centre_point),
		// extra information - info, that comes after action and
		// number of page (1 by default)

		let extraData = inputData.info,
			url = 'https://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy' + '&page=' + (inputData.page || 1) + '&' + inputData.action + '=' + extraData.toLowerCase();

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
					data.response.application_response_code < 200)
				{
					this.ClearInterval('timing');

					if (inputData.RecentSearchesPage === true)
					{
						ReactDOM.render(
							<RecentSearchesPage data={data} 
												send={this.sendByUrl} 
												index={inputData.index} 
												info={inputData.info} />,
							document.getElementById('root')
						);
					}

					else if (inputData.getResponse === true && data){
						this.ClearInterval('timing');
						inputData.onSuccess(data);
					}

					this.setSelectComponent({
						list: data.response.listings,
						index: inputData.index
					});

					this.RequestController.sendToLocal('recentSearches', {
						url: url,
						totalResults: data.response.total_results,
						searchValue: extraData,
						uniqueKey: 'searchValue'
					})
				}

				else if (inputData.action == 'centre_point' && data.response.total_results === 0)
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
	}

	showError(error) {
		this.ClearInterval('timing');
		throw `${error.name} : ${error.message}`;
		return false;
	}

	catchError(error) {
		// input data should contain object with error's name and
		// error's message

		this.ClearInterval('timing');
		this.setErrorComponent(error);
		this.RequestController.catchError(error);
	}

	render() {
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
				<div>
					<input 	onInput={this.onInput}
							style={styles.searchWrapp.input}
							type="text"
							value={this.state.inputValue}></input>
					<GoButton 	styles={Object.assign({}, styles.buttons, styles.searchWrapp.goButton)}
								onClick={this.send} />
					<MyLocationButton 	styles={styles.buttons}
										onClick={this.send} />
				</div>
				{current}
			</div>
		);
	}
}