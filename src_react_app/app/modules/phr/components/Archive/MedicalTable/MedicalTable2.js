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

const getSelectOptions = (data) => {
	return data.map((item, i) => {
		return <Option key={item.value}>{item.value}</Option>
	})
}

/*体检表2*/
class MedicalTable2 extends React.Component {

	constructor(props) {
		super(props);

		this.selectOption = WIDGET_CONFIG.selectOption

		/*口唇*/
		this.oralOptions = this.selectOption.oral;
		/*齿列*/
		this.dentitionOptions = this.selectOption.dentition;
		/*咽部*/
		this.pharyngealOptions = this.selectOption.pharyngeal;
		/*听力*/
		this.hearOptions = this.selectOption.hearing;
		/*运动能力*/
		this.sAOptions = this.selectOption.sportsAbility;
		/*眼底*/
		this.fundusOptions = this.selectOption.fundus;
		/*皮肤*/
		this.skinOptions = this.selectOption.skin;
		/*巩膜*/
		this.oralOptions = this.selectOption.oral;
		/*巩膜*/
		this.scleraOptions = this.selectOption.sclera;
		/*淋巴结*/
		this.lymphOptions = this.selectOption.lymph;
		/*桶状胸*/
		this.bcOptions = this.selectOption.barrelChest;
		/*呼吸音*/
		this.bsOptions = this.selectOption.breathSounds;
		/*罗音*/
		this.raleOptions = this.selectOption.rale;
		/*心律*/
		this.rhythmOptions = this.selectOption.rhythm;
		/*杂音*/
		this.noiseOptions = this.selectOption.noise;
		/*压痛*/
		this.tenderOptions = this.selectOption.tenderness;
		/*包块*/
		this.pieceOptions = this.selectOption.piece;
		/*肝大*/
		this.liverOptions = this.selectOption.hepatomegaly;
		/*脾大*/
		this.spleenOptions = this.selectOption.splenomegaly;
		/*移动性浊音*/
		this.dullOptions = this.selectOption.dullness;
		/*下肢水肿*/
		this.edemaOptions = this.selectOption.edema;
		/*足背动脉搏动*/
		this.pulseOptions = this.selectOption.pulse;
		/*肛门指诊*/
		this.anusDreOptions = this.selectOption.anusDre;
		/*乳腺*/
		this.glandOptions = this.selectOption.gland;
		/*外阴*/
		this.vulvaOptions = this.selectOption.vulva;
		/*阴道*/
		this.vaginaOptions = this.selectOption.vagina;
		/*宫颈*/
		this.cervicalOptions = this.selectOption.cervical;
		/*宫体*/
		this.corpusOptions = this.selectOption.corpus;
		/*附件*/
		this.attachOptions = this.selectOption.attachment;
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	render() {

		const {
			getFieldDecorator
		} = this.props.form

		return (
			<div>
				<Form inline>
					<fieldset>
						<legend style={{width: '70px'}}>脏器功能</legend>
			       		<Row className="item_inline_spacing">
					        <FormItem label="口腔 口唇">
			        			{getFieldDecorator('grda_kq_kc')(
						        	<Select
					        			combobox
									    style={{ width: 100 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.oralOptions)}
									</Select>
			        			)}
					        </FormItem>
					        <FormItem label="齿列" >
			        			{getFieldDecorator('grda_kq_cl')(
						        	<Select
					        			combobox
									    style={{ width: 100 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.dentitionOptions)}
									</Select>
			        			)}
					        </FormItem>
					        <FormItem label="咽部" >
			        			{getFieldDecorator('grda_kq_yb')(
						        	<Select
					        			combobox
									    style={{ width: 100 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.pharyngealOptions)}
									</Select>
			        			)}
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
					        <FormItem label="视力 左眼">
			        			{getFieldDecorator('grda_slzy')(
					        		<InputNumber step={0.1}/>
			        			)}
					        </FormItem>
					        <FormItem label="右眼" >
			        			{getFieldDecorator('grda_slyy')(
					        		<InputNumber step={0.1}/>
			        			)}
					        </FormItem>
					        <FormItem label="矫正视力" />
					        <FormItem label="左眼" >
			        			{getFieldDecorator('grda_jzslzy')(
					        		<InputNumber step={0.1}/>
			        			)}
					        </FormItem>
					        <FormItem label="右眼" >
			        			{getFieldDecorator('grda_jzslyy')(
					        		<InputNumber step={0.1}/>
			        			)}
					        </FormItem>
					    </Row>

					    <Row className="item_inline_spacing">
					        <FormItem label="听力">
			        			{getFieldDecorator('grda_tl')(
						        	<Select
					        			combobox
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.hearOptions)}
									</Select>
			        			)}
					        </FormItem>
					        <FormItem label="运动能力" >
			        			{getFieldDecorator('grda_ydgn')(
						        	<Select
					        			combobox
									    style={{ width: 200 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.sAOptions)}
									</Select>
			        			)}
					        </FormItem>
					    </Row>
					</fieldset>

					<fieldset>
						<legend style={{width: '70px'}}>查体</legend>

			       		<Row className="item_inline_spacing">
							<FormItem label="眼底" >
			        			{getFieldDecorator('grda_yd')(
						        	<Select
					        			combobox
									    style={{ width: 200 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.fundusOptions)}
									</Select>
			        			)}
					        </FormItem>
							<FormItem label="皮肤" >
			        			{getFieldDecorator('grda_pf')(
						        	<Select
					        			combobox
									    style={{ width: 200 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.skinOptions)}
									</Select>
			        			)}
					        </FormItem>
							<FormItem label="巩膜" >
			        			{getFieldDecorator('grda_gm')(
						        	<Select
					        			combobox
									    style={{ width: 200 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.scleraOptions)}
									</Select>
			        			)}
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
							<FormItem label="淋巴结" >
			        			{getFieldDecorator('grda_lbj')(
						        	<Select
					        			combobox
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.lymphOptions)}
									</Select>
			        			)}
					        </FormItem>
							<FormItem label="肺 桶状胸" >
			        			{getFieldDecorator('grda_f_tzx')(
						        	<Select
					        			combobox
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.bcOptions)}
									</Select>
			        			)}
					        </FormItem>
							<FormItem label="呼吸音" >
			        			{getFieldDecorator('grda_f_hxy')(
						        	<Select
					        			combobox
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.bsOptions)}
									</Select>
			        			)}
					        </FormItem>
							<FormItem label="罗音" >
			        			{getFieldDecorator('grda_f_ly')(
						        	<Select
					        			combobox
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.raleOptions)}
									</Select>
			        			)}
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
			       			<FormItem label="心脏" />
							<FormItem label="心率" >
						    	<div className="disline" style={{width: '44%'}}>
			        			{getFieldDecorator('grda_xz_xl')(
						        	<InputNumber step={1}/>
			        			)}
						    	</div>
						    	{' '}
						    	<div className="disline middle" style={{width: '30%'}}>
						      		{'次/分钟'}
						    	</div>
					        </FormItem>
							<FormItem label="心律" >
			        			{getFieldDecorator('grda_xz_xinlv')(
						        	<Select
					        			combobox
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.rhythmOptions)}
									</Select>
			        			)}
					        </FormItem>
							<FormItem label="杂音" >
			        			{getFieldDecorator('grda_xz_zy')(
						        	<Select
					        			combobox
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.noiseOptions)}
									</Select>
			        			)}
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
			       			<FormItem label="腹部" />
							<FormItem label="压痛" >
			        			{getFieldDecorator('grda_fb_yt')(
						        	<Select
					        			combobox
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.tenderOptions)}
									</Select>
			        			)}
					        </FormItem>
							<FormItem label="包块" >
			        			{getFieldDecorator('grda_fb_bk')(
						        	<Select
					        			combobox
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.pieceOptions)}
									</Select>
			        			)}
					        </FormItem>
							<FormItem label="肝大" >
			        			{getFieldDecorator('grda_fb_gd')(
						        	<Select
					        			combobox
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.liverOptions)}
									</Select>
			        			)}
					        </FormItem>
							<FormItem label="脾大" >
			        			{getFieldDecorator('grda_fb_pd')(
						        	<Select
					        			combobox
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.spleenOptions)}
									</Select>
			        			)}
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
							<FormItem label="移动性浊音" >
			        			{getFieldDecorator('grda_fb_ydxzy')(
						        	<Select
					        			combobox
									    style={{ width: 200 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.dullOptions)}
									</Select>
			        			)}
					        </FormItem>
							<FormItem label="下肢水肿" >
			        			{getFieldDecorator('grda_xzsz')(
						        	<Select
					        			combobox
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.edemaOptions)}
									</Select>
			        			)}
					        </FormItem>
							<FormItem label="足背动脉搏动" >
			        			{getFieldDecorator('grda_zbdmbd')(
						        	<Select
					        			combobox
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.pulseOptions)}
									</Select>
			        			)}
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
							<FormItem label="肛门指诊" >
			        			{getFieldDecorator('grda_gmzz')(
						        	<Select
					        			combobox
									    style={{ width: 300 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.anusDreOptions)}
									</Select>
			        			)}
					        </FormItem>
							<FormItem label="乳腺" >
			        			{getFieldDecorator('grda_rx')(
						        	<Select
						        		tags
									    style={{ width: 300 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.glandOptions)}
									</Select>
			        			)}
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
							<FormItem label="妇科" />
							<FormItem label="外阴" >
			        			{getFieldDecorator('grda_fk_wy')(
						        	<Select
					        			combobox
									    style={{ width: 200 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.vulvaOptions)}
									</Select>
			        			)}
					        </FormItem>
							<FormItem label="阴道">
			        			{getFieldDecorator('grda_fk_yd')(
						        	<Select
					        			combobox
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.vaginaOptions)}
									</Select>
			        			)}
					        </FormItem>
							<FormItem label="宫颈">
			        			{getFieldDecorator('grda_fk_gj')(
						        	<Select
					        			combobox
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.cervicalOptions)}
									</Select>
			        			)}
					        </FormItem>
							<FormItem label="宫体">
			        			{getFieldDecorator('grda_fk_gt')(
						        	<Select
					        			combobox
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.corpusOptions)}
									</Select>
			        			)}
					        </FormItem>
							<FormItem label="附件">
			        			{getFieldDecorator('grda_fk_fj')(
						        	<Select
					        			combobox
									    style={{ width: 120 }}
										placeholder="请选择"
									  >	
									  {getSelectOptions(this.attachOptions)}
									</Select>
			        			)}
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
							<FormItem label="其他"  />
							<br />
		        			{getFieldDecorator('grda_ct_qt')(
								<Input type="textarea" style={{ width: 1170 }} rows={4} />
		        			)}
					    </Row>

					</fieldset>

		        </Form>
			</div>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("MedicalTable2 onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, 'grdaJkzk');
}

function mapPropsToFields(props) {
	console.log("MedicalTable2 mapPropsToFields", props)
	return props.fields || {}
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(MedicalTable2)