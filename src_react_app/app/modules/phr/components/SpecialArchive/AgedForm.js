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
import {
	connect
} from 'react-redux';
import AgedTable from './Table/AgedTable'

import {
	SPEC_ARC_FORM_WIDGET_CONFIG as WIDGET_CONFIG,
	PERSONALDETAIL_FIELDS_CONFIG as FIELDS,
} from 'phr_conf'

import * as AppActions from 'AppActions'
import * as PHRAction from 'phr/PHRAction'

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const CheckboxGroup = Checkbox.Group;
const InputGroup = Input.Group;
const FNAME = FIELDS.name

const getSelectOptions = (data) => {
	return data.map((item, i) => {
		return <Option key={item.value}>{item.value}</Option>
	})
}

/*老年人专档*/
class AgedForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
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

	handleRateChange = (rateValue, key) => {
		this.setState({
			[key]: rateValue
		});
	}

	render() {
		const {
			onFieldsChange,
		} = this.props
		const {
			getFieldDecorator
		} = this.props.form
		const {
			lnrSfb,
			lnrjl,
		} = this.props.phr[FNAME]

		let fields = {}
		let objSize = []
		let selectKey = lnrSfb['selectKey']
		for (let key in lnrSfb) {
			let lnrSfb_value = lnrSfb[key]
			if (selectKey == key && lnrSfb_value.constructor == Object) {
				fields = lnrSfb_value
				break
			}
		}
		objSize = !!lnrSfb ? lnrSfb.objSize : objSize

		const {
			eatingValue,
			washValue,
			dressValue,
			toiletValue,
			activityValue,
		} = this.state;

		const eatOption = this.eatOptions[eatingValue - 1]
		const washOption = this.washOptions[washValue - 1]
		const dreOption = this.dreOptions[dressValue - 1]
		const tolOption = this.tolOptions[toiletValue - 1]
		const actOption = this.actOptions[activityValue - 1]

		const eatingRate = `${eatOption.score} ${eatOption.level}`
		const washRate = `${washOption.score} ${washOption.level}`
		const dressRate = `${dreOption.score} ${dreOption.level}`
		const toiletRate = `${tolOption.score} ${tolOption.level}`
		const activityRate = `${actOption.score} ${actOption.level}`

		let formDisplay = !!(lnrjl.objSize) ? lnrjl.objSize.length > 0 ? 'block' : 'none' : 'none'

		return (
			<div>
				{/*老年人评估表*/}
				<div className="dashed_border form inside">
					<AgedTable
						fields={lnrjl}
						onFieldsChange={onFieldsChange}
						objSize={objSize}
					/>
				</div>

				<div className="dashed_border form marginlr8" style={{display: formDisplay}}>
					<Form inline>
						<Row className="item_inline_spacing">
							<FormItem label="随访日期" >
							{getFieldDecorator('lnr_sfrq')(
								<DatePicker />
							)}
					        </FormItem>
							<FormItem label="随访方式" >
								{getFieldDecorator('lnr_sffs')(
								<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.fuwOptions)}
								</Select>
							)}
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
						        <Rate key="eating" onChange={value => this.handleRateChange(value, "eatingValue")} count={4} value={eatingValue} />
						        {<span className="ant-rate-text">{eatingRate}</span>}
					      	</Row>
						  	<Row>
						  		<span>梳洗：</span>
						        <Rate key="wash" onChange={value => this.handleRateChange(value, "washValue")} count={4} value={washValue} />
						        {<span className="ant-rate-text">{washRate}</span>}
					      	</Row>
						  	<Row>
						  		<span>穿衣：</span>
						        <Rate key="dress" onChange={value => this.handleRateChange(value, "dressValue")} count={4} value={dressValue} />
						        {<span className="ant-rate-text">{dressRate}</span>}
					      	</Row>
						  	<Row>
						  		<span>如厕：</span>
						        <Rate key="toilet" onChange={value => this.handleRateChange(value, "toiletValue")} count={4} value={toiletValue} />
						        {<span className="ant-rate-text">{toiletRate}</span>}
					      	</Row>
						  	<Row>
						  		<span>活动：</span>
						        <Rate key="activity" onChange={value => this.handleRateChange(value, "activityValue")} count={4} value={activityValue} />
						        {<span className="ant-rate-text">{activityRate}</span>}
					      	</Row>

						</div>

						<Row className="item_inline_spacing">
							<FormItem label="下次随访日期" >
							{getFieldDecorator('lnr_xcsfrq')(
								<DatePicker />
							)}
					        </FormItem>
							<FormItem label="随访医生签名">
							{getFieldDecorator('lnr_sfys')(
					        	<Input />
							)}
							</FormItem>
						</Row>
					</Form>
				</div>
			</div>

		)
	}
}

function onFieldsChange(props, fields) {
	console.log("AgedForm onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, 'lnrSfb');
}

function mapPropsToFields(props) {
	console.log("AgedForm mapPropsToFields", props)

	const {
		lnrSfb,
	} = props.phr[FNAME]

	let fields = {}
	let selectKey = lnrSfb['selectKey']
	for (let key in lnrSfb) {
		let lnrSfb_value = lnrSfb[key]
		if (selectKey == key && lnrSfb_value.constructor == Object) {
			fields = lnrSfb_value
			break
		}
	}
	return fields
}

AgedForm.propTypes = {
	phr: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	console.log('AgedForm mapStateToProps:', state)
	return {
		phr: state.phr
	}
}

AgedForm = Form.create({
	onFieldsChange,
	mapPropsToFields
})(AgedForm)

export default connect(mapStateToProps, {
	...PHRAction,
	...AppActions,
})(AgedForm)