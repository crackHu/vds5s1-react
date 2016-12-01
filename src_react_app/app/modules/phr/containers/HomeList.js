import React, {
	PropTypes,
} from 'react';

import {
	Table,
	Card
} from 'antd';
import {
	Link
} from 'react-router';
import {
	connect
} from 'react-redux';
import * as STATAction from '../../stat/STATAction'

class HomeList extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			addCurPage: 1,
			addCurPageSize: 10,
			updCurPage: 1,
			updCurPageSize: 10,
			isSearch: false
		}
	}

	componentWillMount() {
		this.props.queryForAdd(this.state.addCurPage, this.state.addCurPageSize)
		this.props.queryForUpdate(this.state.updCurPage, this.state.updCurPageSize)
	}

	render() {

		const columns = [{
			title: '个人编号',
			width: 50,
			dataIndex: 'grbh',
			key: 'grbh',
			render: (text, recode) => <Link to={`/phr/u/${recode.id}`}>{text}</Link>,
		}, {
			title: '性别',
			dataIndex: 'grda_xb',
			key: 'grda_xb',
			width: 50
		}, {
			title: '地址',
			width: 50,
			dataIndex: 'address',
			key: 'address'
		}, {
			title: '本人电话',
			dataIndex: 'grda_brdh',
			key: 'grda_brdh',
			width: 50
		}, {
			title: '联系人电话',
			dataIndex: 'grda_lxrdh',
			key: 'grda_lxrdh',
			width: 50
		}, {
			title: '疾病标签',
			dataIndex: 'label',
			key: 'label',
			width: 50
		}, ];

		let zjxzTable, zjxgTable
		if (this.props.stat.zjxz && this.props.stat.zjxg) {
			if (this.props.stat.zjxz.length > 0) {
				const xzPagination = {
					current: this.state.addCurPage,
					total: this.props.stat.total,
					showSizeChanger: false,
					onShowSizeChange: (current, pageSize) => {
						console.log('Current: ', current, '; PageSize: ', pageSize)
						this.setState({
							addCurPage: current,
							addCurPageSize: pageSize
						})
						this.props.queryForAdd(current, pageSize)
					},
					onChange: (current) => {
						console.log('Current: ', current);
						this.setState({
							addCurPage: current
						})
						this.props.queryForAdd(current, this.state.addCurPageSize)
					},
					showQuickJumper: true,
					pageSize: this.state.curPageSize,
					showTotal: (total) => `共 ${total} 条`,
				}
				zjxzTable = (
					<Table
           columns={columns}
           dataSource={this.props.stat.zjxz}
           size="small"
           scroll={{ x: 1200 }}
           pagination={xzPagination}
          />
				)
			} else {
				zjxzTable = (<div>暂无数据</div>)
			}

			if (this.props.stat.zjxg.length > 0) {
				const xgPagination = {
					current: this.state.updCurPage,
					total: this.props.stat.total,
					showSizeChanger: false,
					onShowSizeChange: (current, pageSize) => {
						console.log('Current: ', current, '; PageSize: ', pageSize)
						this.setState({
							updCurPage: current,
							updCurPageSize: pageSize
						})
						this.props.queryForUpdate(current, pageSize)
					},
					onChange: (current) => {
						console.log('Current: ', current);
						this.setState({
							updCurPage: current
						})
						this.props.queryForUpdate(current, this.state.updCurPageSize)
					},
					showQuickJumper: true,
					pageSize: this.state.curPageSize,
					showTotal: (total) => `共 ${total} 条`,
				}
				zjxgTable = (
					<div>
	          <Table
	           columns={columns}
	           dataSource={this.props.stat.zjxg}
	           size="small"
	           scroll={{ x: 1200 }}
	           pagination={xgPagination}
	          />
          </div>
				)
			} else {
				zjxgTable = (<div>暂无数据</div>)
			}
		} else {
			zjxzTable = (<div>Loading</div>)
			zjxgTable = (<div>Loading</div>)
		}

		return (
			<div>
				<Card title="一周新增数据">
					{zjxzTable}
				</Card>
				<Card title="一周修改数据">
					{zjxgTable}
				</Card>
			</div>
		)
	}
}

HomeList.propTypes = {
	queryForAdd: PropTypes.func.isRequired,
	queryForUpdate: PropTypes.func.isRequired,
	stat: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		stat: state.stat
	}
}

export default connect(mapStateToProps, STATAction)(HomeList)