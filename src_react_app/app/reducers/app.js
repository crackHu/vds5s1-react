import {
	GET_ARCHIVES,
	QUERY_PHR,
	DELETE_PHR,
	SEARCH_PHR,
	FIELDS_CHANGE,
	INDIVIDUAL_NUMBER,
} from 'ActionTypes';
import {
	PERSONALDETAIL_FIELDS_CONFIG as FIELDS
} from 'phr_conf'

export default function AppReducer(state = {}, action) {

	console.debug('reducer state =>', state, ' action =>', action)

	switch (action.type) {
		case FIELDS_CHANGE:
			let data = action.data
			let flag = action.flag
			let stateFields = state[FIELDS.name]
			let flagFields = !!stateFields ? stateFields[flag] : null
			return {
				[FIELDS.name]: {
					...stateFields,
					[flag]: {
						...flagFields,
						...data
					}
				}
			}
		default:
			return state
	}
}