import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
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
	Modal,
	InputNumber,
} from 'antd'

import {
	ARC_FORM_WIDGET_CONFIG as WIDGET_CONFIG,
} from 'phr_conf'

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const CheckboxGroup = Checkbox.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

let uuid = 0;

const getSelectOptions = (data) => {
	return data.map((item, i) => {
		return <Option key={item.value}>{item.value}</Option>
	})
}

const getRadioOptions = (data) => {
	return data.map((item, i) => {
		return <RadioButton key={item.value} value={item.value}>{item.value}</RadioButton>
	})
}

/*体检表6*/
class MedicalTable6 extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			exception: false,
			modalVisible: true
		}

		this.checkboxGroupOptions = WIDGET_CONFIG.checkboxGroupOptions

		/*异常情况*/
		this.abnormalOptions = this.checkboxGroupOptions.abnormal;
		/*健康指导*/
		this.healthGuiOptions = this.checkboxGroupOptions.healthGuide;
		/*危险因素控制*/
		this.rfcOptions = this.checkboxGroupOptions.riskFactorsCon;
	}

	componentWillMount = () => {}

	componentDidMount = () => {
		this.updateState(this.props)
	}

	componentWillUpdate = (nextProps, nextState) => {
		console.log('MedicalTable6.componentWillUpdate', nextProps, nextState)
	}

	componentWillReceiveProps = (nextProps) => {
		console.log('MedicalTable6.componentWillReceiveProps', nextProps)
		this.updateState(nextProps)
		this.handleHazardsSelect(nextProps)
	}

	componentDidUpdate = (prevProps, prevState) => {
		console.log("MedicalTable6.componentDidUpdate", this.props, prevProps, prevState)
	}

	updateState = (props) => {
		const {
			getFieldValue,
			setFieldsValue
		} = props.form

		const grda_jkpj = getFieldValue('grda_jkpj')
		const grda_ycqk = getFieldValue('grda_ycqk1')

		const exception = !!grda_ycqk || grda_jkpj != '体检无异常'
		console.log('异常情况', grda_jkpj, grda_ycqk, exception)
		if (grda_jkpj != '体检无异常' && grda_jkpj != '有异常') {
			setFieldsValue({
				grda_jkpj: exception ? '有异常' : '体检无异常'
			})
		}
		this.setState({
			exception
		})
	}

	onAbnormalChange = (e) => {
		console.log(`radio checked:${e.target.value}`);

		if (e.target.value == '体检无异常') {
			const grda_ycqk = []
			for (let i = 1; i < 8; i++) {
				grda_ycqk.push(`grda_ycqk${i}`)
			}
			this.props.form.resetFields(grda_ycqk)
		} else {
			this.setState({
				exception: true
			})
		}
	}

	onAbnormalAdd = () => {
		if (uuid < 6) {
			uuid++;
			const {
				form
			} = this.props;
			// can use data-binding to get
			const keys = form.getFieldValue('keys');
			const nextKeys = keys.concat(uuid);
			// can use data-binding to set
			// important! notify form to detect changes
			form.setFieldsValue({
				keys: nextKeys,
			});
		}
	}

	onAbnormalRemove = (k) => {
		if (uuid < 6) {
			const {
				form
			} = this.props;
			// can use data-binding to get
			const keys = form.getFieldValue('keys');
			// can use data-binding to set
			form.setFieldsValue({
				keys: keys.filter(key => key !== k),
			});
		}
	}

	// 危险因素控制 减体重
	handleHazardsSelect = (props) => {
		const { setFieldsValue, getFieldValue } = this.props.form
		const grda_whyskz = getFieldValue('grda_whyskz')
	 	const weightIndex = grda_whyskz.indexOf('减体重')
		if (weightIndex > -1) {
			let weight = 0
			confirm({
			    title: '请输入目标体重(kg)：',
			    content: (<InputNumber min={1} step={1} style={{width: 250}} onChange={(value) => {weight = value}} />),
			    onOk() {
			      grda_whyskz.splice(weightIndex, 1, `${grda_whyskz[weightIndex]} 目标：${weight}kg`)
			      setFieldsValue({ grda_whyskz })
			    },
			    onCancel() {
			      console.log('Cancel');
			    },
		  	});
		}
	}

	render() {

		const {
			getFieldDecorator,
			getFieldValue
		} = this.props.form

		const formItems = [0, 1, 2, 3, 4, 5, 6].map((k) => {
			return (
				<Row className="item_inline_spacing" key={k}>
					<Form.Item label={`异常${k+1}：`} key={k}>
			          {getFieldDecorator(`grda_ycqk${k+1}`)(
			            <Input style={{ width: '250px', margin: '0 8px 0 32px' }}/>
			          )}
			          {/*<Button onClick={() => this.onAbnormalRemove(k)}>移除</Button>*/}
			        </Form.Item>
			    </Row>
			);
		});

		return (
			<Form inline>
				<fieldset>
					<legend style={{width: '70px'}}>健康评价</legend>

					<FormItem label="异常情况" >
						{getFieldDecorator('grda_jkpj')(
							<RadioGroup
						  		style={{ marginLeft: '14px' }}
						 		onChange={this.onAbnormalChange}>
					      			{getRadioOptions(this.abnormalOptions)}
						    </RadioGroup>
					    )}
			        </FormItem>

			        {/*<Row className="item_inline_spacing">
		       			<FormItem label="异常1" >
		       				{getFieldDecorator('grda_ycqk1')(
				        		<Input style={{ width: '250px', margin: '0 8px 0 32px' }}/>
		       				)}
				        	<Button onClick={() => this.onAbnormalRemove()}>移除</Button>
				        </FormItem>			        
				    </Row>*/}
					{this.state.exception ? formItems : null}	
				    {/*<Button
				     type="primary"
				     style={{ marginLeft: '75px' }}
				     onClick={this.onAbnormalAdd}>添加异常</Button>

			        <Row className="item_inline_spacing">
		       			<FormItem label="异常2" >
				        	<Input />
				        </FormItem>
				    </Row>

			        <Row className="item_inline_spacing">
		       			<FormItem label="异常3" >
				        	<Input />
				        </FormItem>
				    </Row>

		       			<FormItem label="异常4" >
				        	<Input />
				        </FormItem>

			        <Row className="item_inline_spacing">
		       			<FormItem label="异常5" >
				        	<Input />
				        </FormItem>
				    </Row>

			        <Row className="item_inline_spacing">
		       			<FormItem label="异常6" >
				        	<Input />
				        </FormItem>
				    </Row>

			        <Row className="item_inline_spacing">
		       			<FormItem label="异常7" >
				        	<Input />
				        </FormItem>
				    </Row>*/}
				</fieldset>
				<fieldset>
					<legend style={{width: '70px'}}>健康指导</legend>

			        <Row className="item_inline_spacing">
			        	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		       			<FormItem label="健康指导" >
		       				{getFieldDecorator('grda_jkzd')(
					        	<Select
					        		tags
								    style={{ width: 500 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.healthGuiOptions)}
								</Select>
		       				)}
				        </FormItem>
				    </Row>
			        <Row className="item_inline_spacing">
		       			<FormItem label="危险因素控制" >
		       				{getFieldDecorator('grda_whyskz')(
					        	<Select
					        		tags
								    style={{ width: 500 }}
									placeholder="请选择"
								  >	
								  {getSelectOptions(this.rfcOptions)}
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
	console.log("MedicalTable6 onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, 'grdaJkzk');
}

function mapPropsToFields(props) {
	console.log("MedicalTable6 mapPropsToFields", props)
	return props.fields || {}
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(MedicalTable6)