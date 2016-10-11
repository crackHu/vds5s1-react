import {
	QUERYPHR,
	DELETEPHR,
} from 'ActionTypes';

export default function PHRReducer(state = {}, action) {
	switch (action.type) {
		case QUERYPHR:
			return {
				result: action.data
			}
		case DELETEPHR:
			return {
				result: action.data
			}
		default:
			return state
	}
}