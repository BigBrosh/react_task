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

	componentWillMount() {
		let favList = this.RequestController.getFromLocal('faves');

		if (favList)
		{
			favList.forEach(el => {
				if (el.place == this.props.place)
				{
					this.setState({
						availableAction: '-'
					});
				}
			});
		}		
	}

	toggleFave() {
		if (this.state.availableAction === '+')
		{			
			let parent = document.getElementById('item'),
				newFave = {
					url: this.RequestController.getFromLocal('recentSearches')[parent.getAttribute('data-numberinlist')].url,
					numberInList: parent.getAttribute('data-numberinlist'),
					price: document.getElementById('itemPrice').value,
					place: parent.getAttribute('data-name'),
					uniqueKey: 'place'
				};

			this.RequestController.sendToLocal('faves', newFave);			
			this.setState({
				availableAction: '-'
			});
		}

		else if (this.state.availableAction === '-')
		{
			this.RequestController.removeFromLocal({
				list: 'faves',
				name: 'place',
				value: document.getElementById('item').getAttribute('data-name')
			});

			this.setState({
				availableAction: '+'
			});
		}
	}

	render() {
		return(
			<button onClick={this.toggleFave}>{this.state.availableAction}</button>
		);
	}
}