import React, {
	Component,
	PropTypes
} from 'react'
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

import {
	ARC_FORM_WIDGET_CONFIG as WIDGET_CONFIG,
} from 'phr_conf'

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

	render() {

		const {
			getFieldDecorator
		} = this.props.form

		const grda_tjrq = getFieldDecorator('grda_tjrq')(
			<DatePicker 
				disabledDate={(current) => {return current && current.valueOf() > Date.now()}}
			/>
		)
		const grda_zrys = getFieldDecorator('grda_zrys')(
			<Input />
		)

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
			        <CheckboxGroup options={this.symptomsOptions}/>
				</fieldset>

				{/*一般状况*/}
		    	<fieldset>
					<legend style={{width: '70px'}}>一般状况</legend>

			        <Row className="item_inline_spacing">
				        <FormItem label="血压左侧">
				        	<InputGroup size="large" className="disline">
	    						<div className="disline" style={{width: '15%'}}>
						        	<InputNumber />
						      	</div>
						      	{' / '}
					    		<div className="disline" style={{width: '15%'}}>
						        	<InputNumber />
						      	</div>
					    		<div className="disline" style={{width: '10%'}}>
						      		{'mmhg'}
						      	</div>
						    </InputGroup>
				        </FormItem>
				        <FormItem label="血压右侧">
				        	<InputGroup size="large" className="disline">
					    		<div className="disline" style={{width: '15%'}}>
						        	<InputNumber />
						      	</div>
						      	{' / '}
					    		<div className="disline" style={{width: '15%'}}>
						        	<InputNumber />
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
				        		<InputNumber />
					    	</div>
					    	{' '}
					    	<div className="disline" style={{width: '10%'}}>
				      			{'℃'}
					    	</div>
				        </FormItem>
				        {' '}
				        <FormItem label="脉率">
					    	<div className="disline" style={{width: '44%'}}>
					        	<InputNumber />
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'次/分钟'}
					    	</div>
				        </FormItem>
				        <FormItem label="呼吸频率">
					    	<div className="disline" style={{width: '49%'}}>
					        	<InputNumber />
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'次/分钟'}
					    	</div>
				        </FormItem>
			        </Row>

			        <Row className="item_inline_spacing">
				        <FormItem label="身高">
					    	<div className="disline" style={{width: '50%'}}>
					        	<InputNumber />
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '10%'}}>
					      		{'cm'}
					    	</div>
				        </FormItem>
				        <FormItem label="体重">
					    	<div className="disline" style={{width: '50%'}}>
					        	<InputNumber />
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'kg'}
					    	</div>
				        </FormItem>
				        <FormItem label="体质指数(BMI)">
					    	<div className="disline" style={{width: '50%'}}>
					        	<InputNumber />
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{' Kg/m²'}
					    	</div>
				        </FormItem>
				        <FormItem label="腰围">
					    	<div className="disline" style={{width: '29%'}}>
					        	<InputNumber />
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'cm'}
					    	</div>
				        </FormItem>
			        </Row>

			        <Row className="item_inline_spacing">
				        <FormItem label="老年人健康状态自我评估" required>
							<Select
							    style={{ width: 266 }}
								placeholder="请选择"
							  >
							  {getSelectOptions(this.hSelfAssOptions)}
							</Select>
				        </FormItem>
				        &nbsp;&nbsp;&nbsp;
				        <FormItem label="老年人生活自理能力自我评估" required>
							<Select
							    style={{ width: 237 }}
								placeholder="请选择"
							  >
							  {getSelectOptions(this.aSelfAssOptions)}
							</Select>
				        </FormItem>
			        </Row>

			        <Row className="item_inline_spacing">
				        <FormItem label="老年人认识能力" required>
							<Select
							    style={{ width: 100 }}
								placeholder="请选择"
							  >
							  {getSelectOptions(this.unAbilityOptions)}
							</Select>
				        </FormItem>
				        <FormItem label="简易智力状态检查，总分">
							<InputNumber style={{ width: 60 }}/>
				        </FormItem>
				        <FormItem label="老年人情感状态" required>
							<Select
							    style={{ width: 100 }}
								placeholder="请选择"
							  >
							  {getSelectOptions(this.eStateOptions)}
							</Select>
				        </FormItem>
				        <FormItem label="抑郁评分检查，总分">
							<InputNumber style={{ width: 80 }}/>
				        </FormItem>
			        </Row>

				</fieldset>

				{/*生活方式*/}
		    	<fieldset>
					<legend style={{width: '70px'}}>生活方式</legend>
					<Row className="item_inline_spacing">
				        <FormItem label="体育锻炼"/>

				        <FormItem label="锻炼频率">
							<Select
							    style={{ width: 100 }}
								placeholder="请选择"
							  >	
							  {getSelectOptions(this.eFreqOptions)}
							</Select>
				        </FormItem>
				        <FormItem label="每次锻炼时间">
							<div className="disline" style={{width: '50%'}}>
					        	<InputNumber/>
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'分钟'}
					    	</div>
				        </FormItem>
				        <FormItem label="坚持锻炼时间">
					    	<div className="disline" style={{width: '50%'}}>
					        	<InputNumber />
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'年'}
					    	</div>
				        </FormItem>
				        <FormItem label="锻炼方式">
				        	<Input />
				        </FormItem>
			        </Row>

			        <Row className="item_inline_spacing">
			        	<FormItem label="饮食习惯">
							<Select
							    style={{ width: 100 }}
								placeholder="请选择"
							  >	
							  {getSelectOptions(this.eHabitsOptions)}
							</Select>
				        </FormItem>

			        	<FormItem label="吸烟情况 吸烟状况">
							<Select
							    style={{ width: 100 }}
								placeholder="请选择"
							  >	
							  {getSelectOptions(this.sStateOptions)}
							</Select>
				        </FormItem>

			        	<FormItem label="日吸烟量 平均">
					    	<div className="disline" style={{width: '50%'}}>
					        	<InputNumber />
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'支'}
					    	</div>
				        </FormItem>

			        	<FormItem label="开始吸烟年龄">
					    	<div className="disline" style={{width: '50%'}}>
					        	<InputNumber />
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'岁'}
					    	</div>
				        </FormItem>

			        	<FormItem label="戒烟年龄">
					    	<div className="disline" style={{width: '50%'}}>
					        	<InputNumber />
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'岁'}
					    	</div>
				        </FormItem>
			        </Row>

			        <Row className="item_inline_spacing">
			        	<FormItem label="饮酒习惯 饮酒频率">
							<Select
							    style={{ width: 100 }}
								placeholder="请选择"
							  >	
							  {getSelectOptions(this.dFreqOptions)}
							</Select>
				        </FormItem>

			        	<FormItem label="日饮酒量 平均">
							<div className="disline" style={{width: '50%'}}>
					        	<InputNumber />
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'两'}
					    	</div>
				        </FormItem>

			        	<FormItem label="是否戒酒">
							<Select
							    style={{ width: 100 }}
								placeholder="请选择"
							  >	
							  {getSelectOptions(this.gUpDrinkOptions)}
							</Select>
				        </FormItem>

			        	<FormItem label="戒酒年龄">
					    	<div className="disline" style={{width: '50%'}}>
					        	<InputNumber />
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'岁'}
					    	</div>
				        </FormItem>

			        	<FormItem label="开始饮酒年龄">
					    	<div className="disline" style={{width: '50%'}}>
					        	<InputNumber />
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'岁'}
					    	</div>
				        </FormItem>
			        </Row>

			        <Row className="item_inline_spacing">
			        	<FormItem label="近一年内是否曾醉酒">
							<Select
							    style={{ width: 100 }}
								placeholder="请选择"
							  >	
							  {getSelectOptions(this.isDrunkOptions)}
							</Select>
				        </FormItem>

			        	<FormItem label="饮酒种类">
							<Select tags
							    style={{ width: 300 }}
								placeholder="请选择"
							  >	
							  {getSelectOptions(this.dKindsOptions)}
							</Select>
				        </FormItem>
			        </Row>

			        <Row className="item_inline_spacing">
			        	<FormItem label="职业病危害因素接触史">
							<Select
							    style={{ width: 100 }}
								placeholder="请选择"
							  >	
							  {getSelectOptions(this.hFactorsOptions)}
							</Select>
				        </FormItem>

			        	<FormItem label="工种">
							<Input />
				        </FormItem>

			        	<FormItem label="从业时间">
					    	<div className="disline" style={{width: '50%'}}>
					        	<InputNumber />
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'年'}
					    	</div>
				        </FormItem>
			        </Row>

			        <Row className="item_inline_spacing">
			        	<FormItem label="毒物种类">
							<Select tags
							    style={{ width: 100 }}
								placeholder="请选择"
							  >	
							  {getSelectOptions(this.pKindsOptions)}
							</Select>
				        </FormItem>

			        	<FormItem label="防护措施">
							<Input />
				        </FormItem>
			        </Row>
				</fieldset>
	        </Form>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("MedicalTable1 onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("MedicalTable1 mapPropsToFields")
}

export default Form.create(onFieldsChange, mapPropsToFields)(MedicalTable1)