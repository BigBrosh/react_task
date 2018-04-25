import React from 'react';
import {Link} from 'react-router-dom';

import {RequestController} from '../../controllers/RequestController';
import {ItemController} from '../../controllers/ItemController';

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

		if (this.RequestController.getFromLocal('recentSearches') !== undefined)
		{
			list = this.RequestController.getFromLocal('recentSearches').map((el, i) => {
				let url = `/items/searchval=${el.searchValue}&ind=${i}`;
				return (
					<li style={Object.assign({}, styles.li, styles.clickable)} key={i}>
						<Link to={url}>
							{el.searchValue} ({el.totalResults})
						</Link>
					</li>
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