import React from 'react';
import ReactDOM from 'react-dom';

export class RecentSearchesPage extends React.Component {
	constructor(props) {
		super(props);
		this.list = [];
		this.state = {
			button: 'Load more...',
			page: 1
		};

		this.updateItem = this.updateItem.bind(this);
		this.loadMore = this.loadMore.bind(this);
	}

	updateItem(data) {
		this.setState({
			newList: data,
			page: this.state.page++
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
				<li key={`${this.state.page}${i}`}>
					<div>
						<img 	src={el.img_url}
								style={{maxWidth: 150}}/>
					</div>
					<div>
						<p>{el.price_formatted}<br/>{el.title}</p>
					</div>
					<p>{data.response.created_unix}</p>
				</li>
			);
		});

		this.list = this.list.concat(result);
		let list = this.list;

		let totalResults = data.response.total_results,
			currentMatches = +data.request.num_res + +data.request.offset;
		currentMatches = currentMatches >= totalResults ? totalResults : currentMatches;
		console.log(data.request.page);

		let matches = <p>{currentMatches} of {totalResults}</p>;

		return(
			<div>
				{matches}
				<ul>
					{list}
				</ul>
				<button onClick={this.loadMore}>{this.state.button}</button>
			</div>
		);
	}
}