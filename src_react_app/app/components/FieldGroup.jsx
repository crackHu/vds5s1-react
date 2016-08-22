import {
	Button,
	FormGroup,
	FormControl,
	ControlLabel,
	HelpBlock,
	Checkbox,
	Radio
} from 'react-bootstrap';
import React from 'react';

export default class FieldGroup extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { id, label, help, type, placeholder } = this.props;
		return (
			<FormGroup controlId={id}>
			  <ControlLabel>{label}</ControlLabel>
			  <FormControl type={type} placeholder={placeholder} />
			  {help && <HelpBlock>{help}</HelpBlock>}
			</FormGroup>
		  );
	}
}
