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
	ARC_FORM_WIDGET_CONFIG as WIDGET_CONFIG
} from 'phr_conf'

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;



/*家族史与生活情况*/
class FamiLivelHistoryFrom extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}

		/*厨房排风设施*/
		this.vFacilityOptions = WIDGET_CONFIG.selectOption.ventilationFacilities;
	}

	getSelectOptions = (data) => {
		return data.map((item, i) => {
			return <Option key={i}>{item.value}</Option>
		})
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	render() {
		const {
			getFieldDecorator
		} = this.props.form

		return (
			<Form inline>
				<FormItem
		         label="厨房排风设施">
		            {getFieldDecorator('grda_xb')(
			          <Select
			           style={{ width: 120 }}
			          >
			           {this.getSelectOptions(this.vFacilityOptions)}
				      </Select>
		            )}
		        </FormItem>
			</Form>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("FamiLivelHistoryFrom onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("FamiLivelHistoryFrom mapPropsToFields")
}

export default Form.create()(FamiLivelHistoryFrom)