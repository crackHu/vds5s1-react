import React from 'react';
import {
	Table,
	Icon,
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
			}, 4000)
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

		let data = [{
			id: 1,
			key: '1',
			name: '胡彦斌',
			age: 32,
			address: '西湖区湖底公园1号',
		}, {
			id: 2,
			key: '2',
			name: '胡彦祖',
			age: 42,
			address: '西湖区湖底公园1号',
		}, {
			id: 3,
			key: '3',
			name: '李大嘴',
			age: 32,
			address: '西湖区湖底公园1号',
		}];
		for (var i = 4; i < 21; i++) {
			let obj = data[0]
			data.push({
				id: i,
				key: i.toString(),
				name: obj.name + i,
				age: obj.age,
				address: obj.address
			})
		}

		return (
			<QueueAnim delay={10}>
				<Table key="table" columns={columns} dataSource={data} loading={this.state.loading}>
					{/*<Pagination onChange={onChange} total={50} />*/}
				</Table>
			</QueueAnim>
		)
	}
}