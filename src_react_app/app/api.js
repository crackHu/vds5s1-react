import {
	CONFIG
} from 'config'

const BASE_URL = CONFIG.baseUrl
const PROJECT_NAME = CONFIG.projectName

export const reqUrl = `${BASE_URL}/${PROJECT_NAME}`
export const getReqUrl = `${reqUrl}/ba/tmpl/boVdsRequest.jsp?data=`
export const postReqUrl = `${reqUrl}/ba/tmpl/boCallMethod.jsp`

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

/*保存个人基本信息表*/
export function savePersonalDetail(data) {

	let postQuery = new PostQuery(data, 'savePdData', 'boPersonDoc')
	return postQuery.serialize('savePersonalDetail');
}
/*更新个人基本信息表*/
export function updatePersonalDetail(data) {

	let postQuery = new PostQuery(data, 'updatePdData', 'boPersonDoc')
	return postQuery.serialize('updatePersonalDetail');
}
/*删除个人基本信息表 @deprecated*/
export function deletePersonalDetail(data) {

	let postQuery = new PostQuery(data, 'deletePdData', 'boPersonDoc')
	return postQuery.serialize('deletePersonalDetail');
}

/*保存健康体检表*/
export function saveHealthMedical(data) {

	let postQuery = new PostQuery(data, 'heathSaveData', 'boPersonDoc')
	return postQuery.serialize('saveHealthMedical');
}
/*更新健康体检表*/
export function updateHealthMedical(data) {

	let postQuery = new PostQuery(data, 'heathUpdateData', 'boPersonDoc')
	return postQuery.serialize('updateHealthMedical');
}
/*删除健康体检表 @deprecated*/
export function deleteHealthMedical(data) {

	let postQuery = new PostQuery(data, 'heathDeleteData', 'boPersonDoc')
	return postQuery.serialize('deleteHealthMedical');
}

/*保存高血压专档*/
export function saveHypertension(data) {

	let postQuery = new PostQuery(data, 'gxySaveData', 'boPersonDoc')
	return postQuery.serialize('saveHypertension');
}
/*更新高血压专档*/
export function updateHypertension(data) {

	let postQuery = new PostQuery(data, 'gxyUpdateData', 'boPersonDoc')
	return postQuery.serialize('updateHypertension');
}
/*删除高血压专档 @deprecated*/
export function deleteHypertension(data) {

	let postQuery = new PostQuery(data, 'gxyDeteleData', 'boPersonDoc')
	return postQuery.serialize('deleteHypertension');
}

/*保存糖尿病专档*/
export function saveDiabetes(data) {

	let postQuery = new PostQuery(data, 'saveTnbData', 'boPersonDoc')
	return postQuery.serialize('saveDiabetes');
}
/*更新糖尿病专档*/
export function updateDiabetes(data) {

	let postQuery = new PostQuery(data, 'updateTnbData', 'boPersonDoc')
	return postQuery.serialize('updateDiabetes');
}
/*删除糖尿病专档 @deprecated*/
export function deleteDiabetes(data) {

	let postQuery = new PostQuery(data, 'tnbDeleteData', 'boPersonDoc')
	return postQuery.serialize('deleteDiabetes');
}

/*保存老年人专档*/
export function saveAged(data) {

	let postQuery = new PostQuery(data, 'lnrSaveData', 'boPersonDoc')
	return postQuery.serialize('saveAged');
}
/*更新老年人专档*/
export function updateAged(data) {

	let postQuery = new PostQuery(data, 'lnrUpdateData', 'boPersonDoc')
	return postQuery.serialize('updateAged');
}
/*删除老年人专档 @deprecated*/
export function deleteAged(data) {

	let postQuery = new PostQuery(data, 'lnrDeleteData', 'boPersonDoc')
	return postQuery.serialize('deleteAged');
}

/*添加档案标签*/
export function addLabel(grbh, labels) {

	let postQuery = new PostQuery({
		grbh,
		labels
	}, 'addLabel', 'boPersonDoc')
	return postQuery.serialize('addLabel');
}
/*删除档案标签*/
export function delLabel(grbh, labels) {

	let postQuery = new PostQuery({
		grbh,
		labels
	}, 'deleteLabel', 'boPersonDoc')
	return postQuery.serialize('delLabel');
}
/*删除档案*/
export function delRecord(grbh, labels) {

	let postQuery = new PostQuery({
		grbh,
		labels
	}, 'deleteRecode', 'boPersonDoc')
	return postQuery.serialize('delRecord');
}


/*登录*/
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

/*上传 @servlet*/
export function upload() {
	return `${reqUrl}/upload.action`
}

/*下载 @servlet*/
export function download() {
	return `${reqUrl}/download.do`
}

/*导入*/
export function importPHR(data) {

	let postQuery = new PostQuery(data, 'importNowExcel', 'boExport')

	return postQuery.serialize('importPHR');
}

/*导出*/
export function exportPHR(data) {

	let postQuery = new PostQuery(data, 'exportAllExcel', 'boExport')

	return postQuery.serialize('exportPHR');
}

/*导出进度*/
export function progress(data) {

	let postQuery = new PostQuery(data, 'exportLog', 'boExport')

	return postQuery.serialize('progress');
}

/*获取档案年龄百分比*/
export function API_getAgePercent() {
	const query = {
		din: {},
		fid: 'agePercent',
		pid: 'boHomePage'
	}

	return getReqUrl + JSON.stringify(query)
}

/*近期建档*/
export function API_getJqjds() {
	const query = {
		din: {},
		fid: 'jqjds',
		pid: 'boHomePage'
	}

	return getReqUrl + JSON.stringify(query)
}

/*首页最近一周新增*/
export function API_queryForAdd(page, rows) {
	const query = {
		din: {
			page,
			rows
		},
		fid: 'queryForAdd',
		pid: 'boHomePage'
	}

	return getReqUrl + JSON.stringify(query)
}

/*首页最近一周修改*/
export function API_queryForUpdate(page, rows) {
	const query = {
		din: {
			page,
			rows
		},
		fid: 'queryForUpdate',
		pid: 'boHomePage'
	}

	return getReqUrl + JSON.stringify(query)
}

/*居民血压反馈*/
export function getResidentbpfbList(pageSize, pageNo, id) {

	let postQuery = new PostQuery({
		id,
		page: pageNo,
		rows: pageSize
	}, 'searchResident', 'boPersonDoc')

	return postQuery.serialize('searchResident');
}

export function getAreaConfig(pageSize, pageNo, id) {

	let postQuery = new PostQuery({
		province: "广东省",
		level: "02",
	}, 'confirmAdress', 'boPersonDoc')

	return postQuery.serialize('getAreaConfig');
}

export function checkIDCard(IDCode) {

	let postQuery = new PostQuery({
		IDCode
	}, 'checkIDcardRepetition', 'boPersonDoc')

	return postQuery.serialize('checkIDCard');
}