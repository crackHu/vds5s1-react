import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
} from 'antd'

class PersonalDetailForm extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	render() {

		const FormItem = Form.Item;
		const {
			getFieldProps
		} = this.props.form
		const username = getFieldProps('username', {
			rules: [{
				required: true,
				message: '请输入姓名',
			}, ],
		})
		const personalno = getFieldProps('personalno', {
			rules: [{
				required: true,
				message: '请输入个人编号',
			}, ],
		});

		return (
			<Form inline onSubmit={this.handleSubmit}>
		        <FormItem label="姓名" required>
		          <Input {...username} placeholder="请输入姓名"/>
		        </FormItem>
		        <FormItem label="个人编号" >
		          <Input {...personalno} placeholder="请输入个人编号"/>
		        </FormItem>
	        </Form>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("PersonalDetailForm onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("PersonalDetailForm mapPropsToFields")
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(PersonalDetailForm)