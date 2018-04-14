import React from 'react';

export class GoButton extends React.Component {
	constructor(props) {
		super(props);
		this.click = this.click.bind(this);
	}

	click(e) {
		this.props.onClick({
			info: e.target.parentNode.getElementsByTagName('input')[0].value,
			action: 'place_name'
		});
	}

	render() {
		return(
			<button onClick={this.click}>Go</button>
		);
	}
}