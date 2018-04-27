import React from 'react';

import {FavesPage} from '../../views/FavesPage';
import {styles} from '../../styles/mainStyles';

export const FavesButton = () => 
	<button style={Object.assign({}, styles.buttons, styles.favesButton)}>Faves</button>;