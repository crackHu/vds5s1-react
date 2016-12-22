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
	Switch,
	Tooltip
} from 'antd'
import * as AppActions from 'AppActions'
import * as PHRAction from 'phr/PHRAction'

import {
	DATE_FORMAT_STRING
} from 'config'
import {
	ARC_FORM_WIDGET_CONFIG as WIDGET_CONFIG,
	PERSONALDETAIL_FIELDS_CONFIG as FIELDS_CONFIG,
	FROM_INITIAL_VALUE_CONFIG as INIT,
} from 'phr_conf'
import {
	msg,
	notify,
	getMomentFormat,
	getValueArrByFieldArr,
	emptyObject,
} from 'utils'

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

const getSelectOptions = (data) => {
	return data.map((item, i) => {
		return <Option key={item.value}>{item.value}</Option>
	})
}
const ARC_TAB = 'grdaJkzk'
const RECORD_TAB = 'grdaJkjl'
const RECORD_KEY = 'grda_tjrq'
const NEXT_VIS_KEY = 'grda_xcsfrq'
const FIELDSN = FIELDS_CONFIG.name
const JKJLFIELDS = FIELDS_CONFIG[RECORD_TAB].fields

/*健康体检表 表格*/
class HealthMedicalTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			editSwitch: true,
			data: new Array(),
			selectIndex: 0
		}
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	componentWillReceiveProps = (nextProps) => {
		console.log("HealthMedicalTable componentWillReceiveProps", nextProps)
	}

	componentDidUpdate = (prevProps, prevState) => {
		console.log('HealthMedicalTable componentDidUpdate', prevProps, prevState)
	}

	deleteConfirm = (selectedRowKeys, record_key) => {
		this.props.removeItem(selectedRowKeys, record_key)
	}

	deleteCancel = () => {}

	addRow = (key, record_key, objSize) => {
		let date = this.getSelectKeyDate(key, record_key)
		if (!date && typeof date === 'undefined') {
			notify('warn', '警告', '体检日期不能为空');
		} else {
			this.props.addItem(RECORD_TAB)
			this.props.addObjItem(ARC_TAB, RECORD_KEY, NEXT_VIS_KEY)
			if (objSize == 0) {
				this.initialValue(ARC_TAB)
			}
		}
		this.setState({
			selectIndex: objSize.length
		})
	}

	//初始化表单数据
	initialValue = (key) => {
		try {
			console.log('abab', INIT[key])
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
		return !!records ? !!records.grda_tjrq ? records.grda_tjrq.length > 0 : false : false
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
			getFieldDecorator,
			getFieldValue,
			setFieldsValue
		} = this.props.form
		const {
			updatestate
		} = this.props.phr

		const RECORD_TABLE = this.props.phr[FIELDSN][RECORD_TAB]
		const jlRecord = this.getJlTabRecord(ARC_TAB)
		const empty = emptyObject(jlRecord)
		const grdaTjrq = !empty ? !!jlRecord.grda_tjrq ? jlRecord.grda_tjrq : [] : []
		const grdaJkpj = !empty ? !!jlRecord.grda_jkpj ? jlRecord.grda_jkpj : [] : []
		const grdaJkzd = !empty ? !!jlRecord.grda_jkzd ? jlRecord.grda_jkzd : [] : []
		const timestamp_ = !empty ? !!jlRecord.timestamp_ ? jlRecord.timestamp_ : [] : []

		const columns = [{
			title: '体检日期',
			dataIndex: 'medicalDate',
			key: 'medicalDate',
			width: '10%',
			render: (value, row, index) => {
				return <span>{grdaTjrq[index]}</span>
			}
		}, {
			title: '健康评价',
			dataIndex: 'medicalEvaluation',
			key: 'medicalEvaluation',
			width: '30%',
			render: (value, row, index) =>
				<span>{grdaJkpj[index]}</span>,
		}, {
			title: '健康指导',
			dataIndex: 'medicalGuide',
			key: 'medicalGuide',
			width: '45%',
			render: (value, row, index) =>
				<span>{grdaJkzd[index]}</span>,
		}];

		if (this.isArchiveUpdateState(ARC_TAB)) {
			columns.push({
				title: '操作',
				dataIndex: 'operation',
				key: 'operation',
				width: '10%',
				render: (value, row, index) => {
					return (<div>
								<a href="javascript:void(0);" onClick={() => this.changeSelectDate(ARC_TAB, timestamp_[index], index)}>查看</a>
							</div>)
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
	        	 label={<span>体检记录
	        	 	{' '}
	        	 	<Tooltip title={`点击新增可以增加一条体检记录`}>
	        	 		<Icon type="question-circle-o" />
	        	 	</Tooltip>
	        	 </span>}
	        	/>

	        	<div>
					<Popconfirm
						title = {
							`确定要删除所选${selectedLength}条体检记录吗？(点击更新才会提交删除数据)`
						}
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
				    {false ? [
				    	<Popconfirm
					    	key="addItem"
							title = {
								`是否保存日期为 ${this.getSelectKey(ARC_TAB)} 的体检表？`
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
    			scroll={{ y: 120 }}
    			rowClassName={(record, index) => index == selectIndex ? "record selected" : 'record'}
    			onRowClick={(record, index) => this.changeSelectDate(ARC_TAB, timestamp_[index], index)}
    			bordered
			/>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("HealthMedicalTable onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, ARC_TAB);
}

function mapPropsToFields(props) {
	console.log("HealthMedicalTable mapPropsToFields", props)
	return props.fields || {}
}

HealthMedicalTable.propTypes = {
	addItem: PropTypes.func.isRequired,
	addObjItem: PropTypes.func.isRequired,
	removeItem: PropTypes.func.isRequired,
	onSelectChange: PropTypes.func.isRequired,
	changeArrTableSelectKey: PropTypes.func.isRequired,
	phr: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	console.log('HealthMedicalTable mapStateToProps:', state)
	return {
		phr: state.phr,
	}
}

HealthMedicalTable = Form.create({
	onFieldsChange,
	mapPropsToFields
})(HealthMedicalTable)

export default connect(mapStateToProps, {
	...AppActions,
	...PHRAction
})(HealthMedicalTable)