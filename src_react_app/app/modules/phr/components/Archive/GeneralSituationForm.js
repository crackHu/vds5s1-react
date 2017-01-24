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

import {
	DATE_FORMAT_STRING
} from 'config'
import {
	CONFIG as LCONFIG
} from 'login_conf'
import {
	ARC_FORM_WIDGET_CONFIG as WIDGET_CONFIG,
	PERSONALDETAIL_FIELDS_CONFIG as FIELDS,
	FROM_INITIAL_VALUE_CONFIG as INIT,
} from 'phr_conf'

import MedicalRecordsTable from './MedicalRecordsTable'
import MultiSelect from 'app_base/components/MultiSelect'

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const InputGroup = Input.Group;
const ButtonGroup = Button.Group;

const USR = LCONFIG.LS.USR
const user = JSON.parse(localStorage.getItem(USR))
const userName = user ? user.userName : DEFAULT_USERNAME
const DEFAULT = LCONFIG.DEFAULT
const DEFAULT_USERNAME = DEFAULT.USERNAME
const DEFAULT_DATE = '1950-1-1'
const ARC_TAB = 'grdaJbzl'

/*一般情况*/
class GeneralSituationForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			age: '未知'
		}

		this.cascadeOptions = WIDGET_CONFIG.cascadeOptions
		this.checkboxGroupOptions = WIDGET_CONFIG.checkboxGroupOptions
		this.selectOption = WIDGET_CONFIG.selectOption

		/*现住址*/
		this.curAddressOptions = this.cascadeOptions.curAddress;
		/*户籍地址*/
		this.censusRegisterOptions = this.cascadeOptions.censusRegister;

		/*医疗费用支付方式*/
		this.medicalPayMethodOptions = this.checkboxGroupOptions.medicalPayMethod;
		/*药物过敏*/
		this.drugAllergyOptions = this.checkboxGroupOptions.drugAllergy;
		/*暴露史*/
		this.exposureHistoryOptions = this.checkboxGroupOptions.exposureHistory;

		/*性别*/
		this.sexOptions = this.selectOption.sex;
		/*常住类型 居住类型*/
		this.perTypeOptions = this.selectOption.permanentType;
		/*档案状态*/
		this.arcStatusOptions = this.selectOption.archiveStatus;
		/*民族*/
		this.nationalityOptions = this.selectOption.nationality;
		/*血型*/
		this.bloodTypeOptions = this.selectOption.bloodType;
		/*True or false*/
		this.tofOptions = this.selectOption.tof;
		/*RH阴性*/
		this.rhOptions = this.selectOption.rhNegative;
		/*文化程度*/
		this.lvOfEduOptions = this.selectOption.lvOfEducation;
		/*职业*/
		this.professionOptions = this.selectOption.profession;
		/*婚姻状况*/
		this.maritalStatusOptions = this.selectOption.maritalStatus;
		/*签约来源*/
		this.signSourceOptions = this.selectOption.signSource;

		this.xzz = 'undefined'
		this.xzz_qt = 'undefined'
		this.hkdz = 'undefined'
		this.hkdz_qt = 'undefined'
	}

	getSelectOptions = (data) => {
		return data.map((item, i) => {
			return <Option key={item.value}>{item.value}</Option>
		})
	}

	componentWillMount = () => {
		console.log('GeneralSituationForm componentWillMount')
	}

	componentDidMount = () => {
		console.log('GeneralSituationForm componentDidMount')
		this.initialValue(ARC_TAB)
	}

	componentWillReceiveProps = (nextProps) => {
		console.log('GeneralSituationForm.componentWillReceiveProps', nextProps)
		this.generateAge()
	}

	componentWillUpdate = (nextProps, nextState) => {
		console.log('GeneralSituationForm.componentWillUpdate', nextProps, nextState)
	}

	componentDidUpdate = (prevProps, prevState) => {
		console.log("GeneralSituationForm.componentDidUpdate", this.props, prevProps, prevState)
	}

	//生成年龄
	generateAge = () => {
		const grda_csrq = this.props.form.getFieldValue('grda_csrq')
		console.log('年龄', grda_csrq)
		if (!!grda_csrq) {
			const fromNow = grda_csrq.fromNow()
			const age = fromNow.replace(' 年前', '岁').replace(' years ago', '岁')
			if (!!fromNow) {
				this.setState({
					age
				})
			}
			console.log('年龄', fromNow)
		}
	}

	//初始化表单数据
	initialValue = (key) => {
		try {
			this.props.form.setFieldsValue(INIT[key])
		} catch (e) {
			throw Error(`initialValue => ${e.message}`)
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('收到表单值：', this.props.form.getFieldsValue());
	}

	/*现住址或户籍地址事件 用于获取个人编号 bug todo*/
	onAddrOtherBlur = (flag = 'hkdz') => {
		let fields = this.props.grdaJbzlFields
		if (!!fields) {
			let grda_xzz = fields.grda_xzz
			let grda_xzz_qt = fields.grda_xzz_qt
			let grda_hkdz = fields.grda_hkdz
			let grda_hkdz_qt = fields.grda_hkdz_qt

			let hkdzValue, hkdzQtValue, xzzValue, xzzQtValue

			if (!!grda_hkdz && !!grda_hkdz_qt) {
				hkdzValue = grda_hkdz.value
				hkdzQtValue = grda_hkdz_qt.value
				console.log('qqq1', hkdzValue, hkdzQtValue, this.hkdz_qt)
				if (hkdzQtValue != this.hkdz_qt) {
					this.props.getCurrentAddress(hkdzValue, hkdzQtValue, flag)
					this.hkdz = hkdzValue
					this.hkdz_qt = hkdzQtValue
				}
			} else if (!!grda_xzz && !!grda_xzz_qt) {
				xzzValue = grda_xzz.value
				xzzQtValue = grda_xzz_qt.value
				console.log('qqq2', xzzValue, xzzQtValue, this.xzz_qt)
				if (xzzQtValue != this.xzz_qt) {
					this.props.getCurrentAddress(xzzValue, xzzQtValue, flag)
					this.xzz = xzzValue
					this.xzz_qt = xzzQtValue
				}
			}

			//2016年12月8日17:17:43 现住址、户籍地址相互自动生成
			const {
				getFieldValue,
				setFieldsValue
			} = this.props.form
			if (flag == 'xzz') {
				setFieldsValue({
					grda_hkdz_qt: xzzQtValue || ''
				})
			}
		}
	}

	onAddrChange = (value, flag = 'hkdz') => {
		console.log('qqq3', value, flag)
		let fields = this.props.grdaJbzlFields
		if (!!fields) {
			let grda_xzz = fields.grda_xzz
			let grda_xzz_qt = fields.grda_xzz_qt
			let grda_hkdz = fields.grda_hkdz
			let grda_hkdz_qt = fields.grda_hkdz_qt

			if (flag == 'hkdz' && !!grda_hkdz_qt) {
				//if (!grda_xzz && !grda_xzz_qt) {
				let hkdzQtValue = grda_hkdz_qt.value
				if (value + '' != this.hkdz + '') {
					this.props.getCurrentAddress(value, hkdzQtValue, flag)
					this.hkdz = value
					this.hkdz_qt = hkdzQtValue
				}
				//}
			} else if (flag == 'xzz' && !!grda_xzz_qt && !grda_hkdz && !grda_hkdz_qt) {
				let xzzQtValue = grda_xzz_qt.value
				if (value + '' != this.xzz + '') {
					this.props.getCurrentAddress(value, xzzQtValue, flag)
					this.xzz = value
					this.xzz_qt = xzzQtValue
				}
			}

			//2016年12月8日17:17:43 现住址、户籍地址相互自动生成
			const {
				getFieldsValue,
				setFieldsValue
			} = this.props.form

			if (flag == 'xzz') {
				if (!!value && value.constructor == Array && value.length > 0) {
					setFieldsValue({
						grda_hkdz: ['广东省'].concat(value)
					})
				}
			}
		}
	}

	render() {
		const {
			getFieldDecorator
		} = this.props.form

		/*性别*/
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
			getFieldDecorator('grda_csrq', {})(
				<DatePicker
		          format={DATE_FORMAT_STRING}
		          style={{ width: 120 }}
		          disabledDate={(current) => {return current && current.valueOf() > Date.now()}}
		        />
			)

		/*身份证号码*/
		const grda_sfzhm =
			getFieldDecorator('grda_sfzhm')(
				<Input style={{ width: 140 }}/>
			)

		/*民族名称*/
		const grda_mzmc =
			getFieldDecorator('grda_mzmc')(
				<Select
		           showSearch
		           optionFilterProp="children"
				   notFoundContent="没有该民族"
		           style={{ width: 73 }}
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
		        	 onChange={(value) => this.onAddrChange(value, 'xzz')}
		        	 showSearch
	        	/>
			)

		/*现住址 其它*/
		const grda_xzz_qt =
			getFieldDecorator('grda_xzz_qt')(
				<Input
				 placeholder="路（街）"
				 style={{ width: 150 }}
				 onBlur={() => this.onAddrOtherBlur('xzz')}
				/>
			)

		/*常住类型*/
		const grda_hklx =
			getFieldDecorator('grda_hklx')(
				<Select combobox style={{ width: 148 }}>
			       	{this.getSelectOptions(this.perTypeOptions)}
		      	</Select>
			)

		/*户口地址*/
		const grda_hkdz =
			getFieldDecorator('grda_hkdz')(
				<Cascader
		        	options={this.censusRegisterOptions}
		        	placeholder="请选择户籍地址"
		        	style={{ width: 322 }} 
		        	onChange={(value) => this.onAddrChange(value, 'hkdz')}
		        	showSearch
		       	/>
			)

		/*户口地址 其它*/
		const grda_hkdz_qt =
			getFieldDecorator('grda_hkdz_qt')(
				<Input
				 placeholder="路（街）"
				 style={{ width: 150 }}
				 onBlur={() => this.onAddrOtherBlur('hkdz')}
				/>
			)

		/*婚姻状况*/
		const grda_hys =
			getFieldDecorator('grda_hys')(
				<Select combobox style={{ width: 148 }}>
       	  			{this.getSelectOptions(this.maritalStatusOptions)}
			    </Select>
			)

		/*本人电话*/
		const grda_brdh =
			getFieldDecorator('grda_brdh')(
				<Select combobox style={{ width: 120 }}>
	       	  		<Option key='未提供'>未提供</Option>
			    </Select>
			)

		/*联系人姓名*/
		const grda_lxrxm =
			getFieldDecorator('grda_lxrxm')(
				<Select combobox style={{ width: 120 }}>
	       	  		<Option key='未提供'>未提供</Option>
			    </Select>
			)

		/*联系人电话*/
		const grda_lxrdh =
			getFieldDecorator('grda_lxrdh')(
				<Select combobox style={{ width: 120 }}>
	       	  		<Option key='未提供'>未提供</Option>
			    </Select>
			)

		/*档案状态*/
		const grda_dazt =
			getFieldDecorator('grda_dazt')(
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
			       {this.getSelectOptions(this.rhOptions)}
			  	</Select>
			)

		/*职业*/
		const grda_zygzmc =
			getFieldDecorator('grda_zygzmc')(
				<Select combobox style={{ width: 304 }}>
			       {this.getSelectOptions(this.professionOptions)}
			  	</Select>
			)

		/*工作单位*/
		const grda_gzdw =
			getFieldDecorator('grda_gzdw')(
				<Select combobox style={{ width: 323 }}>
	       	  		<Option key='未提供'>未提供</Option>
			    </Select>
			)

		/*文化程度*/
		const grda_whcd =
			getFieldDecorator('grda_whcd')(
				<Select combobox style={{ width: 304 }}>
			       {this.getSelectOptions(this.lvOfEduOptions)}
			  	</Select>
			)

		/*药物过敏*/
		const grda_gms =
			getFieldDecorator('grda_gms')(
				<MultiSelect
					antd={{style: { width: 324},placeholder: "请选择",}}
					options={this.drugAllergyOptions}
				/>
				/*<Select tags
				    style={{ width: 324 }}
					placeholder="请选择"
				  >
				  {this.getSelectOptions(this.drugAllergyOptions)}
				</Select>*/
			)

		/*暴露史*/
		const grda_zyblqk =
			getFieldDecorator('grda_zyblqk')(
				<MultiSelect
					antd={{style: { width: 302},placeholder: "请选择",}}
					options={this.exposureHistoryOptions}
				/>
				/*<Select tags
				    style={{ width: 302 }}
					placeholder="请选择"
				  >
				  {this.getSelectOptions(this.exposureHistoryOptions)}
				</Select>*/
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
			getFieldDecorator('grda_jdys')(
				<Input style={{ width: 120 }}/>
			)

		/*建档日期*/
		const grda_jdrq =
			getFieldDecorator('grda_jdrq')(
				<DatePicker
		           	format={DATE_FORMAT_STRING}
		           	style={{ width: 120 }}
		           	disabledDate={(current) => {return current && current.valueOf() > Date.now()}}
	          	/>
			)

		/*录入人*/
		const grda_lrr =
			getFieldDecorator('grda_lrr')(
				<Input style={{ width: 120 }}/>
			)

		/*录入日期*/
		const grda_lrrq =
			getFieldDecorator('grda_lrrq')(
				<DatePicker
		           	format={DATE_FORMAT_STRING}
		           	style={{ width: 113 }}
		           	disabledDate={(current) => {return current && current.valueOf() > Date.now()}}
	          	/>
			)

		/*责任医生*/
		const grda_zrys =
			getFieldDecorator('grda_zrys')(
				<Input style={{ width: 120 }}/>
			)

		/*签约来源*/
		const source =
			getFieldDecorator('source')(
				<Select combobox style={{ width: 120 }}>
			       {this.getSelectOptions(this.signSourceOptions)}
			  	</Select>
			)

		/*是否签约*/
		const isSign =
			getFieldDecorator('isSign')(
				<Select style={{ width: 120 }}>
			       {this.getSelectOptions(this.tofOptions)}
			  	</Select>
			)

		return (
			<Form inline onSubmit={this.handleSubmit}>
				
				{/*性别*/}
		        <FormItem
		         label="性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别" required>
		            {grda_xb}
		        </FormItem>
		        <FormItem label="出生日期" required>
			        {grda_csrq}{' '}年龄：{this.state.age}
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
	        		{grda_xzz_qt}
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
	        		{grda_hkdz_qt}
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
		        <FormItem label="&nbsp;&nbsp;&nbsp;责任医生">
		        	{grda_zrys}
		        </FormItem>
		        <FormItem label="签约来源" required>
		        	{source}
		        </FormItem>
		        <FormItem label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;是否签约">
		        	{isSign}
		        </FormItem>
		        <br />
		        <br />
			
	        	<div className="dashed_border" />
	        	<MedicalRecordsTable
	        	 fields={this.props.grdaJwsFields}
				 onFieldsChange={this.props.onFieldsChange}
				 updatestate={this.props.updatestate}
				/>
		    </Form>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("GeneralSituationForm onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, 'grdaJbzl');
}

function mapPropsToFields(props) {
	console.log("GeneralSituationForm mapPropsToFields", props)
	return props.grdaJbzlFields || {}
}

GeneralSituationForm.propTypes = {
	getCurrentAddress: PropTypes.func.isRequired,
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(GeneralSituationForm)