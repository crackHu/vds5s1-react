import {
	GET_ARCHIVES,
	QUERY_PHR,
	DELETE_PHR,
	FIELDS_CHANGE,
	SEARCH_PHR,
} from 'ActionTypes';

import {
	DATE_FORMAT_STRING
} from 'config'
import {
	PERSONALDETAIL_FIELDS_CONFIG as FIELDS
} from 'phr_conf'
import moment from 'moment'
import {
	Map
} from 'immutable'

let initialState = Map({})

let initialState1 = {
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
	Object.assign(obj, {
		grda_xzz: {
			value: xzz
		}
	})
	Object.assign(obj, {
		grda_hkdz: {
			value: hkdz
		}
	})
	console.debug('getFieldsValueObj', obj)
	return obj
}

export default function PHRReducer(state = initialState1, action) {
	console.log('reducer state,', state)
	switch (action.type) {
		case GET_ARCHIVES:
			return {
				archiveListloading: false,
				data: action.data,
			}
		case QUERY_PHR:
			let grdaJbzl = action.data.dout.grdaJbzl
			let obj = getFieldsValueObj(action.data.dout.grdaJbzl, FIELDS)
			return obj
		case DELETE_PHR:
			return action.data
		case FIELDS_CHANGE:
			return Object.assign(state, action.data)
		case SEARCH_PHR:
			return {
				data: action.data
			}
		default:
			return state
	}
}