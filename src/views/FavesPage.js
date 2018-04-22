import React from 'react';

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

	showItem(e) {
		this.timing = this.RequestController.TimeOut('timing');

		let target = e.target;

		while (target.tagName != 'LI')
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
				this.ItemController.renderComponent({
					response : data.response.listings,
					event: target.getAttribute('data-index'),
					numberInList: index
				});
			});
		});
	}

	render() {
		let list = this.RequestController.getFromLocal('faves'),
			result;

		if (list && list.length > 0)
		{
			result = list.map(el => {
				return (
					<li 	onClick={this.showItem}
							data-index={el.index}
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