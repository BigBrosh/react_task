import React from 'react';

import {RequestController} from '../../controllers/RequestController';

export class ToggleFave extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			availableAction: '+'
		};

		this.RequestController = new RequestController();
		this.toggleFave = this.toggleFave.bind(this);
	}

	toggleFave() {
		if (this.state.availableAction == '+')
		{			
			let parent = document.getElementById('item'),
				newFave = {
					url: this.RequestController.getFromLocal('recentSearches')[parent.getAttribute('data-numberinlist')].url,
					numberInList: parent.getAttribute('data-numberinlist')
				};

			this.RequestController.sendToLocal('faves', newFave);			
			this.setState({
				availableAction: '-'
			});
		}
	}

	render() {
		return(
			<button onClick={this.toggleFave}>{this.state.availableAction}</button>
		);
	}
}