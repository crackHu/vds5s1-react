import React from 'react'
import ReactDOM from 'react-dom'

import {
	useRouterHistory,
	browserHistory
} from 'react-router';
import {
	createHashHistory
} from 'history';

import configureStore from './store/configureStore';
import Root from './containers/Root';

import {
	CONFIG
} from 'login_conf'

const LOGGEDIN = CONFIG.LS.LOGGEDIN
if (eval(localStorage.getItem(LOGGEDIN))) {
	require('./assets/scss/style.scss');
	//import 'app_base/assets/scss/style.scss'
}
require('nprogress/nprogress.css')

const store = configureStore();
const appHistory = process.env.NODE_ENV === 'production' ? useRouterHistory(createHashHistory)({
	queryKey: false
}) : browserHistory
const app = document.querySelector('.app');

ReactDOM.render(
	<Root
      store={ store } history={appHistory}
    />,
	app
);

if (module.hot) {
	module.hot.accept('./containers/Root', () => {
		const RootContainer = require('./containers/Root').default;
		ReactDOM.render(
			<RootContainer
	          store={ store } history={appHistory}
	        />,
			app
		);
	});
}