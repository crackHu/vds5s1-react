import React, {
	PropTypes,
} from "react"
import {
	Form,
	Select
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

export default class FormItemWithUnknown extends React.Component {

	render() {

		return (
			<FormItem label={this.props.label} >
	          <Select
	           combobox
	           style={this.props.style}>
			      <Option value="未提供">未提供</Option>
			    </Select>
	        </FormItem>
		)
	}
}

FormItemWithUnknown.propTypes = {
	label: PropTypes.string.isRequired,
	style: PropTypes.object.isRequired,
}