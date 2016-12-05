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
	Table,
	Select,
	DatePicker,
	TimePicker,
	Icon,
	Pagination,
	Popconfirm,
	Button,
	Tooltip
} from 'antd'
import QueueAnim from 'rc-queue-anim';
import moment from 'moment'
import * as AppActions from 'AppActions'
import * as PHRAction from 'phr/PHRAction'

import {
	msg,
	notify,
	getMomentFormat,
	getValueArrByFieldArr,
	emptyObject,
} from 'utils'
import {
	DATE_FORMAT_STRING
} from 'config'
import {
	SPEC_ARC_FORM_WIDGET_CONFIG as WIDGET_CONFIG,
	PERSONALDETAIL_FIELDS_CONFIG as FIELDS_CONFIG,
	FROM_INITIAL_VALUE_CONFIG as INIT,
} from 'phr_conf'

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

const getSelectOptions = (data) => {
	return data.map((item, i) => {
		return <Option key={item.value}>{item.value}</Option>
	})
}

const ARC_TAB = 'lnrSfb'
const RECORD_TAB = 'lnrjl'
const RECORD_KEY = 'lnr_sfrq'
const FIELDSN = FIELDS_CONFIG.name
const JKJLFIELDS = FIELDS_CONFIG[RECORD_TAB].fields

