import React from 'react';
import ReactDOM from 'react-dom';
import FieldGroup from './FieldGroup'
import {
	Button,
	FormGroup,
	FormControl,
	ControlLabel,
	HelpBlock,
	Checkbox,
	Radio,
	InputGroup,
	Glyphicon,
	DropdownButton,
	MenuItem,
	Form,
	Col 
} from 'react-bootstrap';

export default class InputCustom extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value : ''
		};
		this.handleChange = this.handleChange.bind(this);
	}
	
	getValidationState() {
		const length = this.state.value.length;
		if (length > 10) return 'success';
		else if (length > 5) return 'warning';
		else if (length > 0) return 'error';
	}
	
	handleChange(e) {
		this.setState({
			value : e.target.value
		});
	}


	render() {
		return(
			<div className="container col-md-4" >
				<form>
					<h3>大小</h3>
					<FormGroup bsSize="large">
						<FormControl type="text" placeholder="Large text" />
					</FormGroup>
					<FormGroup>
					  <FormControl type="text" placeholder="Normal text" />
					</FormGroup>
					<FormGroup bsSize="small">
					  <FormControl type="text" placeholder="Small text" />
					</FormGroup>
				</form>
				
				<form>
					<h3>输入框组合</h3>
					<FormGroup>
					  <InputGroup>
						<InputGroup.Addon>@</InputGroup.Addon>
						<FormControl type="text" />
					  </InputGroup>
					</FormGroup>
					<FormGroup>
					  <InputGroup>
						<FormControl type="text" />
						<InputGroup.Addon>.00</InputGroup.Addon>
					  </InputGroup>
					</FormGroup>
					<FormGroup>
					  <InputGroup>
						<InputGroup.Addon>$</InputGroup.Addon>
						<FormControl type="text" />
						<InputGroup.Addon>.00</InputGroup.Addon>
					  </InputGroup>
					</FormGroup>

					<FormGroup>
					  <InputGroup>
						<FormControl type="text" />
						<InputGroup.Addon>
						  <Glyphicon glyph="music" />
						</InputGroup.Addon>
					  </InputGroup>
					</FormGroup>

					<FormGroup>
					  <InputGroup>
						<InputGroup.Button>
						  <Button>Before</Button>
						</InputGroup.Button>
						<FormControl type="text" />
					  </InputGroup>
					</FormGroup>
					<FormGroup>
					  <InputGroup>
						<FormControl type="text" />
						<DropdownButton
						  componentClass={InputGroup.Button}
						  id="input-dropdown-addon"
						  title="Action"
						>
						  <MenuItem key="1">Item</MenuItem>
						</DropdownButton>
					  </InputGroup>
					</FormGroup>

					<FormGroup>
					  <InputGroup>
						<InputGroup.Addon>
						  <input type="radio" aria-label="..." />
						</InputGroup.Addon>
						<FormControl type="text" />
					  </InputGroup>
					</FormGroup>
					<FormGroup>
					  <InputGroup>
						<InputGroup.Addon>
						  <input type="checkbox" aria-label="..." />
						</InputGroup.Addon>
						<FormControl type="text" />
					  </InputGroup>
					</FormGroup>
				  </form>
				
				<form>
					<FormGroup
					  controlId="formBasicText"
					  validationState={this.getValidationState()}
					>
					  <ControlLabel>验证输入字符串长度</ControlLabel>
					  <FormControl
						type="text"
						value={this.state.value}
						placeholder="Enter text"
						onChange={this.handleChange}
					  />
					  <FormControl.Feedback />
					  <HelpBlock>Validation is based on string length.</HelpBlock>
					</FormGroup>
				</form>
				
				<h3>表单验证</h3>
				<form>
					<FormGroup controlId="formValidationSuccess1" validationState="success">
					  <ControlLabel>Input with success</ControlLabel>
					  <FormControl type="text" />
					  <HelpBlock>Help text with validation state.</HelpBlock>
					</FormGroup>

					<FormGroup controlId="formValidationWarning1" validationState="warning">
					  <ControlLabel>Input with warning</ControlLabel>
					  <FormControl type="text" />
					</FormGroup>

					<FormGroup controlId="formValidationError1" validationState="error">
					  <ControlLabel>Input with error</ControlLabel>
					  <FormControl type="text" />
					</FormGroup>

					<FormGroup controlId="formValidationSuccess2" validationState="success">
					  <ControlLabel>Input with success and feedback icon</ControlLabel>
					  <FormControl type="text" />
					  <FormControl.Feedback />
					</FormGroup>

					<FormGroup controlId="formValidationWarning2" validationState="warning">
					  <ControlLabel>Input with warning and feedback icon</ControlLabel>
					  <FormControl type="text" />
					  <FormControl.Feedback />
					</FormGroup>

					<FormGroup controlId="formValidationError2" validationState="error">
					  <ControlLabel>Input with error and feedback icon</ControlLabel>
					  <FormControl type="text" />
					  <FormControl.Feedback />
					</FormGroup>

					<FormGroup controlId="formValidationSuccess3" validationState="success">
					  <ControlLabel>Input with success and custom feedback icon</ControlLabel>
					  <FormControl type="text" />
					  <FormControl.Feedback>
						<Glyphicon glyph="music" />
					  </FormControl.Feedback>
					</FormGroup>

					<FormGroup controlId="formValidationWarning3" validationState="warning">
					  <ControlLabel>Input group with warning</ControlLabel>
					  <InputGroup>
						<InputGroup.Addon>@</InputGroup.Addon>
						<FormControl type="text" />
					  </InputGroup>
					  <FormControl.Feedback />
					</FormGroup>

					<Form componentClass="fieldset" horizontal>
					  <FormGroup controlId="formValidationError3" validationState="error">
						<Col componentClass={ControlLabel} xs={3}>
						  Input with error
						</Col>
						<Col xs={9}>
						  <FormControl type="text" />
						  <FormControl.Feedback />
						</Col>
					  </FormGroup>

					  <FormGroup controlId="formValidationSuccess4" validationState="success">
						<Col componentClass={ControlLabel} xs={3}>
						  Input group with success
						</Col>
						<Col xs={9}>
						  <InputGroup>
							<InputGroup.Addon>@</InputGroup.Addon>
							<FormControl type="text" />
						  </InputGroup>
						  <FormControl.Feedback />
						</Col>
					  </FormGroup>
					</Form>

					<Form componentClass="fieldset" /*inline*/>
					  <FormGroup controlId="formValidationWarning4" validationState="warning">
						<ControlLabel>Input with warning</ControlLabel>
						{' '}
						<FormControl type="text" />
						<FormControl.Feedback />
					  </FormGroup>
					  {' '}
					  <FormGroup controlId="formValidationError4" validationState="error">
						<ControlLabel>Input group with error</ControlLabel>
						{' '}
						<InputGroup>
						  <InputGroup.Addon>@</InputGroup.Addon>
						  <FormControl type="text" />
						</InputGroup>
						<FormControl.Feedback />
					  </FormGroup>
					</Form>

					<Checkbox validationState="success">
					  Checkbox with success
					</Checkbox>
					<Radio validationState="warning">
					  Radio with warning
					</Radio>
					<Checkbox validationState="error">
					  Checkbox with error
					</Checkbox>

					{/* This requires React 15's <span>-less spaces to be exactly correct. */}
					<FormGroup validationState="success">
					  <Checkbox inline>
						Checkbox
					  </Checkbox>
					  {' '}
					  <Checkbox inline>
						with
					  </Checkbox>
					  {' '}
					  <Checkbox inline>
						success
					  </Checkbox>
					</FormGroup>
				  </form>
				  <br/>
			</div>
		)
	};
}