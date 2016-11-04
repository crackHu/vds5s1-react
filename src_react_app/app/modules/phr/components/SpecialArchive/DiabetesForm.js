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
	connect
} from 'react-redux';
import DiabetesTable from './Table/DiabetesTable'
import DMedicationsTable from './Table/DMedicationsTable'

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
			onFieldsChange,
		} = this.props
		const {
			getFieldDecorator
		} = this.props.form
		const {
			tnbSfjl,
			tnbjl,
		} = this.props.phr[FNAME]

		let fields = {}
		let tnbYyqk = {}
		let objSize = []
		let tnbYyqkObjSize = []
		let selectKey = tnbSfjl['selectKey']
		for (let key in tnbSfjl) {
			let tnbSfjl_value = tnbSfjl[key]
			if (selectKey == key && tnbSfjl_value.constructor == Object) {
				fields = tnbSfjl_value
				tnbYyqk = tnbSfjl_value['tnbYyqk']
				break
			}
		}

		objSize = !!tnbSfjl ? tnbSfjl.objSize : objSize
		tnbYyqkObjSize = !!tnbYyqk ? tnbYyqk.objSize : tnbYyqkObjSize
		let formDisplay = !!(tnbjl.objSize) ? tnbjl.objSize.length > 0 ? 'block' : 'none' : 'none'

		return (
			<div>
				{/*糖尿病记录表*/}
				<div className="dashed_border form inside">
					<DiabetesTable
						fields={tnbjl}
						onFieldsChange={onFieldsChange}
						objSize={objSize}
					/>
				</div>

				<div style={{display: formDisplay}}>
					<div className="dashed_border form marginlr8">
						<Form inline>
							<Row className="item_inline_spacing">
								<FormItem label="随访日期" >
					       			{getFieldDecorator('tnb_sfrq2')(
										<DatePicker />
					       			)}
						        </FormItem>
								<FormItem label="随访方式" >
					       			{getFieldDecorator('tnb_sffs')(
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
					       			{getFieldDecorator('tnb_zz')(
										<Select
											tags
										    style={{ width: 350 }}
											placeholder="请选择"
										  >	
										  {getSelectOptions(this.dsOptions)}
										</Select>
					       			)}
						        </FormItem>
							</Row>

							<Row className="item_inline_spacing">
								<FormItem label="体征" />
								<div className="inputSpanGroup" style={{width: '250px'}}>
									<span>{'血压:'}</span>&nbsp;
		    						<div className="disline" style={{width: '30%'}}>
						       			{getFieldDecorator('tnb_tz_xy1')(
								        	<InputNumber size="large"/>
						       			)}
							      	</div>
							      	&nbsp;{' / '}&nbsp;
						    		<div className="disline" style={{width: '30%'}}>
						       			{getFieldDecorator('tnb_tz_xy2')(
								        	<InputNumber size="large"/>
						       			)}
							      	</div>
							      	&nbsp;{'mmhg'}
						        </div>
						        <FormItem label="体重(kg)">
					       			{getFieldDecorator('tnb_tz_sg')(
						        		<InputNumber style={{width: 60}}/>
					       			)}
						        </FormItem>
						        <FormItem label="体质指数(Kg/m²)">
					       			{getFieldDecorator('tnb_tz_tzzs')(
						        		<InputNumber style={{width: 60}}/>
					       			)}
						        </FormItem>
						        <FormItem label="足背动脉搏动">
					       			{getFieldDecorator('tnb_tz_zbdmbd')(
										<Select
										    style={{ width: 120 }}
											placeholder="请选择"
										  >	
										  {getSelectOptions(this.arpOptions)}
										</Select>
					       			)}
						        </FormItem>
						        <FormItem label="其他">
					       			{getFieldDecorator('tnb_tz_qt')(
										<Input />
					       			)}
						        </FormItem>
							</Row>

							<Row className="item_inline_spacing">
								<FormItem label="生活指导方式" />
								<FormItem label="日吸烟量(支)">
					       			{getFieldDecorator('tnb_shfs_rxyl')(
						        		<InputNumber style={{width: 60}}/>
					       			)}
								</FormItem>
								<FormItem label="日饮酒量(两)">
					       			{getFieldDecorator('tnb_shfs_ryjl')(
						        		<InputNumber style={{width: 60}}/>
					       			)}
								</FormItem>
								<FormItem label="运动">
					       			{getFieldDecorator('tnb_shfs_mzydcs')(
						        		<InputNumber style={{width: 60}}/>
					       			)}
						        	<span className="disline middle">{'次/周'}&nbsp;</span>
					       			{getFieldDecorator('tnb_shfs_mcydsj')(
						        		<InputNumber style={{width: 60}}/>
					       			)}
						        	<span className="disline middle">{'次/分钟'}</span>
								</FormItem>
								<FormItem label="主食(克/天)">
					       			{getFieldDecorator('tnb_shfs_zs')(
						        		<InputNumber style={{width: 60}}/>
					       			)}
								</FormItem>
								<FormItem label="心理调整">
					       			{getFieldDecorator('tnb_shfs_xltz')(
							        	<Select
										    style={{ width: 80 }}
											placeholder="请选择"
										  >	
										  {getSelectOptions(this.psyAdjustOptions)}
										</Select>
					       			)}
								</FormItem>
								<FormItem label="遵医行为">
					       			{getFieldDecorator('tnb_shfs_zyxw')(
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
								<FormItem label="辅助检查" />
								<FormItem label="空腹血糖值(mmol/L)">
					       			{getFieldDecorator('tnb_jzjc_kfxtz')(
						        		<InputNumber style={{width: 60}}/>
					       			)}
								</FormItem>
								<FormItem label="其他检查" required/>
								<FormItem label="糖化血红蛋白(%)">
					       			{getFieldDecorator('tnb_jzjc_thxhdb')(
						        		<InputNumber style={{width: 60}}/>
					       			)}
								</FormItem>
								<FormItem label="检查日期" >
					       			{getFieldDecorator('tnb_jzjc_jcrq')(
										<DatePicker />
					       			)}
						        </FormItem>
								<FormItem label="其他" >
					       			{getFieldDecorator('tnb_jzjc_qtjc')(
										<Input />
					       			)}
						        </FormItem>
							</Row>

							<Row className="item_inline_spacing">
								<FormItem label="药物依从性">
					       			{getFieldDecorator('tnb_fyycx')(
										<Select
										    style={{ width: 120 }}
											placeholder="请选择"
										  >	
										  {getSelectOptions(this.admOptions)}
										</Select>
					       			)}
								</FormItem>
								<FormItem label="药物不良反应">
					       			{getFieldDecorator('tnb_ywblfy')(
										<Select
										    style={{ width: 120 }}
											placeholder="请选择"
										  >	
										  {getSelectOptions(this.drugReactOptions)}
										</Select>
					       			)}
								</FormItem>
								<FormItem label="此次随访分类">
					       			{getFieldDecorator('tnb_ccsffl')(
										<Select
										    style={{ width: 120 }}
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
					       			{getFieldDecorator('tnb_zzyy')(
						        		<Input />
					       			)}
								</FormItem>
								<FormItem label="机构及科别">
					       			{getFieldDecorator('tnb_zzjgjkb')(
						        		<Input />
					       			)}
								</FormItem>
								<FormItem label="下次随访日期" >
					       			{getFieldDecorator('tnb_xcsfrq2')(
										<DatePicker />
					       			)}
						        </FormItem>
								<FormItem label="随访医生签名">
					       			{getFieldDecorator('tnb_sfys2')(
						        		<Input />
					       			)}
								</FormItem>
							</Row>
					    </Form>
				    </div>

					{/*糖尿病 用药情况*/}
					<DMedicationsTable 
						tnbYyqkFields={tnbYyqk}
						onFieldsChange={onFieldsChange}
						objSize={tnbYyqkObjSize}
					/>
				</div>
			</div>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("DiabetesForm onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, 'tnbSfjl');
}

function mapPropsToFields(props) {
	console.log("DiabetesForm mapPropsToFields", props)

	const {
		tnbSfjl,
	} = props.phr[FNAME]

	let fields = {}
	let selectKey = tnbSfjl['selectKey']
	for (let key in tnbSfjl) {
		let tnbSfjl_value = tnbSfjl[key]
		if (selectKey == key && tnbSfjl_value.constructor == Object) {
			fields = tnbSfjl_value
			break
		}
	}
	return fields
}

DiabetesForm.propTypes = {
	phr: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	console.log('DiabetesForm mapStateToProps:', state)
	return {
		phr: state.phr
	}
}

DiabetesForm = Form.create({
	onFieldsChange,
	mapPropsToFields
})(DiabetesForm)

export default connect(mapStateToProps, {
	...PHRAction,
	...AppActions,
})(DiabetesForm)