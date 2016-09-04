import React from 'react';
import ReactDOM from 'react-dom';
import {
	Router,
	useRouterHistory,
	browserHistory
} from 'react-router';
import {
	createHashHistory,
	createBrowserHistory,
	useBasename,
	createHistory
} from 'history';
import {
	Provider
} from 'react-redux'
import configureStore from './store/configureStore';
import routes from './routes';

import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
	createStore,
	applyMiddleware,
	compose
} from 'redux'
import rootReducer from './reducers';
import promise from 'redux-promise'
import thunk from 'redux-thunk'

const store = configureStore();
/*const middlewares = applyMiddleware(
	thunk
)
const store = createStore(rootReducer, compose(
	middlewares,
	window.devToolsExtension ? window.devToolsExtension() : f => f
));*/

const appHistory = useRouterHistory(createHashHistory)({
		queryKey: false
	})
	//const history = createBrowserHistory();

ReactDOM.render((
	<Provider store={store} >
		<Router history={appHistory} routes={routes()} />
	</Provider>
), document.querySelector('.root'));