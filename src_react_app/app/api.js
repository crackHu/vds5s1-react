import {
	CONFIG
} from 'config'

export const getReqUrl = `${CONFIG.baseUrl}/${CONFIG.projectName}/ba/tmpl/boVdsRequest.jsp?data=`
export const postReqUrl = `${CONFIG.baseUrl}/${CONFIG.projectName}/ba/tmpl/boCallMethod.jsp`
let postQuery = {
	din: {},
	pid: undefined,
	fid: undefined
}

/*檔案列表*/
export const getArchiveList = (pageNo, pageSize) => {

	postQuery.din = {
		page: pageNo,
		rows: pageSize
	}
	postQuery.pid = 'boPersonDoc'
	postQuery.fid = 'pdSaveData'

	let query = JSON.stringify(postQuery)
	console.debug("getArchiveList:", "URL:", postReqUrl, "QUERY:", query);
	return query;
}

/*保存檔案*/
export const saveArchiveData = (data) => {

	postQuery.din.grdaJbzl = data
	postQuery.din.grdaJbzl.grda_lrrq = '2016-09-30'
	postQuery.din.grdaJws = null
	postQuery.din.grdaJzs = null
	postQuery.pid = 'boPersonDoc'
	postQuery.fid = 'savePdData'

	let query = JSON.stringify(postQuery)
	console.debug("saveArchiveData:", "URL:", postReqUrl, "QUERY:", query);
	return query;
}