import React from 'react';

import {RequestController} from '../controllers/RequestController';

import {styles} from '../styles/mainStyles';

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
					<li style={styles.itemList.listItem}>
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

			let ul = <ul style={styles.itemList.list}>{result}</ul>;
		}

		return (
			<div>
				<h2>Favourites</h2>
				<ul>
					{result}
				</ul>
			</div>
		);
	}
}