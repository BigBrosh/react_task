import React from 'react';
import ReactDOM from 'react-dom';

import {RequestController} from '../../controllers/RequestController';
import {ItemController} from '../../controllers/ItemController';
import {RecentSearchesPage} from '../../views/RecentSearchesPage';

import {styles} from '../../styles/mainStyles';

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
			index: e.target.getAttribute('data-index'),
			RecentSearchesPage: true
		};

		this.props.showResults(data);
	}

	render() {
		let list;

		if (this.RequestController.getFromLocal('recentSearches') != undefined)
		{
			list = this.RequestController.getFromLocal('recentSearches').map((el, i) => {
				return (
					<li style={Object.assign({}, styles.li, styles.clickable)}
						data-searchvalue={el.searchValue}
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