import {
	combineReducers
} from 'redux';
import 'babel-polyfill'
import counter from './counter';
import app from './app';

const rootReducer = combineReducers({
	counter,
	test: app
});

export default rootReducer;