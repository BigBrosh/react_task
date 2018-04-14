import React from 'react';

import {GoButton} from './GoButton';
import {MyLocationButton} from './MyLocationButton';
import {RequestController} from '../controllers/RequestController';
import {RecentSearches} from './SearchResults/RecentSearches';
import {SelectLocation} from './SearchResults/SelectLocation';
import {ErrorResult} from './SearchResults/ErrorResult';

export class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 'RecentSearches'
		};

		this.RequestController = new RequestController();
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

	send(e) {
		let placeName = e.target.parentNode.getElementsByTagName('input')[0].value,
			url = 'https://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name=' + placeName.toLowerCase();

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
					this.setSelectComponent(data.response.listings);					

					this.RequestController.sendToLocal({
						url: url,
						totalResults: data.response.total_results
					})
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
		this.setErrorComponent(error);
		this.RequestController.catchError(error);
	}

	render() {
		let current;
		switch(this.state.page)
		{
			case 'RecentSearches':
				current = <RecentSearches />;
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
					<MyLocationButton />
				</div>

				{current}
			</div>
		);
	}
}