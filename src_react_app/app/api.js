import {
	CONFIG
} from 'config'

const BASE_URL = CONFIG.baseUrl
const PROJECT_NAME = CONFIG.projectName

let postQuery = {
	din: {},
	pid: undefined,
	fid: undefined
}

export const getReqUrl = `${BASE_URL}/${PROJECT_NAME}/ba/tmpl/boVdsRequest.jsp?data=`
export const postReqUrl = `${BASE_URL}/${PROJECT_NAME}/ba/tmpl/boCallMethod.jsp`

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

	postQuery.din = data
	postQuery.din.grdaJbzl.grda_lrrq = '2016-09-30'
	postQuery.fid = 'savePdData'
	postQuery.pid = 'boPersonDoc'

	let query = JSON.stringify(postQuery)
	console.debug("saveArchiveData:", "URL:", postReqUrl, "QUERY:", query);
	return query;
}

/*登陆*/
export const login = (data) => {

	postQuery.din.loginName = data.usr
	postQuery.din.loginPwd = data.pwd
	postQuery.fid = 'proLogin'
	postQuery.pid = 'boLogin'

	let query = JSON.stringify(postQuery)
	console.debug("login:", "URL:", postReqUrl, "QUERY:", query);
	return query;
}

/*查询个人详细档案资料*/
export const queryPHR = (data) => {

	postQuery.din.grbh = data
	postQuery.fid = 'getDataById'
	postQuery.pid = 'boPersonDoc'

	let query = JSON.stringify(postQuery)
	console.debug("login:", "URL:", postReqUrl, "QUERY:", query);
	return query;
}

/*删除个人档案*/
export const deletePHR = (data) => {

	postQuery.din.ids = data
	postQuery.fid = 'deletePdData'
	postQuery.pid = 'boPersonDoc'

	let query = JSON.stringify(postQuery)
	console.debug("login:", "URL:", postReqUrl, "QUERY:", query);
	return query;
}