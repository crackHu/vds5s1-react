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
	CONFIG as LCONFIG
} from 'login_conf'
import {
	ARC_FORM_WIDGET_CONFIG as WIDGET_CONFIG,
	PERSONALDETAIL_FIELDS_CONFIG as FIELDS
} from 'phr_conf'

import MedicalRecordsTable from './MedicalRecordsTable'
import SelectWithUnknown from '../../../../components/SelectWithUnknown'

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const InputGroup = Input.Group;
const ButtonGroup = Button.Group;

const USR = LCONFIG.LS.USR
const DEFAULT_USR = LCONFIG.DEFAULT_USR

const username = localStorage.getItem(USR) || DEFAULT_USR
const DEFAULT_DATE = '1950-1-1'

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

	getSelectOptions = (data) => {
		return data.map((item, i) => {
			return <Option key={item.value}>{item.value}</Option>
		})
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('收到表单值：', this.props.form.getFieldsValue());
	}

	render() {
		const {
			getFieldDecorator
		} = this.props.form

		/*姓名*/
		const grda_xb =
			getFieldDecorator('grda_xb')(
				<Select
		           style={{ width: 120 }}
		          >
		           {this.getSelectOptions(this.sexOptions)}
		      	</Select>
			)

		/*出生日期*/
		const grda_csrq =
			getFieldDecorator('grda_csrq', {
				initialValue: moment(DEFAULT_DATE, DATE_FORMAT_STRING)
			})(
				<DatePicker required
		          format={DATE_FORMAT_STRING}
		          style={{ width: 120 }}
		          disabledDate={(current) => {return current && current.valueOf() > Date.now()}}
		        />
			)

		/*身份证号码*/
		const grda_sfzhm =
			getFieldDecorator('grda_sfzhm')(
				<Input style={{ width: 160 }}/>
			)

		/*民族名称*/
		const grda_mzmc =
			getFieldDecorator('grda_mzmc')(
				<Select
		           showSearch
		           optionFilterProp="children"
				   notFoundContent="没有该民族"
		           style={{ width: 111 }}
		          >
			       {this.getSelectOptions(this.nationalityOptions)}
		        </Select>
			)

		/*现住址*/
		const grda_xzz =
			getFieldDecorator('grda_xzz')(
				<Cascader
		        	 options={this.curAddressOptions}
		        	 placeholder="请选择现住址"
		        	 style={{ width: 322 }}
	        	/>
			)

		/*现住址 路(街)名称*/
		const grda_xzz_ljmc =
			getFieldDecorator('grda_xzz_ljmc')(
				<Input placeholder="路（街）"  style={{ width: 150 }}/>
			)

		/*常住类型*/
		const grda_hklx =
			getFieldDecorator('grda_hklx')(
				<Select style={{ width: 148 }}>
			       	{this.getSelectOptions(this.perTypeOptions)}
		      	</Select>
			)

		/*户口地址*/
		const grda_hkdz =
			getFieldDecorator('grda_hkdz')(
				<Cascader
		        	options={this.censusRegisterOptions}
		        	placeholder="请选择现住址"
		        	style={{ width: 322 }} 
		       	/>
			)

		/*户口地址 路_街_名称*/
		const grda_hkdz_ljmc =
			getFieldDecorator('grda_hkdz_ljmc')(
				<Input placeholder="路（街）" style={{ width: 150 }}/>
			)

		/*婚姻状况*/
		const grda_hys =
			getFieldDecorator('grda_hys')(
				<Select combobox style={{ width: 148 }}>
	       	  		<Option key='未提供'>未提供</Option>
			    </Select>
			)

		/*本人电话*/
		const grda_brdh =
			getFieldDecorator('grda_brdh')(
				<Select combobox style={{ width: 120 }}>
	       	  		<Option key='1' value="未提供">未提供</Option>
			    </Select>
			)

		/*联系人姓名*/
		const grda_lxrxm =
			getFieldDecorator('grda_lxrxm')(
				<Select combobox style={{ width: 120 }}>
	       	  		<Option key='1' value="未提供">未提供</Option>
			    </Select>
			)

		/*联系人电话*/
		const grda_lxrdh =
			getFieldDecorator('grda_lxrdh')(
				<Select combobox style={{ width: 120 }}>
	       	  		<Option key='1' value="未提供">未提供</Option>
			    </Select>
			)

		/*档案状态*/
		const grda_dazt =
			getFieldDecorator('grda_lxrdh')(
				<Select style={{ width: 115 }}>
			       {this.getSelectOptions(this.arcStatusOptions)}
			  	</Select>
			)

		/*血型*/
		const grda_xxfli =
			getFieldDecorator('grda_xxfli')(
				<Select style={{ width: 120 }}>
			       {this.getSelectOptions(this.bloodTypeOptions)}
			  	</Select>
			)

		/*RH阴性*/
		const grda_xxflii =
			getFieldDecorator('grda_xxflii')(
				<Select style={{ width: 122 }}>
			       {this.getSelectOptions(this.tofOptions)}
			  	</Select>
			)

		/*职业*/
		const grda_zygzmc =
			getFieldDecorator('grda_zygzmc')(
				<Select style={{ width: 304 }}>
			       {this.getSelectOptions(this.professionOptions)}
			  	</Select>
			)

		/*工作单位*/
		const grda_gzdw =
			getFieldDecorator('grda_gzdw')(
				<Select combobox style={{ width: 323 }}>
	       	  		<Option key='1' value="未提供">未提供</Option>
			    </Select>
			)

		/*文化程度*/
		const grda_whcd =
			getFieldDecorator('grda_whcd')(
				<Select style={{ width: 304 }}>
			       {this.getSelectOptions(this.lvOfEduOptions)}
			  	</Select>
			)

		/*药物过敏*/
		const grda_gms =
			getFieldDecorator('grda_gms')(
				<Select tags
				    style={{ width: 324 }}
					placeholder="请选择"
				  >
				  {this.getSelectOptions(this.drugAllergyOptions)}
				</Select>
			)

		/*暴露史*/
		const grda_zyblqk =
			getFieldDecorator('grda_zyblqk')(
				<Select tags
				    style={{ width: 302 }}
					placeholder="请选择"
				  >
				  {this.getSelectOptions(this.exposureHistoryOptions)}
				</Select>
			)

		/*医疗费用支付方式*/
		const grda_ylfdxs =
			getFieldDecorator('grda_ylfdxs')(
				<Select tags
				    style={{ width: 662 }}
					placeholder="请选择"
				  >
				  {this.getSelectOptions(this.medicalPayMethodOptions)}
				</Select>
			)

		/*建档人*/
		const grda_jdys =
			getFieldDecorator('grda_jdys', {
				initialValue: username
			})(
				<Input style={{ width: 120 }}/>
			)

		/*建档日期*/
		const grda_jdrq =
			getFieldDecorator('grda_jdrq', {
				initialValue: moment(new Date(), DATE_FORMAT_STRING)
			})(
				<DatePicker
		           	format={DATE_FORMAT_STRING}
		           	style={{ width: 120 }}
		           	disabledDate={(current) => {return current && current.valueOf() > Date.now()}}
	          	/>
			)

		/*录入人*/
		const grda_lrr =
			getFieldDecorator('grda_lrr', {
				initialValue: username
			})(
				<Input style={{ width: 120 }}/>
			)

		/*录入日期*/
		const grda_lrrq =
			getFieldDecorator('grda_lrrq', {
				initialValue: moment(new Date(), DATE_FORMAT_STRING)
			})(
				<DatePicker
		           	format={DATE_FORMAT_STRING}
		           	style={{ width: 113 }}
		           	disabledDate={(current) => {return current && current.valueOf() > Date.now()}}
	          	/>
			)



		return (
			<Form inline onSubmit={this.handleSubmit}>
				
				{/*性别*/}
		        <FormItem
		         label="性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别" required>
		            {grda_xb}
		        </FormItem>
		        <FormItem label="出生日期" required>
			        {grda_csrq}
		        </FormItem>
		        <FormItem label="身份证号" >
	        		{grda_sfzhm}
		        </FormItem>
		        <FormItem label="民族" >
		          	{grda_mzmc}
		        </FormItem>
		        <br />
		        <br />
		    	{/*现住址*/}
		        <FormItem label="现&nbsp;&nbsp;住&nbsp;&nbsp;址" required>
		        	{grda_xzz}
		        </FormItem>
		        <FormItem>
	        		{grda_xzz_ljmc}
		        </FormItem>
		        <FormItem label="常住类型" required>
		          	{grda_hklx}
		        </FormItem>
		        <br />
		        <br />

		        {/*户籍地址*/}
		        <FormItem label="户籍地址" required>
		        	{grda_hkdz}
		        </FormItem>
		        <FormItem>
	        		{grda_hkdz_ljmc}
		        </FormItem>

		        <FormItem label="&nbsp;&nbsp;&nbsp;婚姻状况" >
		        	{grda_hys}
		        </FormItem>
		        <br />
		        <br />

		        {/*本人电话*/}
		        <FormItem label="&nbsp;&nbsp;&nbsp;本人电话" >
		        	{grda_brdh}
		        </FormItem>
		        <FormItem label="联系人姓名" >
		        	{grda_lxrxm}
		        </FormItem>
		        <FormItem label="联系人电话" >
		        	{grda_lxrdh}
		        </FormItem>
		        <FormItem label="档案状态" >
	          		{grda_dazt}
		        </FormItem>
		        <br />
		        <br />

		        {/*血型*/}
		        <FormItem
		         label="&nbsp;&nbsp;&nbsp;血&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型"
		        >
	          		{grda_xxfli}
		        </FormItem>
		        <FormItem label="RH&nbsp;&nbsp;&nbsp;阴&nbsp;&nbsp;&nbsp;性" >
	          		{grda_xxflii}
		        </FormItem>
		        <FormItem
		         label="职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业"
		        >
	          		{grda_zygzmc}
		        </FormItem>
		        <br />
		        <br />
		        <FormItem label="&nbsp;&nbsp;&nbsp;工作单位" >
		        	{grda_gzdw}
		        </FormItem>
		        <FormItem label="文&nbsp;&nbsp;化&nbsp;程&nbsp;度" >
	          		{grda_whcd}
		        </FormItem>

		        <br />
		        <br />

				<FormItem
				 label="&nbsp;&nbsp;&nbsp;药物过敏">
	        	 	{grda_gms}
	        	</FormItem>
		        <FormItem
		         label="暴&nbsp;&nbsp;&nbsp;&nbsp;露&nbsp;&nbsp;&nbsp;&nbsp;史">
	        	 	{grda_zyblqk}
	        	</FormItem>

		        <br />
		        <br />

				<FormItem
				 label="&nbsp;&nbsp;&nbsp;医疗费用支付方式">
	        	 	{grda_ylfdxs}
	        	</FormItem>
		        
		        <br />
		        <br />

		        {/*建档人*/}
		        <FormItem
		         label="&nbsp;&nbsp;&nbsp;建&nbsp;&nbsp;档&nbsp;&nbsp;人" 
		        >
	          		{grda_jdys}
		        </FormItem>
		        <FormItem
		         label="建&nbsp;档&nbsp;日&nbsp;期" >
		            {grda_jdrq}
		        </FormItem>
		        <FormItem
		         label="录&nbsp;&nbsp;&nbsp;&nbsp;入&nbsp;&nbsp;&nbsp;&nbsp;人"
		        >
		          	{grda_lrr}
		        </FormItem>				
		        <FormItem label="录入日期">
		        	{grda_lrrq}
		        </FormItem>
		        <br />
		        <br />
			
	        	<div className="dashed_border" />
	        	<FormItem
	        	 label={<span>既往史 <Tooltip title={`选择一条多条记录进行编辑或删除操作`}><Icon type="question-circle-o" /></Tooltip></span>}
	        	/>
	        	<MedicalRecordsTable
	        	 fields={this.props.fields}
				 onFieldsChange={this.props.onFieldsChange}
				/>
		    </Form>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("GeneralSituationForm onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	});
}

function mapPropsToFields(props, flag) {
	console.log("GeneralSituationForm mapPropsToFields", props.fields)
	return props.fields;
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(GeneralSituationForm)