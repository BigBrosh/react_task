import {createStore} from 'redux';

const initialState = {
	go: 0,
	location: 0,
	loading: false
};

const mainStore = (state=initialState, action) => {
	switch (action.type) {
		case 'GO_CLICK':
			return Object.assign({}, state, ++state.go);

		case 'LOCATION_CLICK':
			return Object.assign({}, state, ++state.location);

		case 'IS_LOADING':
			return Object.assign({}, state, state.loading = true);

		case 'NOT_LOADING':
			return Object.assign({}, state, state.loading = false);

		default:
			return state;	
	}
};

export const store = createStore(mainStore);

store.subscribe(() => {
	console.log(store.getState());
})