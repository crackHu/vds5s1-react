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
	SPEC_ARC_FORM_WIDGET_CONFIG as WIDGET_CONFIG
} from 'phr_conf'

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

const getSelectOptions = (data) => {
	return data.map((item, i) => {
		return <Option key={item.value}>{item.value}</Option>
	})
}

/*高血压记录表 用药情况*/
class HMedicationsTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			editSwitch: false,
			data: [{}]
		}

		/*每日次数*/
		this.dailyNumOptions = getSelectOptions(WIDGET_CONFIG.selectOption.dailyNum);
		/*每次数量*/
		this.eTimeNumOptions = getSelectOptions(WIDGET_CONFIG.selectOption.eTimeNum);
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
			drugName(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Input style={{width: '20vw'}}/>
					)
				}
			},
			dailyNum(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Select
						 tags
						 style={{width: '20vw'}}>
							{option}
						</Select>
					)
				}
			},
			eTimeNum(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Select
						 tags
						 style={{width: '20vw'}}>
							{option}
						</Select>
					)
				}
			},
		}

		const columns = [{
			title: '药物名称',
			dataIndex: 'drugName',
			key: 'drugName',
			width: '30%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('ywmc_' + index)(
						renderContent.drugName(value, this.memberOptions)
					)}
				</FormItem>,
		}, {
			title: '每日次数',
			dataIndex: 'dailyNum',
			key: 'dailyNum',
			width: '30%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('mrcs_' + index)(
						renderContent.dailyNum(value, this.dailyNumOptions)
					)}
				</FormItem>,
		}, {
			title: '每次数量',
			dataIndex: 'eTimeNum',
			key: 'eTimeNum',
			width: '30%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('mcyl_' + index)(
						renderContent.eTimeNum(value, this.eTimeNumOptions)
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
			<div style={{display: 'flex', height: 32}}>
	        	<FormItem
	        	 label={<span>用药情况
	        	 	{' '}
	        	 	<Tooltip title={`点击新增可以增加一条用药情况`}>
	        	 		<Icon type="question-circle-o" />
	        	 	</Tooltip>
	        	 </span>}
	        	/>
				<div>
					<Popconfirm
					 title={`确定要删除所选${selectedLength}条用药情况吗？`}
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

HMedicationsTable.propTypes = {}

function onFieldsChange(props, fields) {
	console.log("HMedicationsTable onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, 'gxyYyqk');
}

function mapPropsToFields(props) {
	console.log("HMedicationsTable mapPropsToFields", props)
	return props.gxyYyqkFields || {}
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(HMedicationsTable)