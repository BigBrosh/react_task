import React from 'react';

import {Link} from 'react-router-dom';

import {styles} from '../../styles/mainStyles';

export class SelectLocation extends React.Component {
	render = () => {
		let index = this.props.response.index;
		let list = this.props.response.list.map((el, i) => {
			let url = `item/sv=${this.props.response.info}&pg=${1}&num=${i}`;

			return <li 	style={Object.assign({}, styles.li, styles.clickable)}
						key={i}><Link to={url}>{el.title}</Link></li>
		});

		return(
			<div>
				<p>Please select a location below:</p>
				<ul data-index={index}>
					{list}
				</ul>
			</div>
		);
	}
}