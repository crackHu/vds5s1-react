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
	notify,
	setCookie,
} from 'utils'
import {
	ARCHIVE_LIST_PAGESIZE as PAGESIZE,
	AS_FORM_WIDGET_CONFIG as WIDGET_CONFIG
} from 'phr_conf'

import * as PHRAction from 'phr/PHRAction'

import AdvancedSearch from 'phr/components/AdvancedSearch'
import SearchInput from 'app_base/components/SearchInput'

const ButtonGroup = Button.Group;

class ArchiveList extends React.Component {

	state = {
		modalVisible: false,
	}

	componentWillMount = () => {}

	componentDidMount() {
		this.props.getArchiveList(1, 45);
	}

	componentDidUpdate = (prevProps, prevState) => {
		console.log("ArchiveList.componentDidUpdate", prevProps, prevState)
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
		let postDataStr = ' and '
		Reflect.ownKeys(param).map((key, i) => {
			if (param[key]) {
				if (key == 'grda_csrq' || key == 'grda_jdrq' || key == 'grda_lrrq') {
					if (param[key].length > 0) {
						const startDate = JSON.stringify(param[key][0]).split('T')[0]
						const endDate = JSON.stringify(param[key][1]).split('T')[0]
						postDataStr += " j." + key + " between '" + startDate.substring(1, startDate.length) + "' and '" + endDate.substring(1, endDate.length) + "' and "
					}
				} else if (key == 'grda_xb') {
					postDataStr += " j." + key + " like '%" + WIDGET_CONFIG.selectOption.sex[parseInt(param[key])].value + "%' and "
				} else if (key == 'grda_hklx') {
					postDataStr += " j." + key + " like '%" + WIDGET_CONFIG.selectOption.permanentType[parseInt(param[key])].value + "%' and "
				} else if (key == 'grda_dazt') {
					postDataStr += " j." + key + " like '%" + WIDGET_CONFIG.selectOption.archiveStatus[parseInt(param[key])].value + "%' and "
				} else if (key == 'grda_jwcmc') {
					if (param[key].length > 0) {
						let sqlStr = " ( "
						param[key].map((dataVar) => {
							sqlStr += " j.grda_hkdz_jwcmc like '%" + WIDGET_CONFIG.selectOption.jwcmcType[parseInt(dataVar)].value + "%' or j.grda_xzz_jwcmc like '%" + WIDGET_CONFIG.selectOption.jwcmcType[parseInt(dataVar)].value + "%' or "
						})
						sqlStr = sqlStr.substring(0, sqlStr.length - 3) + " ) "
						postDataStr += sqlStr + " and "
					}
				} else if (key == 'grda_jdzmc') {
					if (param[key].value)
						postDataStr += " (j.grda_hkdz_jdzmc like '%" + WIDGET_CONFIG.selectOption.streetType[parseInt(param[key])].value + "%' or j.grda_xzz_jdzmc like '%" + WIDGET_CONFIG.selectOption.streetType[parseInt(param[key])].value + "%') and "
				} else if (key == 'grda_sszd') {
					if (param[key].length > 0) {
						let sqlStr = " ( "
						param[key].map((dataVar) => {
							sqlStr += " l.label like '%" + WIDGET_CONFIG.selectOption.specArcType[parseInt(dataVar)].value + "%' or "
						})
						sqlStr = sqlStr.substring(0, sqlStr.length - 3) + " ) "
						postDataStr += sqlStr + " and "
					}
				} else if (key == 'grda_cfda') {
					if (param[key].length > 0) {
						let leftSqlStr = " j.grbh in (select distinct a.grbh from( select b.grbh "
						let rightSqlStr = " from ?table1Name? b group by b.grbh having ("
						param[key].map((dataVar) => {
							if (dataVar == '3') {
								//sqlStr += " j.grda_xzz_jwcmc in (select grda_xzz_jwcmc from phr_grda_jbzl where (zfbj = 0 or zfbj is null) GROUP BY %s HAVING count(*)>1) and j.grda_xzz_ljmc in (select grda_xzz_ljmc from phr_grda_jbzl where (zfbj = 0 or zfbj is null) GROUP BY %s HAVING count(*)>1) and j.grda_xzz_qt in (select grda_xzz_qt from phr_grda_jbzl where (zfbj = 0 or zfbj is null) GROUP BY %s HAVING count(*)>1) or "
								leftSqlStr += ",count(concat(b.grda_xzz_smc,b.grda_xzz_qxmc,b.grda_xzz_jdzmc,b.grda_xzz_jwcmc,b.grda_xzz_ljmc,b.grda_xzz_qt))"
								rightSqlStr += " count(concat(b.grda_xzz_smc,b.grda_xzz_qxmc,b.grda_xzz_jdzmc,b.grda_xzz_jwcmc,b.grda_xzz_ljmc,b.grda_xzz_qt))>1 and "
							} else if (dataVar == '4') {
								//sqlStr += " j.grda_hkdz_jwcmc in (select grda_hkdz_jwcmc from phr_grda_jbzl where (zfbj = 0 or zfbj is null) GROUP BY %s HAVING count(*)>1) and j.grda_hkdz_ljmc in (select grda_hkdz_ljmc from phr_grda_jbzl where (zfbj = 0 or zfbj is null) GROUP BY %s HAVING count(*)>1) and j.grda_hkdz_qt in (select grda_hkdz_qt from phr_grda_jbzl where (zfbj = 0 or zfbj is null) GROUP BY %s HAVING count(*)>1) or "
								leftSqlStr += ",count(concat(b.grda_hkdz_smc,b.grda_hkdz_qxmc,b.grda_hkdz_jdzmc,b.grda_hkdz_jwcmc,b.grda_hkdz_ljmc,b.grda_hkdz_qt))"
								rightSqlStr += " count(concat(b.grda_hkdz_smc,b.grda_hkdz_qxmc,b.grda_hkdz_jdzmc,b.grda_hkdz_jwcmc,b.grda_hkdz_ljmc,b.grda_hkdz_qt))>1 and "
							} else {
								//sqlStr += " j."+ WIDGET_CONFIG.selectOption.repeatFileType[parseInt(dataVar)].key + " in (select " + WIDGET_CONFIG.selectOption.repeatFileType[parseInt(dataVar)].key + " from phr_grda_jbzl where (zfbj = 0 or zfbj is null) GROUP BY %s HAVING count(*)>1) or "
								leftSqlStr += ",count(b." + WIDGET_CONFIG.selectOption.repeatFileType[parseInt(dataVar)].key + ")"
								rightSqlStr += " count(b." + WIDGET_CONFIG.selectOption.repeatFileType[parseInt(dataVar)].key + ")>1 and "
							}

						})
						rightSqlStr = rightSqlStr.substring(0, rightSqlStr.length - 4) + " )) a ) "
						postDataStr += leftSqlStr + rightSqlStr + " and "
					}
				} else if (key == 'grda_pczd') {
					if (param[key].length > 0) {
						let sqlStr = " l.label not in ( select la.label from ?table2Name? la where "
						param[key].map((dataVar) => {
							sqlStr += " l.label like '%" + WIDGET_CONFIG.selectOption.specArcType[parseInt(dataVar)].value + "%' or "
						})
						sqlStr = sqlStr.substring(0, sqlStr.length - 3) + " ) "
						postDataStr += sqlStr + " and "
					}
				} else {
					postDataStr += " j." + key + " like '%" + param[key] + "%' and "
				}
			}
		})

		postDataStr = postDataStr.substring(0, postDataStr.length - 4)

		console.log("check post data: ", postDataStr)
			/*查询接口*/
		this.props.searchPHR(1, 45, postDataStr)
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

	searchPHR = (keyword) => {
		console.log("season check: ", keyword)
		let page = 1
		let rows = 10
		let condition = `and j.grbh like '%${keyword}%' or j.grda_xm like '%${keyword}%'`
		this.props.searchPHR(page, rows, condition)
	}

	render() {
		const columns = [{
			title: <span>个人编号 <Tooltip title={`点击个人编号查看/编辑档案`}><Icon type="question-circle-o" /></Tooltip></span>,
			dataIndex: 'grbh',
			key: 'grbh',
			fixed: 'left',
			width: 150,
			render: (text, recode) => <Link to={`/phr/u/${recode.id}`}>{text}</Link>,
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

		const archiveProps = this.props.phr
		const data = archiveProps.data ? archiveProps.data.dout : null;
		const loading = archiveProps.archiveListloading
		console.log('loading', loading)
		const pagination = data ? {
			total: this.props.phr.total,
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
						    <SearchInput placeholder="搜索：编号、姓名"
							    onSearch={this.searchPHR} style={{ width: 200 }}
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
	searchPHR: PropTypes.func.isRequired,
	phr: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		phr: state.phr
	}
}

export default connect(mapStateToProps, PHRAction)(ArchiveList)