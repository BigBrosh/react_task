import React from 'react';

let getPosition = () => {	
	navigator.geolocation.getCurrentPosition(showPosition, errorMessage, {timeout: 5000});	
}

let showPosition = position => {
	/* Выводим координаты */
	console.log("Широта: " + position.coords.latitude);
	console.log("Долгота: " + position.coords.longitude); 
}

let errorMessage = error => {
	console.log(error.message);
}

export const MyLocationButton = () => <button onClick={getPosition}>My location</button>;