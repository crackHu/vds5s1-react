import { get, post } from './fetch'
import * as Api from './api'
import { msg } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_MASSS = 'GET_MASSS'
export const STATISTICS_MASSS = 'STATISTICS_MASSS'
export const GET_ARTICLE = 'GET_ARTICLE'
export const GET_SITUATION = 'GET_SITUATION'
export const GET_SITUATION_DETAIL = 'GET_SITUATION_DETAIL'
export const ROW_SELECTED = 'ROW_SELECTED'
export const CLEAR_ROW_SELECTED = 'CLEAR_ROW_SELECTED'
export const SEND_ARTICLE = 'SEND_ARTICLE'

// ------------------------------------
// Actions
// ------------------------------------
export const queryMasss = (param, pagin_sort) => {
  return (dispatch, getState) => {
    let url = Api.queryMasss('GET', param, pagin_sort)
    get(url).then(data => {
      dispatch({
        type: GET_MASSS,
        data
      })
    })
  }
}

export const statisticsMasss = (param) => {
  return (dispatch, getState) => {
    let url = Api.statisticsMasss('GET', param)
    get(url).then(data => {
      dispatch({
        type: STATISTICS_MASSS,
        data
      })
    })
  }
}

export const queryArticle = (param = {}, pagin_sort) => {
  param = {
    ...param,
    id: localStorage.hid
  }
  return (dispatch, getState) => {
    let url = Api.queryArticle('GET', param, pagin_sort)
    get(url).then(data => {
      dispatch({
        type: GET_ARTICLE,
        data
      })
    })
  }
}

export const querySituation = (param, pagin_sort) => {
  return (dispatch, getState) => {
    let url = Api.querySituation('GET', param, pagin_sort)
    get(url).then(data => {
      dispatch({
        type: GET_SITUATION,
        data
      })
    })
  }
}

export const querySituationDetail = (param, pagin_sort) => {
  return (dispatch, getState) => {
    let url = Api.querySituationDetail('GET', param, pagin_sort)
    get(url).then(data => {
      dispatch({
        type: GET_SITUATION_DETAIL,
        data
      })
    })
  }
}

export const onSelectChange = (ids, flag) => {
  return (dispatch, getState) => {
    dispatch({
      type: ROW_SELECTED,
      ids,
      flag
    })
  }
}

export const clearSelectChange = (flag) => {
  return (dispatch, getState) => {
    dispatch({
      type: CLEAR_ROW_SELECTED,
      flag
    })
  }
}

export const sendArticle = (param) => {
  return (dispatch, getState) => {
    let url = Api.sendArticle('GET', param)
    get(url).then(data => {
      msg('success', '发送成功啦')
      dispatch({
        type: SEND_ARTICLE,
        data
      })
    })
  }
}

export const actions = {
  queryMasss,
  statisticsMasss,
  queryArticle,
  querySituation,
  querySituationDetail,
  onSelectChange,
  clearSelectChange,
  sendArticle
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_MASSS]    : (state, action) => {
    return {
      ...state,
      masss_list: action.data
    } 
  },
  [STATISTICS_MASSS]  : (state, action) => {
    return {
      ...state,
      statistics: action.data
    }
  },
  [GET_ARTICLE]  : (state, action) => {
    return {
      ...state,
      article_list: action.data
    }
  },
  [GET_SITUATION] : (state, action) => {
    return {
      ...state,
      situation_list: action.data
    }
  },
  [GET_SITUATION_DETAIL] : (state, action) => {
    return {
      ...state,
      situationDetail_list: action.data
    }
  },
  [ROW_SELECTED] : (state, action) => {
    return {
      ...state,
      [`${action.flag}_selectedRowKeys`]: action.ids
    }
  },
  [CLEAR_ROW_SELECTED] : (state, action) => {
    return {
      ...state,
      [`${action.flag}_selectedRowKeys`]: []
    }
  },
  [SEND_ARTICLE] : (state, action) => {
    return {
      ...state,
      sendArticle_resp: action.ids
    }
  },

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function massReducer (state = initialState, action) {
  console.log('massReducer ->', state, action)
  const handler = ACTION_HANDLERS[action.type]
 
  return handler ? handler(state, action) : state
}
