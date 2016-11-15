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
import * as AppActions from 'AppActions'
import * as PHRAction from 'phr/PHRAction'
import QueueAnim from 'rc-queue-anim';
import moment from 'moment'

import {
	msg,
	notify
} from 'utils'
import {
	DATE_FORMAT_STRING
} from 'config'
import {
	ARC_FORM_WIDGET_CONFIG as WIDGET_CONFIG,
	PERSONALDETAIL_FIELDS_CONFIG as FIELDS_CONFIG
} from 'phr_conf'

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

const getSelectOptions = (data) => {
	return data.map((item, i) => {
		return <Option key={item.value}>{item.value}</Option>
	})
}
const FIELDSN = FIELDS_CONFIG.name
const PARENT_KEY = 'grdaJkzk'
const SON_KEY = 'grdaZyzlqk'

/*住院治疗情况*/
class MedicalRecordsTable extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	deleteConfirm = (selectedRowKeys) => {
		this.props.removeSonItem(selectedRowKeys, SON_KEY, PARENT_KEY)
	}

	deleteCancel = () => {}

	addRow = (e) => {
		this.props.addSonItem(PARENT_KEY, SON_KEY)
	}

	render() {
		const {
			getFieldDecorator
		} = this.props.form
		const {
			fields,
			grdaZyzlqkObjSize,
			onFieldsChange
		} = this.props

		const renderContent = {
			inoutDate(value, option) {
				return (
					<Input />
				)
			},
			reason(value, option) {
				return (
					<Input />
				)
			},
			institutionName(value, option) {
				return (
					<Input />
				)
			},
			mRecordNo(value, option) {
				return (
					<Input />
				)
			},
			remark(value) {
				return (
					<Input
						style={{width: '70vh'}}
						type="textarea"
						autosize={{ minRows: 1, maxRows: 2 }}
					/>
				)
			},

		}

		const columns = [{
			title: '入/出院日期',
			dataIndex: 'inoutDate',
			key: 'inoutDate',
			width: '15%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('rcyrq_' + index)(
						renderContent.inoutDate(value, this.memberOptions)
					)}
				</FormItem>,
		}, {
			title: '原因',
			dataIndex: 'reason',
			key: 'reason',
			width: '15%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('yy_' + index)(
						renderContent.reason(value, this.sickOptions)
					)}
				</FormItem>,
		}, {
			title: '医疗机构名称',
			dataIndex: 'institutionName',
			key: 'institutionName',
			width: '15%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('yljgmc_' + index)(
						renderContent.institutionName(value, this.sickOptions)
					)}
				</FormItem>,
		}, {
			title: '病案号',
			dataIndex: 'mRecordNo',
			key: 'mRecordNo',
			width: '15%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('bah_' + index)(
						renderContent.mRecordNo(value, this.sickOptions)
					)}
				</FormItem>,
		}, {
			title: '备注',
			dataIndex: 'remark',
			key: 'remark',
			width: '40%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('bz_' + index)(
						renderContent.remark(value)
					)}
				</FormItem>,
		}];

		// rowSelection objects indicates the need for row selection
		const selectedRowKeys = !!fields ? fields.selectedRowKeys || [] : []
		const rowSelection = {
			selectedRowKeys,
			onChange: (selectedRowKeys, selectedRows) => this.props.onSelectSonChange(selectedRowKeys, selectedRows, SON_KEY, PARENT_KEY),
		};
		const selectedLength = selectedRowKeys.length;
		const hasSelected = selectedLength > 0;
		const pagination = {
			pageSize: 5
		}
		const title = () => (
			<div>
				<Popconfirm
				 title={`确定要删除所选${selectedLength}条住院治疗情况吗？`}
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
				<Button
				 size="large"
				 type="primary"
				 icon="plus"
				 style={{ marginLeft: 10 }}
				 onClick={this.addRow}>新增</Button>
				<span style={{ marginLeft: 8 }}>{hasSelected ? `选中 ${selectedLength} 条记录` : ''}</span>
		    </div>
		)
		const footer = () => '可以选择一条或多条记录进行删除操作'

		return (
			<Table
				key="table"
				columns={columns}
				dataSource={grdaZyzlqkObjSize} 
				rowSelection={rowSelection}
				size="middle"
   				title={title}
    			footer={footer}
    			pagination={false}
			>
			</Table>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("MedicalRecordsTable onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, SON_KEY);
}

function mapPropsToFields(props) {
	console.log("MedicalRecordsTable mapPropsToFields", props)
	return props.fields || {}
}

MedicalRecordsTable.propTypes = {
	addItem: PropTypes.func.isRequired,
	addSonItem: PropTypes.func.isRequired,
	removeSonItem: PropTypes.func.isRequired,
	onSelectSonChange: PropTypes.func.isRequired,
	phr: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	console.log('MedicalRecordsTable mapStateToProps:', state)
	return {
		phr: state.phr,
	}
}

MedicalRecordsTable = Form.create({
	onFieldsChange,
	mapPropsToFields
})(MedicalRecordsTable)

export default connect(mapStateToProps, {
	...AppActions,
	...PHRAction
})(MedicalRecordsTable)