import React from 'react';

export class RecentSearches extends React.Component {
	render() {
		return(
			<div>
				<p>Recent Searches:</p>
				<div className='search_output recent'></div>
			</div>
		);
	}
}