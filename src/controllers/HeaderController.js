import React from 'react';
import ReactDOM from 'react-dom';

import {SearchPage} from '../views/SearchPage';

export class HeaderController {
	renderMainPage() {
		ReactDOM.render(
			<SearchPage />,
			document.getElementById('root')
		);
	}
}