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
	Tooltip,
	Alert,
	Rate,
} from 'antd'
import AgedTable from './Table/AgedTable'

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
		return <Option key={Date.now()}>{item.rateValue}</Option>
	})
}

/*老年人专档*/
class AgedForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			rateValue: 1,
			eatingValue: 1,
			washValue: 1,
			dressValue: 1,
			toiletValue: 1,
			activityValue: 1,
		}

		this.selectOption = WIDGET_CONFIG.selectOption
		this.rateOptions = WIDGET_CONFIG.rateOptions

		/*随访方式*/
		this.fuwOptions = this.selectOption.followUpWay;
		/*进餐*/
		this.eatOptions = this.rateOptions.eating;
		/*梳洗*/
		this.washOptions = this.rateOptions.wash;
		/*穿衣*/
		this.dreOptions = this.rateOptions.dress;
		/*如厕*/
		this.tolOptions = this.rateOptions.toilet;
		/*活动*/
		this.actOptions = this.rateOptions.activity;
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	handleRateChange = (rateValue, teset) => {
		this.setState({
			rateValue
		});
		console.log('handleRateChange', rateValue, teset)
	}

	render() {
		const {
			getFieldDecorator
		} = this.props.form

		const {
			rateValue,
			eatingValue,
			washValue,
			dressValue,
			toiletValue,
			activityValue,
		} = this.state;

		const rateIndex = rateValue - 1

		const eatOption = this.eatOptions[rateIndex]
		const washOption = this.washOptions[rateIndex]
		const dreOption = this.dreOptions[rateIndex]
		const tolOption = this.tolOptions[rateIndex]
		const actOption = this.actOptions[rateIndex]

		const eatingRate = `${eatOption.score} ${eatOption.level}`
		const washRate = `${washOption.score} ${washOption.level}`
		const dressRate = `${dreOption.score} ${dreOption.level}`
		const toiletRate = `${tolOption.score} ${tolOption.level}`
		const activityRate = `${actOption.score} ${actOption.level}`

		return (
			<div>
				{/*老年人评估表*/}
				<div className="dashed_border form inside">
					<AgedTable />
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

						<div style={{margin: '15px auto'}}>
							{/*<Alert
							    message="说明"
							    description="该表为自评表，根据下表中5个方面进行评估，将各方面判断评分汇总后，
							    0~3分者为可自理；4~8分者为轻度依赖；9~18分者为中度依赖；≥19分者为不能自理。"
							    type="info"
							    showIcon
						  	/>*/}
						  	<Alert	
						  	 message="该表为自评表，根据下表中5个方面进行评估，将各方面判断评分汇总后，
							    0~3分者为可自理；4~8分者为轻度依赖；9~18分者为中度依赖；≥19分者为不能自理。"
							 type="info"
							 showIcon />

						  	<Row>
						  		<span>进餐：</span>
						        <Rate key="eating" onChange={(value) => this.handleRateChange(value, 'testte')} count={4} value={eatingValue} />
						        {<span className="ant-rate-text">{eatingRate}</span>}
					      	</Row>
						  	<Row>
						  		<span>梳洗：</span>
						        <Rate key="wash" onChange={this.handleRateChange} count={4} value={washValue} />
						        {<span className="ant-rate-text">{washRate}</span>}
					      	</Row>
						  	<Row>
						  		<span>穿衣：</span>
						        <Rate key="dress" onChange={this.handleRateChange} count={4} value={dressValue} />
						        {<span className="ant-rate-text">{dressRate}</span>}
					      	</Row>
						  	<Row>
						  		<span>如厕：</span>
						        <Rate key="toilet" onChange={this.handleRateChange} count={4} value={toiletValue} />
						        {<span className="ant-rate-text">{toiletRate}</span>}
					      	</Row>
						  	<Row>
						  		<span>活动：</span>
						        <Rate key="activity" onChange={this.handleRateChange} count={4} value={activityValue} />
						        {<span className="ant-rate-text">{activityRate}</span>}
					      	</Row>

						</div>

						<Row className="item_inline_spacing">
							<FormItem label="下次随访日期" >
								<DatePicker />
					        </FormItem>
							<FormItem label="随访医生签名">
					        	<Input />
							</FormItem>
						</Row>
					</Form>
				</div>
			</div>

		)
	}
}

function onFieldsChange(props, fields) {
	console.log("AgedForm onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("AgedForm mapPropsToFields")
}

export default Form.create()(AgedForm)