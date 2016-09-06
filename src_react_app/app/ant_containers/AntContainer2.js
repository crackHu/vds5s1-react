import React from 'react';
import {
	Table,
	Icon,
	Pagination
} from 'antd';
import QueueAnim from 'rc-queue-anim';

export default class AntContainer2 extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			loading: true
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
				<Table key="table" columns={columns} dataSource={data} pagination={pagination} loading={this.state.loading}/>
			</QueueAnim>
		)
	}
}