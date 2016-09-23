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
	Icon
} from 'antd';
import {
	arc_form_widget_config
} from 'config'

import MedicalRecordsTable from './MedicalRecordsTable'
import FormItemWithUnknown from './FormItemWithUnknown'

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class GeneralSituationForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			options: [],
		}

		/*现住址*/
		this.curAddress = arc_form_widget_config.cascadeOptions.curAddress;
		/*户籍地址*/
		this.censusRegister = arc_form_widget_config.cascadeOptions.censusRegister;
		/*医疗费用支付方式*/
		this.medicalPayMethod = arc_form_widget_config.checkboxGroupOptions.medicalPayMethod;
		/*药物过敏*/
		this.drugAllergy = arc_form_widget_config.checkboxGroupOptions.drugAllergy;
		/*暴露史*/
		this.exposureHistory = arc_form_widget_config.checkboxGroupOptions.exposureHistory;
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('收到表单值：', this.props.form.getFieldsValue());
	}

	render() {
		const {
			getFieldProps
		} = this.props.form

		const sex = getFieldProps('sex');
		const birthday = getFieldProps('birthday');

		return (
			<Form inline onSubmit={this.handleSubmit}>
				<Row>
					<Col>
						{/*性别*/}
				        <FormItem label="性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别" required>
				          <Select
				           style={{ width: 100 }}
				           {...sex}
				          >
				          	  <Option value="unknown">未知的性别</Option>
						      <Option value="male">男</Option>
						      <Option value="female">女</Option>
						    </Select>
				        </FormItem>
				        <FormItem label="出生日期" required>
				         <DatePicker
				          defaultValue="1950-1-1"
				          format="yyyy-M-d"
				          {...birthday}
				          style={{ width: 140 }}
				          disabledDate={(current) => {return current && current.getTime() > Date.now()}}
				         />
				        </FormItem>
				        <FormItem label="身份证号" >
			        		<Input style={{ width: 160 }}/>
				        </FormItem>
				        <FormItemWithUnknown
				        	label="工作单位"
				         	style={{ width: 320 }}
				        />
				        <br />
				        <br />

				    	{/*现住址*/}
				        <FormItem label="现&nbsp;&nbsp;住&nbsp;&nbsp;址" required>
				        	<Cascader
				        	 options={this.curAddress}
				        	 placeholder="请选择现住址"
				        	 defaultValue={['guangzhou', 'yuexiu', 'dadongjie']}
				        	 style={{ width: 320 }}
				        	/>
				        </FormItem>
				        <FormItem>
			        		<Input placeholder="路（街）"  style={{ width: 150 }}/>
				        </FormItem>
				        <br />
				        <br />

				        {/*户籍地址*/}
				        <FormItem label="户籍地址" required>
				        	<Cascader
				        	 options={this.censusRegister}
				        	 placeholder="请选择现住址"
				        	 defaultValue={['guangdongsheng', 'guangzhou', 'yuexiu', 'dadongjie']}
				        	 style={{ width: 320 }} />
				        </FormItem>
				        <FormItem>
			        		<Input placeholder="路（街）"  style={{ width: 150 }}/>
				        </FormItem>
				        <br />
				        <br />

				        {/*本人电话*/}
				        <FormItemWithUnknown
				        	label="&nbsp;&nbsp;&nbsp;本人电话"
				         	style={{ width: 150 }}
				        />
				        <FormItemWithUnknown
				        	label="联系人姓名"
				         	style={{ width: 150 }}
				        />
				        <FormItemWithUnknown
				        	label="联系人电话"
				         	style={{ width: 150 }}
				        />
				        <FormItem label="常住类型" required>
				          <Select style={{ width: 150 }}>
						      <Option value="phone">户籍（辖区）</Option>
						    </Select>
				        </FormItem>
				        <FormItem label="民族" >
				          <Select style={{ width: 150 }}>
						      <Option value="phone">汉族</Option>
						    </Select>
				        </FormItem>
				        <br />
				        <br />

				        {/*血型*/}
				        <FormItem label="&nbsp;&nbsp;&nbsp;血&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型" >
				          <Select style={{ width: 174 }}>
						      <Option value="phone">O型</Option>
						    </Select>
				        </FormItem>
				        <FormItem label="RH阴性" >
				          <Select style={{ width: 150 }}>
						      <Option value="phone">是</Option>
						    </Select>
				        </FormItem>
				        <FormItem label="文化程度" >
				          <Select style={{ width: 150 }}>
						      <Option value="phone">本科</Option>
						    </Select>
				        </FormItem>
				        <FormItem label="职业" >
				          <Select style={{ width: 320 }}>
						      <Option value="phone">商业服务人员</Option>
						    </Select>
				        </FormItem>
				        <FormItem label="婚姻状况" >
				          <Select style={{ width: 150 }}>
						      <Option value="phone">已婚</Option>
						    </Select>
				        </FormItem>
				        <br />
				        <br />

				        {/*医疗费用支付方式*/}
				        <FormItem label="医疗费用支付方式" >
				        	<CheckboxGroup options={this.medicalPayMethod} defaultValue={['Pear']} />
				        </FormItem>
				        <FormItem>
			        		<Input placeholder="其他"  style={{ width: 150 }}/>
				        </FormItem>
				        <br />
				        <br />

				        {/*药物过敏*/}
				        <FormItem label="药物过敏" >
				        	<RadioGroup>
					        	<Radio key="a" value={1}>有</Radio>
								<Radio key="b" value={2}>无</Radio>
				        	</RadioGroup>
							</FormItem>
				        <FormItem>
				        	<CheckboxGroup options={this.drugAllergy} defaultValue={['Pear']} />
				        </FormItem>
				        <FormItem>
			        		<Input placeholder="其他"  style={{ width: 150 }}/>
			        	</FormItem>
				        <FormItem label="暴露史" >
				        	<RadioGroup>
					        	<Radio key="a" value={1}>有</Radio>
								<Radio key="b" value={2}>无</Radio>
				        	</RadioGroup>
				        </FormItem>
				        <FormItem>
				        	<CheckboxGroup options={this.exposureHistory} defaultValue={['Pear']} />
				        </FormItem>
				        <br />
				        <br />

				        {/*档案状态*/}
				        <FormItem label="档案状态" >
				          <Select style={{ width: 150 }}>
						      <Option value="phone">在册</Option>
						    </Select>
				        </FormItem>
				        <FormItem label="建档人" >
				          <Input />
				        </FormItem>
				        <FormItem label="建档日期" >
				          <DatePicker />
				        </FormItem>
				        <FormItem label="录入人" >
				          <Input />
				        </FormItem>
				        <FormItem label="录入日期" >
				          <DatePicker />
				        </FormItem>
				        <br />
				        <br />
					</Col>
				</Row>
		        <Row>
		        	<FormItem label="既往史" />
		        	<div style={{width: 1156}}>
			        	<MedicalRecordsTable />
			        </div>
			    </Row>
		    </Form>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("GeneralSituationForm onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("GeneralSituationForm mapPropsToFields")
}

export default Form.create()(GeneralSituationForm)