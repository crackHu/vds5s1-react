import React from 'react';
import {
	Route,
	IndexRoute,
	Redirect,
	IndexRedirect
} from 'react-router';

import {
	MENU_CONFIG,
	INDEPENDENCE_ROUTE_CONFIG,
	INDEPEND_ROUTE_CONFIG,
	STATUS_ROUTE_CONFIG,
} from 'config'

import App from './containers/App';
import Home from './containers/Home';
import Login from './modules/login/containers/Login';

/*
import ArchiveCollection from './modules/phr/containers/ArchiveCollection';
import ArchiveList from './modules/phr/containers/ArchiveCollection';
import Statistics from './modules/stat/containers/Statistics';
*/

if (typeof require.ensure !== 'function') {
	require.ensure = function(dependencies, callback) {
		callback(require)
	}
}

const onEnterHandler = (nextState, replace, callback) => {
	NProgress.start()
	callback()
}

const onChangeHandler = (prevState, nextState, replace, callback) => {
	callback()
}

const routes = (loggedIn) => {
	const statusRoute = STATUS_ROUTE_CONFIG.map((item, i) => {
		return (
			<Route
			 	key={Date.now()}
			 	path={item.route}
			 	loggedIn={loggedIn}
			 	component={require(`${item.path}.js`).default}
			/>
		)
	})

	if (eval(loggedIn)) {　

		const dynamicRoute = MENU_CONFIG.menuItem.map((item, i) => {

			let itemSubs = item.sub.map((itemSub, indexSub) => {

				let path = itemSub.path
					// let component = require(`${path}.js`).default
				const getComponent = (location, cb) => {
					console.debug('dynamicRoute path', path)
					return require.ensure([], require => {
						cb(null, require(`${path}.js`).default)
					})
				}
				console.debug('getComponent', itemSub.key)
				return (
					<Route
						path={itemSub.route}
						getComponent={getComponent}
						headerNavKey={item.key}
						sidebarKey={itemSub.key}
						onEnter={onEnterHandler}
					/>
				)
			})
			return itemSubs
		})

		const independenceRoute = INDEPENDENCE_ROUTE_CONFIG.map((item, i) => {
			return (
				<Route
				 	key={Date.now()}
				 	path={item.route}
				 	component={require(`${item.path}.js`).default}
				 	sidebarKey={item.sidebarKey}
				 	headerNavKey={item.headerNavKey}
				 	onEnter={onEnterHandler}
				/>
			)
		})

		const independRoute = INDEPEND_ROUTE_CONFIG.map((item, i) => {
			return (
				<Route
				 	key={Date.now()}
				 	path={item.route}
				 	component={require(`${item.path}.js`).default}
				/>
			)
		})

		return (
			/*已登录使用的路由组件*/
			<div>
				{independRoute}
				<Route path="/" component={App} onChange={onChangeHandler}>
				    <IndexRoute component={Home} sidebarKey="Home" headerNavKey="Home"/>
				    {/*
					    <Route path="/home" component={Home} sidebarKey="Home" headerNavKey="Home"/>
					    <Route path="ArchiveCollection" component={ArchiveCollection} sidebarKey="ArchiveCollection" headerNavKey="ArchiveCollection"/>
					    <Route path="ArchiveList" component={ArchiveList} sidebarKey="ArchiveList" headerNavKey="ArchiveList"/>
						<Route path="Statistics" component={Statistics} sidebarKey="Statistics" headerNavKey="Statistics"/>
					*/}
					{dynamicRoute} 
					{independenceRoute}
					{statusRoute}
        			<Redirect from='*' to='/404' />
			    </Route>
		    </div>
		);
	} else {
		/*未登录使用的路由组件*/
		return (
			<div>
				<Route path="/" component={Login}/>
				{statusRoute}
				<Redirect from='*' to='/404' />
			</div>
		)
	}

}

export default routes;