import React from 'react';
import ReactDOM from 'react-dom';

import {FavesPage} from '../../views/FavesPage';

let showFavourites = () => {
	ReactDOM.render(
		<FavesPage />,
		document.getElementById('root')	
	);
}

export const FavesButton = () => <button onClick={showFavourites}>Faves</button>;