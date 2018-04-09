import React from 'react';

import {GoButton} from './GoButton';
import {MyLocationButton} from './MyLocationButton';
import {send} from './sendRequest';
import {RequestController} from '../controllers/RequestController';

export class SearchField extends React.Component {
	constructor(props) {
		super(props);
		this.RequestController = new RequestController();
		this.send = this.send.bind(this);
	}

	send() {
		this.RequestController.send({
			url: 'https://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name=leeds',
			method: 'GET'
		})
	}

	render() {
		return (
			<div>
				<input type="text"></input>
				<GoButton 
					onClick={this.send} />
				<MyLocationButton />
			</div>
		);
	}
}