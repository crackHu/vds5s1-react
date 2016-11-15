import React, {
	PropTypes,
} from 'react';

import {
	Table,
	Card
} from 'antd';

import {
	connect
} from 'react-redux';
import * as STATAction from '../../stat/STATAction'

class HomeList extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		this.props.queryForAdd(1, 10)
		this.props.queryForUpdate(1, 10)
	}

	render() {

		const columns = [{
			title: '个人编号',
			width: 50,
			dataIndex: 'grbh',
			key: 'grbh'
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
				zjxzTable = (
					<Table
           columns={columns}
           dataSource={this.props.stat.zjxz}
           size="small"
           scroll={{ x: 1200 }}
           pagination={{pageSize: 5}}
          />
				)
			} else {
				zjxzTable = (<div>暂无数据</div>)
			}

			if (this.props.stat.zjxg.length > 0) {
				zjxgTable = (
					<div>
	          <Table
	           columns={columns}
	           dataSource={this.props.stat.zjxg}
	           size="small"
	           scroll={{ x: 1200 }}
	           pagination={{pageSize: 5}}
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