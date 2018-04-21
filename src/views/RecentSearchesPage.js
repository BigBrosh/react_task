import React from 'react';
import ReactDOM from 'react-dom';

// controllers
import {RequestController} from '../controllers/RequestController';

// buttons
import {LoadMore} from '../views/buttons/LoadMore';

// styles
import {styles} from '../styles/mainStyles';

export class RecentSearchesPage extends React.Component {
	constructor(props) {
		super(props);
		this.list = [];
		this.state = {
			button: 'Load more...',
			page: 1,
			loading: 'done'
		};

		this.RequestController = new RequestController();

		this.updateItem = this.updateItem.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.showItem = this.showItem.bind(this);
	}

	updateItem(data) {
		this.setState({
			newList: data,
			page: this.state.page++
		});
	}

	showItem(e) {
		let index = e.target.parentNode.getAttribute('data-index'),
			numberInList = e.target.getAttribute('data-id'),
			url = this.RequestController.getFromLocal('recentSearches')[index].url;

		let regexp = /page=[0-9]+/,
			page = e.target.getAttribute('data-page');

		url = url.replace(regexp, `page=${page}`);

		this.props.sendByUrl({
			url: url,
			index: index,
			numberInList: numberInList,
			showItem: true
		});
	}

	loadMore() {
		this.props.send({
			action: 'place_name',
			page: ++this.state.page,
			index: this.props.index,
			info: this.props.info,
			onSuccess: this.updateItem,
			getResponse: true
		});
	}

	render() {
		let data = this.state.newList || this.props.data;
		let result = data.response.listings.map((el, i) => {
			return (
				<li 	onClick={this.showItem}
						data-id={i}
						data-page={this.state.page}
						style={styles.itemList.listItem}
						key={`${this.state.page}${i}`}>
					<div>
						<img 	src={el.img_url}
								style={{maxWidth: 150}}/>
					</div>
					<div>
						<p>{el.price_formatted}<br/>{el.title}</p>
					</div>
				</li>
			);
		});

		this.list = this.list.concat(result);
		let list = this.list;

		let totalResults = data.response.total_results,
			currentMatches = +data.request.num_res + +data.request.offset;
		currentMatches = currentMatches >= totalResults ? totalResults : currentMatches;

		let matches = <p>{currentMatches} of {totalResults}</p>;

		return(
			<div>
				{matches}
				<ul style={styles.itemList.list} data-index={this.props.index}>
					{list}
				</ul>
				<LoadMore loading={this.state.loading} loadMore={this.loadMore}/>
			</div>
		);
	}
}