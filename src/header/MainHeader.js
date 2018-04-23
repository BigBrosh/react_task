import React from 'react';

import {FavesButton} from './buttons/FavesButton';
import {styles} from '../styles/mainStyles';

export class MainHeader extends React.Component {
	render() {
		return (
			<header style={styles.header}>
				<h1 style={styles.h1}>PropertyCross</h1>
				<FavesButton />
			</header>
		)
	}
}