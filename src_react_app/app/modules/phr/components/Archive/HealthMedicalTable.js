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
	DATE_FORMAT_STRING
} from 'config'
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

	/*改变选中的体检表 根据体检时间*/
	changeSelectDate = (selectDate) => {
		this.props.changeGrdaJkzkSelectKey(selectDate)
	}

	render() {

		const {
			objSize
		} = this.props
		const {
			getFieldDecorator,
			getFieldValue
		} = this.props.form
		const {
			selectedRowKeys,
			editSwitch
		} = this.state

		// 目前没有调用
		const renderContent = {

			medicalDate(value, option) {
				let grda_tjrq = getFieldValue('grda_tjrq')
				let grda_tjrq_value = !!grda_tjrq ? grda_tjrq.format(DATE_FORMAT_STRING) : ''
				if (editSwitch) {
					return <a>{grda_tjrq_value}</a>
				} else {
					return (
						<DatePicker
					 	style={{width: '40vh'}}
						disabledDate={(current) => {return current && current.valueOf() > Date.now()}}
					/>
					)
				}
			},
			medicalEvaluation(value, option) {
				if (editSwitch) {
					return <span>{getFieldValue('grda_jkpj')}</span>
				} else {
					return (
						<Input style={{width: '40vh'}}/>
					)
				}
			},
			medicalGuide(value) {
				if (editSwitch) {
					return <span>{getFieldValue('grda_jkzd')}</span>
				} else {
					return (
						<Input style={{width: '40vh'}}/>
					)
				}
			},
		}

		const columns = [{
			title: '体检日期',
			dataIndex: 'medicalDate',
			key: 'medicalDate',
			width: '10%',
			render: (value, row, index) => {
				let grda_tjrq = getFieldValue(`grda_tjrq_${index}`)
				let grda_tjrq_value = !!grda_tjrq ? grda_tjrq.format(DATE_FORMAT_STRING) : ''
				return <span>{grda_tjrq_value}</span>
			}
		}, {
			title: '健康评价',
			dataIndex: 'medicalEvaluation',
			key: 'medicalEvaluation',
			width: '30%',
			render: (value, row, index) =>
				<span>{getFieldValue(`grda_jkpj_${index}`)}</span>,
		}, {
			title: '健康指导',
			dataIndex: 'medicalGuide',
			key: 'medicalGuide',
			width: '45%',
			render: (value, row, index) =>
				<span>{getFieldValue(`grda_jkzd_${index}`)}</span>,
		}, {
			title: '操作',
			dataIndex: 'operation',
			key: 'operation',
			width: '10%',
			render: (value, row, index) => {
				let grda_tjrq = getFieldValue(`grda_tjrq_${index}`)
				let grda_tjrq_value = !!grda_tjrq ? grda_tjrq.format(DATE_FORMAT_STRING) : ''
				return <a href="javascript:void(0);" onClick={() => this.changeSelectDate(grda_tjrq_value)}>查看</a>
			}
		}];

		// rowSelection objects indicates the need for row selection
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};
		const selectedLength = selectedRowKeys.length;
		const hasSelected = selectedLength > 0;
		const pagination = {
			total: !!objSize ? objSize.length : 0,
			pageSize: 5
		}
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

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(HealthMedicalTable)