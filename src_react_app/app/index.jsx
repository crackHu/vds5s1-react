import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Buttons from './components/buttons';
import Inputs from './components/inputs';
import Lists from './components/lists';
import Forms from './components/forms';
import Tables from './components/tables';
import {
	ButtonToolbar,
	Button,
	Panel
} from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component{
	
	render() {
		const title = (
		  <h1>react-bootstrap demo</h1>
		);
		
		return (
		
			<div className="container">
				<div style={{height : "2em"}}/>
					<Panel header={title}>
						<Button href="#buttons" bsSize="large" block>Button Demo</Button>
						<Button href="#inputs" bsSize="large" block>Input Demo</Button>
						<Button href="#lists" bsSize="large" block>List Demo</Button>
						<Button href="#forms" bsSize="large" block>Form Demo</Button>
						<Button href="#tables" bsSize="large" block>Table Demo</Button>
					</Panel>
			</div>
		);
	}
};

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render((
  <Router history={hashHistory}>
	  <Route path="/" component={App}/>
	  <Route path="/buttons" component={Buttons}/>
	  <Route path="/inputs" component={Inputs}/>
	  <Route path="/lists" component={Lists}/>
	  <Route path="/forms" component={Forms}/>
	  <Route path="/tables" component={Tables}/>
  </Router>
), app);