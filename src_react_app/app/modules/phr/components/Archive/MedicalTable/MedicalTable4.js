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
import HospitalizationTable from './HospitalizationTable'
import MultiSelect from 'app_base/components/MultiSelect'

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

/*体检表4*/
class MedicalTable4 extends React.Component {

	constructor(props) {
		super(props);

		this.checkboxGroupOptions = WIDGET_CONFIG.checkboxGroupOptions

		/*脑血管疾病*/
		this.cbDisOptions = this.checkboxGroupOptions.cerebrovascularDis;
		/*肾脏疾病*/
		this.kidneyDisOptions = this.checkboxGroupOptions.kidneyDis;
		/*心脏疾病*/
		this.heartDisOptions = this.checkboxGroupOptions.heartDis;
		/*血管疾病*/
		this.vlDisOptions = this.checkboxGroupOptions.vascularDis;
		/*眼部疾病*/
		this.eyeDisOptions = this.checkboxGroupOptions.eyeDis;
		/*神经系统疾病*/
		this.nvDisOptions = this.checkboxGroupOptions.nervousDis;
		/*其他系统疾病*/
		this.otherDisOptions = this.checkboxGroupOptions.otherDis;
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	render() {

		const {
			getFieldDecorator
		} = this.props.form

		return (
			<Form inline>
				<fieldset>
					<legend style={{width: '130px'}}>现存主要健康问题</legend>
		       		<Row className="item_inline_spacing">
		       			&nbsp;&nbsp;&nbsp;&nbsp;
		       			<FormItem label="脑血管疾病" >
			       			{getFieldDecorator('grda_nxgjb')(
			       				<MultiSelect
									antd={{style: { width: 200},placeholder: "请选择",}}
									options={this.cbDisOptions}
								/>
					        	/*<Select
					        		tags
								    style={{ width: 200 }}
									placeholder="未发现"
								  >	
								  {getSelectOptions(this.cbDisOptions)}
								</Select>*/
			       			)}
				        </FormItem>
		       			<FormItem label="肾脏疾病" >
			       			{getFieldDecorator('grda_szjb')(
			       				<MultiSelect
									antd={{style: { width: 200},placeholder: "请选择",}}
									options={this.kidneyDisOptions}
								/>
					        	/*<Select
					        		tags
								    style={{ width: 200 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.kidneyDisOptions)}
								</Select>*/
			       			)}
				        </FormItem>
		       			<FormItem label="心脏疾病" >
			       			{getFieldDecorator('grda_xzjb')(
			       				<MultiSelect
									antd={{style: { width: 200},placeholder: "请选择",}}
									options={this.heartDisOptions}
								/>
					        	/*<Select
					        		tags
								    style={{ width: 200 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.heartDisOptions)}
								</Select>*/
			       			)}
				        </FormItem>
				    </Row>
		       		<Row className="item_inline_spacing">
		       			<FormItem label="神经系统疾病" >
			       			{getFieldDecorator('grda_sjxtjb')(
			       				<MultiSelect
									antd={{style: { width: 200},placeholder: "请选择",}}
									options={this.nvDisOptions}
								/>
					        	/*<Select
					        		tags
								    style={{ width: 200 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.nvDisOptions)}
								</Select>*/
			       			)}
				        </FormItem>
		       			<FormItem label="眼部疾病" >
			       			{getFieldDecorator('grda_ybjb')(
			       				<MultiSelect
									antd={{style: { width: 200},placeholder: "请选择",}}
									options={this.eyeDisOptions}
								/>
					        	/*<Select
					        		tags
								    style={{ width: 200 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.eyeDisOptions)}
								</Select>*/
			       			)}
				        </FormItem>
		       			<FormItem label="血管疾病" >
			       			{getFieldDecorator('grda_xgjb')(
			       				<MultiSelect
									antd={{style: { width: 200},placeholder: "请选择",}}
									options={this.vlDisOptions}
								/>
					        	/*<Select
					        		tags
								    style={{ width: 200 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.vlDisOptions)}
								</Select>*/
			       			)}
				        </FormItem>
		       		</Row>
		       		<Row className="item_inline_spacing">
		       			&nbsp;&nbsp;&nbsp;&nbsp;
		       			<FormItem label="其他统疾病" >
			       			{getFieldDecorator('grda_qtxtjb')(
			       				<MultiSelect
									antd={{style: { width: 200},placeholder: "请选择",}}
									options={this.otherDisOptions}
								/>
					        	/*<Select
					        		tags
								    style={{ width: 200 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.otherDisOptions)}
								</Select>*/
			       			)}
				        </FormItem>
		       		</Row>
		       	</fieldset>

		       	<fieldset>
					<legend style={{width: '100px'}}>住院治疗情况</legend>
					<HospitalizationTable 
					 fields={this.props.grdaZyzlqkFields}
					 onFieldsChange={this.props.onFieldsChange}
					 grdaZyzlqkObjSize={this.props.grdaZyzlqkObjSize}
					/>
				</fieldset>
			</Form>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("MedicalTable4 onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, 'grdaJkzk');
}

function mapPropsToFields(props) {
	console.log("MedicalTable4 mapPropsToFields", props)
	return props.fields || {}
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(MedicalTable4)