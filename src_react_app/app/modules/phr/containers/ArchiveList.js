import React, {
	PropTypes,
} from 'react';
import {
	connect
} from 'react-redux';
import {
	Table,
	Icon,
	Pagination,
	Button,
	Row,
	Col,
	Modal,
	Card,
	Popconfirm,
	Tooltip,
} from 'antd';
import {
	Link
} from 'react-router';

import QueueAnim from 'rc-queue-anim';

import {
	msg,
	notify
} from 'utils'
import {
	ARCHIVE_LIST_PAGESIZE as PAGESIZE
} from 'phr_conf'

import * as PHRAction from '../PHRAction'

import AdvancedSearch from '../components/AdvancedSearch'
import SearchInput from '../../../components/SearchInput'

const ButtonGroup = Button.Group;

class ArchiveList extends React.Component {

	state = {
		modalVisible: false,
	}

	componentWillMount = () => {}

	componentDidMount() {
		this.props.getArchiveList(1, 45);
	}

	componentDidUpdate = () => {}

	/*modal event*/
	showModal = (e) => {
		this.setState({
			modalVisible: true,
		});
	}

	switchModalVisible = (param) => {
		this.setState({
			modalVisible: param,
		});
	}

	sendSearchCondition = (param) => {
		console.log("收到表单值：" + JSON.stringify(param))
	}

	onFieldsChange = ({
		fields
	}) => {
		this.setState({
			...fields,
		});
	};

	deleteConfirm = (record) => {
		let ids = []
		ids.push(record.id)
		this.props.deletePHR(ids)
	}

	render() {
		const columns = [{
			title: <span>个人编号 <Tooltip title={`点击个人编号查看/编辑档案`}><Icon type="question-circle-o" /></Tooltip></span>,
			dataIndex: 'grbh',
			key: 'grbh',
			fixed: 'left',
			width: 150,
			render: (text) => <Link to={`/phr/detail/${text}`}>{text}</Link>,
		}, {
			title: '姓名',
			dataIndex: 'grda_xm',
			key: 'grda_xm',
			fixed: 'left',
			width: 70,
		}, {
			title: '性别',
			dataIndex: 'grda_xb',
			key: 'grda_xb',
		}, {
			title: '出生日期',
			dataIndex: 'grda_csrq',
			key: 'grda_csrq',
		}, {
			title: '身份证号码',
			dataIndex: 'grda_sfzhm',
			key: 'grda_sfzhm',
		}, {
			title: '街道(镇)名称',
			dataIndex: 'grda_hkdz_jdzmc',
			key: 'grda_hkdz_jdzmc',
		}, {
			title: '居委(村)名称',
			dataIndex: 'grda_hkdz_jwcmc',
			key: 'grda_hkdz_jwcmc',
		}, {
			title: '路_街_名称',
			dataIndex: 'grda_hkdz_ljmc',
			key: 'grda_hkdz_ljmc',
		}, {
			title: '户口类型',
			dataIndex: 'grda_hklx',
			key: 'grda_hklx',
		}, {
			title: '本人电话',
			dataIndex: 'grda_brdh',
			key: 'grda_brdh',
		}, {
			title: '家庭电话',
			dataIndex: 'grda_jtdh',
			key: 'grda_jtdh',
		}, {
			title: '操作',
			key: 'operation',
			fixed: 'right',
			width: 100,
			render: (text, record) => (
				<span>
			      <Popconfirm title="确定要删除这个档案吗？" onConfirm={() => this.deleteConfirm(record)}>
				    <a href="#">删除</a>
				  </Popconfirm>
			    </span>
			),
		}];

		const archiveProps = this.props.data.archive
		const data = archiveProps.data ? archiveProps.data.dout : null;
		const loading = archiveProps.archiveListloading
		console.log('loading', loading)
		const pagination = data ? {
			total: this.props.data.archive.total,
			showSizeChanger: true,
			onShowSizeChange(current, pageSize) {
				console.log('Current: ', current, '; PageSize: ', pageSize);
			},
			onChange(current) {
				console.log('Current: ', current);
			},
			showQuickJumper: true,
			pageSize: PAGESIZE,
			showTotal: (total) => `共 ${total} 条`,
		} : null;

		const advancedSearch = this.state.modalVisible ? [
			<AdvancedSearch key="advancedSearch"
			 modalVisible={this.state.modalVisible}
			 switchModalVisible={this.switchModalVisible}
			 sendSearchCondition={this.sendSearchCondition}
			 fields={this.state}
			 onFieldsChange={this.onFieldsChange}
			/>
		] : null;

		return (
			<QueueAnim delay={10}>
				<div className='module' key="buttonGroup">
					<Card title="档案列表">
						<ButtonGroup style={{margin: "1em auto"}}>
					      <Button icon="download">导入</Button>
					      <Button type="primary" icon="search" onClick={this.showModal}>档案查询</Button>
					      {advancedSearch}
					    </ButtonGroup>
					    <div style={{float: 'right', margin: "1em"}}>
						    <SearchInput placeholder="input search text"
							    onSearch={value => console.log(value)} style={{ width: 200 }}
							  />
						</div>
						<Table
						 key="table"
						 columns={columns}
						 dataSource={data}
						 pagination={pagination}
						 loading={loading}
						 scroll={{x:1100}}
						 bordered
						/>
				    </Card>
				</div>
			</QueueAnim>
		)
	}
}

ArchiveList.propTypes = {
	getArchiveList: PropTypes.func.isRequired,
	deletePHR: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		data: state
	}
}

export default connect(mapStateToProps, PHRAction)(ArchiveList)