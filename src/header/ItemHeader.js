import React from 'react';

import {HeaderController} from '../controllers/HeaderController';
import {ToggleFave} from './buttons/ToggleFave';
import {headerStyles} from './styles/headerStyles';

export class ItemHeader extends React.Component {
	constructor(props) {
		super(props);

		this.HeaderController = new HeaderController();
	}

	render() {
		return (
			<header style={headerStyles.header}>
				<h1 style={headerStyles.h1}
					onClick={this.HeaderController.renderMainPage}>Property Details</h1>
				<ToggleFave place={this.props.place}/>
			</header>
		)
	}
}