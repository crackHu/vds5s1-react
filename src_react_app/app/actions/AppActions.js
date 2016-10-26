import {
	FIELDS_CHANGE,
	FIELDS_CHANGE_KEY
} from '../constants/ActionTypes';

/*保存档案页面字段更改 e.g. 基本档*/
export function saveFieldsChange(fields, flag) {

	console.debug('saveFieldsChange', "=>", "DATA:", fields);
	return (dispatch, getState) => {
		console.log('saveFieldsChange', "=-=>", dispatch, getState)
		dispatch({
			type: FIELDS_CHANGE,
			data: fields,
			flag
		})
	}
}

/*保存档案页面字段更改 e.g. 体检表*/
export function onFieldsChangeByKey(fields, flag, targetKey) {

	console.debug('onFieldsChangeByKey', "=>", "DATA:", fields);
	return (dispatch, getState) => {
		console.log('onFieldsChangeByKey', "=-=>", dispatch, getState)
		dispatch({
			type: FIELDS_CHANGE_KEY,
			data: fields,
			flag,
			targetKey
		})
	}
}