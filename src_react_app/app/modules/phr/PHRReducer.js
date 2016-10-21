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
				value: getLoginUser().userName || 'admin'
			},
			grda_lrr: {
				value: getLoginUser().userName || 'admin'
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
		case QUERY_PHR:
			let dout = action.data.dout
			let grdaJbzl = getFieldsValueObj(dout.grdaJbzl, 'grdaJbzl')
			let grdaJws = getFieldsValueArrObj(dout.grdaJws, 'grdaJws')
			let grdaJzs = getFieldsValueArrObj(dout.grdaJzs, 'grdaJzs')

			let grdaJkzk = getFieldsValueObj(dout.grdaJkzk[0], 'grdaJkzk')

			//let grdaZyyyqk = getFieldsValueArrObj(dout.grdaJkzk[0].grdaZyyyqk, 'grdaZyyyqk')

			// let grdaFmyjzs = getFieldsValueArrObj(dout.grdaJkzk[0].grdaFmyjzs, 'grdaFmyjzs')
			// let grdaZyzlqk = getFieldsValueArrObj(dout.grdaJkzk[0].grdaZyzlqk, 'grdaZyzlqk')

			// let gxyJxb = getFieldsValueObj(dout.gxyJxb, 'gxyJxb')
			// let gxyYyqk = getFieldsValueArrObj(dout.gxyYyqk, 'gxyYyqk')

			// let tnbSfjl = getFieldsValueObj(dout.tnbSfjl, 'tnbSfjl')
			// let tnbYyqk = getFieldsValueArrObj(dout.tnbYyqk, 'tnbYyqk')

			// let lnrSfb = getFieldsValueObj(dout.lnrSfb, 'lnrSfb')

			return {
				[FIELDS.name]: {
					grdaJbzl,
					grdaJws,
					grdaJzs,
					grdaJkzk,


				}
			}
		case DELETE_PHR:
			return action.data
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
						grdaJbzl: {
							...state[`${FIELDS.name}`]['grdaJbzl'],
							...grbh
						}
					}
				}
			} else {
				return state
			}
		default:
			return state
	}
}