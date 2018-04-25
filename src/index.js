import React from 'react';
import ReactDOM from 'react-dom';

import {Router, Route, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import {RecentSearchesPage} from './views/RecentSearchesPage';
import {SearchPage} from './views/SearchPage';
import {FavesPage} from './views/FavesPage';

const history = createBrowserHistory();

class Main extends React.Component {
	componentWillReceiveProps(nextProps){
		if (nextProps)
			return this.props.history !== nextProps.history;
	}

	render() {
		console.log(this.props);

		return(
			<Router history={this.props.history}>
				<Switch>
					<Route exact path="/" component={SearchPage} />
					<Route path="/favourites" component={FavesPage} />
					<Route path="/items/:" component={RecentSearchesPage} />
				</Switch>
			</Router>
		)
	}
}

ReactDOM.render(
	<Main history={history}/>,
	document.getElementById("root")
);