import React from 'react';

import {ItemHeader} from '../header/ItemHeader'

export class ItemPage extends React.Component {
	render() {
		let item = this.props.list[this.props.number];
		return (
			<div 	id='item'
					data-index={this.props.number}	
					data-numberinlist={this.props.numberInList}>
				<ItemHeader />
				<p>{item.price_currency} {item.price}</p>
				<p>{item.title}</p>
				<img 	src={item.img_url}
						alt={item.lister_name}
						style={{
							maxWidth: item.img_width, 
							width: '100%'}} />

				<p>{item.bedroom_number || 0} bed, {item.bathroom_number || 0} bathrooms</p>
				<p>{item.summary}</p>
			</div>
		)
	}
}