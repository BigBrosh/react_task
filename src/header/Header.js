import React from 'react';

// controllers
import {HeaderController} from '../controllers/HeaderController';

// buttons
import {FavesButton} from './buttons/FavesButton';
import {ToggleFave} from './buttons/ToggleFave';

// styles
import {styles} from '../styles/mainStyles';


export const Header = {
	MainHeader: () =>
		<header style={styles.header}>
			<h1 style={Object.assign({}, styles.h1, styles.clickable)}
				onClick={HeaderController.renderMainPage}>PropertyCross</h1>
			<FavesButton />
		</header>,

	AdditionalHeader: () => 
		<header style={styles.header}>
			<h1 style={Object.assign({}, styles.h1, styles.clickable)}
				onClick={HeaderController.renderMainPage}>PropertyCross</h1>
		</header>,

	ItemHeader: props =>
		<header style={styles.header}>
			<h1 style={Object.assign({}, styles.h1, styles.clickable)}
				onClick={HeaderController.renderMainPage}>Property Details</h1>
			<ToggleFave place={props.place}/>
		</header>
}