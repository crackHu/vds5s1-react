import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
	Tabs,
} from 'antd'
import {
	ARC_TYPE_CONFIG
} from 'phr_conf'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

/*个人基本信息表*/
class PersonalDetailForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	componentDidUpdate = () => {
		console.log("PersonalDetailForm.componentDidUpdate", this.state)
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('收到表单值：', this.props.form.getFieldsValue());
	}

	render() {
		const {
			getFieldDecorator
		} = this.props.form

		const grda_xm = getFieldDecorator('grda_xm', {
			rules: [{
				required: true,
				message: '请输入姓名',
				pattern: /^[\u4e00-\u9fa5]{0,}$/,
			}],
		})(
			<Input placeholder="请输入姓名" />
		)

		const grbh = getFieldDecorator('grbh', {
			rules: [{
				required: true,
				message: '请输入个人编号',
			}],
		})(
			<Input placeholder="请输入个人编号" />
		)

		{ /*动态加载个人基本信息表下包含组件*/ }

		/*{React.createElement(require(`../${arc.content}`).default, {
			fields: this.props.fields,
			onFieldsChange: this.props.onFieldsChange
		})}*/
		const tabpane = (
			<Tabs defaultActiveKey = {ARC_TYPE_CONFIG.arcType[0].sub[0].key}>
			    {
			    	ARC_TYPE_CONFIG.arcType[0].sub.map((arc, index) => {
			    		let Container = require(`../${arc.content}`).default
						return (
						    <TabPane tab={arc.name} key={arc.key}>
								
								<Container
									fields={this.props.fields}
									onFieldsChange={this.props.onFieldsChange}
								/>
							</TabPane>
						)
					})
				}
		  	</Tabs>
		);

		return (
			<div>
				<Form
				 inline
				 onSubmit={this.handleSubmit}
				 className="dashed_border form"
				>
			        <FormItem
			         label="姓名"
			        >
			        	{grda_xm}
			        </FormItem>
			        <FormItem label="个人编号" >
			        	{grbh}
			        </FormItem>
		        </Form>
		        {tabpane}
			</div>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("PersonalDetailForm onFieldsChange", fields)
	props.onFieldsChange({
		fields
	});
}

function mapPropsToFields(props) {
	console.log("PersonalDetailForm mapPropsToFields", props)
	return props.fields;
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(PersonalDetailForm)