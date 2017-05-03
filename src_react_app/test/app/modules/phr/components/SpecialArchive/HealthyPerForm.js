import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
} from 'antd'

const FormItem = Form.Item;

/*健康人*/
class HealthyPerForm extends React.Component {

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
			<p>健康人</p>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("HealthyPerForm onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("HealthyPerForm mapPropsToFields")
}

export default Form.create()(HealthyPerForm)