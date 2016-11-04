import {
  GET_AGE_PERCENT,
  GET_JQJDS
} from 'ActionTypes'
import fetch from 'isomorphic-fetch'
import {
  API_getAgePercent,
  API_getJqjds
} from 'api'

export function getAgePercent() {

  return dispatch =>
    fetch(
      API_getAgePercent()
    ).then(
      response => response.json()
    ).then(
      (json) => {
        if (json.status.resultCode != 1) {
          return alert('加载失败')
        }
        dispatch({
          type: GET_AGE_PERCENT,
          res: json.dout
        })
      }
    )
}

export function getJqjds() {

  return dispatch =>
    fetch(
      API_getJqjds()
    ).then(
      response => response.json()
    ).then(
      (json) => {
        if (json.status.resultCode != 1) {
          return alert('加载失败')
        }
        dispatch({
          type: GET_JQJDS,
          res: json.dout
        })
      }
    )
}