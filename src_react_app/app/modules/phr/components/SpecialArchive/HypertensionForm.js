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
import {
	connect
} from 'react-redux';
import HypertensionTable from './Table/HypertensionTable'
import HMedicationsTable from './Table/HMedicationsTable'

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

const getSelectOptions = (data) => {
	return data.map((item, i) => {
		return <Option key={item.value}>{item.value}</Option>
	})
}

/*高血压专档*/
class HypertensionForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}

		this.selectOption = WIDGET_CONFIG.selectOption
		this.checkboxGroupOptions = WIDGET_CONFIG.checkboxGroupOptions

		/*症状*/
		this.hsOptions = this.checkboxGroupOptions.hSymptoms;
		/*随访方式*/
		this.fuwOptions = this.selectOption.followUpWay;
		/*摄盐程度*/
		this.isOptions = this.selectOption.intakeSalt;
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
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	componentWillReceiveProps = (nextProps) => {
		console.log('HypertensionForm componentWillReceiveProps', nextProps, this.props)
			//this.genFollowUpVisit()
	}

	//BMI自动生成
	changeBMIValue = (value, key) => {
		const {
			getFieldsValue,
			getFieldValue,
			setFieldsValue
		} = this.props.form

		const bmi = 'gxy_tz_tzzs'
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

	//下次随访日期自动生成
	changeFollowUpVisit = (value) => {
		const fuVisit = 'gxy_xcsfrq2'
		this.props.form.setFieldsValue({
			[fuVisit]: moment(value).add(3, 'months')
		})
	}

	//下次随访日期自动生成
	genFollowUpVisit = () => {
		const gxy_sfrq2 = this.props.form.getFieldValue('gxy_sfrq2')
		const gxy_xcsfrq2 = this.props.form.getFieldValue('gxy_xcsfrq2')

		if (!!gxy_sfrq2) {
			let sfrq
			if (!gxy_xcsfrq2 || (sfrq = gxy_xcsfrq2.clone().subtract(3, 'months'), !gxy_sfrq2.isSame(sfrq))) {
				this.changeFollowUpVisit(gxy_sfrq2)
			}
		}
	}

	//检测输入血压数值情况 @key Systolic blood pressure/Diastolic blood pressure
	detectHypertensionlv = (value, key) => {


	}

	render() {
		const {
			onFieldsChange,
		} = this.props
		const {
			getFieldDecorator,
			getFieldValue
		} = this.props.form
		const {
			gxyJxb,
			gxyjl,
		} = this.props.phr[FNAME]

		let fields = {}
		let gxyYyqk = {}
		let objSize = [{}],
			gxyYyqkObjSize
		let selectKey = gxyJxb['selectKey']
		for (let key in gxyJxb) {
			let gxyJxb_value = gxyJxb[key]
			if (selectKey == key && gxyJxb_value.constructor == Object) {
				fields = gxyJxb_value
				gxyYyqk = gxyJxb_value['gxyYyqk']
				break
			}
		}

		objSize = !!gxyJxb ? gxyJxb.objSize : objSize
		gxyYyqkObjSize = !!gxyYyqk ? gxyYyqk.objSize : gxyYyqkObjSize
		let formDisplay = !!(gxyjl.objSize) ? gxyjl.objSize.length > 0 ? 'block' : 'none' : 'none'

		//收缩压 Systolic blood pressure
		const systolicBlood = getFieldValue('gxy_tz_xy1')
		const sblClass = classNames({
			'disline': true,
			'bp-yellow': 140 <= systolicBlood && systolicBlood < 160,
			'bp-purple': 160 <= systolicBlood && systolicBlood < 180,
			'bp-red': systolicBlood >= 180,
		})

		//舒张压 Diastolic blood pressure
		const diastolicBlood = getFieldValue('gxy_tz_xy2')
		const dblClass = classNames({
			'disline': true,
			'bp-yellow': 90 <= diastolicBlood && diastolicBlood < 100,
			'bp-purple': 100 <= diastolicBlood && diastolicBlood < 110,
			'bp-red': diastolicBlood >= 110,
		})

		return (
			<div>
				{/*高血压记录表*/}
				<div className="dashed_border form inside">
					<HypertensionTable
						gxyJxbFields={gxyjl}
						onFieldsChange={onFieldsChange}
					 	objSize={objSize}
					/>
				</div>

				<div style={{display: formDisplay}}>
					<div className="dashed_border form marginlr8">
						<Form inline>
							<Row className="item_inline_spacing">
								<FormItem label="随访日期" >
					       			{getFieldDecorator('gxy_sfrq2')(
										<DatePicker
											onChange={this.changeFollowUpVisit}
										/>
					       			)}
						        </FormItem>
								<FormItem label="随访方式" >
					       			{getFieldDecorator('gxy_sffs')(
										<Select
										    style={{ width: 120 }}
											placeholder="请选择"
										  >	
										  {getSelectOptions(this.fuwOptions)}
										</Select>
					       			)}
						        </FormItem>
							</Row>

							<Row className="item_inline_spacing" style={{marginLeft: 23}}>
								<FormItem label="症状" >
					       			{getFieldDecorator('gxy_zz')(
										<Select
											tags
										    style={{ width: 350 }}
											placeholder="请选择"
										  >	
										  {getSelectOptions(this.hsOptions)}
										</Select>
					       			)}
						        </FormItem>
							</Row>

							<Row className="item_inline_spacing">
								<FormItem label="体征" />
									<div className="inputSpanGroup" style={{width: '250px'}}>
										<span>{'血压:'}</span>&nbsp;
			    						<div className={sblClass} style={{width: '30%'}}>
							       			{getFieldDecorator('gxy_tz_xy1')(
									        	<InputNumber
									        	 step={1}
									        	 size="large"/>
							       			)}
								      	</div>
								      	&nbsp;{' / '}&nbsp;
							    		<div className={dblClass} style={{width: '30%'}}>
							       			{getFieldDecorator('gxy_tz_xy2')(
								        		<InputNumber
								        		 step={1}
								        		 size="large"/>
							       			)}
								      	</div>
								      	&nbsp;{'mmhg'}
							        </div>
						        <FormItem label="身高(cm)">
					       			{getFieldDecorator('gxy_tz_sg')(
							        	<InputNumber
							        		step={0.1}
							        		style={{width: 60}}
							        		onChange={(value) => this.changeBMIValue(value, 'gxy_tz_sg')}
							        	/>
					       			)}
						        </FormItem>
						        <FormItem label="体重(kg)">
					       			{getFieldDecorator('gxy_tz_tz')(
							        	<InputNumber
								        	step={0.1}
								        	style={{width: 60}}
								        	onChange={(value) => this.changeBMIValue(value, 'gxy_tz_tz')}
							        	/>
					       			)}
						        </FormItem>
						        <FormItem label="体质指数(Kg/m²)">
					       			{getFieldDecorator('gxy_tz_tzzs')(
						        		<InputNumber step={0.1} style={{width: 60}}/>
					       			)}
						        </FormItem>
						        <FormItem label="心率(次/分钟)">
					       			{getFieldDecorator('gxy_tz_xl')(
										<InputNumber step={1} style={{width: 60}}/>
					       			)}
						        </FormItem>
						        <FormItem label="其他">
					       			{getFieldDecorator('gxy_tz_qt')(
										<Input style={{width: 190}}/>
					       			)}
						        </FormItem>
							</Row>

							<Row className="item_inline_spacing">
								<FormItem label="生活指导方式" />
								<FormItem label="日吸烟量(支)">
					       			{getFieldDecorator('gxy_shfs_rxyl')(
							        	<InputNumber step={1} style={{width: 60}}/>
					       			)}
								</FormItem>
								<FormItem label="日饮酒量(两)">
					       			{getFieldDecorator('gxy_shfs_ryjl')(
							        	<InputNumber step={1} style={{width: 60}}/>
					       			)}
								</FormItem>
								<FormItem label="运动">
					       			{getFieldDecorator('gxy_shfs_mzydcs')(
							        	<InputNumber step={1} style={{width: 60}}/>
					       			)}
						        	<span className="disline middle">{'次/周'}&nbsp;</span>
					       			{getFieldDecorator('gxy_shfs_mcydsj')(
							        	<InputNumber step={1} style={{width: 60}}/>
					       			)}
						        	<span className="disline middle">{'次/分钟'}</span>
								</FormItem>
								<FormItem label="摄盐程度(咸淡)">
					       			{getFieldDecorator('gxy_shfs_syqk')(
							        	<Select
										    style={{ width: 80 }}
											placeholder="请选择"
										  >	
										  {getSelectOptions(this.isOptions)}
										</Select>
					       			)}
								</FormItem>
								<FormItem label="心理调整">
					       			{getFieldDecorator('gxy_shfs_xltz')(
							        	<Select
										    style={{ width: 80 }}
											placeholder="请选择"
										  >	
										  {getSelectOptions(this.psyAdjustOptions)}
										</Select>
					       			)}
								</FormItem>
								<FormItem label="遵医行为">
					       			{getFieldDecorator('gxy_shfs_zyxw')(
							        	<Select
										    style={{ width: 80 }}
											placeholder="请选择"
										  >	
										  {getSelectOptions(this.bemOptions)}
										</Select>
					       			)}
								</FormItem>
							</Row>

							<Row className="item_inline_spacing">
								<FormItem label="辅助检查" required/>
								<FormItem label="药物依从性">
					       			{getFieldDecorator('gxy_fyycx')(
							        	<Select
										    style={{ width: 100 }}
											placeholder="请选择"
										  >	
										  {getSelectOptions(this.admOptions)}
										</Select>
					       			)}
								</FormItem>
								<FormItem label="药物不良反应">
					       			{getFieldDecorator('gxy_ywblfy')(
							        	<Select
							        		combobox
										    style={{ width: 150 }}
											placeholder="请选择"
										  >	
										  {getSelectOptions(this.drugReactOptions)}
										</Select>
					       			)}
								</FormItem>
								<FormItem label="此次随访分类">
					       			{getFieldDecorator('gxy_ccsffl')(
							        	<Select
										    style={{ width: 150 }}
											placeholder="请选择"
										  >	
										  {getSelectOptions(this.fucOptions)}
										</Select>
					       			)}
								</FormItem>
							</Row>

							<Row className="item_inline_spacing">
								<FormItem label="转诊" />
								<FormItem label="原因">
					       			{getFieldDecorator('gxy_zzyy')(
							        	<Input />
					       			)}
								</FormItem>
								<FormItem label="机构及科别">
					       			{getFieldDecorator('gxy_zzjgjkb')(
							        	<Input />
					       			)}
								</FormItem>
								<FormItem label="下次随访日期" >
					       			{getFieldDecorator('gxy_xcsfrq2')(
										<DatePicker />
					       			)}
						        </FormItem>
								<FormItem label="随访医生签名">
					       			{getFieldDecorator('gxy_sfys2')(
							        	<Input />
					       			)}
								</FormItem>
							</Row>
					    </Form>
				    </div>

					{/*高血压 用药情况*/}
					<HMedicationsTable
						gxyYyqkFields={gxyYyqk}
						onFieldsChange={onFieldsChange}
					    objSize={gxyYyqkObjSize}
					/>
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
	console.log("HypertensionForm onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, 'gxyJxb');
}

function mapPropsToFields(props) {
	const {
		gxyJxb,
	} = props.phr[FNAME]
	const fields = getFieldsData(gxyJxb)
	console.log("HypertensionForm mapPropsToFields", props, fields)
	return fields
}

HypertensionForm.propTypes = {
	phr: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	console.log('HypertensionForm mapStateToProps:', state)
	return {
		phr: state.phr
	}
}

HypertensionForm = Form.create({
	onFieldsChange,
	mapPropsToFields
})(HypertensionForm)

export default connect(mapStateToProps, {
	...PHRAction,
	...AppActions,
})(HypertensionForm)