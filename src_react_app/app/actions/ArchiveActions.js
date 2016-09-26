import {
	GET_ARCHIVES,
	SUBMIT_ARCHIVES,
	SAVE_ARCHIVES
} from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'
import * as api from '../api'
import {
	msg,
	notify,
	getDate
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
				notify('error', '错误', '网络错误');
				console.error("Oops, error", e)
			})
	}
}

export function passArchivesFormData(formData) {
	return dispatch => {
		console.log("passArchivesFormData receive ", formData);
		dispatch({
			type: SUBMIT_ARCHIVES,
			data: true
		})
	}
}

export function saveArchiveData(data) {
	return dispatch => {
		const hide = msg('loading', '正在保存中...', 110);
		fetch(api.saveArchiveData(data))
			.then(response => response.json())
			.then((data) => {
				let resCode = data.resultCode
				let resMsg = data.resultMsg
				hide()
				if (resCode != 1) {
					msg('warn', '保存失败')
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
				notify('error', '错误', '网络错误');
				console.error("Oops, error", e)
			})
	}
}