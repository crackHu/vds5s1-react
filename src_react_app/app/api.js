import {
	config
} from 'config'

export const reqUrl = `${config.baseUrl}/${config.projectName}/ba/boCallMethodPC.jsp?data=`

/*檔案列表*/
export const getArchiveList = () => {
	const query = {
		"din": {
			pageNo: 1,
			pageSize: 20
		},
		boName: "boVdsUnified",
		funcName: "getPdList"
	}
	const url = reqUrl + JSON.stringify(query);
	console.debug("getArchiveList:" + url);
	return url;
}

/*保存檔案*/
export const saveArchiveData = (data) => {
	const query = {
		din: data,
		boName: "boVdsUnified",
		funcName: "saveArchiveData"
	}
	const url = reqUrl + JSON.stringify(query);
	console.debug("saveArchiveData:" + url);
	return url;
}