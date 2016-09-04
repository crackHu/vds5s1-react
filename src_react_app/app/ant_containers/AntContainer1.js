import React from 'react';
import {
	Tabs,
	Form,
	Input,
	Button,
	Checkbox,
	Alert
} from 'antd';
import QueueAnim from 'rc-queue-anim';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
export default class AntContainer1 extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			"alertShow": false
		}

		this.changeTab = (e) => {
			console.log(e);
		}

		this.handleSubmit = (e) => {
			e.preventDefault();
			console.log('收到表单值：', this.props.form.getFieldsValue());
		}

		this.saveForm = (e) => {
			this.setState({
				"alertShow": true
			})
		}

	}

	render() {
		const operations = <Button type="primary" onClick={this.saveForm}>保存</Button>
		return (
			<QueueAnim delay={50}>
				<Alert message="保存成功" type="success" showIcon closable="true"/>
			    <Tabs key="a" defaultActiveKey="1" onChange={this.changeTab} tabBarExtraContent={operations}>
						  <TabPane tab="个人基本信息表" key="1">
						  	<Form inline onSubmit={this.handleSubmit}>
						        <FormItem
						          label="姓名"
						        >
						          <Input placeholder="请输入姓名"
						          />
						        </FormItem>
						        <FormItem
						          label="个人编号"
						        >
						          <Input placeholder="请输入个人编号"
						          />
						        </FormItem>
						      </Form>
						  </TabPane>
						  <TabPane tab="健康体检表" key="2">健康体检表</TabPane>
						</Tabs>
			  </QueueAnim>

		)
	}
}