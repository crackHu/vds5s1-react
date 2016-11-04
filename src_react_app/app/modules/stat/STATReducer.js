import {
	GET_AGE_PERCENT,
	GET_JQJDS
} from 'ActionTypes'


let initialState = {}

const stat = function(state = initialState, action) {

	console.log("stat reducer state => ", state)

	let updatedState = {
		...state
	}
	switch (action.type) {
		case GET_AGE_PERCENT:

			updatedState = {
				...updatedState,
				per: action.res
			}
			return updatedState
		case GET_JQJDS:

			updatedState = {
				...updatedState,
				jqj: action.res.jqjds
			}
			return updatedState
		default:
			return state
	}
}

module.exports = {
	stat,
}