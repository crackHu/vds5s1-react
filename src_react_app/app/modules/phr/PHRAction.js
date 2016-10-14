import {
	GET_ARCHIVES,
	SUBMIT_ARCHIVES,
	SAVE_ARCHIVES,
	LOGIN,
	QUERY_PHR,
	DELETE_PHR,
	FIELDS_CHANGE,
	SEARCH_PHR,
	INDIVIDUAL_NUMBER,
} from 'ActionTypes'
import fetch from 'isomorphic-fetch'
import * as api from 'api'
import {
	msg,
	notify,
	getDate,
	getFieldsObj,
	getDateTimestamp,
} from 'utils'

const fetchCatchMsg = '内部错误'
const postReqUrl = api.postReqUrl
const fetchInit = {
	method: 'POST',
	headers: {
		'Accept': 'application/json, text/plain, */*',
		'Content-Type': 'x-www-form-urlencoded',
		'cache': "no-store"
	},
	body: undefined
}

/*查询个人档案列表*/
export function getArchiveList(pageSize, pageNo) {

	let query = api.getArchiveList(pageSize, pageNo)
	fetchInit.body = encodeURI(query)

	return dispatch => {
		fetch(postReqUrl, fetchInit)
			.then(response => response.json())
			.then((data) => {
				console.debug('getArchiveList', "=>", "RES:", data);
				let resCode = data.status.resultCode
				let resMsg = data.status.resultMsg

				if (resCode < 0) {
					notify('warn', '警告' + '(' + resCode + ')', resMsg);
					console.warn("Oops, warn", resCode, resMsg)
				}
				dispatch({
					type: GET_ARCHIVES,
					data: data
				})
			})
			.catch(e => {
				notify('error', '错误', fetchCatchMsg);
				console.error("Oops, error", e)
			})
	}
}

/*保存个人档案*/
export function saveArchiveData(data, fields_state) {

	console.log("saveArchiveData data", data)
	let query = api.saveArchiveData(data)
	fetchInit.body = encodeURI(query)

	return dispatch => {
		const hide = msg('loading', '正在保存中...', 110);
		fetch(postReqUrl, fetchInit)
			.then(response => response.json())
			.then((data) => {
				console.debug('saveArchiveData', "=>", "RESPONSE:", data);
				let resCode = data.status.resultCode
				let resMsg = data.status.resultMsg
				hide()

				if (resCode < 0) {
					msg('warn', '警告' + '(' + resCode + ')', resMsg)
					console.warn("Oops, warn", resCode, resMsg)
				} else {
					msg('success', '保存成功')
				}
				dispatch({
					type: SAVE_ARCHIVES,
					data: data
				})
			})
			.catch(e => {
				hide()
				notify('error', '错误', fetchCatchMsg);
				console.error("Oops, error", e)
			})
	}
}

/*查询个人详细档案资料*/
export function queryPHR(data) {

	let query = api.queryPHR(data)
	fetchInit.body = encodeURI(query)

	return dispatch => {
		fetch(postReqUrl, fetchInit)
			.then(response => response.json())
			.then((data) => {
				console.debug('queryPHR', "=>", "RESPONSE:", data);
				let resCode = data.status.resultCode
				let resMsg = data.status.resultMsg

				if (resCode < 0) {
					notify('warn', '警告' + '(' + resCode + ')', resMsg);
					console.warn("Oops, warn", resCode, resMsg)
				} else {
					dispatch({
						type: QUERY_PHR,
						data: data
					})
				}
				console.log('queryPHR', data)
			})
			.catch(e => {
				notify('error', '错误', fetchCatchMsg);
				console.error("Oops, error", e)
			})
	}
}

/*删除个人档案*/
export function deletePHR(data) {

	let query = api.deletePHR(data)
	fetchInit.body = encodeURI(query)

	return dispatch => {
		fetch(postReqUrl, fetchInit)
			.then(response => response.json())
			.then((data) => {
				let resCode = data.status.resultCode
				let resMsg = data.status.resultMsg

				if (resCode < 0) {
					notify('warn', '警告' + '(' + resCode + ')', resMsg);
					console.warn("Oops, warn", resCode, resMsg)
				} else {
					msg("success", resMsg, 1)
				}
				dispatch({
					type: DELETE_PHR,
					data: data
				})
			})
			.catch(e => {
				notify('error', '错误', fetchCatchMsg);
				console.error("Oops, error", e)
			})
	}
}

/*搜索档案*/
export function searchPHR(pageNo, pageSize, condition) {

	let query = api.searchPHR(pageNo, pageSize, condition)
	fetchInit.body = encodeURI(query)

	return dispatch => {
		fetch(postReqUrl, fetchInit)
			.then(response => response.json())
			.then((data) => {
				console.debug('searchPHR', "=>", "RES:", data);
				let resCode = data.status.resultCode
				let resMsg = data.status.resultMsg

				if (resCode < 0) {
					notify('warn', '警告' + '(' + resCode + ')', resMsg);
					console.warn("Oops, warn", resCode, resMsg)
				} else {
					msg("success", resMsg, 1)
				}
				dispatch({
					type: SEARCH_PHR,
					data: data
				})
			})
			.catch(e => {
				notify('error', '错误', fetchCatchMsg);
				console.error("Oops, error", e)
			})
	}
}

/*获取个人编号*/
export function getIndividualNumbe(grda_xzz, grda_xzz_fields) {

	let obj = {}
	if (grda_xzz.length == grda_xzz_fields.length) {
		for (let index in grda_xzz_fields) {
			let field = grda_xzz_fields[index]
			obj[field] = grda_xzz[index]
		}
	} else {
		notify('error', 'error matching in getIndividualNumbe', fetchCatchMsg);
		throw Error('error matching in getIndividualNumbe')
	}
	let query = api.getIndividualNumbe(obj)
	fetchInit.body = encodeURI(query)

	return dispatch => {
		fetch(postReqUrl, fetchInit)
			.then(response => response.json())
			.then((data) => {
				console.debug('getIndividualNumbe', "=>", "RES:", data);
				let resCode = data.status.resultCode
				let resMsg = data.status.resultMsg

				if (resCode < 0) {
					notify('warn', '警告' + '(' + resCode + ')', resMsg);
					console.warn("Oops, warn", resCode, resMsg)
				} else {
					//msg("success", resMsg, 1)
				}
				dispatch({
					type: INDIVIDUAL_NUMBER,
					data: data
				})
			})
			.catch(e => {
				notify('error', '错误', fetchCatchMsg);
				console.error("Oops, error", e)
			})
	}
}