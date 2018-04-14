import React from 'react';
import ReactDOM from 'react-dom';

import {ItemPage} from '../views/ItemPage';

export class ItemController {
	renderComponent(data) {
		ReactDOM.render(
			<ItemPage list={data.response} number={data.event.target.id}/>,
			document.getElementById('root')
		);
	}
}