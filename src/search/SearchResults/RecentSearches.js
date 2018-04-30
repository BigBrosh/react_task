import React from 'react';
import {Link} from 'react-router-dom';

import {RequestController} from '../../controllers/RequestController';

import {styles} from '../../styles/mainStyles';

export class RecentSearches extends React.Component {
	RequestController = new RequestController();

	showItems = e => {
		let data = {
			action: 'place_name',
			info: e.target.getAttribute('data-searchvalue'),
			index: e.target.getAttribute('data-index'),
			RecentSearchesPage: true
		};

		this.props.showResults(data);
	};

	render = () => {
		let list;

		if (this.RequestController.getFromLocal('recentSearches') !== undefined)
		{
			list = this.RequestController.getFromLocal('recentSearches').map((el, i) => {
				let url = `/items/recent/sv=${el.searchValue}`;
				return (
					<li style={styles.li} key={i}>
						<Link 	style={styles.clickable}
								to={url}>
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