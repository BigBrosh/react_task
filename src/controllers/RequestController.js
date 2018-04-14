export class RequestController {
	send(properties) {
		return (
			fetch(properties.url, {
				method: properties.method || 'GET',
				headers: {
					"Content-Type": properties.headers.contentType || "text/plain"
				}
			})
		)
	}

	sendToLocal(request) {
		if (localStorage.getItem('recentSearches') == undefined)
		{
			let list = [request];
			localStorage.setItem('recentSearches', JSON.stringify(list));
		}
		else
		{
			let newList = JSON.parse(localStorage.getItem('recentSearches'));
			newList.push(request);
			localStorage.setItem('recentSearches', JSON.stringify(newList));
		}
	}

	getFromLocal() {
		if (localStorage.getItem('recentSearches'))
			return JSON.parse(localStorage.getItem('recentSearches'));
	}

	getResponse(response) {
		return response.json();
	}

	catchError(error) {
		throw(`${error.name}: ${error.message}`);
	}
}