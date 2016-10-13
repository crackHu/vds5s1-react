import React, {
	Component
} from 'react';
import {
	Provider
} from 'react-redux';
import {
	Router
} from 'react-router';

import routes from '../routes';

import {
	CONFIG as LCONFIG
} from 'login_conf'

const USR = LCONFIG.LS.USR
const LOGGEDIN = LCONFIG.LS.LOGGEDIN

let loggedIn = localStorage.getItem(LOGGEDIN)
if (loggedIn == null) {
	loggedIn = LCONFIG.LOGIN_ON
	localStorage.setItem(LOGGEDIN, loggedIn)
}

export default class Root extends Component {

	render() {

		const {
			store,
			history
		} = this.props;

		return (
			<Provider store={store}>
	          	<Router history={history} routes={routes(loggedIn)} />
	        </Provider>
		);
	}
}