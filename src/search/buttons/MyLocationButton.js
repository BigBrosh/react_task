import React from 'react';

export class MyLocationButton extends React.Component {
	constructor(props) {
		super(props);
		this.click = this.click.bind(this);
		this.click = this.click.bind(this);
		this.showPosition = this.showPosition.bind(this);
		this.errorMessage = this.errorMessage.bind(this);
	}

	click() {	
		navigator.geolocation.getCurrentPosition(this.showPosition, this.errorMessage, {timeout: 5000});	
	}

	showPosition(position) {
		let pos = {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		};

		this.props.onClick({
			info: `${pos.latitude}, ${pos.longitude}`,
			action: 'centre_point='
		});
	}

	errorMessage(error) {
		console.log(error.message);
	}

	render() {
		return(
			<button onClick={this.click}>My location</button>
		);
	}
}