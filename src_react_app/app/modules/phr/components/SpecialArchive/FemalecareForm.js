import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
} from 'antd'

const FormItem = Form.Item;

/*女性保健专档*/
class FemalecareForm extends React.Component {

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
			<p>女性保健专档</p>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("FemalecareForm onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("FemalecareForm mapPropsToFields")
}

export default Form.create()(FemalecareForm)