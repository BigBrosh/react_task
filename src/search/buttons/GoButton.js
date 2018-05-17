import React from 'react';

import {store} from '../../reducer/reducer';

import {RequestController} from '../../controllers/RequestController';
import {styles} from '../../styles/mainStyles';

export class GoButton extends React.Component {
	RequestController = new RequestController();

	click = e => {
		let info = e.target.parentNode.getElementsByTagName('input')[0].value,
			recentSearches = this.RequestController.getFromLocal('recentSearches'),
			index = recentSearches ? recentSearches.length : 0;

		if(info.search(/[ , \/, \,, $, .]/) !== -1)
		{
			alert(`Invalid input on ${info.search(/[ , \/, \,]/) + 1} position.\nPlease, fix it.`);
			return false;
		}

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
	};

	render = () => {
		return(
			<button style={Object.assign({}, styles.buttons, styles.searchWrapp.goButton)}
					onClick={this.click}>Go</button>
		);
	}
}