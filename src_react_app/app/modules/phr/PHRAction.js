import {
	GET_ARCHIVES,
	SUBMIT_ARCHIVES,
	SAVE_ARCHIVES,
	LOGIN,
	QUERYPHR,
	DELETEPHR
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
				let resCode = data.status.resultCode
				let resMsg = data.status.resultMsg
				hide()

				if (resCode < 0) {
					msg('warn', '警告' + '(' + resCode + ')')
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
				let resCode = data.status.resultCode
				let resMsg = data.status.resultMsg

				if (resCode < 0) {
					notify('warn', '警告' + '(' + resCode + ')', resMsg);
					console.warn("Oops, warn", resCode, resMsg)
				}
				dispatch({
					type: QUERYPHR,
					data: data
				})
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
					type: DELETEPHR,
					data: data
				})
			})
			.catch(e => {
				notify('error', '错误', fetchCatchMsg);
				console.error("Oops, error", e)
			})
	}
}