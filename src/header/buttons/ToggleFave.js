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
		if (this.state.availableAction === '+')
		{
			let	newFave = {
					data: this.props.data,
					place: this.props.data.lister_url,
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
				value: this.props.place
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