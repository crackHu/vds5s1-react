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
	arc_type_config
} from 'config'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class PersonalDetailForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	componentDidUpdate = () => {}

	render() {
		const {
			getFieldDecorator
		} = this.props.form
		const grda_xm = getFieldDecorator('grda_xm', {
			rules: [{
				required: true,
				message: '请输入姓名',
				pattern: /^[\u4e00-\u9fa5]{0,}$/,
			}, ],
		})
		const grbh = getFieldDecorator('grbh', {
			rules: [{
				required: true,
				message: '请输入个人编号',
			}, ],
		});
		const tabpane = (
			<Tabs defaultActiveKey = {arc_type_config.arcType[0].sub[0].key}>
			    {
			    	arc_type_config.arcType[0].sub.map((arc, index) => {
						return (
						    <TabPane tab={arc.name} key={arc.key}>
								{React.createElement(require(`./${arc.content}`).default, {
									fields: this.props.fields, onFieldsChange: this.props.onFieldsChange
								})}
							</TabPane>
						)
					})
				}
		  	</Tabs>
		);

		return (
			<div>
				<Form inline onSubmit={this.handleSubmit}>
			        <FormItem
			         label="姓名"
			        >
			          <Input
			           {...grda_xm}
			           placeholder="请输入姓名"
			          />
			        </FormItem>
			        <FormItem label="个人编号" >
			          <Input {...grbh} placeholder="请输入个人编号"/>
			        </FormItem>
		        </Form>
		        {tabpane}
			</div>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("PersonalDetailForm onFieldsChange")
	console.log('change', fields);
	props.onFieldsChange({
		fields
	});
}

function mapPropsToFields(props) {
	console.log("PersonalDetailForm mapPropsToFields")
	console.log(props.fields)
	return props.fields;
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(PersonalDetailForm)