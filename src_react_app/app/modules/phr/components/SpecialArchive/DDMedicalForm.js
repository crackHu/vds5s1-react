import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
} from 'antd'

const FormItem = Form.Item;

/*钉钉医疗档案*/
class DDMedicalForm extends React.Component {

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
			<p>钉钉医疗档案</p>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("DDMedicalForm onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("DDMedicalForm mapPropsToFields")
}

export default Form.create()(DDMedicalForm)