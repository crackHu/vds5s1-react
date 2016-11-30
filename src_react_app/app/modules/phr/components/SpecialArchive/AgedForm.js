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
import {
	getMomentObj as moment
} from 'utils'

import * as AppActions from 'AppActions'
import * as PHRAction from 'phr/PHRAction'

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const CheckboxGroup = Checkbox.Group;
const InputGroup = Input.Group;
const FNAME = FIELDS.name
const RECORD_KEY = 'lnrjl'
const RATE_FIELDS = FIELDS[RECORD_KEY].rateFields || []

const getSelectOptions = (data) => {
	return data.map((item, i) => {
		let value = item.value || item
		return <Option key={value}>{value}</Option>
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
		this.rateExplains = WIDGET_CONFIG.rateExplains

		/*随访方式*/
		this.fuwOptions = this.selectOption.followUpWay;
		/*进餐*/
		this.eatOptions = this.rateOptions.eating;
		this.eatSize = this.eatOptions.length

		/*梳洗*/
		this.washOptions = this.rateOptions.wash;
		this.washSize = this.washOptions.length

		/*穿衣*/
		this.dreOptions = this.rateOptions.dress;
		this.dreSize = this.dreOptions.length

		/*如厕*/
		this.tolOptions = this.rateOptions.toilet;
		this.tolSize = this.tolOptions.length

		/*活动*/
		this.actOptions = this.rateOptions.activity;
		this.actSize = this.actOptions.length
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	componentWillReceiveProps = (nextProps) => {
		console.log('AgedForm componentWillReceiveProps', nextProps, this.props)
		this.genFollowUpVisit()
	}

	/*handleRateChange = (rateValue, key) => {
		this.setState({
			[key]: rateValue
		});

	}*/

	handleRateChange = (value, scoKey) => {
		try {
			let length = value.length
			let score = value.substring(length - 3, length - 1)
			this.props.form.setFieldsValue({
				[scoKey]: parseInt(score.trim())
			})
			this.calScore(null, null)
		} catch (e) {
			throw Error(`handleRateChange => ${e.message}`)
		}
	}

	//计算总分
	calScore = (value, scoKey) => {
		try {
			const {
				setFieldsValue,
				getFieldsValue,
			} = this.props.form
			const scores = getFieldsValue(['lnr_jcpf', 'lnr_sxpf', 'lnr_cypf', 'lnr_rcpf', 'lnr_hdpf'])
			let lnr_zpf = 0
			for (var item in scores) {
				if (item == scoKey) {
					lnr_zpf += value
				} else {
					lnr_zpf += parseInt(scores[item] || 0)
				}
			}
			setFieldsValue({
				lnr_zpf
			})
		} catch (e) {
			throw Error(`calScore => ${e.message}`)
		}
	}

	//下次随访日期自动生成
	changeFollowUpVisit = (value) => {
		const fuVisit = 'lnr_xcsfrq'
		this.props.form.setFieldsValue({
			[fuVisit]: moment(value).add(3, 'months')
		})
	}

	//下次随访日期自动生成
	genFollowUpVisit = () => {
		const gxy_sfrq2 = this.props.form.getFieldValue('lnr_sfrq')
		const gxy_xcsfrq2 = this.props.form.getFieldValue('lnr_xcsfrq')
		if (!!gxy_sfrq2 && !gxy_xcsfrq2) {
			this.changeFollowUpVisit(gxy_sfrq2)
		}
	}

	render() {
		const {
			onFieldsChange,
		} = this.props
		const {
			getFieldDecorator,
			getFieldValue,
			getFieldsValue,
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

		/*const eatingRate = `${getFieldValue('lnr_jc')} ${getFieldValue('lnr_jcpf')}`
		const washRate = `${getFieldValue('lnr_jc')} ${getFieldValue('lnr_jcpf')}`
		const dressRate = `${getFieldValue('lnr_jc')} ${getFieldValue('lnr_jcpf')}`
		const toiletRate = `${getFieldValue('lnr_jc')} ${getFieldValue('lnr_jcpf')}`
		const activityRate = `${getFieldValue('lnr_jc')} ${getFieldValue('lnr_jcpf')}`*/

		const columns = [{
			title: '评估事项、内容与评分',
			dataIndex: 'explain',
			width: '30%',
		}, {
			title: '程度等级',
			dataIndex: 'level',
			width: '40%',
		}, {
			title: '判断评分',
			dataIndex: 'score',
		}];

		/*level:
			(getFieldDecorator(rate.levKey)(
				<Select onChange={(value) => this.handleRateChange(value, scoKey)}>
					{getSelectOptions(rate.level)}
				</Select>*/
		const data = [];
		const letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
		this.rateExplains.forEach((rate, index) => {
			let scoKey = rate.scoKey
			let level = rate.level
			let lvStr = []
			for (let i = 0, len = level.length; i < len; i++) {
				lvStr.push(<p>{`${letter[i]}. ${level[i]}`}</p>)
			}
			console.log('rateExplains', lvStr)
			data.push({
				key: index,
				explain: `(${index + 1}) ${rate.explain}`,
				level: <div>{lvStr}</div>,
				score:
					(getFieldDecorator(scoKey)(
						<InputNumber onChange={(value) => this.calScore(value, scoKey)}/>
					)),
			})
		})

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
								<DatePicker
									onChange={this.changeFollowUpVisit}
								/>
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
							<Alert
							    message="说明"
							    description="该表为自评表，根据下表中5个方面进行评估，将各方面判断评分汇总后，
							    0~3分者为可自理；4~8分者为轻度依赖；9~18分者为中度依赖；≥19分者为不能自理。"
							    type="info"
							    showIcon
						  	/>
						  	{/*<Alert	
						  	 message="该表为自评表，根据下表中5个方面进行评估，将各方面判断评分汇总后，
							    0~3分者为可自理；4~8分者为轻度依赖；9~18分者为中度依赖；≥19分者为不能自理。"
							 type="info"
							 showIcon />*/}

							 <Table columns={columns} dataSource={data} pagination={false}/>

						  	{/*<Row>
						  		<span>进餐：</span>
						        <Rate key="eating" onChange={value => this.handleRateChange(value, "eatingValue")} count={this.eatSize} value={eatingValue} />
						        {<span className="ant-rate-text">{eatingRate}</span>}
					      	</Row>
						  	<Row>
						  		<span>梳洗：</span>
						        <Rate key="wash" onChange={value => this.handleRateChange(value, "washValue")} count={this.washSize} value={washValue} />
						        {<span className="ant-rate-text">{washRate}</span>}
					      	</Row>
						  	<Row>
						  		<span>穿衣：</span>
						        <Rate key="dress" onChange={value => this.handleRateChange(value, "dressValue")} count={this.dreSize} value={dressValue} />
						        {<span className="ant-rate-text">{dressRate}</span>}
					      	</Row>
						  	<Row>
						  		<span>如厕：</span>
						        <Rate key="toilet" onChange={value => this.handleRateChange(value, "toiletValue")} count={this.tolSize} value={toiletValue} />
						        {<span className="ant-rate-text">{toiletRate}</span>}
					      	</Row>
						  	<Row>
						  		<span>活动：</span>
						        <Rate key="activity" onChange={value => this.handleRateChange(value, "activityValue")} count={this.actSize} value={activityValue} />
						        {<span className="ant-rate-text">{activityRate}</span>}
					      	</Row>*/}

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

function getFieldsData(fdStore) {
	let fields = {}
	try {
		let selectKey = fdStore['selectKey']
		for (let key in fdStore) {
			let value = fdStore[key]
			if (selectKey == key && value.constructor == Object) {
				fields = value
				break
			}
		}
	} catch (e) {
		throw Error(`getFieldsData => ${e.message}`)
	}
	console.log('getFieldsData', fields)
	return fields
}

function onFieldsChange(props, fields) {
	console.log("AgedForm onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, 'lnrSfb');
}

function mapPropsToFields(props) {
	const {
		lnrSfb,
	} = props.phr[FNAME]
	const fields = getFieldsData(lnrSfb)
	console.log("AgedForm mapPropsToFields", props, fields)
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