import React from 'react';
import ReactDOM from 'react-dom';
import {
	Router,
	Route,
	hashHistory
} from 'react-router';
/*import {
	ButtonToolbar,
	Button,
	Panel
} from 'react-bootstrap';

import Buttons from './components/buttons';
import Inputs from './components/inputs';
import Lists from './components/lists';
import Forms from './components/forms';
import Tables from './components/tables';
import Demo from './containers/demo';
import ArchivDetail from './containers/ArchivDetail';*/
import ArchivDetailByAntD from './containers/ArchivDetailByAntD';

import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {

	render() {
		return (
			<ArchivDetailByAntD />
		);
	}
};

const app = document.querySelector('.root');
ReactDOM.render((
	<App />
), app);