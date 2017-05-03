const __DEV__ = process.env.NODE_ENV === 'development'
const APP = {
	// base: 'http://172.16.1.127:8880',
	base: 'http://172.16.2.121',
	pro: 'agg',
	getUrl: function() {
		// return `${__DEV__ ? this.base : ''}/${this.pro}`
		return `${__DEV__ ? this.base : 'http://172.16.2.121'}/${this.pro}`
	}
}
const DEFAULT_PAGING_SORT = {
	current: 1,
	pageSize: 10,
	// sortField: 'id',
	// sortOrder: 'desc'
}
const urlEncode = (param, key, encode) => {
  if(param==null) return '';
  var paramStr = '';
  var t = typeof (param);
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
};
const initPagingSortParam = (param = {}, paging_sort = DEFAULT_PAGING_SORT) => {
	console.debug(`initParam => param: ${JSON.stringify(param)} paging_sort: ${JSON.stringify(paging_sort)}`)
	let {page, current, size, pageSize, sort, sortField, sortOrder} = paging_sort
	paging_sort['page'] = page || page === 0 ? page : current - 1
	paging_sort['size'] = size || size === 0 ? size : pageSize
	if (sortField && sortOrder) {
		paging_sort['sort'] = `${sortField} ${sortOrder}`
	} else {
		paging_sort['sort'] = sort
	}
	console.debug(`initParam => form`, param, paging_sort)
	delete paging_sort['current']
	delete paging_sort['pageSize']
	delete paging_sort['sortField']
	delete paging_sort['sortOrder']
	Object.assign(param, DEFAULT_PAGING_SORT, paging_sort)
	return param
}
const ApiUrl = (base, type = 'GET', param = null, methodName = 'API') => {
	const url = base.startsWith('http://') || base.startsWith('https://') ? base : `${APP.getUrl()}/${base}`
	console.debug(`${methodName}[${type}] => URL: ${url} PARAM: ${JSON.stringify(param)}`)
	return type === 'GET' ? `${url}?${urlEncode(param)}` : { url, param }
}

// api
export const queryMasss = (type = 'GET', param, pagin_sort) => {
	return ApiUrl('jbzl/findByPage', type, initPagingSortParam(param, pagin_sort), 'queryMasss')
}
export const statisticsMasss = (type = 'GET', param) => {
	return ApiUrl('phr/findDataByUsId', type, param, 'statisticsMasss')
}
export const queryArticle = (type = 'GET', param, pagin_sort) => {
	const url = 'http://120.26.46.98/medical_N/article/findByHospital'
	return ApiUrl(url, type, initPagingSortParam(param, pagin_sort), 'queryArticle')
}
export const querySituation = (type = 'GET', param, pagin_sort) => {
	return ApiUrl('task/findByPage', type, initPagingSortParam(param, pagin_sort), 'querySituation')
}
export const querySituationDetail = (type = 'GET', param, pagin_sort) => {
	return ApiUrl('info/getInfoByTaskId', type, initPagingSortParam(param, pagin_sort), 'querySituation')
}
export const sendArticle = (type = 'GET', param) => {
	return ApiUrl('hide/send', type, param, 'querySituation')
}