import React from 'react';

import {RequestController} from '../../controllers/RequestController';
import {ItemController} from '../../controllers/ItemController';

export class RecentSearches extends React.Component {
	constructor(props){
		super(props);
		this.RequestController = new RequestController();
		this.ItemController = new ItemController();

		this.showItems = this.showItems.bind(this);
	}

	showItems(e) {
		let data = {
			action: 'place_name',
			info: e.target.getAttribute('data-searchValue')
		};

		this.props.setSelectComponent(data);
	}

	render() {
		let list;

		if (this.RequestController.getFromLocal('recentSearches') != undefined)
		{
			list = this.RequestController.getFromLocal('recentSearches').map(el => {
				return (
					<li data-searchValue={el.searchValue} onClick={this.showItems}>{el.searchValue} ({el.totalResults})</li>
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