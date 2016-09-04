import React from 'react';
import {
	Route,
	IndexRoute
} from 'react-router';

import App from './ant_containers/App';
import Home from './ant_containers/Home';
import AntContainer1 from './ant_containers/AntContainer1';
import AntContainer2 from './ant_containers/AntContainer2';
import ArchivDetail from './ant_containers/ArchivDetail';

const routes = () => {
	return (
		<Route path="/" component={App}>
	      <IndexRoute component={Home} />
	      <Route path="AntContainer1" component={AntContainer1} />
	      <Route path="AntContainer2" component={AntContainer2} />
	      <Route path="ArchivDetail" component={ArchivDetail} />
	    </Route>
	);
}

export default routes;