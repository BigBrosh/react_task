import React from 'react';

import {RequestController} from '../../controllers/RequestController';

export class RecentSearches extends React.Component {
	constructor(props){
		super(props);
		this.RequestController = new RequestController();
	}

	render() {
		let list;

		if (this.RequestController.getFromLocal('recentSearches') != undefined)
		{
			list = this.RequestController.getFromLocal('recentSearches').map(el => {
				return (
					<li>{el.searchValue} ({el.totalResults})</li>
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