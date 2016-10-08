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

export default class Root extends Component {

	state = {
		loggedIn: false
	}

	render() {

		const {
			store,
			history
		} = this.props;

		const loggedIn = this.state.loggedIn
		loggedIn ? localStorage.setItem('loggedIn', 1) : localStorage.setItem('loggedIn', 0)

		return (
			<Provider store={store}>
	          	<Router history={history} routes={routes(loggedIn)} />
	        </Provider>
		);
	}
}