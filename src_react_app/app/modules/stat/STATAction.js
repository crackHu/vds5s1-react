import {
  GET_AGE_PERCENT,
  GET_JQJDS,
  QUERY_ADD,
  QUERY_UPDATE
} from 'ActionTypes'
import fetch from 'isomorphic-fetch'
import {
  API_getAgePercent,
  API_getJqjds,
  API_queryForAdd,
  API_queryForUpdate
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

export function queryForAdd(page, size) {

  return dispatch =>
    fetch(
      API_queryForAdd(page, size)
    ).then(
      response => response.json()
    ).then(
      (json) => {
        if (json.status.resultCode != 1) {
          return alert('加载失败')
        }
        dispatch({
          type: QUERY_ADD,
          res: json.dout,
          total: json.total
        })
      }
    )
}

export function queryForUpdate(page, size) {

  return dispatch =>
    fetch(
      API_queryForUpdate(page, size)
    ).then(
      response => response.json()
    ).then(
      (json) => {
        if (json.status.resultCode != 1) {
          return alert('加载失败')
        }
        dispatch({
          type: QUERY_UPDATE,
          res: json.dout,
          total: json.total
        })
      }
    )
}