import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
	Tabs
} from 'antd'
import {
	spec_arc_type_config
} from 'config'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const tabpane = (
	<Tabs defaultActiveKey = {spec_arc_type_config.arcType[0].sub[0].key}>
			    {
			    	spec_arc_type_config.arcType[0].sub.map((arc, index) => {
						return (
						    <TabPane tab={arc.name} key={arc.key}>
								{React.createElement(require(`./${arc.content}`).default, {})}
							</TabPane>
						)
					})
				}
		  	</Tabs>
);

class PersonalDetailForm extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	render() {
		const {
			getFieldProps
		} = this.props.form
		const username = getFieldProps('username', {
			rules: [{
				required: true,
				message: '请输入姓名',
				pattern: /^[\u4e00-\u9fa5]{0,}$/
			}, ],
		})
		const personalno = getFieldProps('personalno', {
			rules: [{
				required: true,
				message: '请输入个人编号',
			}, ],
		});

		return (
			<div>
				<Form inline onSubmit={this.handleSubmit}>
			        <FormItem label="姓名" required>
			          <Input {...username} placeholder="请输入姓名"/>
			        </FormItem>
			        <FormItem label="个人编号" >
			          <Input {...personalno} placeholder="请输入个人编号"/>
			        </FormItem>
		        </Form>
		        {tabpane}
			</div>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("PersonalDetailForm onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("PersonalDetailForm mapPropsToFields")
}

export default Form.create()(PersonalDetailForm)