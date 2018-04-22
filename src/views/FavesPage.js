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
					<li 	data-index={el.index}
							data-numberInList={el.numberInList}
							style={styles.itemList.listItem}>
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
			<div>
				<h2>Favourites</h2>
				<ul style={styles.itemList.list}>
					{result}
				</ul>
			</div>
		);
	}
}