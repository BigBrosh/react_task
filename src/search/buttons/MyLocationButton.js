import React from 'react';

import {store} from '../../reducer/reducer';

import {styles} from '../../styles/mainStyles';

export class MyLocationButton extends React.Component {
	click = () => {	
		store.dispatch({
			type: 'LOCATION_CLICK'			
		});
		navigator.geolocation.getCurrentPosition(this.showPosition);
	};

	showPosition = position => {
		let pos = {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		};

		this.props.onClick({
			info: `${pos.latitude}, ${pos.longitude}`,
			action: 'centre_point'
		});
	};

	render = () => {
		return(
			<button style={styles.buttons}
					onClick={this.click}>My location</button>
		);
	}
}