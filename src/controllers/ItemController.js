import React from 'react';
import ReactDOM from 'react-dom';

import {ItemPage} from '../views/ItemPage';

export class ItemController {
	renderComponent(data) {
		// input data should contain object {} with response (contains listings)
		// and number

		ReactDOM.render(
			<ItemPage list={data.response} number={data.event}/>,
			document.getElementById('root')
		);
	}
}