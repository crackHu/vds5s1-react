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
} from 'antd';
import {
	Link
} from 'react-router';

import QueueAnim from 'rc-queue-anim';

import {
	msg,
	notify
} from '../utils/utils'

import * as ArchiveActions from '../actions/ArchiveActions'
import AdvancedSearch from './AdvancedSearch'
import SearchInput from '../components/SearchInput'

class AntContainer2 extends React.Component {

	state = {
		modalVisible: false,

		username: undefined,
		password: undefined,
	}

	componentWillMount = () => {}

	componentDidMount() {
		this.props.getArchiveList();
	}

	componentDidUpdate = () => {
		console.log("componentDidupdate", this.state.username, this.state.password)
	}

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

	deleteConfirm = () => {
		msg("success", "删除成功", 1)
	}

	render() {
		const ButtonGroup = Button.Group;
		const columns = [{
			title: '个人编号',
			dataIndex: 'grbh',
			key: 'grbh',
			fixed: 'left',
			width: 150
		}, {
			title: '姓名',
			dataIndex: 'grda_xm',
			key: 'grda_xm',
			fixed: 'left',
			width: 70,
			render: (text) => <a href="#">{text}</a>,
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
			      <Link to='/AntContainer1'>修改</Link>
			      <span className="ant-divider"></span>
			      <Popconfirm title="确定要删除这个档案吗？" onConfirm={this.deleteConfirm}>
				    <a href="#">删除</a>
				  </Popconfirm>
			    </span>
			),
		}];

		const archiveProps = this.props.data.archive
		const data = archiveProps.data ? archiveProps.data.dout : null;
		const loading = archiveProps.archiveListloading

		const pagination = data ? {
			total: this.props.data.archive.total,
			showSizeChanger: true,
			onShowSizeChange(current, pageSize) {
				console.log('Current: ', current, '; PageSize: ', pageSize);
			},
			onChange(current) {
				console.log('Current: ', current);
			},
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
					      {/*<Button type="ghost" icon="file-text" size="large">新建档案</Button>
					      <Button type="ghost" icon="edit" size="large"	>修改档案</Button>*/}
					      <Button type="ghost" icon="download" size="large">导入</Button>
					      <Button type="ghost" icon="search" size="large" onClick={this.showModal}>档案查询</Button>
					      {advancedSearch}
					    </ButtonGroup>
					    <div style={{float: 'right', margin: "1em"}}>
						    <SearchInput placeholder="input search text"
							    onSearch={value => console.log(value)} style={{ width: 200 }}
							  />
						</div>
						<Table key="table" columns={columns} dataSource={data} pagination={pagination} loading={loading} scroll={{x:1100}} bordered/>
				    </Card>
				</div>
			</QueueAnim>
		)
	}
}

AntContainer2.propTypes = {
	getArchiveList: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		data: state
	}
}

export default connect(mapStateToProps, ArchiveActions)(AntContainer2)