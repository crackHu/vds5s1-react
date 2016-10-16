import React, {
	Component,
	PropTypes
} from 'react'
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

import {
	msg,
	notify
} from 'utils'

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

const getSelectOptions = (data) => {
	return data.map((item, i) => {
		return <Option key={item.value}>{item.value}</Option>
	})
}

/*健康体检表 表格*/
class HealthMedicalTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			data: new Array()
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
			data
		} = this.state

		const renderContent = {
			medicalDate(value, option) {
				return (
					<Select style={{width: '40vh'}}>
						{option}
					</Select>
				)
			},
			medicalEvaluation(value, option) {
				return (
					<Select style={{width: '40vh'}}>
						{option}
					</Select>
				)
			},
			medicalGuide(value) {
				return (
					<DatePicker
					 	style={{width: '40vh'}}
						disabledDate={(current) => {return current && current.valueOf() > Date.now()}}
					/>
				)
			},
		}

		const columns = [{
			title: '体检日期',
			dataIndex: 'medicalDate',
			key: 'medicalDate',
			width: '30%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('lb_' + index)(
						renderContent.medicalDate(value, this.dtOptions)
					)}
				</FormItem>,
		}, {
			title: '健康评价',
			dataIndex: 'medicalEvaluation',
			key: 'medicalEvaluation',
			width: '30%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('jbmc_' + index)(
						renderContent.medicalEvaluation(value, this.dnOptions)
					)}
				</FormItem>,
		}, {
			title: '健康指导',
			dataIndex: 'medicalGuide',
			key: 'medicalGuide',
			width: '30%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('qzne_' + index)(
						renderContent.medicalGuide(value)
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
	        	{/*<FormItem
	        	 label={<span>体检记录
	        	 	{' '}
	        	 	<Tooltip title={`点击新增可以增加一条体检记录`}>
	        	 		<Icon type="question-circle-o" />
	        	 	</Tooltip>
	        	 </span>}
	        	/>*/}

				<Popconfirm
					title = {
						`确定要删除所选${selectedLength}条体检记录吗？`
					}
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
			>
			</Table>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("HealthMedicalTable onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("HealthMedicalTable mapPropsToFields")
}

export default Form.create(onFieldsChange, mapPropsToFields)(HealthMedicalTable)