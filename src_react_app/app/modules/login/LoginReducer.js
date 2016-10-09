import {
	LOGIN
} from '../../constants/ActionTypes';

export default function LoginReducer(state = {}, action) {
	switch (action.type) {
		case LOGIN:
			return {
				result: action.data
			}
		default:
			return state
	}
}