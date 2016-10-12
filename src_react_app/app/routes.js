import React from 'react';
import {
	Route,
	IndexRoute,
	IndexRedirect
} from 'react-router';

import {
	MENU_CONFIG
} from 'config'

import App from './containers/App';
import Home from './containers/Home';
import Login from './modules/login/containers/Login';
/*
import ArchiveCollection from './modules/phr/containers/ArchiveCollection';
import ArchiveList from './modules/phr/containers/ArchiveCollection';
import Statistics from './modules/stat/containers/Statistics';
*/

const routes = (loggedIn) => {

	if (eval(loggedIn)) {

		const dynamicRoute = MENU_CONFIG.menuItem.map((item, i) => {

			let itemSubs = item.sub.map((itemSub, indexSub) => {

				let component = require(itemSub.path).default
				return (
					<Route
						path={itemSub.route}
						component={component}
						sidebarKey={itemSub.key}
						headerNavKey={item.key}
					/>
				)
			})
			return itemSubs
		})

		return (
			/*已登陆使用的路由组件*/
			<Route path="/" component={App}>
			    <IndexRoute component={Home} sidebarKey="Home" headerNavKey="Home"/>
			    {/*
				    <Route path="/home" component={Home} sidebarKey="Home" headerNavKey="Home"/>
				    <Route path="ArchiveCollection" component={ArchiveCollection} sidebarKey="ArchiveCollection" headerNavKey="ArchiveCollection"/>
				    <Route path="ArchiveList" component={ArchiveList} sidebarKey="ArchiveList" headerNavKey="ArchiveList"/>
					<Route path="Statistics" component={Statistics} sidebarKey="Statistics" headerNavKey="Statistics"/>
					
				*/} 
				{dynamicRoute}
		    </Route>
		);
	} else {
		/*未登陆使用的路由组件*/
		return (
			<Route path="/" component={Login}/>
		)
	}

}

export default routes;