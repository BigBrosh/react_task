import React from 'react';

import {RequestController} from '../../controllers/RequestController'

export class GoButton extends React.Component {
	constructor(props) {
		super(props);
		this.RequestController = new RequestController();
		this.click = this.click.bind(this);
	}

	click(e) {
		this.props.onClick({
			info: e.target.parentNode.getElementsByTagName('input')[0].value,
			action: 'place_name',
			page: 1,
			index: this.RequestController.getFromLocal('recentSearches') + 1 || 0
		});
	}

	render() {
		return(
			<button onClick={this.click}>Go</button>
		);
	}
}