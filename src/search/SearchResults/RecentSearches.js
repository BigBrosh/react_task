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
			info: e.target.getAttribute('data-searchvalue'),
			index: e.target.getAttribute('data-index')
		};

		this.props.showResults(data);
	}

	render() {
		let list;

		if (this.RequestController.getFromLocal('recentSearches') != undefined)
		{
			list = this.RequestController.getFromLocal('recentSearches').map((el, i) => {
				return (
					<li data-searchvalue={el.searchValue}
						data-index={i}
						key={i}
						onClick={this.showItems}>{el.searchValue} ({el.totalResults})</li>
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