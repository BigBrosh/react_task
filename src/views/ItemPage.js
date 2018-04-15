import React from 'react';

export class ItemPage extends React.Component {
	render() {
		let item = this.props.list[this.props.number];
		return (
			<div>
				<p>{item.price_currency} {item.price}</p>
				<p>{item.title}</p>

				<img 	src={item.img_url} 
						style={{
							maxWidth: item.img_width, 
							width: '100%'
						}} />

				<p>{item.bedroom_number} bed, {item.bathroom_number} bathrooms</p>
				<p>{item.summary}</p>
			</div>
		)
	}
}