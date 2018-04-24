import React from 'react';

import {styles} from '../../styles/mainStyles';

export class MyLocationButton extends React.Component {
	constructor(props) {
		super(props);
		this.click = this.click.bind(this);
		this.click = this.click.bind(this);
		this.showPosition = this.showPosition.bind(this);
	}

	click() {	
		navigator.geolocation.getCurrentPosition(this.showPosition);	
	}

	showPosition(position) {
		let pos = {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		};

		this.props.onClick({
			info: `${pos.latitude}, ${pos.longitude}`,
			action: 'centre_point'
		});
	}

	render() {
		return(
			<button style={styles.buttons}
					onClick={this.click}>My location</button>
		);
	}
}