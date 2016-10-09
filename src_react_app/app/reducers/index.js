import {
	combineReducers
} from 'redux';
import 'babel-polyfill'
import counter from './counter';
import app from './app';
import archive from './archive';

import login from '../modules/login/LoginReducer'

const rootReducer = combineReducers({
	counter,
	app,
	archive,
	login
});

export default rootReducer;