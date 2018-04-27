import React from 'react';

import {Header} from '../header/Header'

// controllers and helpers
import {RequestController} from '../controllers/RequestController';
import {DataFromLink} from '../helpers/DataFromLink.js';

export class ItemPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0
		};
		this.RequestController = new RequestController();
	}

	componentWillMount(){
		let ind = DataFromLink.extra(this.props.history.location.pathname, 'item', 'ind'),
			page = DataFromLink.extra(this.props.history.location.pathname, 'item', 'pg'),
			url = this.RequestController.getFromLocal('recentSearches')[ind].url;

		url = url.replace(/page=[0-9]+/, `page=${page}`);

		this.RequestController.send({
			url: url,
			method: 'GET',
			headers: {
				contentType: "text/plain"
			}
		}).then(response => {
			this.RequestController.getResponse(response).then(data => {
				this.setState({
					list: data,
					index: ind,
					number: DataFromLink.extra(this.props.history.location.pathname, 'item', 'num')
				});
			})
		}).catch(error => {
			this.RequestController.catchError(error);
		});
	}

	render() {
		if(!this.state.list) return false;

		let item = this.state.list.response.listings[this.state.number];		
		return (
			<div 	id='item'
					data-index={this.state.index}	
					data-numberinlist={this.state.number}>
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