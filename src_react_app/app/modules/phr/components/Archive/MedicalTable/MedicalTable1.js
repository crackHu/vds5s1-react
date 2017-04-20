import React, {
	Component,
	PropTypes
} from 'react'
import classNames from 'classnames';
import {
	Form,
	Input,
	InputNumber,
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

import MultiSelect from 'app_base/components/MultiSelect'

import {
	ARC_FORM_WIDGET_CONFIG as WIDGET_CONFIG,
} from 'phr_conf'
import {
	getMomentObj as moment
} from 'utils'

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const CheckboxGroup = Checkbox.Group;
const InputGroup = Input.Group;

const getSelectOptions = (data) => {
	return data.map((item, i) => {
		return <Option key={item.value}>{item.value}</Option>
	})
}

/*体检表1*/
class MedicalTable1 extends React.Component {

	constructor(props) {
		super(props);

		this.checkboxGroupOptions = WIDGET_CONFIG.checkboxGroupOptions
		this.selectOption = WIDGET_CONFIG.selectOption

		/*症状*/
		this.symptomsOptions = this.checkboxGroupOptions.symptoms;
		/*饮酒种类*/
		this.dKindsOptions = this.checkboxGroupOptions.drinkingKinds;
		/*毒物种类*/
		this.pKindsOptions = this.checkboxGroupOptions.poisonKinds;

		/*健康状态自我评估*/
		this.hSelfAssOptions = this.selectOption.healthSelfAss;
		/*自理能力自我评估*/
		this.aSelfAssOptions = this.selectOption.abilitySelfAss;
		/*认识能力*/
		this.unAbilityOptions = this.selectOption.understandAbility;
		/*情感状态*/
		this.eStateOptions = this.selectOption.emotionalState;
		/*锻炼频率*/
		this.eFreqOptions = this.selectOption.exerciseFrequency;
		/*饮食习惯*/
		this.eHabitsOptions = this.selectOption.eatingHabits;
		/*吸烟状况*/
		this.sStateOptions = this.selectOption.smokingStatus;
		/*饮酒频率*/
		this.dFreqOptions = this.selectOption.drinkingFrequency;
		/*是否戒酒*/
		this.gUpDrinkOptions = this.selectOption.isGiveUpDrinking;
		/*吸烟状况*/
		this.sStateOptions = this.selectOption.smokingStatus;
		/*一年内是否醉酒*/
		this.isDrunkOptions = this.selectOption.isDrunk;
		/*职业病危害因素接触史*/
		this.hFactorsOptions = this.selectOption.hazardFactors;
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	//BMI自动生成
	changeBMIValue = (value, key) => {
		const {
			getFieldsValue,
			getFieldValue,
			setFieldsValue
		} = this.props.form

		const bmi = 'grda_tzzs'
		const index = key.indexOf('sg')
		const underline = key.lastIndexOf('_')
		const prefix = key.substring(0, underline + 1)

		let weight, height, wValue, hValue
		if (index > -1) {
			weight = prefix.concat('tz')
			wValue = getFieldValue(weight)
			hValue = value
		} else {
			height = prefix.concat('sg')
			hValue = getFieldValue(height)
			wValue = value
		}

		//体质指数（BMI）= 体重（kg）÷ 身高²（m）
		if (!!wValue && !!hValue) {
			setFieldsValue({
				[bmi]: (wValue / Math.pow(hValue * 0.01, 2)).toFixed(1)
			})
		}
	}

	render() {
		const {
			getFieldDecorator,
			setFieldsValue,
			getFieldValue
		} = this.props.form

		const grda_tjrq = getFieldDecorator('grda_tjrq')(
			<DatePicker 
				disabledDate={(current) => {return current && current.valueOf() > Date.now()}}
			/>
		)
		const grda_zrys = getFieldDecorator('grda_tjzrys')(
			<Input />
		)

		//收缩压 Systolic blood pressure
		const systolicBlood = getFieldValue('grda_xyzc1')
		const sblClass = classNames({
			'disline': true,
			'bp-yellow': 140 <= systolicBlood && systolicBlood < 160,
			'bp-purple': 160 <= systolicBlood && systolicBlood < 180,
			'bp-red': systolicBlood >= 180,
		})

		//舒张压 Diastolic blood pressure
		const diastolicBlood = getFieldValue('grda_xyzc2')
		const dblClass = classNames({
			'disline': true,
			'bp-yellow': 90 <= diastolicBlood && diastolicBlood < 100,
			'bp-purple': 100 <= diastolicBlood && diastolicBlood < 110,
			'bp-red': diastolicBlood >= 110,
		})

		return (
			<Form
			 inline
			 onSubmit={this.handleSubmit}
			>
		        <FormItem label="体检日期">
		        	{grda_tjrq}
		        </FormItem>
		        <FormItem label="责任医生" >
		        	{grda_zrys}
		        </FormItem>

		        {/*症状*/}
		    	<fieldset>
					<legend style={{width: '40px'}}>症状</legend>
			        {/*<CheckboxGroup options={this.symptomsOptions}/>*/}
			        <FormItem label="症状">
			        	{getFieldDecorator('grda_zz')(
							<MultiSelect
								antd={{style: { width: 420},placeholder: "请选择",}}
								options={this.symptomsOptions}
							/>
		        			/*<Select
								tags
							    style={{ width: 420 }}
								placeholder="请选择"
							  >
							  {getSelectOptions(this.symptomsOptions)}
							</Select>*/
			        	)}
					</FormItem>
				</fieldset>

				{/*一般状况*/}
		    	<fieldset>
					<legend style={{width: '70px'}}>一般状况</legend>

			        <Row className="item_inline_spacing">
				        <FormItem label="血压左侧">
				        	<InputGroup size="large" className="disline">
	    						<div className={sblClass} style={{width: '15%'}}>
	    							{getFieldDecorator('grda_xyzc1')(
						        		<InputNumber step={1}/>
	    							)}
						      	</div>
						      	{' / '}
					    		<div className={dblClass} style={{width: '15%'}}>
	    							{getFieldDecorator('grda_xyzc2')(
						        		<InputNumber step={1}/>
	    							)}
						      	</div>
					    		<div className="disline" style={{width: '10%'}}>
						      		{'mmhg'}
						      	</div>
						    </InputGroup>
				        </FormItem>
				        <FormItem label="血压右侧">
				        	<InputGroup size="large" className="disline">
					    		<div className="disline" style={{width: '15%'}}>
	    							{getFieldDecorator('grda_xyyc1')(
						        		<InputNumber step={1}/>
	    							)}
						      	</div>
						      	{' / '}
					    		<div className="disline" style={{width: '15%'}}>
	    							{getFieldDecorator('grda_xyyc2')(
						        		<InputNumber step={1}/>
	    							)}
						      	</div>
					    		<div className="disline" style={{width: '10%'}}>
						      		{'mmhg'}
						      	</div>
						    </InputGroup>
				        </FormItem>
			        </Row>

		        	<Row className="item_inline_spacing">
				        <FormItem label="体温">
					    	<div className="disline" style={{width: '51%'}}>
    							{getFieldDecorator('grda_tw')(
					        		<InputNumber step={0.1}/>
    							)}
					    	</div>
					    	{' '}
					    	<div className="disline" style={{width: '10%'}}>
				      			{'℃'}
					    	</div>
				        </FormItem>
				        {' '}
				        <FormItem label="脉率">
					    	<div className="disline" style={{width: '44%'}}>
    							{getFieldDecorator('grda_ml')(
					        		<InputNumber step={1}/>
    							)}
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '30%'}}>
					      		{'次/分钟'}
					    	</div>
				        </FormItem>
				        <FormItem label="呼吸频率">
					    	<div className="disline" style={{width: '49%'}}>
    							{getFieldDecorator('grda_hxpl')(
					        		<InputNumber step={1}/>
    							)}
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '30%'}}>
					      		{'次/分钟'}
					    	</div>
				        </FormItem>
			        </Row>

			        <Row className="item_inline_spacing">
				        <FormItem label="身高">
					    	<div className="disline" style={{width: '50%'}}>
    							{getFieldDecorator('grda_sg')(
					        		<InputNumber
					        		 onChange={(value) => this.changeBMIValue(value, 'grda_sg')}
					        		 step={0.1}/>
    							)}
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '10%'}}>
					      		{'cm'}
					    	</div>
				        </FormItem>
				        <FormItem label="体重">
					    	<div className="disline" style={{width: '50%'}}>
    							{getFieldDecorator('grda_tz')(
					        		<InputNumber
					        		 onChange={(value) => this.changeBMIValue(value, 'grda_tz')}
					        		 step={0.1}/>
    							)}
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'kg'}
					    	</div>
				        </FormItem>
				        <FormItem label="体质指数(BMI)">
					    	<div className="disline" style={{width: '50%'}}>
    							{getFieldDecorator('grda_tzzs')(
					        		<InputNumber step={0.1}/>
    							)}
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{' Kg/m²'}
					    	</div>
				        </FormItem>
				        <FormItem label="腰围">
					    	<div className="disline" style={{width: '29%'}}>
    							{getFieldDecorator('grda_yw')(
					        		<InputNumber step={0.1}/>
    							)}
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'cm'}
					    	</div>
				        </FormItem>
			        </Row>

			        <Row className="item_inline_spacing">
				        <FormItem label="老年人健康状态自我评估" >
				        	{getFieldDecorator('grda_lrjkzt')(
								<Select
					        		combobox
								    style={{ width: 266 }}
									placeholder="请选择"
								  >
								  {getSelectOptions(this.hSelfAssOptions)}
								</Select>
				        	)}
				        </FormItem>
				        &nbsp;&nbsp;&nbsp;
				        <FormItem label="老年人生活自理能力自我评估" >
				        	{getFieldDecorator('grda_lrshzlnl')(
								<Select
					        		combobox
								    style={{ width: 237 }}
									placeholder="请选择"
								  >
								  {getSelectOptions(this.aSelfAssOptions)}
								</Select>
				        	)}
				        </FormItem>
			        </Row>

			        <Row className="item_inline_spacing">
				        <FormItem label="老年人认识能力" >
				        	{getFieldDecorator('grda_lrrzgn')(
								<Select
					        		combobox
								    style={{ width: 100 }}
									placeholder="请选择"
								  >
								  {getSelectOptions(this.unAbilityOptions)}
								</Select>
				        	)}
				        </FormItem>
				        <FormItem label="简易智力状态检查，总分">
				        	{getFieldDecorator('grda_jyzljczf')(
								<InputNumber step={0.1} style={{ width: 60 }}/>
				        	)}
				        </FormItem>
				        <FormItem label="老年人情感状态" >
				        	{getFieldDecorator('grda_lrqgzt')(
								<Select
					        		combobox
								    style={{ width: 100 }}
									placeholder="请选择"
								  >
								  {getSelectOptions(this.eStateOptions)}
								</Select>
				        	)}
				        </FormItem>
				        <FormItem label="抑郁评分检查，总分">
				        	{getFieldDecorator('grda_lnryyjczf')(
								<InputNumber step={0.1} style={{ width: 80 }}/>
				        	)}
				        </FormItem>
			        </Row>

				</fieldset>

				{/*生活方式*/}
		    	<fieldset>
					<legend style={{width: '70px'}}>生活方式</legend>
					<Row className="item_inline_spacing">
				        <FormItem label="体育锻炼"/>

				        <FormItem label="锻炼频率">
				        	{getFieldDecorator('grda_dlpl')(
								<Select
					        		combobox
								    style={{ width: 100 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.eFreqOptions)}
								</Select>
				        	)}
				        </FormItem>
				        <FormItem label="每次锻炼时间">
							<div className="disline" style={{width: '50%'}}>
				        	{getFieldDecorator('grda_mcdlsj')(
					        	<InputNumber step={1}/>
				        	)}
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'分钟'}
					    	</div>
				        </FormItem>
				        <FormItem label="坚持锻炼时间">
					    	<div className="disline" style={{width: '50%'}}>
					        	{getFieldDecorator('grda_jcdlsj')(
						        	<InputNumber step={1}/>
					        	)}
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'年'}
					    	</div>
				        </FormItem>
				        <FormItem label="锻炼方式">
				        	{getFieldDecorator('grda_dlfs')(
					        	<Input />
				        	)}
				        </FormItem>
			        </Row>

			        <Row className="item_inline_spacing">
			        	<FormItem label="饮食习惯">
				        	{getFieldDecorator('grda_ysxg')(
								<Select
					        		combobox
								    style={{ width: 100 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.eHabitsOptions)}
								</Select>
				        	)}
				        </FormItem>

			        	<FormItem label="吸烟情况 吸烟状况">
				        	{getFieldDecorator('grda_xyqk')(
								<Select
					        		combobox
								    style={{ width: 100 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.sStateOptions)}
								</Select>
				        	)}
				        </FormItem>

			        	<FormItem label="日吸烟量 平均">
					    	<div className="disline" style={{width: '50%'}}>
				        	{getFieldDecorator('grda_mtxyl')(
					        	<InputNumber step={1}/>
				        	)}
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'支'}
					    	</div>
				        </FormItem>

			        	<FormItem label="开始吸烟年龄">
					    	<div className="disline" style={{width: '50%'}}>
					        	{getFieldDecorator('grda_ksxynl')(
						        	<InputNumber step={1}/>
					        	)}
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'岁'}
					    	</div>
				        </FormItem>

			        	<FormItem label="戒烟年龄">
					    	<div className="disline" style={{width: '50%'}}>
					        	{getFieldDecorator('grda_mcjynl')(
						        	<InputNumber step={1}/>
					        	)}
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'岁'}
					    	</div>
				        </FormItem>
			        </Row>

			        <Row className="item_inline_spacing">
			        	<FormItem label="饮酒习惯 饮酒频率">
				        	{getFieldDecorator('grda_yjpl')(
								<Select
					        		combobox
								    style={{ width: 100 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.dFreqOptions)}
								</Select>
				        	)}
				        </FormItem>

			        	<FormItem label="日饮酒量 平均">
							<div className="disline" style={{width: '50%'}}>
					        	{getFieldDecorator('grda_meyjl')(
						        	<InputNumber step={1}/>
					        	)}
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'两'}
					    	</div>
				        </FormItem>

			        	<FormItem label="是否戒酒">
				        	{getFieldDecorator('grda_sfjj')(
								<Select
					        		combobox
								    style={{ width: 100 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.gUpDrinkOptions)}
								</Select>
				        	)}
				        </FormItem>

			        	<FormItem label="戒酒年龄">
					    	<div className="disline" style={{width: '50%'}}>
					        	{getFieldDecorator('grda_mcjjnl')(
						        	<InputNumber step={1}/>
					        	)}
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'岁'}
					    	</div>
				        </FormItem>

			        	<FormItem label="开始饮酒年龄">
					    	<div className="disline" style={{width: '50%'}}>
					        	{getFieldDecorator('grda_ksyjnl')(
						        	<InputNumber step={1}/>
					        	)}
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'岁'}
					    	</div>
				        </FormItem>
			        </Row>

			        <Row className="item_inline_spacing">
			        <FormItem label="近一年内是否曾醉酒">
				        	{getFieldDecorator('grda_jynsfczj')(
								<Select
					        		combobox
								    style={{ width: 100 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.isDrunkOptions)}
								</Select>
				        	)}
				        </FormItem>

			        		<FormItem label="饮酒种类">
				        	{getFieldDecorator('grda_yjzl')(
								<Select tags
								    style={{ width: 300 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.dKindsOptions)}
								</Select>
				        	)}
				        </FormItem>
			        </Row>

			        <Row className="item_inline_spacing">
			        	<FormItem label="职业病危害因素接触史">
				        	{getFieldDecorator('grda_zybwhys')(
								<Select
					        		combobox
								    style={{ width: 100 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.hFactorsOptions)}
								</Select>
				        	)}
				        </FormItem>

			        	<FormItem label="工种">
				        	{getFieldDecorator('grda_jtzy')(
								<Input />
				        	)}
				        </FormItem>

			        	<FormItem label="从业时间">
					    	<div className="disline" style={{width: '50%'}}>
					        	{getFieldDecorator('grda_cysj')(
						        	<InputNumber step={1}/>
					        	)}
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'年'}
					    	</div>
				        </FormItem>
			        </Row>

			        <Row className="item_inline_spacing">
			        	<FormItem label="毒物种类">
				        	{getFieldDecorator('grda_dwzl')(
								<Select
									tags
								    style={{ width: 300 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.pKindsOptions)}
								</Select>
				        	)}
				        </FormItem>

			        	<FormItem label="防护措施">
				        	{getFieldDecorator('grda_dwzl_fhcs')(
								<Input />
				        	)}
				        </FormItem>
			        </Row>
				</fieldset>
	        </Form>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("MedicalTable1 onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, 'grdaJkzk');
}

function mapPropsToFields(props) {
	console.log("MedicalTable1 mapPropsToFields", props)
	return props.fields || {}
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(MedicalTable1)