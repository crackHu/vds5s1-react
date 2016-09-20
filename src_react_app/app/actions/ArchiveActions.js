import {
	GET_ARCHIVES
} from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'
import * as api from '../api'
import {
	msg,
	notify
} from '../utils/utils'

export function getArchiveList() {
	return dispatch => {
		const init = {
			cache: 'no-cache'
		}
		fetch(api.getArchiveList(), init)
			.then(response => response.json())
			.then((data) => {
				let resCode = data._c
				let resMsg = data._m
				if (resCode != 1) {
					notify('warn', '警告', resMsg);
					console.warn("Oops, warn", resCode, resMsg)
				}
				dispatch({
					type: GET_ARCHIVES,
					data: data
				})
			})
			.catch(e => {
				notify('error', '错误', '获取档案列表失败');
				console.error("Oops, error", e)
			})
	}
}