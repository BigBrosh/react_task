import React from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadingOn, loadingOff} from '../reducer/actions';

import Loading from '../components/Loading/Loading';
import {Header} from '../header/Header';

// controllers and helpers
import {RequestController} from '../controllers/RequestController';
import {DataFromLink} from '../helpers/DataFromLink';
import {CustomLink} from '../helpers/CustomLink';

// buttons
import {LoadMore} from '../views/buttons/LoadMore';

// styles
import {styles} from '../styles/mainStyles';

class RecentSearchesPage extends React.Component {
	list = [];

	state = {
		button: 'Load more...',
		page: 1,
		loading: 'done',
		matches: 0
	};

	RequestController = new RequestController();

	componentWillMount = () => {
		this.props.loadingOn();

		let sv = DataFromLink.extra(this.props.history.location.pathname, 'recent', 'sv'),
			url = CustomLink.customize({
				place: sv,
				page: this.state.page
			});

		this.RequestController.send({
			url: url,
			method: 'GET',
			headers: {
				contentType: "text/plain"
			}
		}).then(response => {
			this.RequestController.getResponse(response).then(data => {
				let matches = this.countMatches(data);
				this.setState({
					newList: data,
					matches: matches.currentMatches,
					totalResults: matches.totalResults,
					page: this.state.page + 1
				});
			})
		}).catch(error => {
			this.RequestController.catchError(error);
		});
	};

	updateItem = data => {
		let matches = this.countMatches(data);
		this.setState({
			newList: data,
			page: this.state.page + 1,
			matches: matches.currentMatches,
			totalResults: matches.totalResults
		});
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.state.newList === nextState.newList) return false;
		else return true;
	}

	componentDidUpdate = () => {
		this.props.loadingOff();
	};

	loadMore = () => {
		let sv = DataFromLink.extra(this.props.history.location.pathname, 'recent', 'sv'),
			url = CustomLink.customize({
				place: sv,
				page: this.state.page
			});

		this.RequestController.send({
			url: url,
			method: 'GET',
			headers: {
				contentType: "text/plain"
			}
		}).then(response => {
			this.RequestController.getResponse(response).then(data => {
				let matches = this.countMatches(data);

				this.setState({
					newList: data,
					page: this.state.page + 1,
					matches: matches.currentMatches,
					totalResults: matches.totalResults
				});
			})
		}).catch(error => {
			this.RequestController.catchError(error);
		});
	};

	countMatches = data => {
		let totalResults = data.response.total_results,
			currentMatches = +data.request.num_res + +data.request.offset;
		
		currentMatches = currentMatches >= totalResults ? totalResults : currentMatches;
		let matches = {
			totalResults: totalResults,
			currentMatches: currentMatches
		};

		return matches;
	};

	render = () => {
		if (this.state.newList)
		{
			let data = this.state.newList,
				sv = DataFromLink.extra(this.props.history.location.pathname, 'recent', 'sv');

			let result = data.response.listings.map((el, i) => {
				let page = Math.floor(i/20);
				page = page >= 1 ? page : 1;

				let url = `/item/sv=${sv}&pg=${page}&num=${i}`;
				return (
					<li 	data-id={i}
							data-page={this.state.page}
							style={styles.itemList.listItem}
							key={`${this.state.page}${i}`}>
						<Link 	style={styles.clickable}
								to={url}>
							<div>
								<img 	alt={el.title}
										src={el.img_url}
										style={{maxWidth: 150}}/>
							</div>
							<div>
								<p>{el.price_formatted}<br/>{el.title}</p>
							</div>
						</Link>
					</li>
				);
			});

			this.list = this.list.concat(result);
			let list = this.list,
				matches = <p>{this.state.matches} of {this.state.totalResults}</p>;


			return(
				<div>
					<Header.MainHeader />
					{matches}
					<ul style={styles.itemList.list} data-index={this.props.index}>
						{list}
					</ul>
					<LoadMore loading={this.state.loading} loadMore={this.loadMore} amount={this.state.matches} total={this.state.totalResults}/>
				</div>
			);			
		}

		else return false;
	}
}

function mapStateToProps (state) {
	return {
		loading: state.loading
	};
}

function mapDispatchToProps (dispatch) {
	return {
		loadingOn: bindActionCreators(loadingOn, dispatch),
		loadingOff: bindActionCreators(loadingOff, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentSearchesPage);