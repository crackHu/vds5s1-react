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
	CHANGE_SPIN,
	ADD_ITEM,
	ADD_SON_ITEM,
	ADD_OBJ_ITEM,
	REMOVE_ITEM,
	REMOVE_SON_ITEM,
	SELECT_ROW_KEY,
	SELECT_SON_ROW_KEY,
} from 'ActionTypes';

import {
	DATE_FORMAT_STRING
} from 'config'
import {
	PERSONALDETAIL_FIELDS_CONFIG as FIELDS
} from 'phr_conf'
import {
	getMomentObj as moment,
	getMomentFormat as momentFormat,
	getFieldsValueObj,
	getFieldsValueArrObj,
	getArrFieldsValueObj,
	getArrFieldsValueArrObj,
	getArrFieldsObjByObj,
	removeTRBySelKey,
	removeChildTRBySelKey,
	getLoginUser
} from 'utils'

const today = moment(new Date())
console.log('heheheheheheh', today)
const todayStr = today.format(DATE_FORMAT_STRING)
const username = getLoginUser().userName
const FIELDSN = FIELDS.name
let initialState = {
	archiveListloading: true,
	submitloading: false,
	updatestate: false,
	[FIELDSN]: {
		grdaJbzl: {
			/*grda_csrq: {
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
			},
			grda_hklx: {
				value: '户籍'
			},
			grda_mzmc: {
				value: '汉族'
			},
			grda_gms: {
				value: '无'
			},
			grda_zyblqk: {
				value: '无'
			},
			grda_dazt: {
				value: '在册'
			},
			grda_ycbsjbmc: {
				value: '无'
			},
			grda_cjqk: {
				value: '无残疾'
			},
			grda_cfpfss: {
				value: '抽油烟'
			},
			grda_rllx: {
				value: '液化气'
			},
			grda_ys: {
				value: '自来水'
			},
			grda_cs: {
				value: '卫生厕所'
			},
			grda_csl: {
				value: '无'
			},*/
		},
		grdaJws: {
			selectedRowKeys: [],
			objSize: []
		},
		grdaJzs: {
			/*cylb_0: {
				value: '父亲'
			},
			jbmc_0: {
				value: '无'
			},
			cylb_1: {
				value: '母亲'
			},
			jbmc_1: {
				value: '无'
			},
			cylb_2: {
				value: '兄弟姐妹'
			},
			jbmc_2: {
				value: '无'
			},
			cylb_3: {
				value: '子女'
			},
			jbmc_3: {
				value: '无'
			},*/
			selectedRowKeys: [],
			objSize: [{}, {}, {}, {}]
		},
		grdaJkzk: {},
		grdaJkjl: {
			selectedRowKeys: [],
			objSize: []
		},
		tnbSfjl: {},
		tnbjl: {
			selectedRowKeys: [],
			objSize: []
		},
		gxyJxb: {},
		gxyjl: {
			selectedRowKeys: [],
			objSize: []
		},
		lnrSfb: {},
		lnrjl: {
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
			console.log('initialState =>', initialState)
			console.log(GET_ARCHIVES, Object.assign({}, initialState, {
				archiveListloading: false,
				data
			}))
			console.log('222222222222222', initialState)
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
				var isArrObjFlag = false
				var arrKey
				for (let key in isArrObj) {
					if (isArrObj[key].indexOf(flag) > -1) {
						isArrObjFlag = true
						arrKey = key
						break
					}
				}

				if (isArrObjFlag) {
					//isArrObj
					var flagFields = !!stateFields ? stateFields[arrKey] : undefined
					var key = !!flagFields ? flagFields['selectKey'] : undefined
					var isArrFields = !!stateFields ? stateFields[arrKey] : undefined
					var selectKeyFields = !!isArrFields ? isArrFields[key] : undefined
					var isArrObjKeyFields = !!selectKeyFields ? selectKeyFields[flag] : undefined

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
		case QUERY_PHR:
			let grdaJbzl = getFieldsValueObj(dout.grdaJbzl, FIELDS['grdaJbzl'])
			let grdaJws = getFieldsValueArrObj(dout.grdaJws, FIELDS['grdaJws'])
			let grdaJzs = getFieldsValueArrObj(dout.grdaJzs, FIELDS['grdaJzs'])

			let grdaJkzkFields = FIELDS['grdaJkzk']
			let grdaJkzk = getArrFieldsValueObj(dout.grdaJkzk, grdaJkzkFields, 'grda_tjrq', grdaJkzkFields['arrFields'])
			let grdaJkjl = getArrFieldsObjByObj(grdaJkzk, FIELDS['grdaJkjl'].fields)

			let gxyJxbFields = FIELDS['gxyJxb']
			let gxyJxb = getArrFieldsValueObj(dout.gxyJxb, gxyJxbFields, 'gxy_sfrq2', gxyJxbFields['arrFields'])
			let gxyjl = getArrFieldsObjByObj(gxyJxb, FIELDS['gxyjl'].fields)

			let tnbSfjlFields = FIELDS['tnbSfjl']
			let tnbSfjl = getArrFieldsValueObj(dout.tnbSfjl, tnbSfjlFields, 'tnb_sfrq2', tnbSfjlFields['arrFields'])
			let tnbjl = getArrFieldsObjByObj(tnbSfjl, FIELDS['tnbjl'].fields)

			let lnrSfbFields = FIELDS['lnrSfb']
			let lnrSfb = getArrFieldsValueObj(dout.lnrSfb, lnrSfbFields, 'lnr_sfrq', lnrSfbFields['arrFields'])
			let lnrjl = getArrFieldsObjByObj(lnrSfb, FIELDS['lnrjl'].fields)

			return Object.assign({}, initialState, {
				submitloading: false,
				updatestate: true,
				[FIELDSN]: {
					grdaJbzl,
					grdaJws,
					grdaJzs,

					grdaJkzk,
					grdaJkjl,

					gxyJxb,
					gxyjl,

					tnbSfjl,
					tnbjl,

					lnrSfb,
					lnrjl,
				}
			})
		case DELETE_PHR:
			return data
		case SAVE_ARCHIVES:
			return Object.assign({}, initialState, state, {
				updatestate: resultCode > 0,
			})
		case UPDATE_ARCHIVES:
			return Object.assign({}, initialState, state, {
				updatestate: true,
			})
		case SEARCH_PHR:
			return Object.assign({}, initialState, {
				archiveListloading: false,
				data,
			})
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
			console.log('CLEAR_STORE initialState =>', initialState)
			console.log('CLEAR_STORE =>', Object.assign({}, initialState, flag))
			return Object.assign({}, initialState, flag)
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
		case CHANGE_SPIN:
			return Object.assign({}, state, {
				spin: flag
			})
		case FETCH_ERROR:
			console.error('FETCH_ERROR')
			return state

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
		case ADD_SON_ITEM:
			//夫表key
			var pFlag = action.pFlag

			//子表key
			var sFlag = action.sFlag
			var pStateFlag = stateFields[pFlag]
			var selectKey = pStateFlag['selectKey']
			var target = pStateFlag[selectKey]
			var sStateFlag = target[sFlag]
			var objSize
			if (!sStateFlag) {
				objSize = []
				sStateFlag = {
					selectedRowKeys: []
				}
			} else {
				objSize = sStateFlag.objSize.slice(0)
			}
			objSize.push({
				rkey: Date.now()
			})
			console.log(ADD_SON_ITEM, target, selectKey, target, sStateFlag)
			return Object.assign({}, state, {
				[FIELDSN]: {
					...stateFields,
					[pFlag]: {
						...pStateFlag,
						[selectKey]: {
							...target,
							[sFlag]: {
								...sStateFlag,
								objSize
							}
						}
					}
				}
			})
		case ADD_OBJ_ITEM:
			var stateFlag = stateFields[flag]
			var selectKey
			var selectKey_ = stateFlag.selectKey
			if (!!selectKey_) {
				selectKey = moment(selectKey_).add(1, 'days')
					//selectKey = moment(new Date())
			} else {
				selectKey = today.subtract(7, 'days')
					//selectKey = moment(new Date())
			}
			var selectDay = selectKey.format(DATE_FORMAT_STRING)
				//selectDay = Date.now()
			var grbh = stateFields['grdaJbzl']['grbh'] || null
			console.log(ADD_OBJ_ITEM, selectKey, selectKey.format(DATE_FORMAT_STRING), today.format(DATE_FORMAT_STRING))
			return Object.assign({}, state, {
				[FIELDSN]: {
					...stateFields,
					[flag]: {
						...stateFlag,
						[selectDay]: {
							[action.recordKey]: {
								value: selectKey
							},
							grbh,
						},
						selectKey: selectDay,
					}
				}
			})
		case REMOVE_ITEM:
			try {
				console.log(REMOVE_ITEM, selectedRowKeys, flag)
				var stateField = stateFields[flag]
				if (FIELDS.fieldsKey.isArr.hasOwnProperty(flag)) {
					//体检表记录表、高血压记录表、糖尿病记录表、老年人记录表……
					var delField = FIELDS[flag].delField
					var trArr = removeTRBySelKey(stateField, selectedRowKeys, delField)
					var trArrLen = Object.keys(trArr).length
					var recordField = FIELDS[flag].recordField
					var recordObjSize = trArrLen == 0 ? trArrLen : trArrLen - 2
					return Object.assign({}, state, {
						[FIELDSN]: {
							...stateFields,
							[flag]: trArr,
							[recordField]: {
								...stateFields[recordField],
								objSize: new Array(recordObjSize).fill({}),
								selectedRowKeys: []
							}
						}
					})
				} else {
					//既往史、家族史、体检表的住院治疗情况……
					var fields = FIELDS[flag].fields
					var stateField = stateFields[flag]
					var childTRArr = removeChildTRBySelKey(fields, stateField, selectedRowKeys)
					console.log('childTRArr', childTRArr)
					return Object.assign({}, state, {
						[FIELDSN]: {
							...stateFields,
							[flag]: childTRArr
						}
					})
				}
			} catch (e) {
				throw Error(`${REMOVE_ITEM} reducer error ${e.message}`)
			}
		case REMOVE_SON_ITEM:
			try {
				var sonKey = action.sonKey
				var parentKey = action.parentKey
				var parents = stateFields[parentKey]
				var selectKey = parents.selectKey
				var parentRecord = parents[selectKey]
				var sonRecord = parentRecord[sonKey]

				var fieldConf = FIELDS[parentKey].arrFields[sonKey]
				var fields = fieldConf.fields
				var delField = fieldConf.delField

				if (!delField || !fields) throw Error(`${REMOVE_SON_ITEM} ${parentKey} ${sonKey} delField or fields error`)

				var trArr = removeChildTRBySelKey(fields, sonRecord, selectedRowKeys, delField)
				console.log('trArr', trArr)
				return Object.assign({}, state, {
					[FIELDSN]: {
						...stateFields,
						[parentKey]: {
							...parents,
							[selectKey]: {
								...parentRecord,
								[sonKey]: trArr
							}
						}
					}
				})
			} catch (e) {
				throw Error(`${REMOVE_SON_ITEM} reducer error ${e.message}`)
			}
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
		case SELECT_SON_ROW_KEY:
			try {
				var sonKey = action.sonKey
				var parentKey = action.parentKey
				var parents = stateFields[parentKey]
				var selectKey = parents.selectKey
				var parentRecord = parents[selectKey]
				var sonRecord = parentRecord[sonKey]

				return Object.assign({}, state, {
					[FIELDSN]: {
						...stateFields,
						[parentKey]: {
							...parents,
							[selectKey]: {
								...parentRecord,
								[sonKey]: {
									...sonRecord,
									selectedRowKeys
								}
							}
						}
					}
				})
			} catch (e) {
				throw Error(`${SELECT_SON_ROW_KEY} reducer error ${e.message}`)
			}
		default:
			return state
	}
}

module.exports = {
	phr,
}