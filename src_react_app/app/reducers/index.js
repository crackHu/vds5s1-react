import {
	combineReducers
} from 'redux';
import 'babel-polyfill'
import app from './app';

import login from 'login/LoginReducer'
import {
	phr,
	phrExport
} from 'phr/PHRReducer'
import {
	stat,
} from 'stat/STATReducer'
import mass from 'app_base/modules/mass'

const rootReducer = combineReducers({

	login,

	phr,
	phrExport,

	stat,
	mass
});

export default rootReducer;