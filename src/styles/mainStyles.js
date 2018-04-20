export let styles = {
	commonList: {
		listStyleType: 'unset'
	},

	buttons: {
		cursor: 'pointer',
		outline: 'none',
		border: 'none',
		background: '#1fcde0',
		color: '#fff',
		padding: '4px 12px',
		borderRadius: 10
	},

	searchWrapp: {
		input: {
			marginRight: '100%',
			marginBottom: 10
		},

		goButton: {
			marginRight: 8
		}
	},

	itemList: {
		list: {
			paddingLeft: 0,
			display: 'flex',
    		flexFlow: 'row wrap',
    		justifyContent: 'space-around'
		},

		listItem: {
			boxSizing: 'border-box',
			listStyleType: 'none',
			padding: 10,
		    display: 'flex',
		    flexBasis: 300,
			flexDirection: 'column',
			alignItems: 'flex-start',
			width: 'calc(100%/4 - 10px)',
			border: '1px solid black',
			margin: 10
		}
	}
}