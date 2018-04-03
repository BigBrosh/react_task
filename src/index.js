import React from 'react';
import ReactDOM from 'react-dom';
import {SearchPage} from './views/SearchPage';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<SearchPage />
		)
	}
}

ReactDOM.render(
	<App />, 
	document.getElementById("root")
);