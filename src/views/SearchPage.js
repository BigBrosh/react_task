import React from 'react';

import {MainHeader} from '../header/MainHeader';
import {Instructional} from '../header/Instructional';
import {Search} from '../search/Search';

export class SearchPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<MainHeader />
				<Instructional />
				<Search />
			</div>
		);
	}
}