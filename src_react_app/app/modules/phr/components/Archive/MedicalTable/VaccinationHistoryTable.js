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

/*非免疫规划预防接种史*/
class VaccinationHistoryTable extends React.Component {

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
			vaccineName(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Input />
					)
				}
			},
			vaccinationDate(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<DatePicker
						 	style={{width: '30vh'}}
							disabledDate={(current) => {return current && current.valueOf() > Date.now()}}
						/>
					)
				}
			},
			vaccinationAgency(value, option) {
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
			title: '疫苗名称',
			dataIndex: 'vaccineName',
			key: 'vaccineName',
			width: '15%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('ymmc_' + index)(
						renderContent.vaccineName(value, this.memberOptions)
					)}
				</FormItem>,
		}, {
			title: '接种日期',
			dataIndex: 'vaccinationDate',
			key: 'vaccinationDate',
			width: '15%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('jzrq_' + index)(
						renderContent.vaccinationDate(value, this.sickOptions)
					)}
				</FormItem>,
		}, {
			title: '接种机构',
			dataIndex: 'vaccinationAgency',
			key: 'vaccinationAgency',
			width: '15%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('jzjg_' + index)(
						renderContent.vaccinationAgency(value, this.sickOptions)
					)}
				</FormItem>,
		}, {
			title: '备注',
			dataIndex: 'remark',
			key: 'remark',
			width: '60%',
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
				 title={`确定要删除所选${selectedLength}条非免疫规划预防接种史吗？`}
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

VaccinationHistoryTable.propTypes = {}

function onFieldsChange(props, fields) {
	console.log("VaccinationHistoryTable onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, 'grdaFmyjzs');
}

function mapPropsToFields(props) {
	console.log("VaccinationHistoryTable mapPropsToFields", props)
	return props.fields || {}
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(VaccinationHistoryTable)