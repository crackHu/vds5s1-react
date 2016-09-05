import React from 'react';
import {
	Tabs,
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
import QueueAnim from 'rc-queue-anim';
import fetch from 'isomorphic-fetch'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

export default class AntContainer1 extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			"data": [{}]
		}

		this.changeTab = (e) => {
			console.log(e);
		}

		this.handleSubmit = (e) => {
			e.preventDefault();
			console.log('收到表单值：', this.props.form.getFieldsValue());
		}

		this.saveForm = (e) => {
			const hide = message.loading('正在保存中...', 110);

			const url = "https://api.github.com/search/users?q=a"
			const init = {
				cache: 'no-cache'
			}
			fetch(url)
				.then(response => response.json())
				.then((data) => {
					console.log(data)
					hide()
					message.success('保存成功')
				})
				.catch((e) => {
					console.error("Oops, error", e)
					hide()
					message.warn('保存失败 ' + '[' + e + ']');
				})
		}

		this.addRow = (e) => {
			let data = this.state.data
			let temp = {}
			this.setState({
				"data": data.push(temp)
			})
		}

	}

	render() {
		const operations = <Button type="primary" onClick={this.saveForm}>保存</Button>
		const payOptions = [{
			label: '城镇职工基本医疗保险',
			value: 'Apple'
		}, {
			label: '城镇居民基本医疗保险',
			value: 'Pear'
		}, {
			label: '新型农村合作医疗',
			value: 'Orange'
		}, {
			label: '新型农村合作医疗',
			value: 'Orange2'
		}, {
			label: '新型农村合作医疗',
			value: 'Orange3'
		}, {
			label: '其他',
			value: 'Orange4'
		}];
		const exposedOptions = [{
			label: '毒物',
			value: 'Apple'
		}, {
			label: '射线',
			value: 'Pear'
		}]
		const medicineOptions = [{
			label: '肾上腺素',
			value: 'Apple'
		}, {
			label: '肾上腺素',
			value: 'Pear'
		}, {
			label: '肾上腺素',
			value: 'Orange'
		}, {
			label: '其他',
			value: 'Orange2'
		}]
		const options = [{
			value: 'guangzhou',
			label: '广州市',
			children: [{
				value: 'yuexiu',
				label: '越秀',
				children: [{
					value: 'dadongjie',
					label: '大东街',
					children: [{
						value: 'shuqian',
						label: '署前',
						children: [{
							value: 'miaoqianxijie',
							label: '庙前西街',
						}],
					}],
				}],
			}],
		}, {
			value: 'jiangsu',
			label: '江苏',
			children: [{
				value: 'nanjing',
				label: '南京',
				children: [{
					value: 'zhonghuamen',
					label: '中华门',
				}],
			}],
		}];
		const columns = [{
			title: '类别',
			dataIndex: 'name',
			width: 150,
			render: text => <Select><Option value="phone">在册</Option></Select>,
		}, {
			title: '疾病名称',
			dataIndex: 'age',
			width: 150,
			render: text => <Input />,
		}, {
			title: '确诊时间',
			dataIndex: 'address',
			width: 350,
			render: (text) => (
				<div>
					<DatePicker /><TimePicker />
				</div>
			),
		}, {
			title: '备注',
			dataIndex: 'address1',
			width: 300,
			render: text => <Input type="textarea" autosize={{ minRows: 1, maxRows: 3 }} />,
		}, {
			title: '操作',
			key: 'operation',
			width: 200,
			render: (text, record) => (
				<span>
				  <a onClick={this.addRow}>增加</a>
			      <span className="ant-divider"></span>
			      <a href="#">删除</a>
			      <span className="ant-divider"></span>
			      <a href="#" className="ant-dropdown-link">
			        更多 <Icon type="down" />
			      </a>
			    </span>
			),
		}];
		const data = [{}];
		const rowSelection = {
			onChange(selectedRowKeys, selectedRows) {
				console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
			},
			onSelect(record, selected, selectedRows) {
				console.log(record, selected, selectedRows);
			},
			onSelectAll(selected, selectedRows, changeRows) {
				console.log(selected, selectedRows, changeRows);
			},
		};
		return (
			<Row>
				<QueueAnim delay={50}>
		<Tabs key="a" defaultActiveKey="1" onChange={this.changeTab} tabBarExtraContent={operations}>
						  <TabPane tab="个人基本信息表" key="1">
						  	<Form inline onSubmit={this.handleSubmit}>
						        <FormItem label="姓名"  >
						          <Input placeholder="请输入姓名" />
						        </FormItem>
						        <FormItem label="个人编号" >
						          <Input placeholder="请输入个人编号" />
						        </FormItem>
						      </Form>
						  </TabPane>
						  <TabPane tab="健康体检表" key="2">健康体检表</TabPane>
						</Tabs> <br />
			<Tabs key="b" defaultActiveKey="1" onChange={this.changeTab}>
						  <TabPane tab="一般情况" key="1">
						  	<Form inline onSubmit={this.handleSubmit}>
						        <FormItem label="性别" >
						          <Select defaultValue="male" style={{ width: 80 }}>
								      <Option value="male">男</Option>
								      <Option value="female">女</Option>
								    </Select>
						        </FormItem>
						        <FormItem label="出生日期" >
						         <DatePicker />
						        </FormItem>
						        <FormItem label="身份证号" >
					        		<Input />
						        </FormItem>
						        <FormItem label="工作单位" >
						          <Select style={{ width: 320 }}>
								      <Option value="company">北京市海淀区西北旺东路10号院百度科技园1号楼</Option>
								    </Select>
						        </FormItem>
						        <br />
						        <br />
						        <FormItem label="&nbsp;&nbsp;&nbsp;&nbsp;现住址" >
						        	<Cascader options={options} placeholder="请选择现住址" style={{ width: 320 }} />
						        </FormItem>
						        <FormItem>
					        		<Input placeholder="门牌号"  style={{ width: 150 }}/>
						        </FormItem>
						        <br />
						        <br />
						        <FormItem label="户籍地址" >
						        	<Cascader options={options} placeholder="请选择现住址" style={{ width: 320 }} />
						        </FormItem>
						        <FormItem>
					        		<Input placeholder="门牌号"  style={{ width: 150 }}/>
						        </FormItem>
						        <br />
						        <br />
						        <FormItem label="本人电话" >
						          <Select style={{ width: 150 }}>
								      <Option value="phone">18814141114</Option>
								    </Select>
						        </FormItem>
						        <FormItem label="联系人姓名">
						          <Select style={{ width: 150 }} >
								      <Option value="default">胡永刚</Option>
								    </Select>
						        </FormItem>
						        <FormItem label="联系人电话" >
						          <Select style={{ width: 150 }}>
								      <Option value="phone">18814141114</Option>
								    </Select>
						        </FormItem>
						        <FormItem label="常住类型" >
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
						        <FormItem label="血型" >
						          <Select style={{ width: 150 }}>
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
						        <FormItem label="医疗费用支付方式" >
						        	<CheckboxGroup options={payOptions} defaultValue={['Pear']} />
						        </FormItem>
						        <FormItem>
					        		<Input placeholder="其他"  style={{ width: 150 }}/>
						        </FormItem>
						        <br />
						        <br />
						        <FormItem label="药物过敏" >
						        	<RadioGroup>
							        	<Radio key="a" value={1}>有</Radio>
    									<Radio key="b" value={2}>无</Radio>
						        	</RadioGroup>
									</FormItem>
						        <FormItem>
						        	<CheckboxGroup options={medicineOptions} defaultValue={['Pear']} />
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
						        	<CheckboxGroup options={exposedOptions} defaultValue={['Pear']} />
						        </FormItem>
						        <br />
						        <br />
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
						        <Row>
							        <Col xs={1} sm={1} md={1} lg={1}>
							        	<FormItem label="既往史" />
							        </Col>
							        <Col xs={23} sm={20} md={18} lg={16}>
							        	<Table rowSelection={rowSelection} columns={columns} dataSource={data} size="middle" bordered />
							        </Col>
							    </Row>
						      </Form>
						  </TabPane>
						  <TabPane tab="家族史与生活情况" key="2">家族史与生活情况</TabPane>
						</Tabs>
				  </QueueAnim>
			</Row>

		)
	}
}