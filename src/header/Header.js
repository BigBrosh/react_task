import React from 'react';
import {Link} from 'react-router-dom';

import {SearchPage} from '../views/SearchPage';

// controllers
import {HeaderController} from '../controllers/HeaderController';

// buttons
import {FavesButton} from './buttons/FavesButton';
import {ToggleFave} from './buttons/ToggleFave';

// styles
import {styles} from '../styles/mainStyles';

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

export const Header = {
	MainHeader: () =>
		<header style={styles.header}>
			<h1 style={styles.h1}>
				<Link 	style={styles.clickable}
						to='/'>PropertyCross</Link></h1>
			<Link to='/favourites'><FavesButton /></Link>
		</header>,

	AdditionalHeader: () => 
			<header style={styles.header}>
				<h1 style={styles.h1}>
					<Link 	style={styles.clickable}
							to='/'>PropertyCross</Link>
				</h1>
			</header>,

	ItemHeader: props =>
		<header style={styles.header}>
			<h1 style={styles.h1}>
				<Link 	style={styles.clickable}
						to='/'>PropertyCross</Link>
			</h1>

			<ToggleFave place={props.place} data={props.data}/>
		</header>
}