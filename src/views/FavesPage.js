import React from 'react';

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

		this.showItem = this.showItem.bind(this);
	}

	 componentWillReceiveProps(nextProps) {
		const locationChanged = nextProps.location !== this.props.location;
	}

	showItem(e) {
		this.RequestController.timing = this.RequestController.TimeOut('timing');

		let target = e.target;

		while (target.tagName !== 'LI')
		{
			target = target.parentNode;
		}

		let index = target.getAttribute('data-numberinlist'),
			url = this.RequestController.getFromLocal('recentSearches')[index].url;

		this.RequestController.send({
			url: url,
			method: 'GET',
			headers: {
				contentType: "text/plain"
			}
		}).then(response => {
			this.RequestController.getResponse(response).then(data => {
				this.RequestController.ClearInterval('timing');

				this.ItemController.renderComponent({
					response : data.response.listings,
					event: target.getAttribute('data-index'),
					numberInList: index
				});
			});
		}).catch(error => {
			alert(`${error.name}: ${error.message}`);
		});
	}

	render() {
		let list = this.RequestController.getFromLocal('faves'),
			result;

		if (list && list.length > 0)
		{
			result = list.map(el => {
				return (
					<li 	key={`${el.numberInList}${el.index}`}
							onClick={this.showItem}
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