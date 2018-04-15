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

	sendToLocal(place, request) {
		// input data should contain localStorage key's name and
		// object with key parameters

		if (localStorage.getItem(place) == undefined)
		{
			let list = [request];
			localStorage.setItem(place, JSON.stringify(list));
		}
		else
		{
			let newList = JSON.parse(localStorage.getItem(place));

			for (let i = 0; i < newList.length; i++) {
				if (newList[i].searchValue === request.searchValue)
					return false;
			}

			newList.push(request);
			localStorage.setItem(place, JSON.stringify(newList));
		}
	}

	getFromLocal(place) {
		// input data contains localStorages key's name

		if (localStorage.getItem(place))
			return JSON.parse(localStorage.getItem(place));
	}

	getResponse(response) {
		return response.json();
	}

	catchError(error) {
		throw(`${error.name}: ${error.message}`);
	}
}