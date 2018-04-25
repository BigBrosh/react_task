import React from 'react';

import {Header} from '../header/Header'

export class ItemPage extends React.Component {
	render() {
		let item = this.props.list[this.props.number];
		
		return (
			<div 	id='item'
					data-index={this.props.number}	
					data-numberinlist={this.props.numberInList}>
				<Header.ItemHeader place={item.title}/>
				<p id='itemPrice'>{item.price_formatted}</p>
				<p>{item.title}</p>
				<img 	id='item_image'
						src={item.img_url}
						alt={item.title}
						style={{maxWidth: '100%'}} />

				<p>{item.bedroom_number || 0} bed, {item.bathroom_number || 0} bathrooms</p>
				<p>{item.summary}</p>
			</div>
		)
	}
}