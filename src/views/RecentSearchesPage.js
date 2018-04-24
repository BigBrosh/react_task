import React from 'react';

import {AdditionalHeader} from '../header/AdditionalHeader';

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
			loading: 'done',
			matches: 0
		};

		this.RequestController = new RequestController();

		this.updateItem = this.updateItem.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.showItem = this.showItem.bind(this);
		this.countMatches = this.countMatches.bind(this);
	}

	componentWillMount(){
		let matches = this.countMatches(this.props.data);

		this.setState({
			matches: matches.currentMatches,
			totalResults: matches.totalResults
		});
	}

	updateItem(data) {
		let matches = this.countMatches(data);

		this.setState({
			newList: data,
			page: this.state.page + 1,
			matches: matches.currentMatches,
			totalResults: matches.totalResults
		});
	}

	showItem(e) {
		let target = e.target;

		while(target.tagName !== 'LI')
		{
			target = target.parentNode;
		}

		let index = target.parentNode.getAttribute('data-index'),
			numberInList = target.getAttribute('data-id'),
			url = this.RequestController.getFromLocal('recentSearches')[index].url;

		let regexp = /page=[0-9]+/,
			page = target.getAttribute('data-page');

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
			page: this.state.page + 1,
			index: this.props.index,
			info: this.props.info,
			onSuccess: this.updateItem,
			getResponse: true
		});
	}

	countMatches(data) {
		let totalResults = data.response.total_results,
			currentMatches = +data.request.num_res + +data.request.offset;
		
		currentMatches = currentMatches >= totalResults ? totalResults : currentMatches;

		let matches = {
			totalResults: totalResults,
			currentMatches: currentMatches
		};

		return matches;
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
						<img 	alt={el.title}
								src={el.img_url}
								style={{maxWidth: 150}}/>
					</div>
					<div>
						<p>{el.price_formatted}<br/>{el.title}</p>
					</div>
				</li>
			);
		});

		this.list = this.list.concat(result);
		let list = this.list,
			matches = <p>{this.state.matches} of {this.state.totalResults}</p>;

		return(
			<div>
				<AdditionalHeader />
				{matches}
				<ul style={styles.itemList.list} data-index={this.props.index}>
					{list}
				</ul>
				<LoadMore loading={this.state.loading} loadMore={this.loadMore} amount={this.state.matches}/>
			</div>
		);
	}
}