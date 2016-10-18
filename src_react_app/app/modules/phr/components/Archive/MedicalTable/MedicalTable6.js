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
const CheckboxGroup = Checkbox.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const getSelectOptions = (data) => {
	return data.map((item, i) => {
		return <Option key={item.value}>{item.value}</Option>
	})
}

const getRadioOptions = (data) => {
	return data.map((item, i) => {
		return <RadioButton key={item.value} value={item.value}>{item.value}</RadioButton>
	})
}

/*体检表6*/
class MedicalTable6 extends React.Component {

	constructor(props) {
		super(props);

		this.checkboxGroupOptions = WIDGET_CONFIG.checkboxGroupOptions

		/*异常情况*/
		this.abnormalOptions = this.checkboxGroupOptions.abnormal;
		/*健康指导*/
		this.healthGuiOptions = this.checkboxGroupOptions.healthGuide;
		/*危险因素控制*/
		this.rfcOptions = this.checkboxGroupOptions.riskFactorsCon;
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	onAbnormalChange = (e) => {
		console.log(`radio checked:${e.target.value}`);
	}
	onAbnormalAdd = (e) => {}
	onAbnormalRemove = (e) => {}

	render() {

		const {
			getFieldDecorator
		} = this.props.form

		return (
			<Form inline>
				<fieldset>
					<legend style={{width: '70px'}}>健康评价</legend>

					<FormItem label="异常情况" >
						<RadioGroup onChange={this.onAbnormalChange} defaultValue="体检无异常">
					      {getRadioOptions(this.abnormalOptions)}
					    </RadioGroup>
			        </FormItem>

			        <Row className="item_inline_spacing">
		       			<FormItem label="异常1" >
				        	<Input style={{ width: '60%', marginRight: 8 }}/>
				        	<Button onClick={() => this.onAbnormalRemove()}>移除</Button>
				        </FormItem>
				    </Row>
				    <Button type="primary" onClick={this.onAbnormalAdd}>添加异常</Button>

			        {/*<Row className="item_inline_spacing">
		       			<FormItem label="异常2" >
				        	<Input />
				        </FormItem>
				    </Row>

			        <Row className="item_inline_spacing">
		       			<FormItem label="异常3" >
				        	<Input />
				        </FormItem>
				    </Row>

		       			<FormItem label="异常4" >
				        	<Input />
				        </FormItem>

			        <Row className="item_inline_spacing">
		       			<FormItem label="异常5" >
				        	<Input />
				        </FormItem>
				    </Row>

			        <Row className="item_inline_spacing">
		       			<FormItem label="异常6" >
				        	<Input />
				        </FormItem>
				    </Row>

			        <Row className="item_inline_spacing">
		       			<FormItem label="异常7" >
				        	<Input />
				        </FormItem>
				    </Row>*/}
				</fieldset>
				<fieldset>
					<legend style={{width: '70px'}}>健康指导</legend>

			        <Row className="item_inline_spacing">
			        	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		       			<FormItem label="健康指导" >
				        	<Select
				        		tags
							    style={{ width: 500 }}
								placeholder="请选择"
							  >	
							  {getSelectOptions(this.healthGuiOptions)}
							</Select>
				        </FormItem>
				    </Row>
			        <Row className="item_inline_spacing">
		       			<FormItem label="危险因素控制" >
				        	<Select
				        		tags
							    style={{ width: 500 }}
								placeholder="请选择"
							  >	
							  {getSelectOptions(this.rfcOptions)}
							</Select>
				        </FormItem>
				    </Row>
				</fieldset>
			</Form>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("MedicalTable6 onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("MedicalTable6 mapPropsToFields")
}

export default Form.create(onFieldsChange, mapPropsToFields)(MedicalTable6)