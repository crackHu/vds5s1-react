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
/*
import AntContainer1 from './containers/AntContainer1';
import AntContainer2 from './containers/AntContainer2';
import ArchivDetail from './containers/ArchivDetail';
*/

const dynamicRoute = MENU_CONFIG.menuItem.map((item, i) => {

	let itemSubs = item.sub.map((itemSub, indexSub) => {

		let component = require(`./containers/${itemSub.key}`).default
		return (
			<Route path={itemSub.path} component={component} sidebarKey={itemSub.key} headerNavKey={item.key}/>
		)
	})
	return itemSubs
})

const routes = () => {
	return (
		<Route path="/" component={App}>
		    <IndexRoute component={Home} sidebarKey="Home" headerNavKey="Home"/>
		    {/*
			    <Route path="/home" component={Home} sidebarKey="Home" headerNavKey="Home"/>
			    <Route path="AntContainer1" component={AntContainer1} sidebarKey="AntContainer1" headerNavKey="AntContainer1"/>
			    <Route path="AntContainer2" component={AntContainer2} sidebarKey="AntContainer2" headerNavKey="AntContainer2"/>
				<Route path="ArchivDetail" component={ArchivDetail} sidebarKey="ArchivDetail" headerNavKey="ArchivDetail"/>
			*/}
			{dynamicRoute}
	    </Route>
	);
}

export default routes;