import React from 'react';

import {styles} from '../../styles/mainStyles.js'

export class LoadMore extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			available: true,
			loading: 'Load more...'
		};

		this.click = this.click.bind(this);
	}

	click() {
		this.setState({
			loading: 'Loading...'
		});

		this.props.loadMore();
	}

	componentWillMount() {
		if (this.props.amount === 0)
		{
			this.setState({
				available: false
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props && nextProps)
		{
			if (this.state.loading !== nextProps.loading)
			{
				this.setState({
					loading: nextProps.loading === 'done' ? 'Load more...' : 'Loading...'
				});
			}
		}

		if (this.props.amount === nextProps.amount)
		{
			this.setState({
				available: false
			});
		}
	}

	render() {
		let button;

		if (this.state.available === true)
			button = <button style={styles.buttons} onClick={this.click}>{this.state.loading}</button>;
		else button = '';

		return(
			button
		);
	}
}