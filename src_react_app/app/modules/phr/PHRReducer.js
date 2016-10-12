import {
	GET_ARCHIVES,
	QUERYPHR,
	DELETEPHR,
	FIELDSCHANGE,
	SEARCHPHR,
} from 'ActionTypes';

import moment from 'moment'
import {
	Map
} from 'immutable'

let initialState = Map({})

let initialState1 = {
	archiveListloading: true,
	data: null
}

export default function PHRReducer(state = initialState1, action) {
	console.log('reducer state,', state)
	switch (action.type) {
		case GET_ARCHIVES:
			return {
				archiveListloading: false,
				data: action.data,
			}
		case QUERYPHR:
			let grdaJbzl = action.data.dout.grdaJbzl
			let grdaJws = action.data.dout.grdaJws
			let obj = {}
			for (let item in grdaJbzl) {
				if (item == 'grda_csrq' || item == 'grda_jdrq' || item == 'grda_lrrq') {
					obj[item] = {
						value: moment(grdaJbzl[item], 'YYYY-M-D')
					}
				} else {
					obj[item] = {
						value: grdaJbzl[item]
					}
				}
			}
			console.log('new obj', obj)
			return obj
		case DELETEPHR:
			return action.data
		case FIELDSCHANGE:
			return Object.assign(state, action.data)
		case SEARCHPHR:
			return {
				data: action.data
			}
		default:
			return state
	}
}