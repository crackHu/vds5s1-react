import {
	config
} from 'config'

export const getReqUrl = `${config.baseUrl}/${config.projectName}/ba/tmpl/boVdsRequest.jsp?data=`
export const postReqUrl = `${config.baseUrl}/${config.projectName}/ba/tmpl/boCallMethod.jsp`
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

	const query = {
		din: data,
		pid: "boVdsUnified",
		fid: "saveArchiveData"
	}
	const url = reqUrl + JSON.stringify(query);
	console.debug("saveArchiveData:" + url);
	return url;

	postQuery.din = {
		page: pageNo,
		rows: pageSize
	}
	postQuery.pid = 'boPersonDoc'
	postQuery.fid = 'savePdData'

	let query = JSON.stringify(postQuery)
	console.debug("getArchiveList:", "URL:", postReqUrl, "QUERY:", query);
	return query;
}