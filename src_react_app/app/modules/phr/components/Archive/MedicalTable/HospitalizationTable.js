import React, {
	Component,
	PropTypes
} from 'react'
import {
	Link
} from 'react-router';
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

/*住院治疗情况*/
class HospitalizationTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			editSwitch: false,
			data: [{}]
		}
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	onSelectChange = (selectedRowKeys, selectedRows) => {
		console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
		this.setState({
			selectedRowKeys,
		});
	}

	deleteConfirm = () => {
		const {
			selectedRowKeys,
			data
		} = this.state
		const data_ = data.filter(item => selectedRowKeys.indexOf(item.key) < 0)
		this.setState({
			data: data_,
			selectedRowKeys: []
		}, () => msg("success", "已删除", 1))
	}

	deleteCancel = () => {}

	addRow = (e) => {

		let ndata = {}
		ndata.key = Date.now()

		let data = Object.assign([], this.state.data)
		data.push(ndata)

		this.setState({
			data
		}, () => msg("success", "已添加", 1))
	}

	render() {

		const {
			getFieldDecorator
		} = this.props.form
		const {
			selectedRowKeys,
			editSwitch
		} = this.state

		const renderContent = {
			inoutDate(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Input />
					)
				}
			},
			reason(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Input />
					)
				}
			},
			institutionName(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Input />
					)
				}
			},
			mRecordNo(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Input />
					)
				}
			},
			remark(value) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Input
							style={{width: '70vh'}}
							type="textarea"
							autosize={{ minRows: 1, maxRows: 2 }}
						/>
					)
				}
			},

		}

		const columns = [{
			title: '入/出院日期',
			dataIndex: 'inoutDate',
			key: 'inoutDate',
			width: '15%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('cylb_' + index)(
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
					{getFieldDecorator('jbmc_' + index)(
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
					{getFieldDecorator('jbmc_' + index)(
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
					{getFieldDecorator('jbmc_' + index)(
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
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
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
				 onConfirm={this.deleteConfirm}
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
				dataSource={this.state.data} 
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

HospitalizationTable.propTypes = {}

function onFieldsChange(props, fields) {
	console.log("HospitalizationTable onFieldsChange", props, fields)
}

function mapPropsToFields(props) {
	console.log("HospitalizationTable mapPropsToFields", props)
}

export default Form.create()(HospitalizationTable)