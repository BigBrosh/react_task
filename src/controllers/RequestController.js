export class RequestController {
	constructor() {
		this.timer = 0;
	}

	TimeOut(name) {
		return (
			setInterval(( () => {
				if (this.timer === 5)
				{
					let error = {
						name: 'Timeout',
						message: 'an error occurred while searching. Please check your network connection and try again'
					}

					this.ClearInterval(name);
					alert(`${error.name}: ${error.message}`);
				}

				else this.timer++;
			}), 1000)
		);
	}

	ClearInterval(name) {
		clearInterval(this[name]);
		this.timer = 0;
	}

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

		if (localStorage.getItem(place) === undefined || localStorage.getItem(place).length === 0)
		{
			let list = [request];
			localStorage.setItem(place, JSON.stringify(list));
		}
		else
		{
			let newList = JSON.parse(localStorage.getItem(place)),
				checker = true;

			for (let i = 0; i < newList.length; i++) {
				if (newList[i][request.uniqueKey] === request[request.uniqueKey])
					checker = false;
			}

			if (request.totalResults === 0)
				checker = false;

			if (checker)
			{				
				newList.push(request);
				localStorage.setItem(place, JSON.stringify(newList));
			}
		}
	}

	getFromLocal(place) {
		// input data contains localStorages key's name

		if (localStorage.getItem(place))
			return JSON.parse(localStorage.getItem(place));
	}

	removeFromLocal(data) {
		let current = this.getFromLocal(data.list);

		current.forEach((el, i) => {
			if (el[data.name] === data.value)
				current.splice(i, 1);
		});

		localStorage.setItem(data.list, JSON.stringify(current));
	}

	getResponse(response) {
		return response.json();
	}

	catchError(error) {
		throw(`${error.name}: ${error.message}`);
	}
}