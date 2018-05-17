import {createStore} from 'redux';

const initialState = {
	loading: false
};

const mainStore = (state=initialState, action) => {
	switch (action.type) {
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