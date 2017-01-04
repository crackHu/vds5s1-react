import {
	GET_ARCHIVES,
	SAVE_ARCHIVES,
	SAVE_MASTER_ARCHIVES,
	UPDATE_ARCHIVES,
	UPDATE_MASTER_ARCHIVES,
	CHANGE_MASTERSAVED,
	DELETE_ARCHIVES,
	QUERY_PHR,
	DELETE_PHR,
	DEL_STORE_LABELS,
	DEL_STORE_FD,
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
	CHANGE_LIST_LOAD,
	CHANGE_SPIN,
	ADD_ITEM,
	ADD_SON_ITEM,
	ADD_OBJ_ITEM,
	REMOVE_ITEM,
	REMOVE_SON_ITEM,
	SELECT_ROW_KEY,
	SELECT_SON_ROW_KEY,
	ADD_LABEL,
	DEL_LABEL,
	IMPORT_PHR,
	EXPORT_PHR,
	PROGRESS,
} from 'ActionTypes';

import {
	DATE_FORMAT_STRING
} from 'config'
import {
	PERSONALDETAIL_FIELDS_CONFIG as FIELDS,
	COPY_FIELD_DATA_CONFIG as COPYF,
	FROM_INITIAL_VALUE_CONFIG as INIT,
} from 'phr_conf'
import {
	CONFIG as LOGIN_CONFIG
} from 'login_conf'

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
	getLoginUser,
	getCopyValueObj,
	getInitObj,
	getArchivesLastObj,
	getCopyFieldObj,
	getCopyFieldData,
} from 'utils'

