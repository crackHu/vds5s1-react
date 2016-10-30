import {
	combineReducers
} from 'redux';
import 'babel-polyfill'
import counter from './counter';
import app from './app';
import archive from './archive';

import login from '../modules/login/LoginReducer'
import {
	phr,
	childTable
} from '../modules/phr/PHRReducer'

const rootReducer = combineReducers({

	login,
	childTable,
	phr,
});

export default rootReducer;