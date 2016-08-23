import React from 'react';
import ReactDOM from 'react-dom';
import {
	ButtonToolbar,
	Button
} from 'react-bootstrap';


export default class ButtonCustom extends React.Component {

	constructor(props) {
			super(props);
			this.state = {
				isLoading: false
			};
			this.clickMethod = this.clickMethod.bind(this);
			this.handleClick = this.handleClick.bind(this);
		}
		/* 点击事件 */
	clickMethod(e) {
		let html = ReactDOM.findDOMNode(this.refs.testRef).innerHTML;
		let name = this.props.testAttr;
		alert(html + "," + name + "," + e.target.name);

	}

	handleClick() {
		{ /* this.setState需要在构造函数声明state及绑定this.handleClick = this.handleClick.bind(this);*/ }
		this.setState({
			isLoading: true
		});

		setTimeout(() => {
			this.setState({
				isLoading: false
			});
		}, 2000);
	}

	render() {

		let isLoading = this.state.isLoading;
		const wellStyles = {
			maxWidth: 400,
			margin: '0 auto 10px'
		};
		const anchorStyles = {
			'color': '#000',
			'position': 'relative'
		}

		return (
			<div className="container">
			<br/>
				<h3 className="anchor" style={anchorStyles}>种类</h3>
				<ButtonToolbar>
				    {/* Standard button 点击事件Demo*/}
				    <Button ref="testRef" name="testName" onClick={this.clickMethod}>Default</Button>

				    {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
				    <Button bsStyle="primary">Primary</Button>

				    {/* Indicates a successful or positive action */}
				    <Button bsStyle="success">Success</Button>

				    {/* Contextual button for informational alert messages */}
				    <Button bsStyle="info">Info</Button>

				    {/* Indicates caution should be taken with this action */}
				    <Button bsStyle="warning">Warning</Button>

				    {/* Indicates a dangerous or potentially negative action */}
				    <Button bsStyle="danger">Danger</Button>

				    {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
				    <Button bsStyle="link">Link</Button>
				  </ButtonToolbar>
				  <hr/>
				  
				  <h3 className="anchor" style={anchorStyles}>大小</h3>
				  <ButtonToolbar>
				      <Button bsStyle="primary" bsSize="large">Large button</Button>
				      <Button bsSize="large">Large button</Button>				      
				    </ButtonToolbar>
				    <br/>
				    <ButtonToolbar>
				      <Button bsStyle="primary">Default button</Button>
				      <Button>Default button</Button>
				    </ButtonToolbar>
				    <br/>
				    <ButtonToolbar>
				      <Button bsStyle="primary" bsSize="small">Small button</Button>
				      <Button bsSize="small">Small button</Button>
				    </ButtonToolbar>
				    <br/>
				    <ButtonToolbar>
				      <Button bsStyle="primary" bsSize="xsmall">Extra small button</Button>
				      <Button bsSize="xsmall">Extra small button</Button>
				    </ButtonToolbar>
				  <hr/>
				  
				  <h3 className="anchor" style={anchorStyles}>block块</h3>
				 {/* sytle样式Demo*/}
			     <div className="well" style={wellStyles}>
				    <Button bsStyle="primary" bsSize="large" block>Block level button</Button>
				    <Button bsSize="large" block>Block level button</Button>
				  </div>
				  <hr/>
				  
				  <h3 className="anchor" style={anchorStyles}>active状态</h3>
				   <ButtonToolbar>
				    <Button bsStyle="primary" bsSize="large" active>Primary button</Button>
				    <Button bsSize="large" active>Button</Button>
				  </ButtonToolbar>
				  <hr/>
				  
				  <h3 className="anchor" style={anchorStyles}>Button标签</h3>
				  <ButtonToolbar>
				      <Button href="#testLink">Link</Button>
				      <Button>Button</Button>
				    </ButtonToolbar>
				  <hr/>
				  
				<h3 className="anchor" style={anchorStyles}>disabled状态</h3>
				<ButtonToolbar>
			    <Button bsStyle="primary" bsSize="large" disabled>Primary button</Button>
			    <Button bsSize="large" disabled>Button</Button>
			  </ButtonToolbar>
			  <hr/>
			  
			 <h3 className="anchor" style={anchorStyles}>state状态切换</h3>
			  <Button
		        bsStyle="primary"
		        disabled={isLoading}
		        onClick={!isLoading ? this.handleClick : null}>
		        {isLoading ? 'Loading...' : 'Loading state'}
		      </Button>
			<br/>
			</div>
		)
	};
}