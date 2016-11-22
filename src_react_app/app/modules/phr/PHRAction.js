import {
	GET_ARCHIVES,
	SUBMIT_ARCHIVES,
	SAVE_ARCHIVES,
	SAVE_MASTER_ARCHIVES,
	CHANGE_MASTERSAVED,
	UPDATE_ARCHIVES,
	DELETE_ARCHIVES,
	LOGIN,
	QUERY_PHR,
	DELETE_PHR,
	FIELDS_CHANGE,
	SEARCH_PHR,
	INDIVIDUAL_NUMBER,
	STATE_CHANGE,
	CLEAR_STORE,
	GET_GRDA_JKZK,
	CHANGE_ARRTABLE_SELKEY,
	FETCH_ERROR,
	CHANGE_SUBMIT_LOAD,
	CHANGE_LIST_LOAD,
	CHANGE_SPIN,
	ADD_ITEM,
	ADD_SON_ITEM,
	REMOVE_ITEM,
	REMOVE_SON_ITEM,
	SELECT_ROW_KEY,
	SELECT_SON_ROW_KEY,
	IS_UPDATE,
	ADD_OBJ_ITEM,
	ADD_LABEL,
	DEL_LABEL,
	DEL_STORE_FD,
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
			typeof func == 'function' ? func() : null
			console.error("Oops, error", e)
			dispatch({
				type: FETCH_ERROR
			})
		})
}

const saveMsg = function() {
	return msg('loading', '正在保存...', 30)
}
const updateMsg = function() {
	return msg('loading', '正在更新...', 30)
}
const delMsg = function() {
	return msg('loading', '正在删除...', 30)
}

const saveLabel = function() {
	return msg('loading', '添加标签中...', 30)
}
const deleteLabel = function() {
	return msg('loading', '正在移除标签...', 30)
}

/*查询个人档案列表*/
export function getArchiveList(pageNo, pageSize) {

	let query = api.getArchiveList(pageNo, pageSize)

	return dispatch => dispatchMethod('getArchiveList', query, dispatch, false, GET_ARCHIVES, null)
}

/*保存个人基本信息档案*/
export function savePersonalDetail(data) {

	let query = api.savePersonalDetail(data)

	return dispatch => dispatchMethod('savePersonalDetail', query, dispatch, true, SAVE_MASTER_ARCHIVES, saveMsg())
}
/*更新个人基本信息档案*/
export function updatePersonalDetail(data) {

	let query = api.updatePersonalDetail(data)

	return dispatch => dispatchMethod('updatePersonalDetail', query, dispatch, true, UPDATE_ARCHIVES, updateMsg())
}
/*删除个人基本信息档案 @deprecated*/
export function deletePersonalDetail(data) {

	let query = api.deletePersonalDetail(data)

	return dispatch => dispatchMethod('deletePersonalDetail', query, dispatch, true, DELETE_ARCHIVES, delMsg())
}

/*保存健康体检表*/
export function saveHealthMedical(data) {

	let query = api.saveHealthMedical(data)

	return dispatch => dispatchMethod('saveHealthMedical', query, dispatch, true, SAVE_ARCHIVES, saveMsg())
}
/*更新健康体检表*/
export function updateHealthMedical(data) {

	let query = api.updateHealthMedical(data)

	return dispatch => dispatchMethod('updateHealthMedical', query, dispatch, true, UPDATE_ARCHIVES, updateMsg())
}
/*删除健康体检表 @deprecated*/
export function deleteHealthMedical(data) {

	let query = api.deleteHealthMedical(data)

	return dispatch => dispatchMethod('deleteHealthMedical', query, dispatch, true, DELETE_ARCHIVES, delMsg())
}

/*保存高血压专档*/
export function saveHypertension(data) {

	let query = api.saveHypertension(data)

	return dispatch => dispatchMethod('saveHypertension', query, dispatch, true, SAVE_ARCHIVES, saveMsg())
}
/*更新高血压专档*/
export function updateHypertension(data) {

	let query = api.updateHypertension(data)

	return dispatch => dispatchMethod('updateHypertension', query, dispatch, true, UPDATE_ARCHIVES, updateMsg())
}
/*删除高血压专档 @deprecated*/
export function deleteHypertension(data) {

	let query = api.deleteHypertension(data)

	return dispatch => dispatchMethod('deleteHypertension', query, dispatch, true, DELETE_ARCHIVES, delMsg())
}

