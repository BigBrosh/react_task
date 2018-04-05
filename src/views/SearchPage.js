import React from 'react';
import ReactDOM from 'react-dom';

import {MainHeader} from '../header/MainHeader';
import {Instructional} from '../header/Instructional';

import {SearchField} from '../search/SearchField';

import {SearchResult} from '../search/SearchResults/SearchResult'

export class SearchPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<MainHeader />
				<div>
					<Instructional />
					<SearchField />
					<SearchResult />
				</div>
			</div>
		);
	}
}