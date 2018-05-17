import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadingOn, loadingOff} from '../reducer/actions';

import {Header} from '../header/Header';

// controllers and helpers
import {RequestController} from '../controllers/RequestController';
import {DataFromLink} from '../helpers/DataFromLink.js';
import {CustomLink} from '../helpers/CustomLink';

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

class ItemPage extends React.Component {
	state = {
		list: ''
	};
	
	RequestController = new RequestController();

	componentWillMount = () => {
		this.props.loadingOn();

		if (this.props.history.location.pathname.match(/favourite/) === null)
		{			
			let sv = DataFromLink.extra(this.props.history.location.pathname, 'item', 'sv'),
				page = DataFromLink.extra(this.props.history.location.pathname, 'item', 'pg'),
				url = CustomLink.customize({
					place: sv,
					page: page
				});

			this.RequestController.send({
				url: url,
				method: 'GET',
				headers: {
					contentType: "text/plain"
				}
			}).then(response => {
				this.RequestController.getResponse(response).then(data => {
					this.setState({
						list: data,
						number: DataFromLink.extra(this.props.history.location.pathname, 'item', 'num')
					});
				})
			}).catch(error => {
				this.RequestController.catchError(error);
			});
		}

		else
		{
			let id = DataFromLink.extra(this.props.history.location.pathname, 'favourite', 'id');		
			this.redirect(this.RequestController.getFromLocal('faves')[id]);

			this.props.loadingOff();
			this.setState({
				list: this.RequestController.getFromLocal('faves')[id].data,
				number: id
			});			
		}
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.state.list === nextState.list && this.state.list === '') return false;
		else return true;
	}

	componentDidUpdate = () => {
		this.props.loadingOff();
	};

	redirect = input => {
		if (input === undefined)
		{
			history.replace('/404');
			history.go();
		}
	};

	render = () => {
		if (this.state.list !== '')
		{
			let item;

			if (this.state.list.response) item = this.state.list.response.listings[this.state.number];
			else item = this.state.list;

			this.redirect(item);

			return (
				<div id='item'
					 data-numberinlist={this.state.number}>
					<Header.ItemHeader place={item.lister_url} data={item} />
					<p id='itemPrice'>{item.price_formatted}</p>
					<p>{item.title}</p>
					<img 	id='item_image'
							src={item.img_url}
							alt={item.title}
							style={{maxWidth: '100%'}} />

					<p>{item.bedroom_number || 0} bed, {item.bathroom_number || 0} bathrooms</p>
					<p>{item.summary}</p>
				</div>
			)
		}

		else return false;
	}
};

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

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);