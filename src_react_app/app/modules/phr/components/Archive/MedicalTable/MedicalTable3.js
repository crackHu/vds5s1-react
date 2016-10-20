import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
	InputNumber,
	Button,
	Switch,
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
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const getSelectOptions = (data) => {
	return data.map((item, i) => {
		return <Option key={item.value}>{item.value}</Option>
	})
}

/*体检表3*/
class MedicalTable3 extends React.Component {

	constructor(props) {
		super(props);

		this.selectOption = WIDGET_CONFIG.selectOption

		/*心电图*/
		this.eleOptions = this.selectOption.electrocardiogram;
		/*大便潜血*/
		this.dBloodOptions = this.selectOption.defecateBlood;
		/*乙型肝炎表面抗原*/
		this.antigenOptions = this.selectOption.antigen;
		/*胸部x线片*/
		this.xRayOptions = this.selectOption.xRay;
		/*b超*/
		this.ultrasoundOptions = this.selectOption.ultrasound;
		/*宫颈涂片*/
		this.csOptions = this.selectOption.cervicalSmear;
		/*平和质*/
		this.gtOptions = this.selectOption.gentleTempe;
		/*非平和质*/
		this.uGTOptions = this.selectOption.unGentleTempe;
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	render() {

		const {
			getFieldDecorator
		} = this.props.form

		return (
			<Form inline>
					<fieldset>
						<legend style={{width: '70px'}}>辅助检查</legend>
			       		<Row className="item_inline_spacing">
					        <FormItem label="血常规" required/>
					        <FormItem label="红细胞(10⁹/L)">
					        	{getFieldDecorator('grda_xcg_hxb')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="血红蛋白(10⁹/L)">
					        	{getFieldDecorator('grda_xcg_xhdb')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="白细胞(10⁹/L)">
					        	{getFieldDecorator('grda_xcg_bxb')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="血小板(10⁹/L)">
					        	{getFieldDecorator('grda_xcg_xxb')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="其他">
					        	{getFieldDecorator('grda_xcg_qt')(
					        		<Input />
					        	)}
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
					        <FormItem label="尿常规" required/>
					        <FormItem label="尿蛋白">
					        	{getFieldDecorator('grda_ncg_ndb')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="尿糖">
					        	{getFieldDecorator('grda_ncg_nt')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="尿酮体">
					        	{getFieldDecorator('grda_ncg_ntt')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="尿潜血">
					        	{getFieldDecorator('grda_ncg_nqx')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="其他">
					        	{getFieldDecorator('grda_ncg_qt')(
					        		<Input />
					        	)}
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
					        <FormItem label="空腹血糖" required>
					        	{getFieldDecorator('grda_kfxt1/2')(
				        			<InputNumber style={{width: 100}}/>
					        	)}
					        	<RadioGroup>
					              <RadioButton value="mmol/L">mmol/L</RadioButton>
					              <RadioButton value="mg/dL">mg/dL</RadioButton>
					            </RadioGroup>
					        </FormItem>
							<FormItem label="心电图" required>
					        	{getFieldDecorator('grda_xdt')(
						        	<Select
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.eleOptions)}
									</Select>
					        	)}
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
					        <FormItem label="尿微量白蛋白(mg/dL)" required>
					        	{getFieldDecorator('grda_nwlbdb')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="大便潜血" required>
					        	{getFieldDecorator('grda_dbqx')(
						        	<Select
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.dBloodOptions)}
									</Select>
					        	)}
					        </FormItem>
					        <FormItem label="糖化血红蛋白(%)" required>
					        	{getFieldDecorator('grda_thxhdb')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="乙型肝炎表面抗原" required>
					        	{getFieldDecorator('grda_yxgybmky')(
						        	<Select
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.antigenOptions)}
									</Select>
					        	)}
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
					        <FormItem label="肝功能" required/>
					        <FormItem label="血清谷丙转氨酶(U/L)">
					        	{getFieldDecorator('grda_ggn_alt')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="血清谷草转胺酶(U/L)">
					        	{getFieldDecorator('grda_ggn_ast')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="血蛋白(g/L)">
					        	{getFieldDecorator('grda_ggn_bdb')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="总胆红素(μmol/L)">
					        	{getFieldDecorator('grda_ggn_zdhs')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="结合胆红素(μmol/L)">
					        	{getFieldDecorator('grda_ggn_jhdhs')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
					        <FormItem label="肾功能" required/>
					        <FormItem label="血清肌酐(μmol/L)">
					        	{getFieldDecorator('grda_sgn_xqjg')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="血尿素氮(mmol/L)">
					        	{getFieldDecorator('grda_sgn_xnsd')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="血钾浓度(mmol/L)">
					        	{getFieldDecorator('grda_sgn_xjnd')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="血钠浓度(mmol/L)">
					        	{getFieldDecorator('grda_sgn_xnnd')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
					        <FormItem label="血脂" required/>
					        <FormItem label="总胆固醇(mmol/L)">
					        	{getFieldDecorator('grda_xz_zdgc')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="甘油三酯(mmol/L)">
					        	{getFieldDecorator('grda_xz_gysz')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="血清低密度脂蛋白胆固醇(mmol/L)">
					        	{getFieldDecorator('grda_xz_dmdzdbdgc')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					        <FormItem label="血清高密度脂蛋白胆固醇(mmol/L)">
					        	{getFieldDecorator('grda_xz_gmdzdbdgc')(
					        		<InputNumber style={{width: 60}}/>
					        	)}
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
					        <FormItem label="胸部x线片" required>
					        	{getFieldDecorator('grda_xbxxp')(
						        	<Select
						        		tags
									    style={{ width: 200 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.antigenOptions)}
									</Select>
					        	)}
					        </FormItem>
					        <FormItem label="B超">
					        	{getFieldDecorator('grda_bc')(
						        	<Select
						        		tags
									    style={{ width: 200 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.xRayOptions)}
									</Select>
					        	)}
					        </FormItem>
					        <FormItem label="宫颈涂片">
					        	{getFieldDecorator('grda_gjtp')(
						        	<Select
						        		tags
									    style={{ width: 200 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.csOptions)}
									</Select>
					        	)}
					        </FormItem>
					    </Row>
					</fieldset>

					<fieldset>
						<legend style={{width: '110px'}}>中医体质辨识</legend>

			       		<Row className="item_inline_spacing">
					        <FormItem label="气虚质">
					        	{getFieldDecorator('grda_zybs_qxz')(
						        	<Select
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.uGTOptions)}
									</Select>
					        	)}
					        </FormItem>
					        <FormItem label="阳虚质">
					        	{getFieldDecorator('grda_zybs_yxz')(
						        	<Select
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.uGTOptions)}
									</Select>
					        	)}
					        </FormItem>
					        <FormItem label="阴虚质">
					        	{getFieldDecorator('grda_zybs_yinxz')(
						        	<Select
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.uGTOptions)}
									</Select>
					        	)}
					        </FormItem>
					        <FormItem label="痰湿质">
					        	{getFieldDecorator('grda_zybs_tsz')(
						        	<Select
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.uGTOptions)}
									</Select>
					        	)}
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
					        <FormItem label="湿热质">
					        	{getFieldDecorator('grda_zybs_srz')(
						        	<Select
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.csOptions)}
									</Select>
					        	)}
					        </FormItem>
					        <FormItem label="血瘀质">
					        	{getFieldDecorator('grda_zybs_xyz')(
						        	<Select
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.uGTOptions)}
									</Select>
					        	)}
					        </FormItem>
					        <FormItem label="气郁质">
					        	{getFieldDecorator('grda_zybs_qyz')(
						        	<Select
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.uGTOptions)}
									</Select>
					        	)}
					        </FormItem>
					        <FormItem label="特秉质">
					        	{getFieldDecorator('grda_zybs_tbz')(
						        	<Select
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.uGTOptions)}
									</Select>
					        	)}
					        </FormItem>
					    </Row>
					</fieldset>
			</Form>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("MedicalTable3 onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, 'grdaJkzk');
}

function mapPropsToFields(props) {
	console.log("MedicalTable3 mapPropsToFields", props)
	return props.fields || {}
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(MedicalTable3)