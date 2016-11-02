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
	CHANGE_ARRTABLE_SELKEY,
	FETCH_ERROR,
	CHANGE_SUBMIT_LOAD,
	ADD_ITEM,
	ADD_OBJ_ITEM,
	REMOVE_ITEM,
	SELECT_ROW_KEY,
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
	removeChildTRBySelKey,
	getLoginUser
} from 'utils'

const today = moment(new Date())
const todayStr = today.format(DATE_FORMAT_STRING)
const username = getLoginUser().userName

const FIELDSN = FIELDS.name
let initialState = {
	archiveListloading: true,
	submitloading: false,
	updatestate: false,
	[FIELDSN]: {
		grdaJbzl: {
			grda_csrq: {
				value: moment('1950-1-1')
			},
			grda_jdrq: {
				value: today
			},
			grda_lrrq: {
				value: today
			},
			grda_jdys: {
				value: username || 'admin'
			},
			grda_lrr: {
				value: username || 'admin'
			}
		},
		grdaJws: {
			selectedRowKeys: [],
			objSize: []
		},
		grdaJzs: {
			selectedRowKeys: [],
			objSize: []
		},
		grdaJkzk: {
			[todayStr]: {
				grda_tjrq: {
					value: today
				},
				grdaZyzlqk: {
					selectedRowKeys: [],
					objSize: []
				},
				grdaZyyyqk: {
					selectedRowKeys: [],
					objSize: []
				},
				grdaFmyjzs: {
					selectedRowKeys: [],
					objSize: []
				},
				grdaWtml: {
					selectedRowKeys: [],
					objSize: []
				},
			},
			selectKey: todayStr
		},
		grdaJkjl: {
			selectedRowKeys: [],
			objSize: []
		},
		tnbYyqk: {
			selectedRowKeys: [],
			objSize: []
		},
	},
}

const phr = function(state = initialState, action) {

	console.debug('phr reducer state =>', state, ' action =>', action)

	let flag = action.flag
	let data = action.data || undefined
	let dout = !!data ? data.dout : undefined
	let status = !!data ? data.status : undefined
	let resultCode = !!status ? status.resultCode : undefined
	let resultMesg = !!status ? status.resultMesg : undefined
	let stateFields = state[FIELDSN]
	let selectedRowKeys = action.selectedRowKeys || undefined

	switch (action.type) {
		case GET_ARCHIVES:
			return Object.assign({}, initialState, {
				archiveListloading: false,
				data
			})
		case FIELDS_CHANGE:
			var flagFields = !!stateFields ? stateFields[flag] : undefined
			var key = !!flagFields ? flagFields['selectKey'] : undefined
			var keyFields = !!flagFields ? flagFields[key] : undefined
			var fieldsKey = FIELDS.fieldsKey
			var isArrObj = fieldsKey.isArr

			//isObj
			if (fieldsKey.isObj.indexOf(flag) > -1) {
				console.log('FIELDS_CHANGE', 'isObj')
				return Object.assign({}, initialState, state, {
					[FIELDSN]: {
						...stateFields,
						[flag]: {
							...flagFields,
							...data
						}
					}
				})
			} else {
				for (let arrKey in isArrObj) {
					var flagFields = !!stateFields ? stateFields[arrKey] : undefined
					var key = !!flagFields ? flagFields['selectKey'] : undefined
					var isArrFields = !!stateFields ? stateFields[arrKey] : undefined
					var selectKeyFields = !!isArrFields ? isArrFields[key] : undefined
					var isArrObjKeyFields = !!selectKeyFields ? selectKeyFields[flag] : undefined

					//isArrObj
					if (isArrObj[arrKey].indexOf(flag) > -1) {
						console.log('FIELDS_CHANGE', 'isArrObj', key, flagFields)
						return Object.assign({}, initialState, state, {
							[FIELDSN]: {
								...stateFields,
								[arrKey]: {
									...isArrFields,
									[key]: {
										...selectKeyFields,
										[flag]: {
											...isArrObjKeyFields,
											...data
										}
									}
								}
							}
						})
					} else {
						//isArr
						console.log('FIELDS_CHANGE', 'isArr', flagFields)
						return Object.assign({}, initialState, state, {
							[FIELDSN]: {
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
					}
				}
			}
		case FIELDS_CHANGE_KEY:
			var flagFields = !!stateFields ? stateFields[flag] : null
			var key = flagFields['selectKey']
			var keyFields = !!flagFields[key] ? flagFields[key] : null
			console.log('FIELDS_CHANGE_KEY', data, key, keyFields)
			return Object.assign({}, initialState, state, {
				[FIELDSN]: {
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
				[FIELDSN]: {
					grdaJbzl,
					grdaJws,
					grdaJzs,

					grdaJkzk,
					grdaJkjl,
					/*grdaZyyyqk,
					grdaFmyjzs,
					grdaZyzlqk,

					gxyJxb,
					gxyYyqk,

					tnbSfjl,
					tnbYyqk,

					lnrSfb,*/
				}
			})
		case DELETE_PHR:
			return data
		case SAVE_ARCHIVES:
			return Object.assign({}, initialState, state, {
				updatestate: resultCode > 0,
				[FIELDSN]: {
					...stateFields,
					grdaJkzk: {
						...stateFields['grdaJkzk'],
						['2016-10-31']: {
							grbh: {
								value: stateFields.grdaJbzl.grbh.value
							}
						}
					}
				}

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
				return Object.assign({}, state, {
					[FIELDSN]: {
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
				[FIELDSN]: null,
			}, initialState, {
				updatestate: state.updatestate,
			})
		case CHANGE_ARRTABLE_SELKEY:
			return Object.assign({}, state, {
				[FIELDSN]: {
					...stateFields,
					[flag]: {
						...stateFields[flag],
						selectKey: action.selectKey
					}
				},
			})
		case CHANGE_SUBMIT_LOAD:
			return Object.assign({}, state, {
				submitloading: flag
			})
		case FETCH_ERROR:
			console.error('FETCH_ERROR')

			// ------ 子表组件状态的一些操作 ------ //
		case ADD_ITEM:
			var stateFlag = stateFields[flag]
			var objSize = stateFlag.objSize.slice(0)
			objSize.push({
				rkey: Date.now()
			})
			return Object.assign({}, state, {
				[FIELDSN]: {
					...stateFields,
					[flag]: {
						...stateFlag,
						objSize
					}
				}
			})
		case ADD_OBJ_ITEM:
			var stateFlag = stateFields[flag]
			var grbh = stateFields['grdaJbzl']['grbh'] || null
			return Object.assign({}, state, {
				[FIELDSN]: {
					...stateFields,
					[flag]: {
						...stateFlag,
						[todayStr]: {
							grda_tjrq: {
								value: today
							},
							grbh,
						},
						selectKey: todayStr
					}
				}
			})
		case REMOVE_ITEM:
			console.log(REMOVE_ITEM, selectedRowKeys)
			var grdaJwsFields = FIELDS['grdaJws'].fields
			var stateField = stateFields[flag]
			var childTRArr = removeChildTRBySelKey(grdaJwsFields, stateField, selectedRowKeys)
			console.log('childTRArr', childTRArr)
			return Object.assign({}, state, {
				[FIELDSN]: {
					...stateFields,
					[flag]: childTRArr
				}
			})
		case SELECT_ROW_KEY:
			var stateField = stateFields[flag]
			return Object.assign({}, state, {
				[FIELDSN]: {
					...stateFields,
					[flag]: {
						...stateField,
						selectedRowKeys
					}
				}
			})
		default:
			return state
	}
}

module.exports = {
	phr,
}