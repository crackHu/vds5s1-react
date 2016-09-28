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
	Card
} from 'antd';
import moment from 'moment'
import {
	arc_form_widget_config
} from 'config'

import MedicalRecordsTable from './MedicalRecordsTable'
import FormItemWithUnknown from './FormItemWithUnknown'

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const InputGroup = Input.Group;

class GeneralSituationForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			options: [],
		}

		/*现住址*/
		this.curAddressOptions = arc_form_widget_config.cascadeOptions.curAddress;
		/*户籍地址*/
		this.censusRegisterOptions = arc_form_widget_config.cascadeOptions.censusRegister;

		/*医疗费用支付方式*/
		this.medicalPayMethodOptions = arc_form_widget_config.checkboxGroupOptions.medicalPayMethod;
		/*药物过敏*/
		this.drugAllergyOptions = arc_form_widget_config.checkboxGroupOptions.drugAllergy;
		/*暴露史*/
		this.exposureHistoryOptions = arc_form_widget_config.checkboxGroupOptions.exposureHistory;

		/*性别*/
		this.sexOptions = arc_form_widget_config.selectOption.sex;
		/*居住类型*/
		this.perTypeOptions = arc_form_widget_config.selectOption.permanentType;
		/*民族*/
		this.nationalityOptions = arc_form_widget_config.selectOption.nationality;
		/*血型*/
		this.bloodTypeOptions = arc_form_widget_config.selectOption.bloodType;
		/*True or false*/
		this.tofOptions = arc_form_widget_config.selectOption.tof;
		/*文化程度*/
		this.lvOfEduOptions = arc_form_widget_config.selectOption.lvOfEducation;
		/*职业*/
		this.professionOptions = arc_form_widget_config.selectOption.profession;
		/*婚姻状况*/
		this.maritalStatusOptions = arc_form_widget_config.selectOption.maritalStatus;
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('收到表单值：', this.props.form.getFieldsValue());
	}

	getSelectOptions = (data) => {
		return data.map((item, i) => {
			return <Option key={i} value={item.key}>{item.value}</Option>
		})
	}

	render() {
		const {
			getFieldDecorator
		} = this.props.form

		const sex = getFieldDecorator('grda_xb', {
			rules: [{
				required: true,
			}]
		})
		const birthday = getFieldDecorator('grda_xb', {
			rules: [{
				required: true,
			}]
		})


		return (
			<Form inline onSubmit={this.handleSubmit}>
				<Row>
					<Col>
						{/*性别*/}
				        <FormItem label="性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别" required>
				          <Select
				           style={{ width: 120 }}
				           {...sex}
				          >
					       {this.getSelectOptions(this.sexOptions)}
					      </Select>
				        </FormItem>
				        <FormItem label="出生日期" required>
				         <DatePicker
				          defaultValue={moment('1950-1-1', 'YYYY/MM/DD')}
				          format="YYYY-M-D"
				          {...birthday}
				          style={{ width: 120 }}
				          disabledDate={(current) => {return current && current.valueOf() > Date.now()}}
				         />
				        </FormItem>
				        <FormItem label="身份证号" >
			        		<Input style={{ width: 160 }}/>
				        </FormItem>
				        <FormItem label="民族" >
				          <Select
				           showSearch
				           optionFilterProp="children"
						   notFoundContent="没有该民族"
				           style={{ width: 111 }}
				          >
					       {this.getSelectOptions(this.nationalityOptions)}
					      </Select>
				        </FormItem>
				        <br />
				        <br />
				    	{/*现住址*/}
				        <FormItem label="现&nbsp;&nbsp;住&nbsp;&nbsp;址" required>
				        	<Cascader
				        	 options={this.curAddressOptions}
				        	 placeholder="请选择现住址"
				        	 defaultValue={['guangzhou', 'yuexiu', 'dadongjie']}
				        	 style={{ width: 320 }}
				        	/>
				        </FormItem>
				        <FormItem>
			        		<Input placeholder="路（街）"  style={{ width: 150 }}/>
				        </FormItem>
				        <FormItem label="常住类型" required>
				          <Select style={{ width: 150 }}>
					       	{this.getSelectOptions(this.perTypeOptions)}
					      </Select>
				        </FormItem>
				        <br />
				        <br />

				        {/*户籍地址*/}
				        <FormItem label="户籍地址" required>
				        	<Cascader
				        	 options={this.censusRegisterOptions}
				        	 placeholder="请选择现住址"
				        	 defaultValue={['guangdongsheng', 'guangzhou', 'yuexiu', 'dadongjie']}
				        	 style={{ width: 320 }} />
				        </FormItem>
				        <FormItem>
			        		<Input placeholder="路（街）" style={{ width: 150 }}/>
				        </FormItem>

				        <FormItemWithUnknown
				        	label="&nbsp;&nbsp;&nbsp;婚姻状况"
				         	style={{ width: 150 }}
				         	option={this.maritalStatusOptions}
				        />
				         {/* <Select style={{ width: 150 }}>
					       {this.getSelectOptions(this.maritalStatusOptions)}
						  </Select>*/}
				        <br />
				        <br />

				        {/*本人电话*/}
				        <FormItemWithUnknown
				        	label="&nbsp;&nbsp;&nbsp;本人电话"
				         	style={{ width: 120 }}
				        />
				        <FormItemWithUnknown
				        	label="联系人姓名"
				         	style={{ width: 120 }}
				        />
				        <FormItemWithUnknown
				        	label="联系人电话"
				         	style={{ width: 120 }}
				        />
				        <FormItem label="档案状态" >
				          <Select style={{ width: 114 }}>
						      <Option value="phone">在册</Option>
						    </Select>
				        </FormItem>
				        <br />
				        <br />

				        {/*血型*/}
				        <FormItem
				         label="&nbsp;&nbsp;&nbsp;血&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型"
				        >
				          <Select style={{ width: 120 }}>
					       {this.getSelectOptions(this.bloodTypeOptions)}
						  </Select>
				        </FormItem>
				        <FormItem label="RH&nbsp;&nbsp;&nbsp;阴&nbsp;&nbsp;&nbsp;性" >
				          <Select style={{ width: 120 }}>
					       {this.getSelectOptions(this.tofOptions)}
						  </Select>
				        </FormItem>
				        <FormItem
				         label="职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业"
				        >
				          <Select style={{ width: 304 }}>
					       {this.getSelectOptions(this.professionOptions)}
						  </Select>
				        </FormItem>
				        <br />
				        <br />
				        <FormItemWithUnknown
				        	label="&nbsp;&nbsp;&nbsp;工作单位"
				         	style={{ width: 323 }}
				        />
				        <FormItem label="文&nbsp;&nbsp;化&nbsp;程&nbsp;度" >
				          <Select style={{ width: 304 }}>
					       {this.getSelectOptions(this.lvOfEduOptions)}
						  </Select>
				        </FormItem>
				        <br />
				        <br />

				        {/*医疗费用支付方式*/}
				        <FormItem label="医疗费用支付方式" />
				        <br />
			        	<FormItem>
			        		<CheckboxGroup
			        		 options={this.medicalPayMethodOptions}
			        		/>
			        	</FormItem>
			        	<FormItem>
			        		<Input
			        		 placeholder="其他支付方式"
			        		 style={{ width: 100 }}
			        		 disabled
			        		/>
			        	</FormItem>
				        <br />
				        <br />

				        {/*药物过敏*/}
				        <FormItem label="药物过敏">
				        	<RadioGroup>
					        	<Radio key="a" value={1}>有</Radio>
								<Radio key="b" value={2}>无</Radio>
				        	</RadioGroup>
						</FormItem>
				        <FormItem>
				        	<CheckboxGroup options={this.drugAllergyOptions} />
				        </FormItem>
				        <FormItem>
			        		<Input
			        		 placeholder="其他"
			        		 style={{ width: 100 }}
			        		 disabled
			        		/>
			        	</FormItem>
				        <FormItem label="暴露史">
				        	<RadioGroup>
					        	<Radio key="a" value={1}>有</Radio>
								<Radio key="b" value={2}>无</Radio>
				        	</RadioGroup>
				        </FormItem>
				        <FormItem>
				        	<CheckboxGroup options={this.exposureHistoryOptions} />
				        </FormItem> 	
				        <br />
				        <br />

				        {/*建档人*/}
				        <FormItem
				         label="建&nbsp;&nbsp;档&nbsp;&nbsp;人" 
				        >
				          <Input style={{ width: 120 }}/>
				        </FormItem>
				        <FormItem label="建档日期" >
				          <DatePicker
				           defaultValue={moment(new Date(), 'YYYY-M-D')}
				           format="YYYY-M-D"
				           style={{ width: 132 }}
				           disabledDate={(current) => {return current && current.valueOf() > Date.now()}}
				          />
				        </FormItem>
				        <FormItem
				         label="录&nbsp;&nbsp;入&nbsp;&nbsp;人"
				        >
				          <Input style={{ width: 120 }}/>
				        </FormItem>				
				        <FormItem label="录入日期" >
				          <DatePicker
				           defaultValue={moment(new Date(), 'YYYY/MM/DD')}
				           format="YYYY-M-D"
				           style={{ width: 132}}
				           disabledDate={(current) => {return current && current.valueOf() > Date.now()}}
				          />
				        </FormItem>
				        <br />
				        <br />
					</Col>
				</Row>
		        <Row>
		        	<FormItem label="既往史" />
		        	<div style={{width: 1156}}>
			        	<MedicalRecordsTable />
			        </div>
			    </Row>
		    </Form>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("GeneralSituationForm onFieldsChange")
	console.log('change', fields);
	props.onFieldsChange({
		fields
	});
}

function mapPropsToFields(props) {
	console.log("GeneralSituationForm mapPropsToFields")
	console.log(props.fields)
	return props.fields;
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(GeneralSituationForm)