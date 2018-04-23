import React from 'react';

import {ItemController} from '../../controllers/ItemController';
import {styles} from '../../styles/mainStyles';

export class SelectLocation extends React.Component {
	constructor(props) {
		super(props);
		this.ItemController = new ItemController();
		this.showItem = this.showItem.bind(this);
	}

	showItem(e) {
		this.ItemController.renderComponent({
			event: e.target.id,
			response: this.props.response.list,
			numberInList: e.target.parentNode.getAttribute('data-index')
		});
	}

	render() {
		let index = this.props.response.index;
		let list = this.props.response.list.map((el, i) => {
			return <li 	style={Object.assign({}, styles.li, styles.clickable)}
						key={i} 
						id={i} 
						onClick={this.showItem}>{el.title}</li>
		});

		return(
			<div>
				<p>Please select a location below:</p>
				<ul data-index={index}>
					{list}
				</ul>
			</div>
		);
	}
}