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
import MainMedicationsTable from './MainMedicationsTable'
import VaccinationHistoryTable from './VaccinationHistoryTable'

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

/*体检表5*/
class MedicalTable5 extends React.Component {

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
			<div>
				<fieldset>
					<legend style={{width: '100px'}}>主要用药情况</legend>
					<MainMedicationsTable
						fields={this.props.grdaZyyyqkFields}
						onFieldsChange={this.props.onFieldsChange}
						grdaZyyyqkObjSize={this.props.grdaZyyyqkObjSize}
					/>
				</fieldset>
				<fieldset>
					<legend style={{width: '150px'}}>非免疫规划预防接种史</legend>
					<VaccinationHistoryTable
						fields={this.props.grdaFmyjzsFields}
						onFieldsChange={this.props.onFieldsChange}
						grdaFmyjzsObjSize={this.props.grdaFmyjzsObjSize}
					/>
				</fieldset>
			</div>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("MedicalTable5 onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("MedicalTable5 mapPropsToFields")
}

export default Form.create(onFieldsChange, mapPropsToFields)(MedicalTable5)