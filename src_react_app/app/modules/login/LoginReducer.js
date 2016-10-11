import {
	LOGIN
} from 'ActionTypes';

import {
	Map
} from 'immutable'

const initialState = Map({})

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return state.set('data', action.data)
		default:
			return state
	}
}