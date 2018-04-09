export class RequestController {
	send(properties) {
		return (
			fetch('https://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name=leeds', {
				method: 'GET',
				headers: {
					"Content-Type": "text/plain"
				}
			})
		)
	}

	getResponse(response) {
		return response.json();
	}

	catchError(error) {
		throw(`${error.name}: ${error.message}`);
	}
}