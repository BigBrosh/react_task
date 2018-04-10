import React from 'react';
import ReactDOM from 'react-dom';

import {ItemPage} from '../../views/ItemPage'

export class SelectLocation extends React.Component {
	constructor(props) {
		super(props);
		this.renderComponent = this.renderComponent.bind(this);
	}

	renderComponent(e) {
		ReactDOM.render(
			<ItemPage list={this.props.response} number={e.target.id}/>,
			document.getElementById('root')
		);
	}

	render() {
		let list = this.props.response.map((el, i) => {
			return <li key={i} id={i} onClick={this.renderComponent}>{el.title}</li>
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