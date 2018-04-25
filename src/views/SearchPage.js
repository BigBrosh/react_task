import React from 'react';

import {Header} from '../header/Header';
import {Instructional} from '../header/Instructional';
import {Search} from '../search/Search';

export class SearchPage extends React.Component {
	render() {
		return(
			<div>
				<Header.MainHeader />
				<Instructional />
				<Search />
			</div>
		);
	}
}