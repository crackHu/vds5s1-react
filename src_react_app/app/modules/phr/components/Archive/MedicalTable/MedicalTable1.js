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

		/*症状*/
		this.symptomsOptions = WIDGET_CONFIG.checkboxGroupOptions.symptoms;
		/*饮酒种类*/
		this.dKindsOptions = WIDGET_CONFIG.checkboxGroupOptions.drinkingKinds;
		/*毒物种类*/
		this.pKindsOptions = WIDGET_CONFIG.checkboxGroupOptions.poisonKinds;

		/*健康状态自我评估*/
		this.hSelfAssOptions = WIDGET_CONFIG.selectOption.healthSelfAss;
		/*自理能力自我评估*/
		this.aSelfAssOptions = WIDGET_CONFIG.selectOption.abilitySelfAss;
		/*认识能力*/
		this.unAbilityOptions = WIDGET_CONFIG.selectOption.understandAbility;
		/*情感状态*/
		this.eStateOptions = WIDGET_CONFIG.selectOption.emotionalState;
		/*锻炼频率*/
		this.eFreqOptions = WIDGET_CONFIG.selectOption.exerciseFrequency;
		/*饮食习惯*/
		this.eHabitsOptions = WIDGET_CONFIG.selectOption.eatingHabits;
		/*吸烟状况*/
		this.sStateOptions = WIDGET_CONFIG.selectOption.smokingStatus;
		/*饮酒频率*/
		this.dFreqOptions = WIDGET_CONFIG.selectOption.drinkingFrequency;
		/*是否戒酒*/
		this.gUpDrinkOptions = WIDGET_CONFIG.selectOption.isGiveUpDrinking;
		/*吸烟状况*/
		this.sStateOptions = WIDGET_CONFIG.selectOption.smokingStatus;
		/*一年内是否醉酒*/
		this.isDrunkOptions = WIDGET_CONFIG.selectOption.isDrunk;
		/*职业病危害因素接触史*/
		this.hFactorsOptions = WIDGET_CONFIG.selectOption.hazardFactors;
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
					<Row>
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
							<div className="disline">
					        	<InputNumber style={{width: '29%'}}/>
					    	</div>
					    	{' '}
					    	<div className="disline middle" style={{width: '20%'}}>
					      		{'分钟'}
					    	</div>
				        </FormItem>
				        <FormItem label="坚持锻炼时间">
					    	<div className="disline" style={{width: '29%'}}>
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