import React from 'react';
import {Faves} from './Faves';

export class MainHeader extends React.Component {
	render() {
		return (
			<header>
				<h1>PropertyCross</h1>
				<Faves />
			</header>
		)
	}
}