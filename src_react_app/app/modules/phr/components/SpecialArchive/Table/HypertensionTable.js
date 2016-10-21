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
} from 'phr_conf'

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

const getSelectOptions = (data) => {
	return data.map((item, i) => {
		return <Option key={item.value}>{item.value}</Option>
	})
}

/*高血压记录表*/
class HypertensionTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			editSwitch: true,
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
			title: '随访日期',
			dataIndex: 'followUpDate',
			key: 'followUpDate',
			width: '8%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('gxy_sfrq2_' + index)(
						renderContent.inoutDate(value, this.memberOptions)
					)}
				</FormItem>,
		}, {
			title: '随访方式',
			dataIndex: 'followUpWay',
			key: 'followUpWay',
			width: '8%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('gxy_sffs_' + index)(
						renderContent.reason(value, this.sickOptions)
					)}
				</FormItem>,
		}, {
			title: '症状',
			dataIndex: 'symptoms',
			key: 'symptoms',
			width: '8%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('gxy_zz_' + index)(
						renderContent.reason(value, this.sickOptions)
					)}
				</FormItem>,
		}, {
			title: '血压/',
			dataIndex: 'bloodPress1',
			key: 'reason',
			width: '8%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('gxy_tz_xy1_' + index)(
						renderContent.reason(value, this.sickOptions)
					)}
				</FormItem>,
		}, {
			title: '血压',
			dataIndex: 'bloodPress2',
			key: 'bloodPress1',
			width: '8%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('gxy_tz_xy2_' + index)(
						renderContent.reason(value, this.sickOptions)
					)}
				</FormItem>,
		}, {
			title: '身高',
			dataIndex: 'height',
			key: 'height',
			width: '8%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('jbmc_' + index)(
						renderContent.reason(value, this.sickOptions)
					)}
				</FormItem>,
		}, {
			title: '体重',
			dataIndex: 'weight',
			key: 'weight',
			width: '8%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('gxy_tz_sg_' + index)(
						renderContent.reason(value, this.sickOptions)
					)}
				</FormItem>,
		}, {
			title: '体质指数',
			dataIndex: 'bmi',
			key: 'bmi',
			width: '8%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('gxy_tz_tzzs_' + index)(
						renderContent.reason(value, this.sickOptions)
					)}
				</FormItem>,
		}, {
			title: '心率',
			dataIndex: 'heartRate',
			key: 'heartRate',
			width: '8%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('gxy_tz_xl_' + index)(
						renderContent.reason(value, this.sickOptions)
					)}
				</FormItem>,
		}, {
			title: '其他',
			dataIndex: 'other',
			key: 'other',
			width: '8%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('gxy_tz_qt_' + index)(
						renderContent.reason(value, this.sickOptions)
					)}
				</FormItem>,
		}, {
			title: '此次随访分类',
			dataIndex: 'followUpClass',
			key: 'followUpClass',
			width: '8%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('gxy_ccsffl_' + index)(
						renderContent.institutionName(value, this.sickOptions)
					)}
				</FormItem>,
		}, {
			title: '下次随访日期',
			dataIndex: 'nextFUDate',
			key: 'nextFUDate',
			width: '6%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('gxy_xcsfrq2_' + index)(
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
			pageSize: 8
		}
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
    			pagination={false}
    			bordered
			>
			</Table>
		)
	}
}

HypertensionTable.propTypes = {}

function onFieldsChange(props, fields) {
	console.log("HypertensionTable onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, 'gxyJxb');
}

function mapPropsToFields(props) {
	console.log("HypertensionTable mapPropsToFields", props)
	return props.gxyJxbFields || {}
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(HypertensionTable)