import React from 'react';

import {GoButton} from './GoButton';
import {MyLocationButton} from './MyLocationButton';

export class SearchField extends React.Component {
	render() {
		return (
			<div>
				<input type="text"></input>
				<GoButton />
				<MyLocationButton />
			</div>
		);
	}
}