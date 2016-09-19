import React from 'react';
import {
	Route,
	IndexRoute
} from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import AntContainer1 from './containers/AntContainer1';
import AntContainer2 from './containers/AntContainer2';
import ArchivDetail from './containers/ArchivDetail';

const routes = () => {
	return (
		<Route path="/" component={App}>
	      <IndexRoute component={Home} />
	      <Route path="AntContainer1" component={AntContainer1} sidebarKey="survey" headerNavKey="AntContainer1" status='0'/>
	      <Route path="AntContainer2" component={AntContainer2} sidebarKey="create" headerNavKey="AntContainer2" status='0'/>
		  <Route path="ArchivDetail" component={ArchivDetail} sidebarKey="list" headerNavKey="ArchivDetail" status='0'/>
	    </Route>
	);
}

export default routes;