import {
	GET_ARCHIVES
} from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'
import * as api from '../api'

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
					console.warn("Oops, warn", resCode, resMsg)
				}
				dispatch({
					type: GET_ARCHIVES,
					data: data
				})
			})
			.catch(e => console.error("Oops, error", e))
	}
}