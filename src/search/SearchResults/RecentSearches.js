import React from 'react';

import {RequestController} from '../../controllers/RequestController';

export class RecentSearches extends React.Component {
	constructor(props){
		super(props);
		this.RequestController = new RequestController();
	}

	render() {
		let list;

		if (this.RequestController.getFromLocal() != undefined)
		{
			list = this.RequestController.getFromLocal().map(el => {
				return (
					<li>{el.totalResults}</li>
				);
			});
		}

		else
			list = '';

		return(
			<div>
				<p>Recent Searches:</p>
				<ul>{list}</ul>
			</div>
		);
	}
}