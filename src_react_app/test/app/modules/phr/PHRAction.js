import {
	GET_ARCHIVES,
	SUBMIT_ARCHIVES,
	SAVE_ARCHIVES,
	SAVE_MASTER_ARCHIVES,
	UPDATE_ARCHIVES,
	UPDATE_MASTER_ARCHIVES,
	CHANGE_MASTERSAVED,
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
	DEL_STORE_LABELS,
	DEL_STORE_FD,
	IMPORT_PHR,
	EXPORT_PHR,
	PROGRESS,
	DOWNLOAD,
	RESIDENTBPFB,
	AREA_CONFIG,
	CHECK_IDCARD_RET
} from 'ActionTypes'
import fetch from 'isomorphic-fetch'
import * as api from 'api'
import {
	msg,
	notify,
	getDate,
	getFieldsObj,
	getDateTimestamp,
	randomUUID,
	parseParam,
	downFile,
} from 'utils'

const fetchCatchMsg = '内部错误'
const postReqUrl = api.postReqUrl
const fetchInit = {
	method: 'POST',
	/*cookie*/
	credentials: 'include',
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
 *		  {obj} dispatchObj redux action dispatch object
 *		  {function} func 服务端响应后执行的方法
 *
 * @return {function} redux action dispatch function
 */
const dispatchMethod = (methodName, query, dispatch, isSuccessMsg, dispatchObj, func, successCallback) => {

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
				notify('warn', `警告(${resCode})`, resMsg);
				console.warn("Oops, warn", resCode, resMsg)
			} else {
				/*server normal response execute*/
				if (isSuccessMsg) {
					msg('success', resMsg)
				}
				/*custom function execute*/
				typeof successCallback == 'function' ? successCallback(data.dout) : null
			}
			dispatch(Object.assign(dispatchObj, {
				data
			}))
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

const TIPS = {
	saveMsg: () => msg('loading', '正在保存...', 0),
	updateMsg: () => msg('loading', '正在更新...', 0),
	delMsg: () => msg('loading', '正在删除...', 0),

	saveLabel: () => msg('loading', '添加标签中...', 0),
	deleteLabel: () => msg('loading', '正在移除标签...', 0),

	import: () => msg('loading', '正在导入...', 0),
	export: () => msg('loading', '正在导出，请稍后', 0),

}

/*查询个人档案列表*/
export function getArchiveList(pageNo, pageSize) {

	let query = api.getArchiveList(pageNo, pageSize)
	let dispatchObj = {
		type: GET_ARCHIVES
	}
	return dispatch => dispatchMethod('getArchiveList', query, dispatch, false, dispatchObj, null)
}

/*保存个人基本信息档案*/
export function savePersonalDetail(data, ids) {

	let query = api.savePersonalDetail(data)
	let dispatchObj = {
		type: SAVE_MASTER_ARCHIVES,
		ids,
	}

	return dispatch => dispatchMethod('savePersonalDetail', query, dispatch, true, dispatchObj, TIPS.saveMsg())
}
/*更新个人基本信息档案*/
export function updatePersonalDetail(data) {

	let query = api.updatePersonalDetail(data)
	let dispatchObj = {
		type: UPDATE_MASTER_ARCHIVES
	}

	return dispatch => dispatchMethod('updatePersonalDetail', query, dispatch, true, dispatchObj, TIPS.updateMsg())
}
/*删除个人基本信息档案 @deprecated*/
export function deletePersonalDetail(data) {

	let query = api.deletePersonalDetail(data)
	let dispatchObj = {
		type: DELETE_ARCHIVES
	}
	return dispatch => dispatchMethod('deletePersonalDetail', query, dispatch, true, dispatchObj, TIPS.delMsg())
}

/*保存健康体检表*/
export function saveHealthMedical(key = 'grdaJkzk', data, ids) {

	let query = api.saveHealthMedical(data)
	let dispatchObj = {
		type: SAVE_ARCHIVES,
		key,
		ids,
	}

	return dispatch => dispatchMethod('saveHealthMedical', query, dispatch, true, dispatchObj, TIPS.saveMsg())
}
/*更新健康体检表*/
export function updateHealthMedical(key = 'grdaJkzk', data, ids) {

	let query = api.updateHealthMedical(data)
	let dispatchObj = {
		type: UPDATE_ARCHIVES,
		key,
		ids,
	}

	return dispatch => dispatchMethod('updateHealthMedical', query, dispatch, true, dispatchObj, TIPS.updateMsg())
}
/*删除健康体检表 @deprecated*/
export function deleteHealthMedical(data) {

	let query = api.deleteHealthMedical(data)
	let dispatchObj = {
		type: DELETE_ARCHIVES
	}
	return dispatch => dispatchMethod('deleteHealthMedical', query, dispatch, true, dispatchObj, TIPS.delMsg())
}

/*保存高血压专档*/
export function saveHypertension(key = 'gxyJxb', data, ids) {

	let query = api.saveHypertension(data)
	let dispatchObj = {
		type: SAVE_ARCHIVES,
		key,
		ids,
	}

	return dispatch => dispatchMethod('saveHypertension', query, dispatch, true, dispatchObj, TIPS.saveMsg())
}
/*更新高血压专档*/
export function updateHypertension(key = 'gxyJxb', data, ids) {

	let query = api.updateHypertension(data)
	let dispatchObj = {
		type: UPDATE_ARCHIVES,
		key,
		ids,
	}
	return dispatch => dispatchMethod('updateHypertension', query, dispatch, true, dispatchObj, TIPS.updateMsg())
}
/*删除高血压专档 @deprecated*/
export function deleteHypertension(data) {

	let query = api.deleteHypertension(data)
	let dispatchObj = {
		type: DELETE_ARCHIVES
	}
	return dispatch => dispatchMethod('deleteHypertension', query, dispatch, true, dispatchObj, TIPS.delMsg())
}

/*保存糖尿病专档*/
export function saveDiabetes(key = 'tnbSfjl', data, ids) {

	let query = api.saveDiabetes(data)
	let dispatchObj = {
		type: SAVE_ARCHIVES,
		key,
		ids,
	}

	return dispatch => dispatchMethod('saveDiabetes', query, dispatch, true, dispatchObj, TIPS.saveMsg())
}
/*更新糖尿病专档*/
export function updateDiabetes(key = 'tnbSfjl', data, ids) {

	let query = api.updateDiabetes(data)
	let dispatchObj = {
		type: UPDATE_ARCHIVES,
		key,
		ids,
	}
	return dispatch => dispatchMethod('updateDiabetes', query, dispatch, true, dispatchObj, TIPS.updateMsg())
}
/*删除糖尿病专档 @deprecated*/
export function deleteDiabetes(data) {

	let query = api.deleteDiabetes(data)
	let dispatchObj = {
		type: DELETE_ARCHIVES
	}
	return dispatch => dispatchMethod('deleteDiabetes', query, dispatch, true, dispatchObj, TIPS.delMsg())
}

/*保存老年人专档*/
export function saveAged(key = 'lnrSfb', data, ids) {

	let query = api.saveAged(data)
	let dispatchObj = {
		type: SAVE_ARCHIVES,
		key,
		ids,
	}

	return dispatch => dispatchMethod('saveAged', query, dispatch, true, dispatchObj, TIPS.saveMsg())
}
/*更新老年人专档*/
export function updateAged(key = 'lnrSfb', data, ids) {

	let query = api.updateAged(data)
	let dispatchObj = {
		type: UPDATE_ARCHIVES,
		key,
		ids,
	}
	return dispatch => dispatchMethod('updateAged', query, dispatch, true, dispatchObj, TIPS.updateMsg())
}
/*删除老年人专档 @deprecated*/
export function deleteAged(data) {

	let query = api.deleteAged(data)
	let dispatchObj = {
		type: DELETE_ARCHIVES
	}
	return dispatch => dispatchMethod('deleteAged', query, dispatch, true, dispatchObj, TIPS.delMsg())
}

/*添加档案标签*/
export function addLabel(grbh, labels) {

	let query = api.addLabel(grbh, labels)
	let dispatchObj = {
		type: ADD_LABEL
	}
	return dispatch => dispatchMethod('addLabel', query, dispatch, true, dispatchObj, TIPS.saveLabel())
}
/*删除档案标签*/
export function delLabel(grbh, labels) {

	let query = api.delLabel(grbh, labels)
	let dispatchObj = {
		type: DEL_LABEL
	}
	return dispatch => dispatchMethod('delLabel', query, dispatch, true, dispatchObj, TIPS.deleteLabel())
}
/*删除档案*/
export function delRecord(grbh, labels) {

	let query = api.delRecord(grbh, labels)
	let dispatchObj = {
		type: DEL_LABEL
	}
	return dispatch => dispatchMethod('delRecord', query, dispatch, true, dispatchObj, TIPS.delMsg())
}

/*查询个人详细档案资料*/
export function queryPHR(id) {

	let query = api.queryPHR(id)
	let dispatchObj = {
		type: QUERY_PHR
	}
	return dispatch => dispatchMethod('queryPHR', query, dispatch, false, dispatchObj, null)
}
/*删除个人档案*/
export function deletePHR(ids) {

	let query = api.deletePHR(ids)
	let dispatchObj = {
		type: DELETE_PHR
	}
	return dispatch => dispatchMethod('deletePHR', query, dispatch, true, dispatchObj, null)
}

/*搜索档案*/
export function searchPHR(pageNo, pageSize, condition) {

	let query = api.searchPHR(pageNo, pageSize, condition)
	let dispatchObj = {
		type: SEARCH_PHR
	}
	return dispatch => dispatchMethod('searchPHR', query, dispatch, false, dispatchObj, null)
}

/*获取个人编号*/
export function getIndividualNumbe(addr_arr, addr_fields) {

	let obj = {}
	for (let index in addr_fields) {
		let field = addr_fields[index]
		obj[field] = addr_arr[index]
	}
	let query = api.getIndividualNumbe(obj)
	let dispatchObj = {
		type: INDIVIDUAL_NUMBER
	}
	return dispatch => dispatchMethod('getIndividualNumbe', query, dispatch, false, dispatchObj, null)
}

/*下载 @servlet*/
export function download(data, fileName) {
	return dispatch =>
		fetch(
			`${api.download()}?${parseParam(data)}`
		).then(response => {
			/*@response: blob arrayBuffer formData json text*/
			return response.blob()
		}).then(
			(blob) => {
				console.log('download blob', blob)
				let blobSize
				if (blob && (blobSize = blob.size, blobSize != 0)) {

					downFile(blob, fileName);
					dispatch({
						type: DOWNLOAD,
						res: blobSize
					})
				} else {
					notify('error', fetchCatchMsg, `${data.filePath} 文件下载异常`);
				}
			}
		)
}

/*导入*/
export function importPHR(path) {

	let query = api.importPHR({
		path
	})
	let dispatchObj = {
		type: IMPORT_PHR
	}
	return dispatch => dispatchMethod('importPHR', query, dispatch, true, dispatchObj, TIPS.import())
}

/*导出*/
export function exportPHR(data) {

	let query = api.exportPHR(data)
	let dispatchObj = {
		type: EXPORT_PHR
	}
	return dispatch => dispatchMethod('exportPHR', query, dispatch, false, dispatchObj, TIPS.export())
}

/*导出进度*/
export function progress(data) {

	let query = api.progress(data)
	let dispatchObj = {
		type: PROGRESS,
		id: data.id,
	}
	return dispatch => dispatchMethod('progress', query, dispatch, false, dispatchObj, null)
}

export function getAreaConfig() {
	let query = api.getAreaConfig()
	let dispatchObj = {
		type: AREA_CONFIG,
	}
	return dispatch => dispatchMethod('getAreaConfig', query, dispatch, false, dispatchObj, null)
}

/*居民血压反馈*/
export function getResidentbpfbList(pageSize = 10, pageNo = 1, id) {

	let query = api.getResidentbpfbList(pageSize, pageNo, id)
	let dispatchObj = {
		type: RESIDENTBPFB,
	}
	return dispatch => dispatchMethod('getResidentbpfbList', query, dispatch, false, dispatchObj, null)
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
export function addObjItem(flag, recordKey, nextVisKey) {
	return {
		type: ADD_OBJ_ITEM,
		flag,
		recordKey,
		nextVisKey
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

/*删除store记录 key: 肿瘤病|残疾人|女性保健专档|孕产妇专档*/
export function delLabelStore(labels) {
	return {
		type: DEL_STORE_LABELS,
		labels
	}
}

/*删除store记录 key: gxyJxb|tnbSfjl|lnrSfb*/
export function delRecordStore(containKey, recordKey) {
	return {
		type: DEL_STORE_FD,
		containKey,
		recordKey
	}
}

export function checkIDCard(grbh, IDCode, build) {

	let query = api.checkIDCard(IDCode)
	let dispatchObj = {
		type: CHECK_IDCARD_RET,
	}
	const successCallback = (ret) => {
		if (ret.repeatFlag && ret.repeatFlag == '0') {
			const { data } = ret
			const msg = '系统存在身份证相同的档案'
			let desc = data.map((info, idx) => {
				if (info.grbh != grbh) {
					return build(`${idx+1}. ${info.name}(${info.grbh})`, idx)
				}
			})
			desc = desc.filter(value => !!value)
			if (desc.length > 0) {
				notify('warning', msg, desc, 10)
			}
		}
	}
	return dispatch => dispatchMethod('checkIDCard', query, dispatch, false, dispatchObj, null, successCallback)
}