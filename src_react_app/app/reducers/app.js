import {
	GET_APP_INDEX_MENU,
	INCREMENT_COUNTER,
	DECREMENT_COUNTER
} from '../constants/ActionTypes';

export default function app(state = {}, action) {
	//let pState = [...state]
	switch (action.type) {
		case GET_APP_INDEX_MENU:
			console.log(action.data)
			return action.data.items
		default:
			return state
	}
}