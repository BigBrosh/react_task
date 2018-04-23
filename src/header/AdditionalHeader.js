import React from 'react';

import {HeaderController} from '../controllers/HeaderController';
import {styles} from '../styles/mainStyles';

export class AdditionalHeader extends React.Component {
	constructor(props) {
		super(props);

		this.HeaderController = new HeaderController();
	}

	render() {
		return (
			<header style={styles.header}>
				<h1 style={Object.assign({}, styles.h1, styles.clickable)}
					onClick={this.HeaderController.renderMainPage}>PropertyCross</h1>
			</header>
		)
	}
}