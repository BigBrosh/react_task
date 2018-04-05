import React from 'react';

import {RecentSearches} from './RecentSearches'

export class SearchResult extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 'Recent searches'
		};
	}

	render()
	{
		let current;

		switch(this.state.page)
		{
			case 'Recent searches':
				current = <RecentSearches />;
				break;

			default: return false;
		}

		return (
			current
		);
	}
}