/*保存糖尿病专档*/
export function saveDiabetes(data) {

	let query = api.saveDiabetes(data)

	return dispatch => dispatchMethod('saveDiabetes', query, dispatch, true, SAVE_ARCHIVES, saveMsg())
}
/*更新糖尿病专档*/
export function updateDiabetes(data) {

	let query = api.updateDiabetes(data)

	return dispatch => dispatchMethod('updateDiabetes', query, dispatch, true, UPDATE_ARCHIVES, updateMsg())
}
/*删除糖尿病专档 @deprecated*/
export function deleteDiabetes(data) {

	let query = api.deleteDiabetes(data)

	return dispatch => dispatchMethod('deleteDiabetes', query, dispatch, true, DELETE_ARCHIVES, delMsg())
}

/*保存老年人专档*/
export function saveAged(data) {

	let query = api.saveAged(data)

	return dispatch => dispatchMethod('saveAged', query, dispatch, true, SAVE_ARCHIVES, saveMsg())
}
/*更新老年人专档*/
export function updateAged(data) {

	let query = api.updateAged(data)

	return dispatch => dispatchMethod('updateAged', query, dispatch, true, UPDATE_ARCHIVES, updateMsg())
}
/*删除老年人专档 @deprecated*/
export function deleteAged(data) {

	let query = api.deleteAged(data)

	return dispatch => dispatchMethod('deleteAged', query, dispatch, true, DELETE_ARCHIVES, delMsg())
}

/*添加档案标签*/
export function addLabel(grbh, labels) {

	let query = api.addLabel(grbh, labels)

	return dispatch => dispatchMethod('addLabel', query, dispatch, true, ADD_LABEL, saveLabel())
}
/*删除档案标签*/
export function delLabel(grbh, labels) {

	let query = api.delLabel(grbh, labels)

	return dispatch => dispatchMethod('delLabel', query, dispatch, true, DEL_LABEL, deleteLabel())
}
/*删除档案*/
export function deleteRecode(grbh, labels) {

	let query = api.deleteRecode(grbh, labels)

	return dispatch => dispatchMethod('deleteRecode', query, dispatch, true, DEL_LABEL, delMsg())
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

	return dispatch => dispatchMethod('searchPHR', query, dispatch, false, SEARCH_PHR, null)
}

/*获取个人编号*/
export function getIndividualNumbe(addr_arr, addr_fields) {

	let obj = {}
	for (let index in addr_fields) {
		let field = addr_fields[index]
		obj[field] = addr_arr[index]
	}
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
export function clearStore(flag) {
	return {
		type: CLEAR_STORE,
		flag
	};
}

/*更改选中的体检表*/
export function changeArrTableSelectKey(flag, selectKey) {
	return {
		type: CHANGE_ARRTABLE_SELKEY,
		flag,
		selectKey,
	};
}

/*关闭提交状态*/
export function changeSubmitLoad(flag) {
	return {
		type: CHANGE_SUBMIT_LOAD,
		flag
	};
}

/*关闭列表查询状态*/
export function changeListLoad(flag) {
	return {
		type: CHANGE_LIST_LOAD,
		flag
	};
}

/*切换加载状态*/
export function changeSpin(flag) {
	return {
		type: CHANGE_SPIN,
		flag
	};
}

/*修改主表是否保存成功表示*/
export function changeMasterSaved(flag) {
	return {
		type: CHANGE_MASTERSAVED,
		flag
	}
}

// ------ 子表组件状态的一些操作 ------ //
export function addItem(flag) {
	return {
		type: ADD_ITEM,
		flag
	};
}
export function addSonItem(pFlag, sFlag) {
	return {
		type: ADD_SON_ITEM,
		pFlag,
		sFlag
	};
}
export function addObjItem(flag, recordKey) {
	return {
		type: ADD_OBJ_ITEM,
		flag,
		recordKey
	};
}

export function removeItem(selectedRowKeys, flag) {
	return {
		type: REMOVE_ITEM,
		selectedRowKeys,
		flag
	};
}

export function removeSonItem(selectedRowKeys, sonKey, parentKey) {
	return {
		type: REMOVE_SON_ITEM,
		selectedRowKeys,
		sonKey,
		parentKey
	};
}

export function onSelectChange(selectedRowKeys, selectedRows, flag) {
	return {
		type: SELECT_ROW_KEY,
		selectedRowKeys,
		flag
	};
}

export function onSelectSonChange(selectedRowKeys, selectedRows, sonKey, parentKey) {
	return {
		type: SELECT_SON_ROW_KEY,
		selectedRowKeys,
		sonKey,
		parentKey
	};
}

/*删除store记录 key: gxyJxb|tnbSfjl|lnrSfb*/
export function deleteRecodeStore(key) {
	return {
		type: DEL_STORE_FD,
		key
	}
}