import {
	FIELDS_CHANGE,
} from '../constants/ActionTypes';

/*保存档案页面字段更改*/
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