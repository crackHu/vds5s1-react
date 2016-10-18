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
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="血红蛋白(10⁹/L)">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="白细胞(10⁹/L)">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="血小板(10⁹/L)">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="其他">
					        	<Input />
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
					        <FormItem label="尿常规" required/>
					        <FormItem label="尿蛋白">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="尿糖">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="尿酮体">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="尿潜血">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="其他">
					        	<Input />
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
					        <FormItem label="空腹血糖" required>
				        		<InputNumber style={{width: 100}}/>
					        	<RadioGroup>
					              <RadioButton value="mmol/L">mmol/L</RadioButton>
					              <RadioButton value="mg/dL">mg/dL</RadioButton>
					            </RadioGroup>
					        </FormItem>
							<FormItem label="心电图" required>
					        	<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.eleOptions)}
								</Select>
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
					        <FormItem label="尿微量白蛋白(mg/dL)" required>
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="大便潜血" required>
					        	<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.dBloodOptions)}
								</Select>
					        </FormItem>
					        <FormItem label="糖化血红蛋白(%)" required>
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="乙型肝炎表面抗原" required>
					        	<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.antigenOptions)}
								</Select>
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
					        <FormItem label="肝功能" required/>
					        <FormItem label="血清谷丙转胺酶(U/L)">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="血清谷草转胺酶(U/L)">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="血蛋白(g/L)">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="总胆红素(μmol/L)">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="结合胆红素(μmol/L)">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
					        <FormItem label="肾功能" required/>
					        <FormItem label="血清肌酐(μmol/L)">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="血尿素氮(mmol/L)">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="血钾浓度(mmol/L)">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="血钠浓度(mmol/L)">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
					        <FormItem label="血脂" required/>
					        <FormItem label="总胆固醇(mmol/L)">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="甘油三酯(mmol/L)">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="血清低密度脂蛋白胆固醇(mmol/L)">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					        <FormItem label="血清高密度脂蛋白胆固醇(mmol/L)">
					        	<InputNumber style={{width: 60}}/>
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
					        <FormItem label="胸部x线片" required>
					        	<Select
					        		tags
								    style={{ width: 200 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.antigenOptions)}
								</Select>
					        </FormItem>
					        <FormItem label="B超">
					        	<Select
					        		tags
								    style={{ width: 200 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.xRayOptions)}
								</Select>
					        </FormItem>
					        <FormItem label="宫颈涂片">
					        	<Select
					        		tags
								    style={{ width: 200 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.csOptions)}
								</Select>
					        </FormItem>
					    </Row>
					</fieldset>

					<fieldset>
						<legend style={{width: '110px'}}>中医体质辨识</legend>

			       		<Row className="item_inline_spacing">
					        <FormItem label="宫颈涂片">
					        	<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.gtOptions)}
								</Select>
					        </FormItem>
					        <FormItem label="气虚质">
					        	<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.uGTOptions)}
								</Select>
					        </FormItem>
					        <FormItem label="阳虚质">
					        	<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.uGTOptions)}
								</Select>
					        </FormItem>
					        <FormItem label="阴虚质">
					        	<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.uGTOptions)}
								</Select>
					        </FormItem>
					        <FormItem label="痰湿质">
					        	<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.uGTOptions)}
								</Select>
					        </FormItem>
					    </Row>

			       		<Row className="item_inline_spacing">
			       			&nbsp;&nbsp;&nbsp;&nbsp;
					        <FormItem label="湿热质">
					        	<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.csOptions)}
								</Select>
					        </FormItem>
					        <FormItem label="血瘀质">
					        	<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.uGTOptions)}
								</Select>
					        </FormItem>
					        <FormItem label="气郁质">
					        	<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.uGTOptions)}
								</Select>
					        </FormItem>
					        <FormItem label="特秉质">
					        	<Select
								    style={{ width: 120 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.uGTOptions)}
								</Select>
					        </FormItem>
					    </Row>
					</fieldset>
			</Form>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("MedicalTable3 onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("MedicalTable3 mapPropsToFields")
}

export default Form.create(onFieldsChange, mapPropsToFields)(MedicalTable3)