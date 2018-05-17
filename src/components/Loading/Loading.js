import React from 'react';

import {connect} from 'react-redux';

import spinner from './LoadingSpinner.svg';
import {styles} from '../../styles/mainStyles';

const Loading = props => 
	<div style={Object.assign({}, styles.loadingSpinner, {display: props.loading === true ? 'block' : 'none'})}>
		<img style={styles.commonImage} src={spinner} alt='loading' />
	</div>;

function mapStateToProps(state) {
	return {
		loading: state.loading
	}
}

export default connect (mapStateToProps)(Loading);