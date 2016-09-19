import {
	config
} from 'config'

export const reqUrl = `${config.baseUrl}/${config.projectName}/ba/boCallMethodPC.jsp?data=`

export const getArchiveList = () => {
	const query = {
		boName: "boVdsLogin",
		funcName: "login",
		procedure: "procJBZLSelect",
		pageNo: 1,
		pageSize: 20
	}
	const url = reqUrl + JSON.stringify(query);
	console.debug("getArchiveList:" + url);
	return url;
}