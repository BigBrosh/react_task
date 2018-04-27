import React from 'react';
import {Link} from 'react-router';

import {Header} from '../header/Header';

// controllers
import {RequestController} from '../controllers/RequestController';
import {ItemController} from '../controllers/ItemController';

// styles
import {styles} from '../styles/mainStyles';

export class FavesPage extends React.Component {
	constructor(props) {
		super(props);

		this.RequestController = new RequestController();
		this.ItemController = new ItemController();
	}

	render() {
		let list = this.RequestController.getFromLocal('faves'),
			result;

		if (list && list.length > 0)
		{
			result = list.map(el => {
				return (
					<li 	key={`${el.numberInList}${el.index}`}
							data-index={el.index}
							data-numberinlist={el.numberInList}
							style={styles.itemList.listItem}>
						<div>
							<img 	alt={el.place}
									src={el.image}
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
				<Header.AdditionalHeader />
				<h2 style={styles.subHeading}>Favourites</h2>
				<ul style={styles.itemList.list}>
					{result}
				</ul>
			</div>
		);
	}
}