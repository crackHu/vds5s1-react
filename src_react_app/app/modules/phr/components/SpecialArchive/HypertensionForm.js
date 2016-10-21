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
import HypertensionTable from './Table/HypertensionTable'
import HMedicationsTable from './Table/HMedicationsTable'

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

/*高血压专档*/
class HypertensionForm extends React.Component {

	constructor(props) {
		super(props);

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

	render() {
		const {
			getFieldDecorator
		} = this.props.form

		return (
			<div>
				{/*高血压记录表*/}
				<div className="dashed_border form inside">
					<HypertensionTable
						gxyJxbFields={this.props.gxyJxbFields}
						onFieldsChange={this.props.onFieldsChange}
					/>
				</div>

				<div className="dashed_border form marginlr8">
					<Form inline>
						<Row className="item_inline_spacing">
							<FormItem label="随访日期" >
				       			{getFieldDecorator('gxy_sfrq2')(
									<DatePicker />
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
		    						<div className="disline" style={{width: '30%'}}>
						       			{getFieldDecorator('gxy_tz_xy1')(
								        	<InputNumber size="large"/>
						       			)}
							      	</div>
							      	&nbsp;{' / '}&nbsp;
						    		<div className="disline" style={{width: '30%'}}>
						       			{getFieldDecorator('gxy_tz_xy2')(
							        		<InputNumber size="large"/>
						       			)}
							      	</div>
							      	&nbsp;{'mmhg'}
						        </div>
					        <FormItem label="体重(kg)">
				       			{getFieldDecorator('gxy_tz_tz')(
						        	<InputNumber style={{width: 60}}/>
				       			)}
					        </FormItem>
					        <FormItem label="体质指数(Kg/m²)">
				       			{getFieldDecorator('gxy_tz_tzzs')(
					        		<InputNumber style={{width: 60}}/>
				       			)}
					        </FormItem>
					        <FormItem label="心率(次/分钟)">
				       			{getFieldDecorator('gxy_tz_xl')(
									<InputNumber style={{width: 60}}/>
				       			)}
					        </FormItem>
					        <FormItem label="其他">
				       			{getFieldDecorator('gxy_tz_qt')(
									<Input />
				       			)}
					        </FormItem>
						</Row>

						<Row className="item_inline_spacing">
							<FormItem label="生活指导方式" />
							<FormItem label="日吸烟量(支)">
				       			{getFieldDecorator('gxy_shfs_rxyl')(
						        	<InputNumber style={{width: 60}}/>
				       			)}
							</FormItem>
							<FormItem label="日饮酒量(两)">
				       			{getFieldDecorator('gxy_shfs_ryjl')(
						        	<InputNumber style={{width: 60}}/>
				       			)}
							</FormItem>
							<FormItem label="运动">
				       			{getFieldDecorator('gxy_shfs_mzydcs')(
						        	<InputNumber style={{width: 60}}/>
				       			)}
					        	<span className="disline middle">{'次/周'}&nbsp;</span>
				       			{getFieldDecorator('gxy_shfs_mcydsj')(
						        	<InputNumber style={{width: 60}}/>
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
						        		tags
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
					gxyYyqkFields={this.props.gxyYyqkFields}
					onFieldsChange={this.props.onFieldsChange}
				/>
			</div>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("HypertensionForm onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, 'gxyJxb');
}

function mapPropsToFields(props) {
	console.log("HypertensionForm mapPropsToFields", props)
	return props.gxyJxbFields || {}
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(HypertensionForm)