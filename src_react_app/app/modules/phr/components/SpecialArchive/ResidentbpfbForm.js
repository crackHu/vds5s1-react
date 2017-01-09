import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
} from 'antd'

import EditableRowTable from 'app_base/components/EditableRowTable'

const FormItem = Form.Item;

/*居民血压反馈*/
class ResidentbpfbForm extends React.Component {

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
			<EditableRowTable />
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("ResidentbpfbForm onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("ResidentbpfbForm mapPropsToFields")
}

export default Form.create()(ResidentbpfbForm)