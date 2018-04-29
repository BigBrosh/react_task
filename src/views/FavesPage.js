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
			result = list.map((el, i) => {
				let url = `item/favourite/id=${i}`;

				return (
					<li 	key={i}
							style={styles.itemList.listItem}>
						<Link 	style={styles.clickable}
								to={`/${url}`}>
							<div>
								<img 	alt={el.data.title}
										src={el.data.img_url}
										style={{maxWidth: 150}}/>
							</div>
							<div>
								<p>{el.data.price_formatted}<br/>{el.data.title}</p>
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