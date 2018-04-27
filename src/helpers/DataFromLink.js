export const DataFromLink = {
	common: (link, request) => {
		let current = link.match(/([a-z, A-Z, =, &, 0-9]+)/)[1];

		while (current !== request) {
		current = link.match(`${current}\/([a-z, A-Z, =, &, 0-9]+)/`)[1];
		}
		
		current = link.match(`${current}\/([a-z, A-Z, =, &, 0-9]+)`)[1];
		return current;
	},

	extra: (link, request, val) => {
		let current = link.match(/([a-z, A-Z, =, &, 0-9]+)/)[1];

		while (current !== request) {
		current = link.match(`${current}\/([a-z, A-Z, =, &, 0-9]+)/`)[1];
		}
		
		current = link.match(`${current}\/([a-z, A-Z, =, &, 0-9]+)`)[1];
		current = current.match(`${val}=([a-z, A-Z, 0-9]+)`)[1];
		
		return current;
	},

	find: (link, request) => link.match(`${request}=([a-z, A-Z, =, 0-9]+)`)[1]
}