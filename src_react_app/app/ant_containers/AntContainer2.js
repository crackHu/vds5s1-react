import React from 'react';
import {
	Table,
	Icon,
	Pagination,
	Button,
	Row,
	Col,
	Modal

} from 'antd';
import QueueAnim from 'rc-queue-anim';

import AdvancedSearch from './AdvancedSearch'

export default class AntContainer2 extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			modalLoading: false,
			modalVisible: false
		}

		this.showModal = (e) => {
			this.setState({
				modalVisible: true,
			});
		}

		this.handleOk = (e) => {
			console.log('点了确认')
			this.setState({
				modalLoading: true,
			});
			setTimeout(() => {
				this.setState({
					modalLoading: false,
					modalVisible: false,
				});
			}, 1500);
		}

		this.handleCancel = (e) => {
			console.log('点了取消')
			console.log(e)
			this.setState({
				modalVisible: false,
			});
		}

		this.searchFilter = (e) => {
			console.log("receive:" + e)
		}

	}

	componentDidMount() {
		setTimeout(
			() => {
				this.setState({
					loading: false
				})
			}, 300)
	}
	render() {
		const ButtonGroup = Button.Group;
		const columns = [{
			title: '#',
			dataIndex: 'id',
			key: 'id',
		}, {
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <a href="#">{text}</a>,
		}, {
			title: '年龄',
			dataIndex: 'age',
			key: 'age',
		}, {
			title: '住址',
			dataIndex: 'address',
			key: 'address',
		}, {
			title: '操作',
			key: 'operation',
			render: (text, record) => (
				<span>
			      <a href="#">操作一{record.name}</a>
			      <span className="ant-divider"></span>
			      <a href="#">操作二</a>
			      <span className="ant-divider"></span>
			      <a href="#" className="ant-dropdown-link">
			        更多 <Icon type="down" />
			      </a>
			    </span>
			),
		}];

		const data = [];
		for (let i = 0; i < 46; i++) {
			data.push({
				id: i,
				key: i,
				name: `李大嘴${i}`,
				age: 32,
				address: `西湖区湖底公园${i}号`,
			});
		}

		const pagination = {
			total: data.length,
			showSizeChanger: true,
			onShowSizeChange(current, pageSize) {
				console.log('Current: ', current, '; PageSize: ', pageSize);
			},
			onChange(current) {
				console.log('Current: ', current);
			},
		};

		return (
			<QueueAnim delay={10}>
				<div key="button">
					<ButtonGroup style={{margin: "1em auto"}}>
				      <Button type="ghost" icon="file-text" size="large">新建档案</Button>
				      <Button type="ghost" icon="edit" size="large">修改档案</Button>
				      <Button type="ghost" icon="download" size="large">导入</Button>
				      <Button type="ghost" icon="search" size="large" onClick={this.showModal}>档案查询</Button>

				      <Modal title="档案查询" width={730} visible={this.state.modalVisible} maskClosable={false}
					      onClick={this.handleCancel} onOk={this.handleOk} confirmLoading={this.state.modalLoading}
					      footer={[
				            <Button key="back" type="ghost" size="large" icon="rollback" onClick={this.handleCancel}>关 闭</Button>,
				            <Button key="submit" type="primary" size="large" icon="search" loading={this.state.modalLoading} onClick={this.handleOk}>
				              查 询
				            </Button>,
				          ]}>
			          			<AdvancedSearch searchCondition={this.searchFilter}/>
				        </Modal>
				    </ButtonGroup>
			    </div>
				<Table key="table" columns={columns} dataSource={data} pagination={pagination} loading={this.state.loading} bordered/>
			</QueueAnim>
		)
	}
}