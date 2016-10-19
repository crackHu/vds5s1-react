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
import DiabetesTable from './Table/DiabetesTable'
import DMedicationsTable from './Table/DMedicationsTable'

import {
	SPEC_ARC_FORM_WIDGET_CONFIG as WIDGET_CONFIG,
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

/*糖尿病专档*/
class DiabetesForm extends React.Component {

	constructor(props) {
		super(props);

		this.selectOption = WIDGET_CONFIG.selectOption

		/*症状*/
		this.dsOptions = WIDGET_CONFIG.checkboxGroupOptions.dSymptoms;
		/*随访方式*/
		this.fuwOptions = this.selectOption.followUpWay;
		/*心理调整*/
		this.psyAdjustOptions = this.selectOption.psyAdjustment;
		/*遵医行为*/
		this.bemOptions = this.selectOption.behaviorMed;
		/*药物依从性*/
		this.admOptions = this.selectOption.adherenceMed;
		/*药物不良反应*/
		this.drugReactOptions = this.selectOption.drugReactions;
		/*此次随访分类*/
		this.fucOptions = this.selectOption.followUpClass;
		/*足背动脉搏动*/
		this.arpOptions = this.selectOption.arteryPulse;
		/*主食*/
		this.stfOptions = this.selectOption.stapleFood;
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	render() {
		const {
			getFieldDecorator
		} = this.props.form

		return (
			<div>
				{/*糖尿病记录表*/}
				<div className="dashed_border form inside">
					<DiabetesTable />
				</div>

				<div className="dashed_border form marginlr8">
					<Form inline>
						<Row className="item_inline_spacing">
							<FormItem label="随访日期" >
								<DatePicker />
					        </FormItem>
							<FormItem label="随访方式" >
								<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.fuwOptions)}
								</Select>
					        </FormItem>
						</Row>

						<Row className="item_inline_spacing" style={{marginLeft: 23}}>
							<FormItem label="症状" >
								<Select
									tags
								    style={{ width: 350 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.dsOptions)}
								</Select>
					        </FormItem>
						</Row>

						<Row className="item_inline_spacing">
							<FormItem label="体征" />
							<div className="inputSpanGroup" style={{width: '250px'}}>
								<span>{'血压:'}</span>&nbsp;
	    						<div className="disline" style={{width: '30%'}}>
						        	<InputNumber size="large"/>
						      	</div>
						      	&nbsp;{' / '}&nbsp;
					    		<div className="disline" style={{width: '30%'}}>
						        	<InputNumber size="large"/>
						      	</div>
						      	&nbsp;{'mmhg'}
					        </div>
					        <FormItem label="体重(kg)">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="体质指数(Kg/m²)">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="足背动脉搏动">
								<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.arpOptions)}
								</Select>
					        </FormItem>
					        <FormItem label="其他">
								<Input />
					        </FormItem>
						</Row>

						<Row className="item_inline_spacing">
							<FormItem label="生活指导方式" />
							<FormItem label="日吸烟量(支)">
					        	<InputNumber style={{width: 60}}/>
							</FormItem>
							<FormItem label="日饮酒量(两)">
					        	<InputNumber style={{width: 60}}/>
							</FormItem>
							<FormItem label="运动">
					        	<InputNumber style={{width: 60}}/>
					        	<span className="disline middle">{'次/周'}&nbsp;</span>
					        	<InputNumber style={{width: 60}}/>
					        	<span className="disline middle">{'次/分钟'}</span>
							</FormItem>
							<FormItem label="主食(克/天)">
					        	<InputNumber style={{width: 60}}/>
							</FormItem>
							<FormItem label="心理调整">
					        	<Select
								    style={{ width: 80 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.psyAdjustOptions)}
								</Select>
							</FormItem>
							<FormItem label="遵医行为">
					        	<Select
								    style={{ width: 80 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.bemOptions)}
								</Select>
							</FormItem>
						</Row>

						<Row className="item_inline_spacing">
							<FormItem label="辅助检查" />
							<FormItem label="空腹血糖值(mmol/L)">
					        	<InputNumber style={{width: 60}}/>
							</FormItem>
							<FormItem label="其他检查" required/>
							<FormItem label="糖化血红蛋白(%)">
					        	<InputNumber style={{width: 60}}/>
							</FormItem>
							<FormItem label="检查日期" >
								<DatePicker />
					        </FormItem>
							<FormItem label="其他" >
								<Input />
					        </FormItem>
						</Row>

						<Row className="item_inline_spacing">
							<FormItem label="转诊" />
							<FormItem label="原因">
					        	<Input />
							</FormItem>
							<FormItem label="机构及科别">
					        	<Input />
							</FormItem>
							<FormItem label="下次随访日期" >
								<DatePicker />
					        </FormItem>
							<FormItem label="随访医生签名">
					        	<Input />
							</FormItem>
						</Row>
				    </Form>
			    </div>

				{/*糖尿病 用药情况*/}
				<DMedicationsTable />

			</div>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("DiabetesForm onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("DiabetesForm mapPropsToFields")
}

export default Form.create()(DiabetesForm)