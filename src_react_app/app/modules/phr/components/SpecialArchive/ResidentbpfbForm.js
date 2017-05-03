import React, {
	Component,
	PropTypes
} from 'react'
import {
	connect
} from 'react-redux';
import {
	Form,
	Input,
} from 'antd'

import * as PHRAction from 'phr/PHRAction'
import EditableRowTable from 'app_base/components/EditableRowTable'

const FormItem = Form.Item;

/*居民血压反馈*/
class ResidentbpfbForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			masterid: this.props.phr['masterid'],
			tableDataSource: [],
			tableTotal: 0
		}

		/*分页*/
		this.tablePagination = true
		this.tableDefalutPageSize = 10
		this.tableDefalutPageNo = 1

		this.tableFunction = ['SELECT']
		this.tableColumns = [{
			title: '测量时间',
			dataIndex: 'xy_sfrq2',
			width: '20%',
		}, {
			title: '收缩压(mmhg)',
			dataIndex: 'xy_tz_xy1',
			width: '15%',
		}, {
			title: '舒张压(mmhg)',
			dataIndex: 'xy_tz_xy2',
			width: '15%',
		}, {
			title: '心率(次/分钟)',
			dataIndex: 'xy_tz_xl',
			width: '15%',
		}, ]

	}

	componentWillMount = () => {
		this.getDataSource()
	}

	componentDidMount = () => {}

	componentWillReceiveProps = (nextProps) => {
		let residentbpfb = nextProps.phr['residentbpfb']
		const {
			resident,
			total
		} = residentbpfb
		console.log('asdfaccc before', this.state)
		if (resident && resident.constructor === Array && resident.length !== 0) {
			this.setState({
				tableDataSource: resident,
				tableTotal: total
			}, () => console.log('asdfaccc after', this.state))
		}
	}

	/*分页 获取数据源*/
	getDataSource = (pageSize, pageNo, id = this.state.masterid) => {
		this.props.getResidentbpfbList(pageSize, pageNo, id)
	}

	render() {

		return (
			<div>
				<EditableRowTable
					pagination={this.tablePagination}
					defalutPageSize={this.tableDefalutPageSize}
					defalutPageNo={this.tableDefalutPageNo}
					total={this.state.tableTotal}
					getDataSource={this.getDataSource}

					function={this.tableFunction}
					columns={this.tableColumns}
					dataSource={this.state.tableDataSource}
				/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	console.log('ResidentbpfbForm mapStateToProps:', state)
	return {
		phr: state.phr,
	}
}

ResidentbpfbForm.propTypes = {
	phr: PropTypes.object.isRequired,
	getResidentbpfbList: PropTypes.func.isRequired,
}

ResidentbpfbForm.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, {
	...PHRAction
})(ResidentbpfbForm)