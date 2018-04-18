import React from 'react';
import ReactDOM from 'react-dom';

import {GoButton} from './buttons/GoButton';
import {MyLocationButton} from './buttons/MyLocationButton';

import {RequestController} from '../controllers/RequestController';

import {RecentSearches} from './SearchResults/RecentSearches';
import {SelectLocation} from './SearchResults/SelectLocation';
import {ErrorResult} from './SearchResults/ErrorResult';

import {RecentSearchesPage} from '../views/RecentSearchesPage';

export class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 'RecentSearches'
		};

		this.RequestController = new RequestController();
		this.timer = 0;

		this.send = this.send.bind(this);
		this.setSelectComponent = this.setSelectComponent.bind(this);
		this.setErrorComponent = this.setErrorComponent.bind(this);
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
												send={this.send} 
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

	catchError(error) {
		// input data should contain object with error's name and
		// error's message

		this.setErrorComponent(error);
		this.RequestController.catchError(error);
	}

	render() {
		let current;
		switch(this.state.page)
		{
			case 'RecentSearches':
				current = <RecentSearches showResults={this.send}/>;
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
					<input type="text"></input>
					<GoButton 
						onClick={this.send} />
					<MyLocationButton
						onClick={this.send} />
				</div>
				{current}
			</div>
		);
	}
}