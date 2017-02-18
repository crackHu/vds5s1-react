import React, {
	PropTypes,
} from 'react';
import ReactDOM from 'react-dom';
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
	Upload,
	Progress,
	Badge,
	Menu,
	Dropdown,
} from 'antd';
import {
	Link
} from 'react-router';

import QueueAnim from 'rc-queue-anim';

import {
	msg,
	notify,
	setCookie,
	getUrlVal,
	getLoginUser,
	randomUUID,
	openWindow,
} from 'utils'
import {
	ARCHIVE_LIST_PAGESIZE as PAGESIZE,
	AS_FORM_WIDGET_CONFIG as WIDGET_CONFIG
} from 'phr_conf'
import {
	upload,
} from 'api'

import * as PHRAction from 'phr/PHRAction'

import AdvancedSearch from 'phr/components/AdvancedSearch'
import ExportRecordModal from 'phr/components/ExportRecordModal'
import SearchInput from 'app_base/components/SearchInput'

const ButtonGroup = Button.Group;

class ArchiveList extends React.Component {

	state = {
		modalVisible: false,
		expModalVisible: false,
		curPage: 1,
		curPageSize: PAGESIZE,
		isSearch: false,
		postData: '',
		fieldData: undefined,
		export: {
			id: undefined,
			progressPercent: -1,
			polling: 3000,
			intervalId: undefined,
			filePath: undefined,
			fileName: undefined,
			processNum: undefined,
		}
	}

	componentWillMount = () => {
		let {
			query
		} = getUrlVal()

		if (!!query) {
			this.setState({
				postData: query
			})
			this.props.searchPHR(1, this.state.curPageSize, query)
		} else {
			this.props.getArchiveList(this.state.curPage, this.state.curPageSize);
		}

		this.getExportRecord()
	}

	componentDidMount = () => {
		NProgress.done();
	}

	componentDidUpdate = (prevProps, prevState) => {
		console.log("ArchiveList.componentDidUpdate", prevProps, prevState)
	}

