import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
	Tabs,
	DatePicker
} from 'antd'

import HealthMedicalTable from './HealthMedicalTable'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

/*健康体检表*/
class HealthMedicalForm extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	render() {

		const {
			getFieldDecorator
		} = this.props.form

		const grda_xm = getFieldDecorator('grda_xm')(
			<DatePicker 
				disabledDate={(current) => {return current && current.valueOf() > Date.now()}}
			/>
		)
		const grbh = getFieldDecorator('grbh')(
			<Input />
		)

		return (
			<div>
				{/*体检记录*/}
				<div className="dashed_border form inside">
					<HealthMedicalTable/>
				</div>
				<div>
					<Tabs defaultActiveKey="1">
					    <TabPane tab="体检表1" key="1">

						    <Form
							 inline
							 onSubmit={this.handleSubmit}
							 className="dashed_border form"
							>
						        <FormItem
						         label="体检日期"
						        >
						        	{grda_xm}
						        </FormItem>
						        <FormItem label="责任医生" >
						        	{grbh}
						        </FormItem>
					        </Form>

					    </TabPane>
					    <TabPane tab="体检表2" key="2">体检表2
					    	<fieldset style={{width: '220px'}}>
							<legend>健康信息</legend>
							<form>
							<label>身高：<input type="text"/></label>
							<label>体重：<input type="text"/></label>
							</form>
							</fieldset>
					    </TabPane>
					    <TabPane tab="体检表3" key="3">体检表3</TabPane>
					    <TabPane tab="体检表4" key="4">体检表4</TabPane>
					    <TabPane tab="体检表5" key="5">体检表5</TabPane>
					    <TabPane tab="体检表6" key="6">体检表6</TabPane>
					</Tabs>
				</div>
			</div>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("HealthMedicalForm onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("HealthMedicalForm mapPropsToFields")
}

export default Form.create()(HealthMedicalForm)