import React from 'react';

export class LoadMore extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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

	componentWillReceiveProps(nextProps) {
		if (this.props && nextProps)
		{
			if (this.state.loading != nextProps.loading)
			{
				console.log(`${this.state.loading} ${nextProps.loading}`);

				this.setState({
					loading: nextProps.loading === 'done' ? 'Load more...' : 'Loading...'
				});
			}
		}
	}

	render() {
		return(
			<button onClick={this.click}>{this.state.loading}</button>
		);
	}
}