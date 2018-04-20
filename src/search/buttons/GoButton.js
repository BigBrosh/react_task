import React from 'react';

import {RequestController} from '../../controllers/RequestController';
import {styles} from '../../styles/mainStyles';

export class GoButton extends React.Component {
	constructor(props) {
		super(props);
		this.RequestController = new RequestController();
		this.click = this.click.bind(this);
	}

	click(e) {
		let info = e.target.parentNode.getElementsByTagName('input')[0].value,
			recentSearches = this.RequestController.getFromLocal('recentSearches'),
			index = recentSearches ? recentSearches.length : 0;

		if (recentSearches)
		{
			recentSearches.forEach((el, i) => {
				if (el.searchValue === info)
					index = i;
			});
		}

		this.props.onClick({
			info: info,
			action: 'place_name',
			page: 1,
			index: index
		});
	}

	render() {
		return(
			<button style={this.props.styles} 
					onClick={this.click}>Go</button>
		);
	}
}