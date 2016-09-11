import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
} from 'antd'

class MedicalRecordsForm extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	render() {

		const FormItem = Form.Item;
		const {
			getFieldProps
		} = this.props.form

		return (
			<p>MedicalRecordsForm</p>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("MedicalRecordsForm onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("MedicalRecordsForm mapPropsToFields")
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(MedicalRecordsForm)