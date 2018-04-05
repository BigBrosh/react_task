export let send = () => {
	fetch('https://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name=leeds', {
		method: 'GET',
		headers: {
			"Content-Type": "text/plain"
		}
	}).then(response => {
		return response.json().then(data => {  
				console.log(data.response.attribution);  
		});
	}).catch(e => {
			console.log(e);
	});
}