import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
	Button,
	Checkbox,
	Radio,
	message,
	Row,
	Col,
	Select,
	DatePicker,
	TimePicker,
	Cascader,
	Table,
	Icon,
	Card,
	Tooltip
} from 'antd'

import {
	ARC_FORM_WIDGET_CONFIG as WIDGET_CONFIG,
} from 'phr_conf'

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

const getSelectOptions = (data) => {
	return data.map((item, i) => {
		return <Option key={item.value}>{item.value}</Option>
	})
}

/*体检表3*/
class MedicalTable3 extends React.Component {

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
			<div>MedicalTable3</div>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("MedicalTable3 onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("MedicalTable3 mapPropsToFields")
}

export default Form.create(onFieldsChange, mapPropsToFields)(MedicalTable3)