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
	ARC_FORM_WIDGET_CONFIG as WIDGET_CONFIG,
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
const ARC_TAB = 'gxyJxb'
const RECORD_TAB = 'gxyjl'
const RECORD_KEY = 'gxy_sfrq2'
const FIELDSN = FIELDS_CONFIG.name
const JKJLFIELDS = FIELDS_CONFIG[RECORD_TAB].fields

/*高血压记录表*/
class HypertensionTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			editSwitch: true,
			data: [{}],
			selectIndex: 0
		}
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

	/*改变选中的记录表 根据时间*/
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
		console.log('jlRecord', jlRecord)
		const gxySfrq2 = !empty ? jlRecord.gxy_sfrq2 || [] : []
		const gxySffs = !empty ? jlRecord.gxy_sffs || [] : []
		const gxyZz = !empty ? jlRecord.gxy_zz || [] : []
		const gxyTzXy1 = !empty ? jlRecord.gxy_tz_xy1 || [] : []
		const gxyTzXy2 = !empty ? jlRecord.gxy_tz_xy2 || [] : []
		const gxyTzSg = !empty ? jlRecord.gxy_tz_sg || [] : []
		const gxyTzTz = !empty ? jlRecord.gxy_tz_tz || [] : []
		const gxyTzTzzs = !empty ? jlRecord.gxy_tz_tzzs || [] : []
		const gxyTzXl = !empty ? jlRecord.gxy_tz_xl || [] : []
		const gxyTzQt = !empty ? jlRecord.gxy_tz_qt || [] : []
		const gxyCcsffl = !empty ? jlRecord.gxy_ccsffl || [] : []
		const gxyXcsfrq2 = !empty ? jlRecord.gxy_xcsfrq2 || [] : []

		const columns = [{
			title: '随访日期',
			dataIndex: 'followUpDate',
			key: 'followUpDate',
			width: '8%',
			render: (value, row, index) => {
				return <span>{gxySfrq2[index]}</span>
			}
		}, {
			title: '随访方式',
			dataIndex: 'followUpWay',
			key: 'followUpWay',
			width: '8%',
			render: (value, row, index) => {
				return <span>{gxySffs[index] || ''}</span>
			}
		}, {
			title: '症状',
			dataIndex: 'symptoms',
			key: 'symptoms',
			width: '8%',
			render: (value, row, index) => {
				return <span>{gxyZz[index] || ''}</span>
			}
		}, {
			title: '血压',
			dataIndex: 'bloodPress',
			key: 'bloodPress',
			width: '8%',
			render: (value, row, index) => {
				let percent
				if (!!gxyTzXy1[index] && !!gxyTzXy2[index]) {
					percent = `${gxyTzXy1[index]} / ${gxyTzXy2[index]}`
				}
				return <span>{percent}</span>
			}
		}, {
			title: '身高',
			dataIndex: 'height',
			key: 'height',
			width: '8%',
			render: (value, row, index) => {
				return <span>{gxyTzSg[index]}</span>
			}
		}, {
			title: '体重',
			dataIndex: 'weight',
			key: 'weight',
			width: '8%',
			render: (value, row, index) => {
				return <span>{gxyTzTz[index]}</span>
			}
		}, {
			title: '体质指数',
			dataIndex: '',
			key: 'bmi',
			width: '8%',
			render: (value, row, index) => {
				return <span>{gxyTzTzzs[index]}</span>
			}
		}, {
			title: '心率',
			dataIndex: 'heartRate',
			key: 'heartRate',
			width: '8%',
			render: (value, row, index) => {
				return <span>{gxyTzXl[index]}</span>
			}
		}, {
			title: '其他',
			dataIndex: 'other',
			key: 'other',
			width: '5%',
			render: (value, row, index) => {
				return <span>{gxyTzQt[index]}</span>
			}
		}, {
			title: '此次随访分类',
			dataIndex: 'followUpClass',
			key: 'followUpClass',
			width: '8%',
			render: (value, row, index) => {
				return <span>{gxyCcsffl[index]}</span>
			}
		}, {
			title: '下次随访日期',
			dataIndex: 'nextFUDate',
			key: 'nextFUDate',
			width: '6%',
			render: (value, row, index) => {
				return <span>{gxyCcsffl[index]}</span>
			}
		}];

		if (this.isArchiveUpdateState(ARC_TAB)) {
			columns.push({
				title: '操作',
				dataIndex: 'operation',
				key: 'operation',
				width: '10%',
				render: (value, row, index) => {
					return <a href="javascript:void(0);" onClick={() => this.changeSelectDate(ARC_TAB, gxySfrq2[index], index)}>查看</a>
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
		const title = () => (
			<div style={{display: 'flex', height: 32}}>
				<FormItem
	        	 label={<span>高血压记录
	        	 	{' '}
	        	 	<Tooltip title={`点击新增可以增加一条高血压记录`}>
	        	 		<Icon type="question-circle-o" />
	        	 	</Tooltip>
	        	 </span>}
	        	/>
	        	
				<Popconfirm
				 title={`确定要删除所选${selectedLength}条高血压记录吗？`}
				 onConfirm={() => this.deleteConfirm(selectedRowKeys, ARC_TAB)}
				 onCancel={this.deleteCancel}
				>
					<Button
					 disabled={!hasSelected}
					 size="large"
					 type="ghost"
					 icon="delete"
					 style={{ marginLeft: 10 }}>删除</Button>
			    </Popconfirm>
				{false > 0 ? [
			    	<Popconfirm
				    	key="addItem"
						title = {
							`是否保存日期为 ${this.getSelectKey(ARC_TAB)} 的高血压记录？`
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
    			scroll={{ y: 200 }}
    			rowClassName={(record, index) => index == selectIndex ? "record_selected" : ''}
    			bordered
			>
			</Table>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("HypertensionTable onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, ARC_TAB);
}

function mapPropsToFields(props) {
	console.log("HypertensionTable mapPropsToFields", props)
	return props.gxyJxbFields || {}
}

HypertensionTable.propTypes = {
	addItem: PropTypes.func.isRequired,
	addObjItem: PropTypes.func.isRequired,
	removeItem: PropTypes.func.isRequired,
	onSelectChange: PropTypes.func.isRequired,
	changeArrTableSelectKey: PropTypes.func.isRequired,
	phr: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	console.log('HypertensionTable mapStateToProps:', state)
	return {
		phr: state.phr,
	}
}

HypertensionTable = Form.create({
	onFieldsChange,
	mapPropsToFields
})(HypertensionTable)

export default connect(mapStateToProps, {
	...PHRAction,
	...AppActions,
})(HypertensionTable)