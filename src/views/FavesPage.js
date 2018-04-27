import React from 'react';
import {Link} from 'react-router-dom';

import {Header} from '../header/Header';

// controllers
import {RequestController} from '../controllers/RequestController';
import {ItemController} from '../controllers/ItemController';
import {DataFromLink} from '../helpers/DataFromLink.js';
import {CustomLink} from '../helpers/CustomLink';

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
				let	place = DataFromLink.find(el.url, 'place_name'),
					page = DataFromLink.find(el.url, 'page');

				let url = `item/sv=${place}&pg=${page}&num=${el.numberInList}`;

				return (
					<li 	key={`${el.numberInList}${el.index}`}
							data-index={el.index}
							data-numberinlist={el.numberInList}
							style={styles.itemList.listItem}>
						<Link to={`/${url}`}>
							<div>
								<img 	alt={el.place}
										src={el.image}
										style={{maxWidth: 150}}/>
							</div>
							<div>
								<p>{el.price}<br/>{el.place}</p>
							</div>
						</Link>
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