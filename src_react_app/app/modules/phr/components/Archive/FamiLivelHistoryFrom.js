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
import FamiHistoryTable from './FamiHistoryTable'

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

		/*残疾情况*/
		this.disabilityOptions = WIDGET_CONFIG.checkboxGroupOptions.disability;
		/*厨房排风设施*/
		this.vFacilityOptions = WIDGET_CONFIG.selectOption.ventilationFacilities;
		/*燃料类型*/
		this.fuelOptions = WIDGET_CONFIG.selectOption.fuelType;
		/*饮水*/
		this.drinkingOptions = WIDGET_CONFIG.selectOption.drinking;
		/*厕所*/
		this.toiletOptions = WIDGET_CONFIG.selectOption.toilet;
		/*禽畜栏*/
		this.livestockOptions = WIDGET_CONFIG.selectOption.livestock;

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

		const formItemLayout = {
			labelCol: {
				span: 7
			},
			wrapperCol: {
				span: 12
			},
		};

		/*遗传病史*/
		const grda_ycbsjbmc =
			getFieldDecorator('grda_ycbsjbmc')(
				<Select combobox style={{ width: 215 }}>
	       	  		<Option key='无'>无</Option>
			    </Select>
			)

		/*残疾情况*/
		const grda_cjqk =
			getFieldDecorator('grda_cjqk')(
				<Select
				 multiple
				 style={{ width: 438 }}>
			       {this.getSelectOptions(this.disabilityOptions)}
			  	</Select>
			)

		/*厨房排风设施*/
		const grda_cfpfss =
			getFieldDecorator('grda_cfpfss')(
				<Select style={{ width: 120 }}>
			       {this.getSelectOptions(this.vFacilityOptions)}
			  	</Select>
			)

		/*燃料类型*/
		const grda_rllx =
			getFieldDecorator('grda_rllx')(
				<Select style={{ width: 120 }}>
			       {this.getSelectOptions(this.fuelOptions)}
			  	</Select>
			)

		/*饮水*/
		const grda_ys =
			getFieldDecorator('grda_ys')(
				<Select style={{ width: 120 }}>
			       {this.getSelectOptions(this.drinkingOptions)}
			  	</Select>
			)

		/*厕所*/
		const grda_cs =
			getFieldDecorator('grda_cs')(
				<Select style={{ width: 120 }}>
			       {this.getSelectOptions(this.toiletOptions)}
			  	</Select>
			)

		/*禽畜栏*/
		const grda_csl =
			getFieldDecorator('grda_csl')(
				<Select style={{ width: 120 }}>
			       {this.getSelectOptions(this.livestockOptions)}
			  	</Select>
			)


		return (
			<Form inline>
				{/*家族史*/}
				<div className="dashed_border form inside">
					<FamiHistoryTable
						fields={this.props.fields}
				 		onFieldsChange={this.props.onFieldsChange}
					/>
				</div>

		        <div className="form_inline_spacing">
					<FormItem
		label = "&nbsp;&nbsp;&nbsp;遗传病史" >
			           {grda_ycbsjbmc}
			        </FormItem>
					<FormItem
		         	 label={<span>残疾情况 <Tooltip title="可多选"><Icon type="question-circle-o" /></Tooltip></span>}>
			           {grda_cjqk}
			        </FormItem>
		        </div>

		        <div className="form_inline_spacing">
		        	<FormItem
			         label="生活环境" required/>
					<FormItem
			         label="厨房排风设施">
			           {grda_cfpfss}
			        </FormItem>
					<FormItem
			         label="燃料类型">
			           {grda_rllx}
			        </FormItem>
					<FormItem
			         label="饮水">
			           {grda_ys}
			        </FormItem>
					<FormItem
			         label="厕所">
			           {grda_cs}
			        </FormItem>
		        </div>

		        <div className="form_inline_spacing" style={{marginLeft: '116px'}}>
					<FormItem
			         label="禽畜栏">
			           {grda_csl}
			        </FormItem>
			    </div>
			</Form>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("FamiLivelHistoryFrom onFieldsChange", props, fields)
	props.onFieldsChange({
		fields,
	});
}

function mapPropsToFields(props) {
	console.log("FamiLivelHistoryFrom mapPropsToFields", props)
	return props.fields;
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(FamiLivelHistoryFrom)