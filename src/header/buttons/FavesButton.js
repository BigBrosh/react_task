import React from 'react';
import ReactDOM from 'react-dom';

import {FavesPage} from '../../views/FavesPage';

import {styles} from '../../styles/mainStyles';

let showFavourites = () => {
	ReactDOM.render(
		<FavesPage />,
		document.getElementById('root')	
	);
}

export const FavesButton = () => <button 	style={Object.assign({}, styles.buttons, styles.favesButton)} 
											onClick={showFavourites}>Faves</button>;