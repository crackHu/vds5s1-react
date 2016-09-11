import React from 'react';
import {
	render
} from 'react-dom';
import {
	useRouterHistory
} from 'react-router';
import {
	createHashHistory
} from 'history';


import configureStore from './store/configureStore';
import Root from './containers/Root';

import './main.scss';

const store = configureStore();
const app = document.querySelector('.root');

const appHistory = useRouterHistory(createHashHistory)({
	queryKey: false
})

render(
	<Root
      store={ store } history={appHistory}
    />,
	app
);

if (module.hot) {
	module.hot.accept('./containers/Root', () => {
		const RootContainer = require('./containers/Root').default;
		render(
			<RootContainer
          store={ store } history={appHistory}
        />,
			app
		);
	});
}