	componentWillReceiveProps = (nextProps) => {
		console.log('ArchiveList.componentWillReceiveProps', this.props, nextProps)
		if (!!nextProps.phr.delSuc) {
			this.reflashDataSource()
		}

		const phrExport = nextProps.phrExport
		const target = phrExport.target || null
		let {
			id,
			polling,
			progressPercent
		} = this.state.export

		if (progressPercent != -1 && !!phrExport && !!id) {
			if (!!target) {
				const percent = target.bar || '0'
				progressPercent = parseFloat(percent)
				this.setState({
					export: {
						...this.state.export,
						progressPercent: progressPercent === 100 ? -1 : progressPercent
					},
				}, () => {
					if (progressPercent != -1 && progressPercent < 100) {
						setTimeout(() => {
							this.props.progress({
								"conditions": this.state.postData,
								id
							})
						}, polling)
					} else {
						msg('success', "导出成功，正在下载……")
						const fileName = `健康档案-导出-${new Date().format('yyyyMMddhhmmssS')}.zip`
						this.props.download({
							filePath: target.url,
						}, fileName)

						//2017年1月12日11:11:34 上面设置state progressPercent回调函数不生效需要重新设置
						this.setState({
							export: {
								...this.state.export,
								progressPercent: 99.99,
							},
						}, () => {
							setTimeout(() => {
								this.setState({
									export: {
										...this.state.export,
										progressPercent: -1,
									},
								})
							}, 500)
						})


					}
				})
			} else {
				this.setState({
					export: {
						...this.state.export,
						progressPercent: -1,
					},
				})
			}
		}

		//正在导出文件徽标数
		if (phrExport) {
			this.setState({
				export: {
					...this.state.export,
					processNum: phrExport.processNum,
				},
			})
		}
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
			expModalVisible: param
		});
	}

	sendSearchCondition = (param) => {
		console.log("收到表单值：" + JSON.stringify(param))
		let postDataStr = ' and '
		let paichuStr = '',
			suoshuStr = ''
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
					if (param[key].length)
						postDataStr += " (j.grda_hkdz_jdzmc like '%" + WIDGET_CONFIG.selectOption.streetType[parseInt(param[key])].value + "%' or j.grda_xzz_jdzmc like '%" + WIDGET_CONFIG.selectOption.streetType[parseInt(param[key])].value + "%') and "
				} else if (key == 'grda_sszd') {
					if (param[key].length > 0) {
						suoshuStr = " ( "
						param[key].map((dataVar) => {
							suoshuStr += " label like '%" + WIDGET_CONFIG.selectOption.specArcType[parseInt(dataVar)].value + "%' or "
						})
						suoshuStr = suoshuStr.substring(0, suoshuStr.length - 3) + ' ) '
							//postDataStr += sqlStr + " and "
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
						paichuStr = " ( "
						param[key].map((dataVar) => {
							paichuStr += " label not like '%" + WIDGET_CONFIG.selectOption.specArcType[parseInt(dataVar)].value + "%' and "
						})
						paichuStr = paichuStr.substring(0, paichuStr.length - 4) + " ) "
							//postDataStr += sqlStr + " and "
					}
				} else {
					postDataStr += " j." + key + " like '%" + param[key] + "%' and "
				}
			}
		})
		let isAnd = ''
		if (paichuStr && suoshuStr)
			isAnd = ' and '
		if (paichuStr || suoshuStr)
			postDataStr += " j.grbh in (select grbh from ?table2Name? where ifnull(zfbj , 0 ) = 0 and grbh is not null   and grbh != '' and label != '' and " + paichuStr + isAnd + suoshuStr + " ) "
		else
			postDataStr = postDataStr.substring(0, postDataStr.length - 4)


		console.log("check post data: ", postDataStr)

		/*查询接口*/
		this.props.changeListLoad(true)
		this.props.searchPHR(1, this.state.curPageSize, postDataStr)
		this.setState({
			curPage: 1,
			isSearch: true,
			postData: postDataStr
		})
	}

	onFieldsChange = ({
		fields
	}) => {
		const fieldData = this.state.fieldData
		this.setState({
			fieldData: {
				...fieldData,
				...fields
			},
		}, console.log('archivelist state', this.state));
	};

	deleteConfirm = (record) => {
		let ids = []
		ids.push(record.id)
		this.props.deletePHR(ids)
	}

	reflashDataSource = () => {
		console.log('reflashDataSource', this.state)
		const {
			curPage,
			curPageSize,
			isSearch,
			postData,
		} = this.state

		this.props.changeListLoad(true)
		if (isSearch)
			this.props.searchPHR(curPage, curPageSize, postData)
		else
			this.props.getArchiveList(curPage, curPageSize)
	}

	searchPHR = (keyword) => {
		let page = 1
			//let rows = 10
		let condition = `and (j.grbh like '%${keyword}%' or j.grda_xm like '%${keyword}%')`
		this.props.changeListLoad(true)
		if (keyword == '') {
			this.props.getArchiveList(page, this.state.curPageSize)
			this.setState({
				curPage: 1,
				isSearch: false,
				postData: keyword
			})
		} else {
			this.props.searchPHR(page, this.state.curPageSize, condition)
			this.setState({
				curPage: 1,
				isSearch: true,
				postData: condition
			})
		}
	}

	routerPush = (pathname, query = {
		query: this.state.postData
	}) => {
		console.log('ArchiveList routerPush', query)
		return this.context.router.push({
			pathname,
			query
		})
	}

	exportResult = (condition = this.state.postData) => {

		const id = randomUUID()
		this.props.exportPHR({
			condition,
			id
		})

		const polling = this.state.export.polling
		setTimeout(() => {
			this.props.progress({
				conditions: condition,
				id
			})
		}, polling / 2)

		this.setState({
			export: {
				...this.state.export,
				progressPercent: 0,
				id
			},
		}, () => console.log('exportResult', this.state.export))
	}

	getExportRecord = (condition = '') => {
		this.props.progress({
			conditions: condition,
			id: ''
		})
	}

	exportRecord = (condition = '') => {
		this.getExportRecord(condition)
		this.setState({
			expModalVisible: true
		})

	}

	openWay = (text, record) => {

		let {
			id,
			grda_xm,
			grbh,
			grda_csrq,
			grda_brdh
		} = record

		let age
		try {
			age = new Date().getFullYear() - parseInt(grda_csrq.substr(0, 4))
		} catch (e) {
			age = ''
		}
		let open = {
			url: `phr/user/${id}`,
			title: `${grda_xm}个人档案（个人编号：${grbh}，年龄：${age}，电话号码：${grda_brdh || ''}）`
		}
		return (
			<Menu>
			    <Menu.Item key="0">
			      <a onClick={() => this.routerPush(`/phr/u/${id}`)}>当前页打开</a>
			    </Menu.Item>
			    <Menu.Item key="1">
			      <a onClick={() => openWindow(open.url, open.title)}>新窗口打开</a>
			    </Menu.Item>
		  	</Menu>
		)
	}

	render() {

		const columns = [{
			title: <span>个人编号 <Tooltip title={`点击个人编号查看/编辑档案`}><Icon type="question-circle-o" /></Tooltip></span>,
			dataIndex: 'grbh',
			key: 'grbh',
			fixed: 'left',
			width: 150,
			render: (text, record) =>
				<Dropdown overlay={this.openWay(text, record)} trigger={['click']}>
				    <a className="ant-dropdown-link" href="#">
				      {text} <Icon type="down" />
				    </a>
			  	</Dropdown>
				//render: (text, record) => <a onClick={() => this.routerPush(`/phr/u/${record.id}`)}>{text}</a>,
				//render: (text, recode) => <a href={`/phr/user/${record.id}`} title="查看/编辑 " target="_blank">{text}</a>,
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
			current: this.state.curPage,
			total: this.props.phr.data.total,
			showSizeChanger: true,
			onShowSizeChange: (current, pageSize) => {
				console.log('Current: ', current, '; PageSize: ', pageSize)
				this.setState({
					curPage: current,
					curPageSize: pageSize
				})
				this.props.changeListLoad(true)
				if (this.state.isSearch)
					this.props.searchPHR(current, pageSize, this.state.postData)
				else
					this.props.getArchiveList(current, pageSize)
			},
			onChange: (current) => {
				console.log('Current: ', current);
				this.setState({
					curPage: current
				})
				this.props.changeListLoad(true)
				if (this.state.isSearch)
					this.props.searchPHR(current, this.state.curPageSize, this.state.postData)
				else
					this.props.getArchiveList(current, this.state.curPageSize)
			},
			showQuickJumper: true,
			pageSize: this.state.curPageSize,
			showTotal: (total, range) => `共 ${total} 条 （${range[0]}-${range[1]}）`
		} : null;

		const advancedSearch = this.state.modalVisible ? [
			<AdvancedSearch
				key="advancedSearch"
			 	modalVisible={this.state.modalVisible}
			 	switchModalVisible={this.switchModalVisible}
			 	sendSearchCondition={this.sendSearchCondition}
			 	fields={this.state.fieldData}
			 	onFieldsChange={this.onFieldsChange}
			/>
		] : null;

		const exportRecordModal = this.state.expModalVisible ? [
			<ExportRecordModal
				key="exportRecordModal"
				recordData={this.props.phrExport}
				modalVisible={this.state.expModalVisible}
			 	switchModalVisible={this.switchModalVisible}
			 	download={this.props.download}
			/>
		] : null;

		const uploadProps = {
			name: 'file',
			action: `${upload()}?userId=${getLoginUser().uid}`,
			accept: '.xls,.xlsx',
			data: {
				test: 12341234
			},
			headers: {
				authorization: 'authorization-text',
			},
			listType: 'text',
			showUploadList: 'false',
			onChange: (info) => {
				console.log('uploadProps', info, Date.now())
					//info.file.thumbUrl = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'

				if (info.file.status !== 'uploading') {
					console.log('upload onChange', info.file, info.fileList);
				}
				if (info.file.status == 'uploading') {
					console.log('uploading')
				} else if (info.file.status === 'done') {
					console.log('upload done', info.file, info.fileList);
					let res = info.file.response
					let fullPath = res.fullPath

					this.props.importPHR(fullPath[0])

				} else if (info.file.status === 'error') {
					msg('error', `${info.file.name} 上传失败.`)
				}
			},
		};

		const {
			progressPercent,
			processNum,
		} = this.state.export

		console.log('render progressPercent', progressPercent, this.state.export)
		const progress = progressPercent != -1 ? (
			<Progress
				className='export-progress'
		 		percent={progressPercent}
		  		strokeWidth={5}
		   		status="active"
	    		format={percent => `导出进度：${percent} %`} 
			/>) : null

		return (
			<QueueAnim delay={10}>
							
				<div className='module' key="buttonGroup">
					<Card title="档案列表">
						<ButtonGroup className='ad-search-bar'>
					      	<Button type="primary" icon="search" onClick={this.showModal}>档案查询</Button>
					      	{advancedSearch}
					      	{' '}
					      	<Upload {...uploadProps}>
					      		<Button type="ghost" icon="upload">导入</Button>
							</Upload>
							{/*<form encType="multipart/form-data" action={`${upload()}?userId=${getLoginUser().uid}`} method="post" ref='customAttributes'>
								<input name='haha' type='file' />
							</form>
							<a onClick={() => {
									let form = ReactDOM.findDOMNode(this.refs.customAttributes)
									let file = form.haha.files[0]
									console.log(form, form.haha.files[0])
									var oMyForm = new FormData();
									oMyForm.append("userfile", file);
									var oReq = new XMLHttpRequest();
									oReq.open("POST", `${upload()}?test=test`);
									oReq.send(oMyForm);

									//form.submit()
								}
							}>上传</a>*/}
							{' '}
							<Button type="ghost" icon="download" onClick={() => this.exportResult()}>导出</Button>
							{' '}
							<Badge count={processNum}>
								<Button type="ghost" icon="bars" onClick={() => this.exportRecord()}>导出日志</Button>
								{exportRecordModal}
							</Badge>
					    </ButtonGroup>
					    
					    <div style={{float: 'right', margin: "1em"}}>
					    	请输入条件查询：
						    <SearchInput placeholder="搜索：编号、姓名"
							    onSearch={this.searchPHR} style={{ width: 200 }}
							/>
						</div>
						{progress}
						<Table
						 	key="table"
						 	rowKey="uid"
						 	columns={columns}
						 	dataSource={data}
					 		pagination={pagination}
							loading={loading}
							scroll={{x:1100}}
				 			onRowClick={(record, index) => {
				 				//this.routerPush(`/phr/u/${record.id}`, {query: this.state.postData})
				 			}}
    						rowClassName={(record, index) => 'record'}
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
	changeListLoad: PropTypes.func.isRequired,

	importPHR: PropTypes.func.isRequired,
	exportPHR: PropTypes.func.isRequired,
	progress: PropTypes.func.isRequired,
	download: PropTypes.func.isRequired,

	phr: PropTypes.object.isRequired
}

ArchiveList.contextTypes = {
	router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		phr: state.phr,
		phrExport: state.phrExport
	}
}

export default connect(mapStateToProps, PHRAction)(ArchiveList)