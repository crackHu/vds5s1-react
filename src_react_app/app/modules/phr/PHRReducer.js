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
import moment from 'moment'

let initialState = {
	archiveListloading: true,
	data: null
}

// ------ 获取表单字段与值对象的封装对象 拆箱 ------ //
function getFieldsValueObj(dout, fields) {

	let obj = {}
	let xzz = []
	let hkdz = []
	let multi = []

	let dateFields = fields.grdaJbzl.dateFields
	let casXZZFields = fields.grdaJbzl.addressFields.grda_xzz
	let casHKDZFields = fields.grdaJbzl.addressFields.grda_hkdz
	let multiFields = fields.grdaJbzl.multiFields

	for (let field in dout) {
		/*时间字段转换*/
		if (dateFields.indexOf(field) > -1) {
			obj[field] = {
				value: moment(dout[field], DATE_FORMAT_STRING)
			}
		} else {
			let xzzIndex = casXZZFields.indexOf(field)
			if (xzzIndex > -1) {
				xzz[xzzIndex] = dout[field]
			}
			let hkdzIndex = casHKDZFields.indexOf(field)
			if (hkdzIndex > -1) {
				hkdz[hkdzIndex] = dout[field]
			}
			/*多选字段转换*/
			if (multiFields.indexOf(field) > -1) {
				obj[field] = {
					value: dout[field].split(',')
				}
			} else {
				obj[field] = {
					value: dout[field]
				}
			}
		}
	}

	let grda_xzz = {
			grda_xzz: {
				value: xzz
			}
		},
		grda_hkdz = {
			grda_hkdz: {
				value: hkdz
			}
		}
	Object.assign(obj, grda_xzz, grda_hkdz)

	console.debug('getFieldsValueObj', obj)
	return obj
}

// ------ 获取表单字段与值的封装数组 拆箱 ------ //
function getFieldsArrObj(doutArr, dateFields) {

	let fieldObjs = {}
	let size = 0

	doutArr.forEach((dout, i) => {

		size += 1
		for (let attr in dout) {

			fieldObjs[`${attr}_${i}`] = {}
			if (dateFields.indexOf(attr) > -1) {
				if (dout[attr] != '') {
					fieldObjs[`${attr}_${i}`].value = moment(dout[attr], DATE_FORMAT_STRING)
				}
			} else {
				fieldObjs[`${attr}_${i}`].value = dout[attr]
			}
		}
	})
	return {
		...fieldObjs,
		size
	}
}

export default function PHRReducer(state = initialState, action) {
	console.log('reducer state,', state)
	switch (action.type) {
		case GET_ARCHIVES:
			return {
				archiveListloading: false,
				data: action.data,
			}
		case QUERY_PHR:
			let grdaJbzlObj = getFieldsValueObj(action.data.dout.grdaJbzl, FIELDS)
			let grdaJws = getFieldsArrObj(action.data.dout.grdaJws, FIELDS.grdaJws.dateFields)
			let grdaJzs = getFieldsArrObj(action.data.dout.grdaJzs, FIELDS.grdaJws.dateFields)
			return {
				[`${FIELDS.name}`]: {
					grdaJbzlObj,
					grdaJws,
					grdaJzs
				}
			}
		case DELETE_PHR:
			return action.data
		case FIELDS_CHANGE:
			let data = action.data
			return {
				[`${FIELDS.name}`]: {
					...state[`${FIELDS.name}`],
					...data
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