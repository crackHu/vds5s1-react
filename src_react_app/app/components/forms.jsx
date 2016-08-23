import React from 'react';
import {
	FormGroup,
	ControlLabel,
	FormControl,
	Button,
	Form,
	Col,
	Checkbox,
	Radio 
} from 'react-bootstrap';
import FieldGroup from './FieldGroup'

export default class FormCustom extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="container" >
				<br/>
				<h3>水平表单 ID：{this.props.peopleId}</h3>
				<Form inline>
					<FormGroup controlId="formInlineName">
					  <ControlLabel>Name</ControlLabel>
					  {' '}
					  <FormControl type="text" placeholder="Jane Doe" value={this.props.peopleLogin}/>
					</FormGroup>
					{' '}
					<FormGroup controlId="formInlineEmail">
					  <ControlLabel>Email</ControlLabel>
					  {' '}
					  <FormControl type="email" placeholder="jane.doe@example.com" value={this.props.peopleUrl}/>
					</FormGroup>
					{' '}
					<Button type="submit">
					  Send invitation
					</Button>
				  </Form>
				  
					<br/>
					<h3>垂直表单</h3>
				   <Form horizontal>
					<FormGroup controlId="formHorizontalEmail">
					  <Col componentClass={ControlLabel} sm={2}>
						Email
					  </Col>
					  <Col sm={10}>
						<FormControl type="email" placeholder="Email" />
					  </Col>
					</FormGroup>

					<FormGroup controlId="formHorizontalPassword">
					  <Col componentClass={ControlLabel} sm={2}>
						Password
					  </Col>
					  <Col sm={10}>
						<FormControl type="password" placeholder="Password" />
					  </Col>
					</FormGroup>

					<FormGroup>
					  <Col smOffset={2} sm={10}>
						<Checkbox>Remember me</Checkbox>
					  </Col>
					</FormGroup>

					<FormGroup>
					  <Col smOffset={2} sm={10}>
						<Button type="submit">
						  Sign in
						</Button>
					  </Col>
					</FormGroup>
				  </Form>
				  
				  <br/>
				  <h3>表单组件</h3>
				  <form>
					<FieldGroup
					  id="formControlsText"
					  type="text"
					  label="Text"
					  placeholder="Enter text"
					/>
					<FieldGroup
					  id="formControlsEmail"
					  type="email"
					  label="Email address"
					  placeholder="Enter email"
					/>
					<FieldGroup
					  id="formControlsPassword"
					  label="Password"
					  type="password"
					/>
					<FieldGroup
					  id="formControlsFile"
					  type="file"
					  label="File"
					  help="Example block-level help text here."
					/>

					<Checkbox checked readOnly>
					  Checkbox
					</Checkbox>
					<Radio checked readOnly>
					  Radio
					</Radio>

					<FormGroup>
					  <Checkbox inline>
						1
					  </Checkbox>
					  {' '}
					  <Checkbox inline>
						2
					  </Checkbox>
					  {' '}
					  <Checkbox inline>
						3
					  </Checkbox>
					</FormGroup>
					<FormGroup>
					  <Radio inline>
						1
					  </Radio>
					  {' '}
					  <Radio inline>
						2
					  </Radio>
					  {' '}
					  <Radio inline>
						3
					  </Radio>
					</FormGroup>

					<FormGroup controlId="formControlsSelect">
					  <ControlLabel>Select</ControlLabel>
					  <FormControl componentClass="select" placeholder="select">
						<option value="select">select</option>
						<option value="other">...</option>
					  </FormControl>
					</FormGroup>
					<FormGroup controlId="formControlsSelectMultiple">
					  <ControlLabel>Multiple select</ControlLabel>
					  <FormControl componentClass="select" multiple>
						<option value="select">select (multiple)</option>
						<option value="other">...</option>
					  </FormControl>
					</FormGroup>

					<FormGroup controlId="formControlsTextarea">
					  <ControlLabel>Textarea</ControlLabel>
					  <FormControl componentClass="textarea" placeholder="textarea" />
					</FormGroup>

					<FormGroup>
					  <ControlLabel>Static text</ControlLabel>
					  <FormControl.Static>
						email@example.com
					  </FormControl.Static>
					</FormGroup>

					<Button type="submit">
					  Submit
					</Button>
				</form>
				<br/>
			</div>
		)
	};
}