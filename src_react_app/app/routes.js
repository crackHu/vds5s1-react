import React from 'react';
import {
	Route,
	IndexRoute,
	IndexRedirect
} from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import AntContainer1 from './containers/AntContainer1';
import AntContainer2 from './containers/AntContainer2';
import ArchivDetail from './containers/ArchivDetail';

const routes = () => {
	return (
		<Route path="/" component={App}>
	      <IndexRoute component={Home} sidebarKey="survey" headerNavKey="home" status='0'/>
		  {/*<IndexRedirect to="/home" />*/}
	      {/*<Route path="home" component={Home} sidebarKey="survey" headerNavKey="home" status='0'/>*/}
	      <Route path="AntContainer1" component={AntContainer1} sidebarKey="create" headerNavKey="AntContainer1" status='1'/>
	      <Route path="AntContainer2" component={AntContainer2} sidebarKey="list" headerNavKey="AntContainer2" status='1'/>
		  <Route path="ArchivDetail" component={ArchivDetail} sidebarKey="test" headerNavKey="ArchivDetail" status='2'/>
	    </Route>
	);
}

export default routes;