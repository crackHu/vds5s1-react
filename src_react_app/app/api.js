import {
	config
} from 'config'

export const reqUrl = `${config.baseUrl}/${config.projectName}/ba/boCallMethodPC.jsp?data=`

/*檔案列表*/
export const getArchiveList = () => {
	const query = {
		boName: "boVdsUnified",
		funcName: "getArchiveList",

		procedure: "procJBZLSelect",
		pageNo: 1,
		pageSize: 20
	}
	const url = reqUrl + JSON.stringify(query);
	console.debug("getArchiveList:" + url);
	return url;
}

/*保存檔案*/
export const saveArchiveData = (data) => {
	const query = {
		boName: "boVdsUnified",
		funcName: "saveArchiveData",

		din: {
			data: data
		}
	}
	const url = reqUrl + JSON.stringify(query);
	console.debug("saveArchiveData:" + url);
	return url;
}