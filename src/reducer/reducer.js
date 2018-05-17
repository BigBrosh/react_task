import {createStore} from 'redux';

const initialState = {
	go: 0,
	location: 0
};

const clicks = (state=initialState, action) => {
	if (action.type === 'GO_CLICK')
		return Object.assign({}, state, ++state.go);

	else if (action.type === 'LOCATION_CLICK')
		return Object.assign({}, state, ++state.location);

	return state;
};

export const store = createStore(clicks);

store.subscribe(() => {
	console.log(store.getState());
})