import React from 'react';

import {RequestController} from '../../controllers/RequestController';
import {styles} from '../../styles/mainStyles';

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
				if (el.place === this.props.place)
				{
					this.setState({
						availableAction: '-'
					});
				}
			});
		}		
	}

	toggleFave() {
		let parent = document.getElementById('item'),
			image = document.getElementById('item_image');


		if (this.state.availableAction === '+')
		{
			let	newFave = {
					url: this.RequestController.getFromLocal('recentSearches')[parent.getAttribute('data-index')].url,
					numberInList: parent.getAttribute('data-numberinlist'),
					price: document.getElementById('itemPrice').innerHTML,
					place: image.getAttribute('alt'),
					image: image.getAttribute('src'),
					index: parent.getAttribute('data-index'),
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
				value: image.getAttribute('alt')
			});

			this.setState({
				availableAction: '+'
			});
		}
	}

	render() {
		return(
			<button style={Object.assign({}, styles.buttons, styles.toggleFaveButton)}
					onClick={this.toggleFave}>{this.state.availableAction}</button>
		);
	}
}