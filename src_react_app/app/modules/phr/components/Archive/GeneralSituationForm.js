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
} from 'antd';
import moment from 'moment'

import {
	DATE_FORMAT_STRING
} from 'config'
import {
	ARC_FORM_WIDGET_CONFIG as WIDGET_CONFIG
} from 'phr_conf'

import MedicalRecordsTable from './MedicalRecordsTable'
import FormItemWithUnknown from '../../../../components/FormItemWithUnknown'

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const InputGroup = Input.Group;
const ButtonGroup = Button.Group;

/*一般情况*/
class GeneralSituationForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}

		/*现住址*/
		this.curAddressOptions = WIDGET_CONFIG.cascadeOptions.curAddress;
		/*户籍地址*/
		this.censusRegisterOptions = WIDGET_CONFIG.cascadeOptions.censusRegister;

		/*医疗费用支付方式*/
		this.medicalPayMethodOptions = WIDGET_CONFIG.checkboxGroupOptions.medicalPayMethod;
		/*药物过敏*/
		this.drugAllergyOptions = WIDGET_CONFIG.checkboxGroupOptions.drugAllergy;
		/*暴露史*/
		this.exposureHistoryOptions = WIDGET_CONFIG.checkboxGroupOptions.exposureHistory;

		/*性别*/
		this.sexOptions = WIDGET_CONFIG.selectOption.sex;
		/*常住类型 居住类型*/
		this.perTypeOptions = WIDGET_CONFIG.selectOption.permanentType;
		/*档案状态*/
		this.arcStatusOptions = WIDGET_CONFIG.selectOption.archiveStatus;
		/*民族*/
		this.nationalityOptions = WIDGET_CONFIG.selectOption.nationality;
		/*血型*/
		this.bloodTypeOptions = WIDGET_CONFIG.selectOption.bloodType;
		/*True or false*/
		this.tofOptions = WIDGET_CONFIG.selectOption.tof;
		/*文化程度*/
		this.lvOfEduOptions = WIDGET_CONFIG.selectOption.lvOfEducation;
		/*职业*/
		this.professionOptions = WIDGET_CONFIG.selectOption.profession;
		/*婚姻状况*/
		this.maritalStatusOptions = WIDGET_CONFIG.selectOption.maritalStatus;
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('收到表单值：', this.props.form.getFieldsValue());
	}

	getSelectOptions = (data) => {
		return data.map((item, i) => {
			return <Option key={i}>{item.value}</Option>
		})
	}

	render() {
		const {
			getFieldDecorator
		} = this.props.form

		return (
			<Form inline onSubmit={this.handleSubmit}>
				<Row>
					<Col>
						{/*性别*/}
				        <FormItem
				         label="性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别" required>
				            {getFieldDecorator('grda_xb', {
				            	rules: [{
				            		required: true
				            	}]
				            })(
					          <Select
					           style={{ width: 120 }}
					          >
					           {this.getSelectOptions(this.sexOptions)}
						      </Select>
				            )}
				        </FormItem>
				        <FormItem label="出生日期" required>
				         <DatePicker
				          defaultValue={moment('1950-1-1', DATE_FORMAT_STRING)}
				          format={DATE_FORMAT_STRING}
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
				        	 style={{ width: 322 }}
				        	/>
				        </FormItem>
				        <FormItem>
			        		<Input placeholder="路（街）"  style={{ width: 150 }}/>
				        </FormItem>
				        <FormItem label="常住类型" required>
				          <Select style={{ width: 148 }}>
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
				        	 style={{ width: 322 }} />
				        </FormItem>
				        <FormItem>
			        		<Input placeholder="路（街）" style={{ width: 150 }}/>
				        </FormItem>

				        <FormItemWithUnknown
				        	label="&nbsp;&nbsp;&nbsp;婚姻状况"
				         	style={{ width: 148 }}
				         	option={this.maritalStatusOptions}
				        />
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
				          <Select style={{ width: 115 }}>
					       {this.getSelectOptions(this.arcStatusOptions)}
						  </Select>
				        </FormItem>
				        <br />
				        <br />

				        {/*血型*/}
				        <FormItem
				         label="&nbsp;&nbsp;&nbsp;血&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型"
				        >
				          <Select style={{ width: 120 }}>
					       {this.getSelectOptions(this.bloodTypeOptions)}
						  </Select>
				        </FormItem>
				        <FormItem label="RH&nbsp;&nbsp;&nbsp;阴&nbsp;&nbsp;&nbsp;性" >
				          <Select style={{ width: 122 }}>
					       {this.getSelectOptions(this.tofOptions)}
						  </Select>
				        </FormItem>
				        <FormItem
				         label="职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业"
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

						<FormItem
						 label="&nbsp;&nbsp;&nbsp;药物过敏">
			        	 	<Select tags
							    style={{ width: 324 }}
    							placeholder="请选择"
							  >
							  {this.getSelectOptions(this.drugAllergyOptions)}
							</Select>
			        	</FormItem>
				        <FormItem
				         label="暴&nbsp;&nbsp;&nbsp;&nbsp;露&nbsp;&nbsp;&nbsp;&nbsp;史">
			        	 	<Select tags
							    style={{ width: 302 }}
    							placeholder="请选择"
							  >
							  {this.getSelectOptions(this.exposureHistoryOptions)}
							</Select>
			        	</FormItem>

				        <br />
				        <br />

						<FormItem
						 label="&nbsp;&nbsp;&nbsp;医疗费用支付方式">
			        	 	<Select tags
							    style={{ width: 662 }}
    							placeholder="请选择"
							  >
							  {this.getSelectOptions(this.medicalPayMethodOptions)}
							</Select>
			        	</FormItem>
				        
				        <br />
				        <br />

				        {/*建档人*/}
				        <FormItem
				         label="&nbsp;&nbsp;&nbsp;建&nbsp;&nbsp;档&nbsp;&nbsp;人" 
				        >
				          <Input style={{ width: 120 }}/>
				        </FormItem>
				        <FormItem
				         label="建&nbsp;档&nbsp;日&nbsp;期" >
				            {getFieldDecorator('grda_jdrq', {initialValue: moment(new Date(), DATE_FORMAT_STRING)})(
					          <DatePicker
					           format={DATE_FORMAT_STRING}
					           style={{ width: 120 }}
					           disabledDate={(current) => {return current && current.valueOf() > Date.now()}}
					          />
				            )}
				        </FormItem>
				        <FormItem
				         label="录&nbsp;&nbsp;&nbsp;&nbsp;入&nbsp;&nbsp;&nbsp;&nbsp;人"
				        >
				          <Input style={{ width: 120 }}/>
				        </FormItem>				
				        <FormItem label="录入日期" >
				          <DatePicker
				           defaultValue={moment(new Date(), DATE_FORMAT_STRING)}
				           format={DATE_FORMAT_STRING}
				           style={{ width: 113}}
				           disabledDate={(current) => {return current && current.valueOf() > Date.now()}}
				        />
				        </FormItem>
				        <br />
				        <br />
					</Col>
				</Row>
		        <Row>
		        	<div className="dashed_top" />
		        	<FormItem
		        	 label={<span>既往史 <Tooltip title={`选择一条多条记录进行编辑或删除操作`}><Icon type="question-circle-o" /></Tooltip></span>}
		        	/>
				</Row>
		        <Row>
		        	<MedicalRecordsTable />
			    </Row>
		    </Form>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("GeneralSituationForm onFieldsChange", fields)
	props.onFieldsChange({
		fields
	});
}

function mapPropsToFields(props) {
	console.log("GeneralSituationForm mapPropsToFields", props.fields)
	return props.fields;
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(GeneralSituationForm)