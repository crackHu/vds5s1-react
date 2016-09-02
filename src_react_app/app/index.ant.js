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

import routes from './routes';

import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const appHistory = useRouterHistory(createHashHistory)({
	queryKey: false
})

ReactDOM.render((
	<Router history={appHistory} routes={routes()} />
), document.querySelector('.root'));