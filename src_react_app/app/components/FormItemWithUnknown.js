import React, {
	PropTypes,
} from "react"
import {
	Form,
	Select
} from 'antd';
import {
	getDateTimestamp
} from 'utils'

const FormItem = Form.Item;
const Option = Select.Option;

/*选择器Select 附带‘未提供’选项option组件*/
export default class FormItemWithUnknown extends React.Component {

	render() {

		const unknownOption = <Option key={getDateTimestamp()} value="未提供">未提供</Option>
		const optionProp = this.props.option
		let option = optionProp ? optionProp.map((item, i) => {
			return (<Option key={i}>{item.value}</Option>)
		}) : null
		if (option) {
			option.push(unknownOption)
		} else {
			option = unknownOption
		}

		return (
			<FormItem label={this.props.label} >
	          <Select
	           combobox
	           style={this.props.style}>
	           	  {option}
			    </Select>
	        </FormItem>
		)
	}
}

FormItemWithUnknown.propTypes = {
	label: PropTypes.string.isRequired,
	style: PropTypes.object.isRequired,
	option: PropTypes.array
}