import React from 'react';

export class RecentSearchesPage extends React.Component {
	render() {
		let data = this.props.data;
		let result = data.response.listings.map(el => {
			return (
				<li>
					<div>
						<img 	src={el.img_url}
								style={{maxWidth: 150}}/>
					</div>
					<div>
						<p>{el.price_formatted}<br/>{el.title}</p>
					</div>
				</li>
			);
		});

		let totalResults = data.response.total_results,
			currentMatches = +data.request.num_res + +data.request.offset;
		currentMatches = currentMatches >= totalResults ? totalResults : currentMatches;

		let matches = <p>{currentMatches} of {totalResults}</p>;

		return(
			<div>
				{matches}
				<ul>
					{result}
				</ul>
			</div>
		);
	}
}