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
export default class SelectWithUnknown extends React.Component {

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
			<Select combobox style={this.props.style}>
       	  		{option}
		    </Select>
		)
	}
}

SelectWithUnknown.propTypes = {
	style: PropTypes.object,
	option: PropTypes.array
}