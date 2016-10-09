import {
	LOGIN
} from '../../constants/ActionTypes'
import fetch from 'isomorphic-fetch'
import * as api from '../../api'
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

export function login(data) {

	let query = api.login(data)
	fetchInit.body = encodeURI(query)

	return dispatch => {
		fetch(postReqUrl, fetchInit)
			.then(response => response.json())
			.then((data) => {
				let resCode = data.status.resultCode
				let resMsg = data.status.resultMsg
				data.status.timestamp = Date.now()

				if (resCode < 0) {
					notify('warn', '警告' + '(' + resCode + ')', resMsg);
					console.warn("Oops, warn", resCode, resMsg)
				}
				dispatch({
					type: LOGIN,
					data: data
				})
			})
			.catch(e => {
				notify('error', '错误', fetchCatchMsg);
				console.error("Oops, error", e)
			})
	}
}