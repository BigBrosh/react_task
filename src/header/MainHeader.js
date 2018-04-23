import React from 'react';

import {FavesButton} from './buttons/FavesButton';
import {headerStyles} from './styles/headerStyles';

export class MainHeader extends React.Component {
	render() {
		return (
			<header style={headerStyles.header}>
				<h1 style={headerStyles.h1}>PropertyCross</h1>
				<FavesButton />
			</header>
		)
	}
}