import React from 'react';
import {ToggleFave} from './buttons/ToggleFave';
import {headerStyles} from './styles/headerStyles';

export class ItemHeader extends React.Component {
	render() {
		return (
			<header style={headerStyles.header}>
				<h1 style={headerStyles.h1}>Property Details</h1>
				<ToggleFave />
			</header>
		)
	}
}