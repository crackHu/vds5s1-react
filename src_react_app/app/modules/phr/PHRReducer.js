import {
	GET_ARCHIVES,
	SAVE_ARCHIVES,
	UPDATE_ARCHIVES,
	QUERY_PHR,
	DELETE_PHR,
	FIELDS_CHANGE,
	SEARCH_PHR,
	INDIVIDUAL_NUMBER,
	STATE_CHANGE,
	CLEAR_STORE,
	FIELDS_CHANGE_KEY,
	GET_GRDA_JKZK,
	CHANGE_GRDA_JKZK_SELKEY,
	FETCH_ERROR,
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
	getArrFieldsValueObj,
	getArrFieldsValueArrObj,
	getArrFieldsObjByObj,
	getLoginUser
} from 'utils'

let initialState = {
	archiveListloading: true,
	submitloading: false,
	updatestate: false,
	[FIELDS.name]: {
		grdaJbzl: {
			grda_csrq: {
				value: moment('1950-1-1', DATE_FORMAT_STRING)
			},
			grda_jdrq: {
				value: moment(new Date(), DATE_FORMAT_STRING)
			},
			grda_lrrq: {
				value: moment(new Date(), DATE_FORMAT_STRING)
			},
			grda_jdys: {
				value: getLoginUser().userName || 'admin'
			},
			grda_lrr: {
				value: getLoginUser().userName || 'admin'
			}
		}
	},
}

export default function PHRReducer(state = initialState, action) {

	console.debug('reducer state =>', state, ' action =>', action)

	let data = action.data || undefined
	let dout = !!data ? data.dout : undefined
	let status = !!data ? data.status : undefined
	let resultCode = !!status ? status.resultCode : undefined
	let resultMesg = !!status ? status.resultMesg : undefined

	switch (action.type) {
		case GET_ARCHIVES:
			return Object.assign({}, initialState, {
				archiveListloading: false,
				data
			})
		case FIELDS_CHANGE:
			var flag = action.flag
			var stateFields = state[FIELDS.name]
			var flagFields = !!stateFields ? stateFields[flag] : null
			var fieldsKey = FIELDS.fieldsKey
			if (fieldsKey.isArr.indexOf(flag) > -1) {
				var key = flagFields['selectKey']
				var keyFields = !!flagFields[key] ? flagFields[key] : null
				return Object.assign({}, initialState, state, {
					[FIELDS.name]: {
						...stateFields,
						[flag]: {
							...flagFields,
							[key]: {
								...keyFields,
								...data
							}
						}
					}
				})
			} else {
				return Object.assign({}, initialState, state, {
					[FIELDS.name]: {
						...stateFields,
						[flag]: {
							...flagFields,
							...data
						}
					}
				})
			}
		case FIELDS_CHANGE_KEY:
			var flag = action.flag
			var stateFields = state[FIELDS.name]
			var flagFields = !!stateFields ? stateFields[flag] : null
			var key = flagFields['selectKey']
			var keyFields = !!flagFields[key] ? flagFields[key] : null
			console.log('FIELDS_CHANGE_KEY', data, key, keyFields)
			return Object.assign({}, initialState, state, {
				[FIELDS.name]: {
					...stateFields,
					[flag]: {
						...flagFields,
						[key]: {
							...keyFields,
							...data
						}
					}
				}
			})
		case QUERY_PHR:
			let grdaJbzl = getFieldsValueObj(dout.grdaJbzl, FIELDS['grdaJbzl'])
			let grdaJws = getFieldsValueArrObj(dout.grdaJws, FIELDS['grdaJws'])
			let grdaJzs = getFieldsValueArrObj(dout.grdaJzs, FIELDS['grdaJzs'])

			let grdaJkzkFields = FIELDS['grdaJkzk']
			let grdaJkzk = getArrFieldsValueObj(dout.grdaJkzk, grdaJkzkFields, 'grda_tjrq', grdaJkzkFields['arrFields'])
			let grdaJkjl = getArrFieldsObjByObj(grdaJkzk, FIELDS['grdaJkjl'].fields)
				/*let grdaZyyyqk = getArrFieldsValueArrObj(dout.grdaJkzk, FIELDS['grdaZyyyqk'], 'grdaZyyyqk')
				let grdaFmyjzs = getArrFieldsValueArrObj(dout.grdaJkzk, FIELDS['grdaFmyjzs'], 'grdaFmyjzs')
				let grdaZyzlqk = getArrFieldsValueArrObj(dout.grdaJkzk, FIELDS['grdaZyzlqk'], 'grdaZyzlqk')*/

			let gxyJxb = getArrFieldsValueObj(dout.gxyJxb, FIELDS['gxyJxb'])
			let gxyYyqk = getArrFieldsValueArrObj(dout.gxyJxb, FIELDS['gxyYyqk'], 'gxyYyqk')

			let tnbSfjl = getArrFieldsValueObj(dout.tnbSfjl, FIELDS['tnbSfjl'])
			let tnbYyqk = getArrFieldsValueArrObj(dout.tnbSfjl, FIELDS['tnbYyqk'], 'tnbYyqk')

			let lnrSfb = getArrFieldsValueObj(dout.lnrSfb, FIELDS['lnrSfb'], 'lnrSfb')

			return Object.assign({}, initialState, {
				submitloading: false,
				updatestate: true,
				[FIELDS.name]: {
					grdaJbzl,
					grdaJws,
					grdaJzs,

					grdaJkzk,
					grdaJkjl,
					/*grdaZyyyqk,
					grdaFmyjzs,
					grdaZyzlqk,*/

					gxyJxb,
					gxyYyqk,

					tnbSfjl,
					tnbYyqk,

					lnrSfb,
				}
			})
		case DELETE_PHR:
			return data
		case SAVE_ARCHIVES:
			return Object.assign({}, initialState, state, {
				updatestate: resultCode > 0,
				...data,
			})
		case UPDATE_ARCHIVES:
			return Object.assign({}, initialState, state, {
				updatestate: resultCode > 0,
				...data,
			})
		case SEARCH_PHR:
			return {
				data
			}
		case INDIVIDUAL_NUMBER:
			if (resultCode > 0) {
				let grbh = {
					grbh: {
						value: dout.grbh
					}
				}
				var stateFields = state[FIELDS.name]
				return Object.assign({}, state, {
					[FIELDS.name]: {
						...stateFields,
						grdaJbzl: {
							...stateFields['grdaJbzl'],
							...grbh
						}
					}
				})
			} else {
				return state
			}
		case STATE_CHANGE:
			return Object.assign({}, state, {
				updatestate: !state.updatestate
			})
		case CLEAR_STORE:
			return Object.assign({}, {
				[FIELDS.name]: null,
			}, initialState, {
				updatestate: state.updatestate,
			})
		case CHANGE_GRDA_JKZK_SELKEY:
			var stateFields = state[FIELDS.name]
			return Object.assign({}, state, {
				[FIELDS.name]: {
					...stateFields,
					grdaJkzk: {
						...stateFields['grdaJkzk'],
						selectKey: action.selectKey
					}
				},
			})
		case FETCH_ERROR:
			console.error('FETCH_ERROR')
			return initialState
		default:
			return state
	}
}