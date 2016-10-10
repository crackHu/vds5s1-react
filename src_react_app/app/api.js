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

	postQuery.pid = 'boPersonDoc'
	postQuery.fid = 'savePdData'

	let query = JSON.stringify(postQuery)
	console.debug("saveArchiveData:", "URL:", postReqUrl, "QUERY:", query);
	return query;
}

/*登陆*/
export const login = (data) => {

	postQuery.din.loginName = data.usr
	postQuery.din.loginPwd = data.pwd
	postQuery.pid = 'boLogin'
	postQuery.fid = 'proLogin'

	let query = JSON.stringify(postQuery)
	console.debug("login:", "URL:", postReqUrl, "QUERY:", query);
	return query;
}