import React from 'react';
import ReactDOM from 'react-dom';

import {ItemController} from '../../controllers/ItemController';

export class SelectLocation extends React.Component {
	constructor(props) {
		super(props);
		this.ItemController = new ItemController();
		this.showItem = this.showItem.bind(this);
	}

	showItem(e) {
		this.ItemController.renderComponent({
			event: e,
			response: this.props.response
		});
	}

	render() {
		let list = this.props.response.map((el, i) => {
			return <li key={i} id={i} onClick={this.showItem}>{el.title}</li>
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