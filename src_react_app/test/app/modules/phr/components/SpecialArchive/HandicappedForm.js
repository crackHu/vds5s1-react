import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
} from 'antd'

const FormItem = Form.Item;

/*残疾人*/
class HandicappedForm extends React.Component {

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
			<p>残疾人</p>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("HandicappedForm onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("HandicappedForm mapPropsToFields")
}

export default Form.create()(HandicappedForm)