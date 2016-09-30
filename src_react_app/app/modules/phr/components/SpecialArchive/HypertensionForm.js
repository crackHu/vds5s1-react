import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
} from 'antd'

const FormItem = Form.Item;

/*高血压专档*/
class HypertensionForm extends React.Component {

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
			<p>FamiLivelHistoryFrom1</p>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("HypertensionForm onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("HypertensionForm mapPropsToFields")
}

export default Form.create()(HypertensionForm)