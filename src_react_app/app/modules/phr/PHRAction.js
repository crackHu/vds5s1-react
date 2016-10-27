import {
	GET_ARCHIVES,
	SUBMIT_ARCHIVES,
	SAVE_ARCHIVES,
	UPDATE_ARCHIVES,
	LOGIN,
	QUERY_PHR,
	DELETE_PHR,
	FIELDS_CHANGE,
	SEARCH_PHR,
	INDIVIDUAL_NUMBER,
	STATE_CHANGE,
	CLEAR_STORE,
	GET_GRDA_JKZK,
	CHANGE_GRDA_JKZK_SELKEY,
	FETCH_ERROR,
} from 'ActionTypes'
import fetch from 'isomorphic-fetch'
import * as api from 'api'
import {
	msg,
	notify,
	getDate,
	getFieldsObj,
	getDateTimestamp,
	__DEBUG__,
} from 'utils'

const fetchCatchMsg = '内部错误'
const postReqUrl = api.postReqUrl
const fetchInit = {
	method: 'POST',
	/*cookie*/
	credentials: 'include',
	/*跨域*/
	mode: "no-cors",
	headers: {
		'Accept': 'application/json, text/plain, */*',
		'Content-Type': 'x-www-form-urlencoded; charset=UTF-8',
		'cache': "no-store"
	},
	body: undefined
}

/**
 * Redux Action 通用 dispatch 方法
 * @method dispatchMethod
 * @for PHRAction
 * @param {string} methodName 调用这个方法的方法名，用于打印信息
 *		  {string} query api接口地址
 *		  {function} dispatch redux action dispatch
 *		  {boolean} isSuccessMsg 服务端正常响应是否提示消息
 *		  {string} type redux action dispatch type
 *		  {function} func 服务端响应后执行的方法
 *
 * @return {function} redux action dispatch function
 */
const dispatchMethod = (methodName, query, dispatch, isSuccessMsg, type, func) => {

	fetchInit.body = encodeURI(query)
		//fetchInit.body = query

	return fetch(postReqUrl, fetchInit)
		.then(response => response.json())
		.then((data) => {

			console.debug(methodName, "=>", "RESPONSE:", data);
			let status = data.status
			let resCode = status.resultCode
			let resMsg = status.resultMsg

			/*custom function execute*/
			typeof func == 'function' ? func() : null

			if (resCode < 0) {
				notify('warn', '警告' + '(' + resCode + ')', resMsg);
				console.warn("Oops, warn", resCode, resMsg)
			} else {
				/*server normal response execute*/
				if (isSuccessMsg)
					msg('success', resMsg)
			}
			dispatch({
				type,
				data
			})
		})
		.catch(e => {
			notify('error', fetchCatchMsg, e.stack.toString());
			console.error("Oops, error", e)
			dispatch({
				type: FETCH_ERROR
			})
		})
}

/*查询个人档案列表*/
export function getArchiveList(pageSize, pageNo) {

	let query = api.getArchiveList(pageSize, pageNo)

	return dispatch => dispatchMethod('getArchiveList', query, dispatch, false, GET_ARCHIVES, null)
}

/*保存个人基本信息档案*/
export function savePersonalDetail(data) {

	let query = api.savePersonalDetail(data)
	const hide = msg('loading', '正在保存中...', 30);

	return dispatch => dispatchMethod('savePersonalDetail', query, dispatch, true, SAVE_ARCHIVES, hide)
}

/*更新个人基本信息档案*/
export function updatePersonalDetail(data) {

	let query = api.updatePersonalDetail(data)
	const hide = msg('loading', '正在更新中...', 30);

	return dispatch => dispatchMethod('updatePersonalDetail', query, dispatch, true, SAVE_ARCHIVES, hide)
}

/*保存健康体检表*/
export function saveHealthMedical(data) {

	let query = api.saveHealthMedical(data)
	const hide = msg('loading', '正在保存中...', 30);

	return dispatch => dispatchMethod('saveHealthMedical', query, dispatch, true, SAVE_ARCHIVES, hide)
}

/*更新健康体检表*/
export function updateHealthMedical(data) {

	let query = api.updateHealthMedical(data)
	const hide = msg('loading', '正在更新中...', 30);

	return dispatch => dispatchMethod('updateHealthMedical', query, dispatch, true, SAVE_ARCHIVES, hide)
}

/*查询个人详细档案资料*/
export function queryPHR(id) {

	let query = api.queryPHR(id)

	return dispatch => dispatchMethod('queryPHR', query, dispatch, true, QUERY_PHR, null)
}

/*删除个人档案*/
export function deletePHR(ids) {

	let query = api.deletePHR(ids)

	return dispatch => dispatchMethod('deletePHR', query, dispatch, true, DELETE_PHR, null)
}

/*搜索档案*/
export function searchPHR(pageNo, pageSize, condition) {

	let query = api.searchPHR(pageNo, pageSize, condition)

	return dispatch => dispatchMethod('searchPHR', query, dispatch, true, SEARCH_PHR, null)
}

/*获取个人编号*/
export function getIndividualNumbe(grda_xzz, grda_xzz_fields) {

	let obj = {}
		//if (grda_xzz.length == grda_xzz_fields.length) {
	for (let index in grda_xzz_fields) {
		let field = grda_xzz_fields[index]
		obj[field] = grda_xzz[index]
	}
	/*} else {
		notify('error', fetchCatchMsg, 'error matching in getIndividualNumbe');
		throw Error('error matching in getIndividualNumbe')
	}*/
	let query = api.getIndividualNumbe(obj)

	return dispatch => dispatchMethod('getIndividualNumbe', query, dispatch, true, INDIVIDUAL_NUMBER, null)
}

/*改变新增/编辑状态*/
export function changeState() {
	return {
		type: STATE_CHANGE
	};
}

/*清除Store*/
export function clearStore() {
	return {
		type: CLEAR_STORE
	};
}

/*更改选中的体检表*/
export function changeGrdaJkzkSelectKey(selectKey) {
	return {
		type: CHANGE_GRDA_JKZK_SELKEY,
		selectKey,
	};
}