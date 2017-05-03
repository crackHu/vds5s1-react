import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
} from 'antd'

const FormItem = Form.Item;

/*孕产妇专档*/
class MaternalForm extends React.Component {

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
			<p>孕产妇专档</p>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("MaternalForm onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("MaternalForm mapPropsToFields")
}

export default Form.create()(MaternalForm)