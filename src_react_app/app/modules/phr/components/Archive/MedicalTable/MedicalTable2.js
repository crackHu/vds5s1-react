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
					        	<Select
								    style={{ width: 100 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.oralOptions)}
								</Select>
					        </FormItem>
					        <FormItem label="齿列" >
					        	<Select
								    style={{ width: 100 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.dentitionOptions)}
								</Select>
					        </FormItem>
					        <FormItem label="咽部" >
					        	<Select
								    style={{ width: 100 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.pharyngealOptions)}
								</Select>
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
					        <FormItem label="视力 左眼">
					        	<InputNumber />
					        </FormItem>
					        <FormItem label="右眼" >
					        	<InputNumber />
					        </FormItem>
					        <FormItem label="矫正视力" />
					        <FormItem label="左眼" >
					        	<InputNumber />
					        </FormItem>
					        <FormItem label="右眼" >
					        	<InputNumber />
					        </FormItem>
					    </Row>

					    <Row className="item_inline_spacing">
					        <FormItem label="听力">
					        	<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.hearOptions)}
								</Select>
					        </FormItem>
					        <FormItem label="运动能力" >
					        	<Select
								    style={{ width: 200 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.sAOptions)}
								</Select>
					        </FormItem>
					    </Row>
					</fieldset>

					<fieldset>
						<legend style={{width: '70px'}}>查体</legend>

			       		<Row className="item_inline_spacing">
							<FormItem label="眼底" required>
					        	<Select
					        		tags
								    style={{ width: 200 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.fundusOptions)}
								</Select>
					        </FormItem>
							<FormItem label="皮肤" >
					        	<Select
					        		tags
								    style={{ width: 200 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.skinOptions)}
								</Select>
					        </FormItem>
							<FormItem label="巩膜" >
					        	<Select
					        		tags
								    style={{ width: 200 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.scleraOptions)}
								</Select>
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
							<FormItem label="淋巴结" >
					        	<Select
					        		tags
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.lymphOptions)}
								</Select>
					        </FormItem>
							<FormItem label="肺 桶状胸" >
					        	<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.bcOptions)}
								</Select>
					        </FormItem>
							<FormItem label="呼吸音" >
					        	<Select
					        		tags
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.bsOptions)}
								</Select>
					        </FormItem>
							<FormItem label="罗音" >
					        	<Select
					        		tags
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.raleOptions)}
								</Select>
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
			       			<FormItem label="心脏" />
							<FormItem label="心率" >
						    	<div className="disline" style={{width: '44%'}}>
						        	<InputNumber />
						    	</div>
						    	{' '}
						    	<div className="disline middle" style={{width: '20%'}}>
						      		{'次/分钟'}
						    	</div>
					        </FormItem>
							<FormItem label="心律" >
					        	<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.rhythmOptions)}
								</Select>
					        </FormItem>
							<FormItem label="杂音" >
					        	<Select
					        		tags
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.noiseOptions)}
								</Select>
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
			       			<FormItem label="腹部" />
							<FormItem label="压痛" >
					        	<Select
					        		tags
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.tenderOptions)}
								</Select>
					        </FormItem>
							<FormItem label="包块" >
					        	<Select
					        		tags
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.pieceOptions)}
								</Select>
					        </FormItem>
							<FormItem label="肝大" >
					        	<Select
					        		tags
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.liverOptions)}
								</Select>
					        </FormItem>
							<FormItem label="脾大" >
					        	<Select
					        		tags
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.spleenOptions)}
								</Select>
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
							<FormItem label="移动性浊音" >
					        	<Select
					        		tags
								    style={{ width: 200 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.dullOptions)}
								</Select>
					        </FormItem>
							<FormItem label="下肢水肿" >
					        	<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.edemaOptions)}
								</Select>
					        </FormItem>
							<FormItem label="足背动脉搏动" >
					        	<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.pulseOptions)}
								</Select>
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
							<FormItem label="肛门指诊" required>
					        	<Select
					        		tags
								    style={{ width: 200 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.anusDreOptions)}
								</Select>
					        </FormItem>
							<FormItem label="乳腺" required>
					        	<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.glandOptions)}
								</Select>
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
							<FormItem label="妇科" required/>
							<FormItem label="外阴" >
					        	<Select
					        		tags
								    style={{ width: 200 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.vulvaOptions)}
								</Select>
					        </FormItem>
							<FormItem label="阴道">
					        	<Select
					        		tags
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.vaginaOptions)}
								</Select>
					        </FormItem>
							<FormItem label="宫颈">
					        	<Select
					        		tags
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.cervicalOptions)}
								</Select>
					        </FormItem>
							<FormItem label="宫体">
					        	<Select
					        		tags
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.corpusOptions)}
								</Select>
					        </FormItem>
							<FormItem label="附件">
					        	<Select
					        		tags
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.attachOptions)}
								</Select>
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
							<FormItem label="其他" required />
							<br />
							<Input type="textarea" style={{ width: 1170 }} rows={4} />
					    </Row>

					</fieldset>

		        </Form>
			</div>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("MedicalTable2 onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("MedicalTable2 mapPropsToFields")
}

export default Form.create(onFieldsChange, mapPropsToFields)(MedicalTable2)