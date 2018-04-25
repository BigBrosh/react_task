import React from 'react';
import ReactDOM from 'react-dom';

import {SearchPage} from '../views/SearchPage';

export const HeaderController = {
	renderMainPage: () => {
		ReactDOM.render(
			<SearchPage />,
			document.getElementById('root')
		)
	}
}