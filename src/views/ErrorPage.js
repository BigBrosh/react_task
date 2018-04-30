import React from 'react';

import {Link} from 'react-router-dom';
import {styles, colors} from '../styles/mainStyles';

export const ErrorPage = () => 
	<div style={styles.notFound}>
		<p style={{marginBottom: 10}}>404<br/>Page not found</p>
		<Link style={Object.assign({}, styles.clickable, {color: colors.mainColor, marginTop: '100px'})} to='/'>Open home page</Link>
	</div>