import {
	GET_ARCHIVES,
	QUERY_PHR,
	DELETE_PHR,
	FIELDS_CHANGE,
	SEARCH_PHR,
	INDIVIDUAL_NUMBER,
} from 'ActionTypes';

import {
	DATE_FORMAT_STRING
} from 'config'
import {
	PERSONALDETAIL_FIELDS_CONFIG as FIELDS
} from 'phr_conf'
import {
	getMomentObj as moment,
	getFieldsValueObj,
	getFieldsValueArrObj,
	getLoginUser
} from 'utils'

let initialState = {
	archiveListloading: true,
	data: null,
	[FIELDS.name]: {
		grdaJbzl: {
			grda_csrq: {
				value: moment('1999-1-1', DATE_FORMAT_STRING)
			},
			grda_jdys: {
				value: getLoginUser() || 'admin'
			},
			grda_lrr: {
				value: getLoginUser() || 'admin'
			}
		}
	}
}


export default function PHRReducer(state = initialState, action) {
	console.debug('reducer state =>', state, ' action =>', action)
	switch (action.type) {
		case GET_ARCHIVES:
			return {
				archiveListloading: false,
				data: action.data,
			}
		case QUERY_PHR:
			let dout = action.data.dout
			let grdaJbzl = getFieldsValueObj(dout.grdaJbzl, FIELDS)
			let grdaJws = getFieldsValueArrObj(dout.grdaJws, FIELDS.grdaJws.dateFields)
			let grdaJzs = getFieldsValueArrObj(dout.grdaJzs, FIELDS.grdaJws.dateFields)
			return {
				[FIELDS.name]: {
					grdaJbzl,
					grdaJws,
					grdaJzs
				}
			}
		case DELETE_PHR:
			return action.data
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
		case SEARCH_PHR:
			return {
				data: action.data
			}
		case INDIVIDUAL_NUMBER:
			let result = action.data.status
			if (result.resultCode == 0) {
				let grbh = {
					grbh: {
						value: action.data.dout.grbh
					}
				}
				return {
					[`${FIELDS.name}`]: {
						...state[`${FIELDS.name}`],
						...grbh
					}
				}
			} else {
				return state
			}
		default:
			return state
	}
}