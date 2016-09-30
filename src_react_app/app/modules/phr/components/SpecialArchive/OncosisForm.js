import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
} from 'antd'

const FormItem = Form.Item;

/*肿瘤病*/
class OncosisForm extends React.Component {

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
			<p>肿瘤病</p>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("OncosisForm onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("OncosisForm mapPropsToFields")
}

export default Form.create()(OncosisForm)