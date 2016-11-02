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
import * as PHRAction from 'phr/PHRAction'

import {
	DATE_FORMAT_STRING
} from 'config'
import {
	ARC_FORM_WIDGET_CONFIG as WIDGET_CONFIG,
	PERSONALDETAIL_FIELDS_CONFIG as FIELDS_CONFIG
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
const GRDAJKJL = 'grdaJkjl'
const GRDAJKZK = 'grdaJkzk'
const FIELDSN = FIELDS_CONFIG.name
const JKJLFIELDS = FIELDS_CONFIG.grdaJkjl.fields

/*健康体检表 表格*/
class HealthMedicalTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			editSwitch: true,
			data: new Array()
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

	deleteConfirm = (selectedRowKeys) => {
		this.props.removeItem(selectedRowKeys, GRDAJKJL)
	}

	deleteCancel = () => {}

	addRow = () => {
		let date = this.getSelectKeyDate(GRDAJKZK)
		console.log('addRow', date, typeof date)
		if (!date && typeof date === 'undefined') {
			notify('warn', '警告', '体检日期不能为空');
		} else {
			this.props.addItem(GRDAJKJL)
			this.props.addObjItem(GRDAJKZK)
		}
	}

	/*改变选中的体检表 根据体检时间*/
	changeSelectDate = (key, selectDate) => {
		this.props.changeArrTableSelectKey(key, selectDate)
	}

	/*检查各个档案是不是处于updatestate @return boolean*/
	isArchiveUpdateState = (key) => {
		let records = this.getJkzkSelectDateRecord(key)
		return !!records ? !!records.grda_tjrq ? records.grda_tjrq.length > 0 : false : false
	}

	/*获取健康体检表的数据，用于体检表更改，体检记录表获取数据 @return 时间为date(默认selectKey)的体检表*/
	getJkjlRecord = (key) => {
		let records = this.getJkzkSelectDateRecord(key)
		return records
	}

	/*获取健康体检表的数据， @return 时间为date(默认selectKey)的体检表*/
	getJkzkSelectDateRecord = (key) => {
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
	getSelectKeyDate = (key) => {
		let selectKey = this.getSelectKey(key)
		let selectValue = !!selectKey ? this.props.phr[FIELDSN][GRDAJKZK][selectKey] : undefined
		return !!selectValue ? !!selectValue.grda_tjrq ? selectValue.grda_tjrq.value : undefined : null
	}

	render() {
		const {
			getFieldDecorator,
			getFieldValue,
			setFieldsValue
		} = this.props.form
		const {
			updatestate
		} = this.props.phr
		const {
			grdaJkjl
		} = this.props.phr[FIELDS_CONFIG.name]

		const jkjlRecord = this.getJkjlRecord(GRDAJKZK)
		const empty = emptyObject(jkjlRecord)

		const grdaTjrq = !empty ? !!jkjlRecord.grda_tjrq ? jkjlRecord.grda_tjrq : [] : []
		const grdaJkpj = !empty ? !!jkjlRecord.grda_jkpj ? jkjlRecord.grda_jkpj : [] : []
		const grdaJkzd = !empty ? !!jkjlRecord.grda_jkzd ? jkjlRecord.grda_jkzd : [] : []

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

		if (this.isArchiveUpdateState(GRDAJKZK)) {
			columns.push({
				title: '操作',
				dataIndex: 'operation',
				key: 'operation',
				width: '10%',
				render: (value, row, index) => {
					return <a href="javascript:void(0);" onClick={() => this.changeSelectDate(GRDAJKZK, grdaTjrq[index])}>查看</a>
				}
			})
		}

		// rowSelection objects indicates the need for row selection
		const objSize = grdaJkjl.objSize
		const selectedRowKeys = grdaJkjl.selectedRowKeys
		const rowSelection = {
			selectedRowKeys,
			onChange: (selectedRowKeys, selectedRows) => this.props.onSelectChange(selectedRowKeys, selectedRows, GRDAJKJL),
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
							`确定要删除所选${selectedLength}条体检记录吗？`
						}
					 onConfirm={() => this.deleteConfirm(selectedRowKeys)}
					 onCancel={this.deleteCancel}
					>
						<Button
						 disabled={!hasSelected}
						 size="large"
						 type="ghost"
						 icon="delete"
						 style={{ marginLeft: 10 }}>删除</Button>
				    </Popconfirm>
				    {objSize.length > 0 ? [
				    	<Popconfirm
					    	key="addItem"
							title = {
								`是否保存日期为 ${this.getSelectKey(GRDAJKZK)} 的体检表？`
							}
							onConfirm={this.addRow}
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
							 onClick={this.addRow}
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
    			scroll={{ y: 200 }}
    			bordered
			/>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("HealthMedicalTable onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, 'grdaJkzk');
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
	...PHRAction
})(HealthMedicalTable)