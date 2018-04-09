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

	setSelectComponent() {
		this.setState({
			page: 'SelectLocation'
		});
	}

	setErrorComponent() {
		this.setState({
			page: 'ErrorResult'
		});
	}

	send() {
		this.RequestController.send().then(response => 
		{
			this.RequestController.getResponse(response).then(data => 
			{  
				if (data.response.application_response_code == 100 ||
					data.response.application_response_code == 101 ||
					data.response.application_response_code == 110)
					this.setSelectComponent();

				console.log(data.response.listings[0]);  
			});
		}).catch(error => {
			this.setErrorComponent();
			this.RequestController.catchError(error);
		})
	}

	render() {
		let current;
		switch(this.state.page)
		{
			case 'RecentSearches':
				current = <RecentSearches />;
				break;

			case 'SelectLocation':
				current = <SelectLocation />
				break;

			case 'ErrorResult':
				current = <ErrorResult />
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