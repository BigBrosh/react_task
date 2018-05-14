import {createStore} from 'redux';

const initialState = {
	go: 0,
	location: 0
};

const clicks = (state=initialState, action) => {
	if (action.type === 'GO_CLICK'){
		let current = state;
		++current.go;

		return current;
	}

	else if (action.type === 'LOCATION_CLICK'){
		let current = state;
		++current.location;

		return current;
	}

	return state;
};

export const store = createStore(clicks);

store.subscribe(() => {
	console.log(store.getState());
})