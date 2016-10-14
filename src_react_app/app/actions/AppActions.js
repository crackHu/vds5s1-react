import {
	FIELDS_CHANGE,
} from '../constants/ActionTypes';

/*保存档案页面字段更改*/
export function saveFieldsChange(fields) {
	console.debug('saveFieldsChange', "=>", "DATA:", fields);
	return dispatch => {
		dispatch({
			type: FIELDS_CHANGE,
			data: fields
		})
	}
}