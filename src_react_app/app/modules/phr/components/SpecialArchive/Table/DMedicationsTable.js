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
	SPEC_ARC_FORM_WIDGET_CONFIG as WIDGET_CONFIG,
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
const PARENT_KEY = 'tnbSfjl'
const SON_KEY = 'tnbYyqk'

/*糖尿病记录表 用药情况*/
class DMedicationsTable extends React.Component {

	constructor(props) {
		super(props);

		/*每日次数*/
		this.dailyNumOptions = getSelectOptions(WIDGET_CONFIG.selectOption.dailyNum);
		/*每次数量 update 每次剂量*/
		this.eTimeNumOptions = getSelectOptions(WIDGET_CONFIG.selectOption.eTimeNum);
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
			tnbYyqkFields,
			objSize,
			onFieldsChange
		} = this.props

		const renderContent = {
			drugName(value, option) {
				return (
					<Input style={{width: '20vw'}}/>
				)
			},
			dailyNum(value, option) {
				return (
					<Select
					 combobox
					 style={{width: '20vw'}}>
						{option}
					</Select>
				)
			},
			eTimeNum(value, option) {
				return (
					<Select
					 combobox
					 style={{width: '20vw'}}>
						{option}
					</Select>
				)
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
			title: '每次剂量',
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
		const selectedRowKeys = !!tnbYyqkFields ? tnbYyqkFields.selectedRowKeys || [] : []
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
    			footer={footer}
    			pagination={false}
			>
			</Table>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("DMedicationsTable onFieldsChange", props, fields)
	props.onFieldsChange({
		fields
	}, 'tnbYyqk');
}

function mapPropsToFields(props) {
	console.log("DMedicationsTable mapPropsToFields", props)
	return props.tnbYyqkFields || {}
}

DMedicationsTable.propTypes = {
	addItem: PropTypes.func.isRequired,
	addSonItem: PropTypes.func.isRequired,
	removeSonItem: PropTypes.func.isRequired,
	onSelectSonChange: PropTypes.func.isRequired,
	phr: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	console.log('DMedicationsTable mapStateToProps:', state)
	return {
		phr: state.phr,
	}
}

DMedicationsTable = Form.create({
	onFieldsChange,
	mapPropsToFields
})(DMedicationsTable)

export default connect(mapStateToProps, {
	...AppActions,
	...PHRAction
})(DMedicationsTable)