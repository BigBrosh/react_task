import React from 'react';

import {RequestController} from '../controllers/RequestController';

export class FavesPage extends React.Component {
	constructor(props) {
		super(props);
		this.RequestController = new RequestController();
	}

	render() {
		let list = this.RequestController.getFromLocal('faves'),
			result;

		if (list && list.length > 0)
		{
			result = list.map(el => {
				return (
					<li>
						<div>
							<img 	src={el.image}
									style={{maxWidth: 150}}/>
						</div>
						<div>
							<p>{el.price}<br/>{el.place}</p>
						</div>
					</li>
				); 
			});
		}

		return (
			<ul>{result}</ul>
		);
	}
}