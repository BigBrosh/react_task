export const colors = {
	mainColor: '#1fcde0',
	secondColor: '#1fb0e0'
};

export let styles = {
	header: {
		display: 'flex',
		justifyContent: 'flex-end'
	},

	subHeading: {
		textAlign: 'center'
	},

	clickable: {
		cursor: 'pointer',
		textDecoration: 'none',
		color: 'inherit'
	},

	h1: {
		margin: '0px auto',
		color: '#000'
	},

	commonList: {
		listStyleType: 'unset'
	},

	li: {
		marginBottom: 4
	},

	buttons: {
		cursor: 'pointer',
		outline: 'none',
		border: 'none',
		background: colors.mainColor,
		color: '#fff',
		padding: '4px 12px',
		borderRadius: 10
	},

	favesButton: {
		background: 'none',
		border: '1px solid' + colors.mainColor,
		color: colors.mainColor
	},

	toggleFaveButton: {
		minWidth: 38
	},

	searchWrapp: {
		input: {
			marginRight: '100%',
			marginBottom: 10,
			border: `1px solid ${colors.mainColor}`
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
			cursor: 'pointer',
			listStyleType: 'none',
			padding: 10,
		    display: 'flex',
		    flexBasis: 300,
			flexDirection: 'column',
			alignItems: 'flex-start',
			width: 'calc(100%/4 - 10px)',
			border: '1px solid' + colors.secondColor,
			margin: 10
		}
	},

	notFound: {
		font: '48px sans-serif',
		fontWeight: 'bold',
		textAlign: 'center'
	}
};