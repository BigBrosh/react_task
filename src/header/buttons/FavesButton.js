import React from 'react';

import {styles} from '../../styles/mainStyles';

export const FavesButton = () => 
	<button style={Object.assign({}, styles.buttons, styles.favesButton)}>Faves</button>;