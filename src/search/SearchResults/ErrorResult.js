import React from 'react';

export class ErrorResult extends React.Component {
	render() {
		let current = `${this.props.response.name}: ${this.props.response.message}`;

		return(
			<div>
				<p>There was a problem with your search.<br/>{current}</p>
			</div>
		);
	}
}