export class RequestController {
	send(properties) {
		fetch('https://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name=leeds', {
			method: 'GET',
			headers: {
				"Content-Type": "text/plain"
			}
		}).then(response => {
			this.getResponse(response);
		}).catch(error => {
			this.catchError(error);
		});
	}

	getResponse(response) {
		return response.json().then(data => {  
			console.log(data.response.listings[0]);  
		});
	}

	catchError(error) {
		throw(`${error.name}: ${error.message}`);
	}
}