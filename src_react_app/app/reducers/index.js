import {
	combineReducers
} from 'redux';
import 'babel-polyfill'
import app from './app';

import login from 'login/LoginReducer'
import {
	phr,
} from 'phr/PHRReducer'
import {
	stat,
} from 'stat/STATReducer'

const rootReducer = combineReducers({

	login,
	phr,
	stat
});

export default rootReducer;