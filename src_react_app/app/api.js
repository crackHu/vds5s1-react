import {
	CONFIG
} from 'config'

const BASE_URL = CONFIG.baseUrl
const PROJECT_NAME = CONFIG.projectName

export const getReqUrl = `${BASE_URL}/${PROJECT_NAME}/ba/tmpl/boVdsRequest.jsp?data=`
export const postReqUrl = `${BASE_URL}/${PROJECT_NAME}/ba/tmpl/boCallMethod.jsp`

function PostQuery(din, fid, pid) {
	this.din = din
	this.fid = fid
	this.pid = pid
	PostQuery.prototype.serialize = function(methodName) {
		let query = JSON.stringify(this)
		console.debug(methodName, "=>", "URL:", postReqUrl, "QUERY:", query);
		return query;
	}
}

/*檔案列表*/
export function getArchiveList(pageNo, pageSize) {

	let postQuery = new PostQuery({
		page: pageNo,
		rows: pageSize
	}, 'pdSaveData', 'boPersonDoc')

	return postQuery.serialize('getArchiveList');
}

/*保存檔案*/
export function saveArchiveData(data) {

	let postQuery = new PostQuery(data, 'savePdData', 'boPersonDoc')
	return postQuery.serialize('saveArchiveData');
}

/*登陆*/
export function login(data) {

	let postQuery = new PostQuery({
		loginName: data.usr,
		loginPwd: data.pwd
	}, 'proLogin', 'boLogin')

	return postQuery.serialize('login');
}

/*查询个人详细档案资料*/
export function queryPHR(id) {

	let postQuery = new PostQuery({
		id
	}, 'getDataById', 'boPersonDoc')

	return postQuery.serialize('queryPHR');
}

/*删除个人档案*/
export function deletePHR(ids) {

	let postQuery = new PostQuery({
		ids
	}, 'deletePdData', 'boPersonDoc')

	return postQuery.serialize('deletePHR');
}

/*搜索档案*/
export function searchPHR(pageNo, pageSize, condition) {

	let postQuery = new PostQuery({
		page: pageNo,
		rows: pageSize,
		condition: condition
	}, 'getPdList', 'boPersonDoc')

	return postQuery.serialize('searchPHR');
}

/*获取个人编号*/
export function getIndividualNumbe(data) {

	let postQuery = new PostQuery(data, 'getGrbh', 'boPersonDoc')

	return postQuery.serialize('getIndividualNumbe');
}