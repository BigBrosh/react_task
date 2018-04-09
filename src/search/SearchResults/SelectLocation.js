import React from 'react';

export class SelectLocation extends React.Component {
	render() {
		let list = this.props.response.map((el, i) => {
			return <li key={i} id={i}>{el.title}</li>
		});

		return(
			<div>
				<p>Please select a location below:</p>
				<ul>
					{list}
				</ul>
			</div>
		);
	}
}