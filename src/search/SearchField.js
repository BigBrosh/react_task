import React from 'react';

import {GoButton} from './GoButton';
import {MyLocationButton} from './MyLocationButton';
import {send} from './sendRequest';

export class SearchField extends React.Component {
	render() {
		return (
			<div>
				<input type="text"></input>
				<GoButton onClick={send}/>
				<MyLocationButton />
			</div>
		);
	}
}