const today_ts = Date.now()
const today_obj = moment(new Date())
const today_str = today_obj.format(DATE_FORMAT_STRING)
const username = getLoginUser().userName || LOGIN_CONFIG.DEFAULT.USERNAME
const FIELDSN = FIELDS.name
const COPYFN = COPYF.name
let initialState = {
	/*档案列表加载状态*/
	archiveListloading: true,
	/*档案提交中状态*/
	submitloading: false,
	/*档案是否为更新（编辑）状态*/
	updatestate: false,
	/*档案的基本表是否保存状态*/
	mastersaved: false,
	[FIELDSN]: {
		grdaJbzl: {
			grda_csrq: {
				value: moment('1950-1-1')
			},
			grda_jdrq: {
				value: today_obj
			},
			grda_lrrq: {
				value: today_obj
			},
			grda_jdys: {
				value: username
			},
			grda_lrr: {
				value: username
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
			},
		},
		grdaJws: {
			selectedRowKeys: [],
			objSize: []
		},
		grdaJzs: {
			cylb_0: {
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
			},
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
	let stateCopyFields = state[COPYFN] || {}
	let stateFlag = stateFields[flag]
	let selectedRowKeys = action.selectedRowKeys || undefined
	let ids = action.ids
	let targetKey = action.key
	let lastObj, cFieldsObj, copyFieldData, COPYFLAG

	switch (action.type) {
		case GET_ARCHIVES:
			console.log('initialState =>', initialState)
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
			if (resultCode >= 0) {
				let labels = dout.labels || []

				let grdaJbzl = getFieldsValueObj(dout.grdaJbzl, FIELDS['grdaJbzl'])
				let grdaJws = getFieldsValueArrObj(dout.grdaJws, FIELDS['grdaJws'])
				let grdaJzs = getFieldsValueArrObj(dout.grdaJzs, FIELDS['grdaJzs'])

				let grdaJkzkFields = FIELDS['grdaJkzk']
					//grda_tjrq key @deprecated
				let grdaJkzk = getArrFieldsValueObj(dout.grdaJkzk, grdaJkzkFields, 'grda_tjrq', grdaJkzkFields['arrFields'])
				let grdaJkjl = getArrFieldsObjByObj(grdaJkzk, FIELDS['grdaJkjl'].fields)

				let gxyJxbFields = FIELDS['gxyJxb']
					//gxy_sfrq2 key @deprecated
				let gxyJxb = getArrFieldsValueObj(dout.gxyJxb, gxyJxbFields, 'gxy_sfrq2', gxyJxbFields['arrFields'])
				let gxyjl = getArrFieldsObjByObj(gxyJxb, FIELDS['gxyjl'].fields)

				let tnbSfjlFields = FIELDS['tnbSfjl']
					//tnb_sfrq2 key @deprecated
				let tnbSfjl = getArrFieldsValueObj(dout.tnbSfjl, tnbSfjlFields, 'tnb_sfrq2', tnbSfjlFields['arrFields'])
				let tnbjl = getArrFieldsObjByObj(tnbSfjl, FIELDS['tnbjl'].fields)

				let lnrSfbFields = FIELDS['lnrSfb']
					//lnr_sfrq key @deprecated
				let lnrSfb = getArrFieldsValueObj(dout.lnrSfb, lnrSfbFields, 'lnr_sfrq', lnrSfbFields['arrFields'])
				let lnrjl = getArrFieldsObjByObj(lnrSfb, FIELDS['lnrjl'].fields)

				/*最后一条值对象*/
				lastObj = getArchivesLastObj(grdaJkzk)

				//2016年12月16日11:11:31 保存跨档案类型copy数据
				flag = 'grdaJkzk'
				COPYFLAG = COPYF[flag]
				cFieldsObj = getCopyFieldObj(flag, COPYFLAG, lastObj) || stateCopyFields

				console.log('copy', grdaJkzk, lastObj, cFieldsObj)

				return Object.assign({}, initialState, {
					submitloading: false,
					updatestate: true,
					mastersaved: true,
					[FIELDSN]: {
						labels,

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
					},
					COPY_FIELD_DATA: cFieldsObj
				})
			} else {
				return state
			}
		case DELETE_PHR:
			return Object.assign({}, initialState, state, {
				delSuc: resultCode >= 0,
			})
		case SAVE_ARCHIVES:
			//体检表、专档（从表）的保存
			stateFlag = stateFields[targetKey]
			var targetObj = Object.assign({}, stateFlag),
				diff = 0
			console.log(SAVE_ARCHIVES, stateFlag)
			Object.keys(targetObj).map((key, index) => {
				if (key != 'selectKey') {
					console.log('asdfasdfasd', targetObj[key], ids[index - diff][targetKey])

					//不明白这里的拷贝为什么会影响到state 暂时不理
					let deep = ids[index - diff][targetKey]
					Object.assign(targetObj[key], {
						id: deep['id']
					})
					Object.keys(deep).map((key_, index_) => {
						if (key_ != 'id') {
							Object.assign(targetObj[key][key_], deep[key_])
						}
					})
				} else {
					diff += 1
				}
			})

			/*最后一条值对象*/
			lastObj = getArchivesLastObj(stateFlag)

			//2016年12月16日11:11:31 更新跨档案类型copy数据
			COPYFLAG = COPYF[targetKey]
			cFieldsObj = getCopyFieldObj(targetKey, COPYFLAG, lastObj) || stateCopyFields

			console.log('copy', cFieldsObj)

			console.log(SAVE_ARCHIVES, targetKey, targetObj, ids, state)
			return Object.assign({}, initialState, state, {
				updatestate: resultCode >= 0,
			}, {
				[FIELDSN]: {
					...stateFields,
					[targetKey]: targetObj
				},
				COPY_FIELD_DATA: cFieldsObj
			})
		case SAVE_MASTER_ARCHIVES:
			//基本表（主表） 的保存标示
			var obj = {}
			if (!!ids) {
				var {
					grdaJbzl,
					grdaJws,
					grdaJzs
				} = ids

				obj = {
					[FIELDSN]: {
						...stateFields,
						['grdaJbzl']: {
							...stateFields['grdaJbzl'],
							...grdaJbzl
						},
						['grdaJws']: {
							...stateFields['grdaJws'],
							...grdaJws
						},
						['grdaJzs']: {
							...stateFields['grdaJzs'],
							...grdaJzs
						},
					}
				}
			}
			var success = resultCode >= 0
			return Object.assign({}, initialState, state, {
				updatestate: success,
				mastersaved: success
			}, obj)
		case UPDATE_ARCHIVES:
			stateFlag = stateFields[targetKey]
			var targetObj = Object.assign({}, stateFlag),
				diff = 0
			console.log(UPDATE_ARCHIVES, stateFlag)
			Object.keys(targetObj).map((key, index) => {

				let indexDel = key.indexOf('del')
				if (key != 'selectKey' && indexDel == -1) {
					console.log('asdfasdfasd', targetObj[key], ids[index - diff][targetKey])

					//不明白这里的拷贝为什么会影响到state 暂时不理
					let deep = ids[index - diff][targetKey]
					Object.assign(targetObj[key], {
						id: deep['id']
					})
					Object.keys(deep).map((key_, index_) => {
						if (key_ != 'id') {
							Object.assign(targetObj[key][key_], deep[key_])
						}
					})
				} else {
					if (indexDel > -1) {
						delete targetObj[key]
					}
					diff += 1
				}
			})

			/*最后一条值对象*/
			lastObj = getArchivesLastObj(stateFlag)

			//2016年12月16日11:11:31 更新跨档案类型copy数据
			COPYFLAG = COPYF[targetKey]
			cFieldsObj = getCopyFieldObj(targetKey, COPYFLAG, lastObj) || stateCopyFields

			console.log('copy', targetKey, stateFlag, lastObj, cFieldsObj, copyFieldData)

			console.log(UPDATE_ARCHIVES, targetKey, targetObj, ids, state)
			return Object.assign({}, initialState, state, {
				updatestate: resultCode >= 0,
			}, {
				[FIELDSN]: {
					...stateFields,
					[targetKey]: targetObj
				},
				COPY_FIELD_DATA: cFieldsObj
			})
		case UPDATE_MASTER_ARCHIVES:
			return Object.assign({}, initialState, state, {
				updatestate: true,
			})
		case CHANGE_MASTERSAVED:
			return Object.assign({}, initialState, state, {
				mastersaved: flag,
			})
		case SEARCH_PHR:
			return Object.assign({}, initialState, {
				archiveListloading: false,
				data,
			})
		case INDIVIDUAL_NUMBER:

			if (resultCode >= 0) {
				let grbh = {
					grbh: {
						value: dout.grbh
					}
				}
				var grdaJkzk = Object.assign({}, stateFields['grdaJkzk'])
				Object.keys(grdaJkzk).map((key, index) => {
					if (key != 'selectKey') {
						Object.assign(grdaJkzk[key], grbh)
					}
				})
				return Object.assign({}, state, {
					[FIELDSN]: {
						...stateFields,
						grdaJbzl: {
							...stateFields['grdaJbzl'],
							...grbh
						},
						grdaJkzk
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

			//todo 2016年12月5日10:01:19 deep copy !!!!!!! copy initialState didn't work
			console.log('CLEAR_STORE =>', Object.assign({}, initialState, flag))
			return Object.assign({}, {
				[FIELDSN]: {
					...initialState[FIELDSN],
					['grdaJbzl']: {
						...initialState[FIELDSN]['grdaJbzl'],
					}
				},
			}, flag)
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
		case CHANGE_LIST_LOAD:
			return Object.assign({}, state, {
				archiveListloading: flag,
				delSuc: undefined
			})
		case CHANGE_SPIN:
			return Object.assign({}, state, {
				spin: flag
			})
		case FETCH_ERROR:
			console.error('FETCH_ERROR')
			return Object.assign({}, state, {
				submitloading: false
			})

			// ------ 子表组件状态的一些操作 ------ //
		case ADD_ITEM:
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
			const today_ts = Date.now()
			const today_obj = moment(new Date())
			var initConfigObj = INIT[flag]
			var selectKey = today_obj
			var selectDay = today_ts
			var grbh = stateFields['grdaJbzl']['grbh'] || null
			console.log(ADD_OBJ_ITEM, selectKey, selectKey.format(DATE_FORMAT_STRING), today_obj.format(DATE_FORMAT_STRING))

			//2016年12月14日11:24:59 copy上一条数据
			/*var lastKey = '',
				lastObj = {}
			if (!!stateFlag) {
				Object.keys(stateFlag).forEach((key, index) => {
					if (key != 'selectKey')
						lastKey = key
				})
				lastObj = stateFlag[lastKey] || {}
			}*/
			/*最后一条值对象*/
			lastObj = getArchivesLastObj(stateFlag)

			//2016年12月16日11:11:31 保存跨档案类型copy数据
			COPYFLAG = COPYF[flag]
			cFieldsObj = getCopyFieldObj(flag, COPYFLAG, lastObj) || stateCopyFields
			copyFieldData = getCopyFieldData(flag, cFieldsObj, COPYFLAG)

			/*let copyObj = COPYF[flag]
			let cFieldsObj = state[COPYFN] || {}
			let copyFieldData = {}
			if (flag == 'grdaJkzk') {
				cFieldsObj = {}
				Object.keys(copyObj).forEach((key, index) => {
					let lastObj_, field = copyObj[key]
					if (lastObj_ = lastObj[field], !!lastObj_) {
						cFieldsObj[key] = {}
						cFieldsObj[key][field] = lastObj_
					}
				})
			}
			if (!!cFieldsObj) {
				if (flag == 'gxyJxb' || flag == 'tnbSfjl') {
					copyFieldData = getCopyValueObj(cFieldsObj, copyObj)
					console.log('copy1', cFieldsObj, obj)
				}
			}*/
			console.log('copy', cFieldsObj, copyFieldData, lastObj)

			return Object.assign({}, state, {
				[FIELDSN]: {
					...stateFields,
					[flag]: {
						...stateFlag,
						[selectDay]: {
							/*默认值*/
							...getInitObj(initConfigObj),
							/*跨档案类型copy*/
							...copyFieldData,
							/*copy上一条*/
							...lastObj,
							[action.recordKey]: {
								value: selectKey
							},
							[action.nextVisKey]: {
								value: selectKey.clone().add(3, 'months')
							},
							id: null,
							/*唯一标识用*/
							timestamp_: today_ts,
							grbh,
						},
						selectKey: selectDay,
					}
				},
				COPY_FIELD_DATA: cFieldsObj
			})
		case REMOVE_ITEM:
			try {
				console.log(REMOVE_ITEM, selectedRowKeys, flag)
				var stateField = stateFields[flag]
				if (FIELDS.fieldsKey.isArr.hasOwnProperty(flag)) {
					//体检表记录表、高血压记录表、糖尿病记录表、老年人记录表……
					var delField = FIELDS[flag].delField
					var trArr = removeTRBySelKey(stateField, selectedRowKeys, delField)
					var recordField = FIELDS[flag].recordField
					var recordObjSize = Object.keys(trArr).filter(key => {
						return key.indexOf('del') == -1 && key.indexOf('selectKey') == -1
					}).length
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
				console.log('trArr', trArr, trArr[delField])
				var delIds = trArr[delField]
				return Object.assign({}, state, {
					[FIELDSN]: {
						...stateFields,
						[parentKey]: {
							...parents,
							[delField]: delIds,
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
		case ADD_LABEL:
			return Object.assign({}, state, {
				submitloading: false
			})
		case DEL_LABEL:
			return Object.assign({}, state, {
				submitloading: false
			})
		case DEL_STORE_LABELS:
			var del_labels = action.labels
			var labels = stateFields.labels
			console.log(DEL_STORE_LABELS, labels.filter(label => !del_labels.includes(label)))
			return Object.assign({}, state, {
				[FIELDSN]: Object.assign({}, {
					...stateFields
				}, {
					labels: labels.filter(label => !del_labels.includes(label))
				})
			})
		case DEL_STORE_FD:
			var containKey = action.containKey
			var recordKey = action.recordKey

			return Object.assign({}, state, {
				[FIELDSN]: Object.assign({}, {
					...stateFields
				}, {
					[containKey]: {},
					[recordKey]: {
						selectedRowKeys: [],
						objSize: []
					},
				})
			})
		case IMPORT_PHR:
			console.log('reducer', IMPORT_PHR)
			return state
		case EXPORT_PHR:
			console.log('reducer', EXPORT_PHR)
			return state
		default:
			return state
	}
}

const phrExport = function(state = {}, action) {

	console.debug('phrExport state =>', state, ' action =>', action)

	let actData = action.data || {}
	let dout = actData.dout || {}
	let status = actData.status || {}
	let resultCode = status.resultCode
	let resultMsg = status.resultMsg

	switch (action.type) {

		case PROGRESS:

			let record = dout.bars || null
			if (resultCode >= 0) {
				let total = 0
				if (!!record && record.constructor == Array) {
					total = record.length
				}
				return {
					record,
					total,
					target: total > 0 ? record[0] : null
				}
			}
			return state
		default:
			return state
	}

}

module.exports = {
	phr,
	phrExport,
}