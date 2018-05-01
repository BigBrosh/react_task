import React from 'react';

import spinner from './LoadingSpinner.svg';
import {styles} from '../../styles/mainStyles';

export const Loading = props => 
	<div style={styles.loadingSpinner}>
		<img style={styles.commonImage} src={spinner} alt='loading' />
	</div>;