/*老年人评估表*/
class AgedTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			editSwitch: true,
			data: [{}],
			selectIndex: 0
		}

		/*每日次数*/
		this.dailyNumOptions = getSelectOptions(WIDGET_CONFIG.selectOption.dailyNum);
		/*每次数量*/
		this.eTimeNumOptions = getSelectOptions(WIDGET_CONFIG.selectOption.eTimeNum);
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	deleteConfirm = (selectedRowKeys, record_key) => {
		this.props.removeItem(selectedRowKeys, record_key)
	}

	deleteCancel = () => {}

	addRow = (key, record_key, objSize) => {
		let date = this.getSelectKeyDate(key, record_key)
		if (!date && typeof date === 'undefined') {
			notify('warn', '警告', '随访日期不能为空');
		} else {
			this.props.addItem(RECORD_TAB)
			this.props.addObjItem(ARC_TAB, RECORD_KEY)
			this.initialValue(ARC_TAB)
		}
		this.setState({
			selectIndex: objSize.length
		})
	}

	//初始化表单数据
	initialValue = (key) => {
		try {
			this.props.form.setFieldsValue(INIT[key])
		} catch (e) {
			throw Error(`initialValue => ${e.message}`)
		}
	}

	/*改变选中的体检表 根据时间*/
	changeSelectDate = (key, selectDate, selectIndex) => {
		this.props.changeArrTableSelectKey(key, selectDate)
		this.setState({
			selectIndex
		})
	}

	/*检查各个档案是不是处于updatestate @return boolean*/
	isArchiveUpdateState = (key) => {
		let records = this.getArcTabSelectDateRecord(key)
		return !!records ? !!records[RECORD_KEY] ? records[RECORD_KEY].length > 0 : false : false
	}

	/*获取记录表的数据，用于档案表更改，记录表获取数据 @return 时间为date(默认selectKey)的档案表*/
	getJlTabRecord = (key) => {
		let records = this.getArcTabSelectDateRecord(key)
		return records
	}

	/*获取档案表的数据， @return 时间为date(默认selectKey)的档案表*/
	getArcTabSelectDateRecord = (key) => {
		const {
			phr
		} = this.props

		let keyState = phr[FIELDSN][key]
		return getValueArrByFieldArr(JKJLFIELDS, keyState, DATE_FORMAT_STRING)
	}

	/*获取选中的key*/
	getSelectKey = (key) => {
		const {
			phr
		} = this.props

		let keyState = phr[FIELDSN][key]
		return keyState.selectKey
	}

	/*获取选中的key date*/
	getSelectKeyDate = (key, dateField) => {
		let selectKey = this.getSelectKey(key)
		let selectValue = !!selectKey ? this.props.phr[FIELDSN][ARC_TAB][selectKey] : undefined
		return !!selectValue ? !!selectValue[dateField] ? selectValue[dateField].value : undefined : null
	}

	render() {
		const {
			selectIndex
		} = this.state
		const {
			getFieldDecorator
		} = this.props.form
		const RECORD_TABLE = this.props.phr[FIELDSN][RECORD_TAB]

		const jlRecord = this.getJlTabRecord(ARC_TAB)
		const empty = emptyObject(jlRecord)

		const lnr_sfrq = !empty ? jlRecord.lnr_sfrq || [] : []
		const lnr_jc = !empty ? jlRecord.lnr_jc || [] : []
		const lnr_jcpf = !empty ? jlRecord.lnr_jcpf || [] : []
		const lnr_sx = !empty ? jlRecord.lnr_sx || [] : []
		const lnr_sxpf = !empty ? jlRecord.lnr_sxpf || [] : []
		const lnr_cy = !empty ? jlRecord.lnr_cy || [] : []
		const lnr_cypf = !empty ? jlRecord.lnr_cypf || [] : []
		const lnr_rc = !empty ? jlRecord.lnr_rc || [] : []
		const lnr_rcpf = !empty ? jlRecord.lnr_rcpf || [] : []
		const lnr_hd = !empty ? jlRecord.lnr_hd || [] : []
		const lnr_hdpf = !empty ? jlRecord.lnr_hdpf || [] : []
		const lnr_xcsfrq = !empty ? jlRecord.lnr_xcsfrq || [] : []
		const lnr_sfys = !empty ? jlRecord.lnr_sfys || [] : []
		const lnr_zpf = !empty ? jlRecord.lnr_zpf || [] : []
		const timestamp_ = !empty ? !!jlRecord.timestamp_ ? jlRecord.timestamp_ : [] : []

		const columns = [{
			title: '随访日期',
			dataIndex: 'followUpDate',
			key: 'followUpDate',
			fixed: 'left',
			width: '6vw',
			render: (value, row, index) => {
				return <span>{lnr_sfrq[index]}</span>
			}
		}, {
			title: '进餐',
			dataIndex: 'eating',
			key: 'eating',
			width: '20vw',
			render: (value, row, index) =>
				<span>{lnr_jc[index]}</span>,
		}, {
			title: '梳洗',
			dataIndex: 'wash',
			key: 'wash',
			width: '20vw',
			render: (value, row, index) =>
				<span>{lnr_sx[index]}</span>,
		}, {
			title: '穿衣',
			dataIndex: 'dress',
			key: 'dress',
			width: '20vw',
			render: (value, row, index) =>
				<span>{lnr_cy[index]}</span>,
		}, {
			title: '如厕',
			dataIndex: 'toilet',
			key: 'toilet',
			width: '20vw',
			render: (value, row, index) =>
				<span>{lnr_rc[index]}</span>,
		}, {
			title: '活动',
			dataIndex: 'activity',
			key: 'activity',
			width: '20vw',
			render: (value, row, index) =>
				<span>{lnr_hd[index]}</span>,
		}, {
			title: '下次随访日期',
			dataIndex: 'nextFUDate',
			key: 'nextFUDate',
			fixed: 'right',
			width: '7vw',
			render: (value, row, index) =>
				<span>{lnr_xcsfrq[index]}</span>,
		}, {
			title: '随访医生',
			dataIndex: 'fuDoc',
			key: 'fuDoc',
			fixed: 'right',
			width: '6vw',
			render: (value, row, index) =>
				<span>{lnr_sfys[index]}</span>,
		}, {
			title: '总评分',
			dataIndex: 'totalScore',
			key: 'totalScore',
			fixed: 'right',
			width: '4vw',
			render: (value, row, index) =>
				<span>{lnr_zpf[index]}</span>,
		}];

		if (this.isArchiveUpdateState(ARC_TAB)) {
			columns.push({
				title: '操作',
				dataIndex: 'operation',
				key: 'operation',
				fixed: 'right',
				width: '5vw',
				render: (value, row, index) => {
					return <a href="javascript:void(0);" onClick={() => this.changeSelectDate(ARC_TAB, timestamp_[index], index)}>查看</a>
				}
			})
		}

		// rowSelection objects indicates the need for row selection
		const objSize = RECORD_TABLE.objSize
		const selectedRowKeys = RECORD_TABLE.selectedRowKeys
		const rowSelection = {
			selectedRowKeys,
			onChange: (selectedRowKeys, selectedRows) => this.props.onSelectChange(selectedRowKeys, selectedRows, RECORD_TAB),
		};
		const selectedLength = selectedRowKeys.length;
		const hasSelected = selectedLength > 0;
		const pagination = {
			pageSize: 5
		}
		const title = () => (
			<div style={{display: 'flex', height: 32}}>
	        	<FormItem
	        	 label={<span>老年人评估表
	        	 	{' '}
	        	 	<Tooltip title={`点击新增可以增加一条老年人评估记录`}>
	        	 		<Icon type="question-circle-o" />
	        	 	</Tooltip>
	        	 </span>}
	        	/>
	        	
	        	<div>
					<Popconfirm
					 title={`确定要删除所选${selectedLength}条用药情况吗？(点击更新才会提交删除数据)`}
					 onConfirm={() => this.deleteConfirm(selectedRowKeys, ARC_TAB)}
					 onCancel={this.deleteCancel}
					>
						<Button
						 disabled={!hasSelected}
						 size="large"
						 type="ghost"
						 icon="delete"
						 style={{ marginLeft: 20 }}>删除</Button>
				    </Popconfirm>
					{false > 0 ? [
				    	<Popconfirm
					    	key="addItem"
							title = {
								`是否保存日期为 ${this.getSelectKey(ARC_TAB)} 的老年人记录？`
							}
							onConfirm={() => this.addRow(ARC_TAB, RECORD_KEY, objSize)}
							onCancel={this.deleteCancel}
						>
							<Button
						    	 key="addItem"
								 size="large"
								 type="primary"
								 icon="plus"
								 style={{ marginLeft: 10 }}
							>新增</Button>
					    </Popconfirm>
				    ] : [
				    	<Button
					    	 key="addItem"
							 size="large"
							 type="primary"
							 icon="plus"
							 style={{ marginLeft: 10 }}
							 onClick={() => this.addRow(ARC_TAB, RECORD_KEY, objSize)}
						>新增</Button>
				    ]}
					<span style={{ marginLeft: 8 }}>{hasSelected ? `选中 ${selectedLength} 条记录` : ''}</span>
				</div>
		    </div>
		)
		const footer = () => '可以选择一条或多条记录进行删除操作'

		return (
			<Table
				key="table"
				columns={columns}
				dataSource={objSize} 
				rowSelection={rowSelection}
				size="middle"
   				title={title}
    			pagination={false}
    			scroll={{ x: 1650, y: 200 }}
    			rowClassName={(record, index) => index == selectIndex ? "record selected" : 'record'}
    			onRowClick={(record, index) => this.changeSelectDate(ARC_TAB, timestamp_[index], index)}
    			bordered
			>
			</Table>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("AgedTable onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, ARC_TAB);
}

function mapPropsToFields(props) {
	console.log("AgedTable mapPropsToFields", props)
	return props.fields || {}
}

AgedTable.propTypes = {
	addItem: PropTypes.func.isRequired,
	addObjItem: PropTypes.func.isRequired,
	removeItem: PropTypes.func.isRequired,
	onSelectChange: PropTypes.func.isRequired,
	changeArrTableSelectKey: PropTypes.func.isRequired,
	phr: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	console.log('AgedTable mapStateToProps:', state)
	return {
		phr: state.phr,
	}
}

AgedTable = Form.create({
	onFieldsChange,
	mapPropsToFields
})(AgedTable)

export default connect(mapStateToProps, {
	...AppActions,
	...PHRAction
})(AgedTable)