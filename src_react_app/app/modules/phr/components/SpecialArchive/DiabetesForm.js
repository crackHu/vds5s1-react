import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
} from 'antd'

const FormItem = Form.Item;

/*糖尿病专档*/
class DiabetesForm extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	render() {
		const {
			getFieldDecorator
		} = this.props.form

		return (
			<p>糖尿病专档</p>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("DiabetesForm onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("DiabetesForm mapPropsToFields")
}

export default Form.create()(DiabetesForm)