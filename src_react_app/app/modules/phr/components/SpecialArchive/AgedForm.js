import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
} from 'antd'

const FormItem = Form.Item;

/*老年人专档*/
class AgedForm extends React.Component {

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
			<p>老年人专档</p>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("AgedForm onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("AgedForm mapPropsToFields")
}

export default Form.create()(AgedForm)