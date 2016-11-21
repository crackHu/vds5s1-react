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
const SON_KEY = 'grdaZyyyqk'

/*主要用药情况*/
class MainMedicationsTable extends React.Component {

	constructor(props) {
		super(props);

		/*用量*/
		this.dosageOptions = getSelectOptions(WIDGET_CONFIG.selectOption.dosage);
		/*用药时间*/
		this.usageDateOptions = getSelectOptions(WIDGET_CONFIG.selectOption.usageDate);
		/*服药依从性*/
		this.adherenceOptions = getSelectOptions(WIDGET_CONFIG.selectOption.adherence);
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
			grdaZyyyqkObjSize,
			onFieldsChange
		} = this.props

		const renderContent = {
			drugName(value, option) {
				return (
					<Input style={{width: '10vw'}}/>
				)
			},
			usage(value, option) {
				return (
					<Input style={{width: '10vw'}}/>
				)
			},
			dosage(value, option) {
				return (
					<Select combobox style={{width: '10vw'}}>
						{option}
					</Select>
				)
			},
			usageDate(value, option) {
				return (
					<Select combobox style={{width: '10vw'}}>
						{option}
					</Select>
				)
			},
			adherence(value, option) {
				return (
					<Select combobox style={{width: '10vw'}}>
						{option}
					</Select>
				)
			},
			remark(value) {
				return (
					<Input
						style={{width: '25vw'}}
						type="textarea"
						autosize={{ minRows: 1, maxRows: 2 }}
					/>
				)
			},

		}

		const columns = [{
			title: '药物名称',
			dataIndex: 'drugName',
			key: 'drugName',
			width: '15%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('ywmc_' + index)(
						renderContent.drugName(value, this.memberOptions)
					)}
				</FormItem>,
		}, {
			title: '用法',
			dataIndex: 'usage',
			key: 'usage',
			width: '15%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('yf_' + index)(
						renderContent.usage(value, this.memberOptions)
					)}
				</FormItem>,
		}, {
			title: '用量',
			dataIndex: 'dosage',
			key: 'dosage',
			width: '15%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('yl_' + index)(
						renderContent.dosage(value, this.dosageOptions)
					)}
				</FormItem>,
		}, {
			title: '用药时间',
			dataIndex: 'usageDate',
			key: 'usageDate',
			width: '15%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('yysj_' + index)(
						renderContent.usageDate(value, this.usageDateOptions)
					)}
				</FormItem>,
		}, {
			title: '服药依从性',
			dataIndex: 'adherence',
			key: 'adherence',
			width: '15%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('fyycx_' + index)(
						renderContent.adherence(value, this.adherenceOptions)
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
				 title={`确定要删除所选${selectedLength}条主要用药情况吗？`}
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
				dataSource={grdaZyyyqkObjSize} 
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
	console.log("MainMedicationsTable onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, SON_KEY);
}

function mapPropsToFields(props) {
	console.log("MainMedicationsTable mapPropsToFields", props)
	return props.fields || {}
}

MainMedicationsTable.propTypes = {
	addItem: PropTypes.func.isRequired,
	addSonItem: PropTypes.func.isRequired,
	removeSonItem: PropTypes.func.isRequired,
	onSelectSonChange: PropTypes.func.isRequired,
	phr: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	console.log('MainMedicationsTable mapStateToProps:', state)
	return {
		phr: state.phr,
	}
}

MainMedicationsTable = Form.create({
	onFieldsChange,
	mapPropsToFields
})(MainMedicationsTable)

export default connect(mapStateToProps, {
	...AppActions,
	...PHRAction
})(MainMedicationsTable)