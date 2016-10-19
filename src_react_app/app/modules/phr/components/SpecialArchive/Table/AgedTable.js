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

/*老年人评估表*/
class AgedTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			editSwitch: true,
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
			followUpDate(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Input style={{width: '6vw'}}/>
					)
				}
			},
			eating(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Input style={{width: '20vw'}}/>
					)
				}
			},
			wash(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Input style={{width: '20vw'}}/>
					)
				}
			},
			dress(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Input style={{width: '20vw'}}/>
					)
				}
			},
			toilet(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Input style={{width: '20vw'}}/>
					)
				}
			},
			activity(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Input style={{width: '20vw'}}/>
					)
				}
			},
			nextFUDate(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Input style={{width: '6vw'}}/>
					)
				}
			},
			fuDoc(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Input style={{width: '6vw'}}/>
					)
				}
			},
			totalScore(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Input style={{width: '4vw'}}/>
					)
				}
			},
		}

		const columns = [{
			title: '随访日期',
			dataIndex: 'followUpDate',
			key: 'followUpDate',
			fixed: 'left',
			width: '6vw',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('cylb_' + index)(
						renderContent.followUpDate(value, this.memberOptions)
					)}
				</FormItem>,
		}, {
			title: '进餐',
			dataIndex: 'eating',
			key: 'eating',
			width: '20vw',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('jbmc_' + index)(
						renderContent.eating(value, this.dailyNumOptions)
					)}
				</FormItem>,
		}, {
			title: '梳洗',
			dataIndex: 'wash',
			key: 'wash',
			width: '20vw',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('jbmc_' + index)(
						renderContent.wash(value, this.dailyNumOptions)
					)}
				</FormItem>,
		}, {
			title: '穿衣',
			dataIndex: 'dress',
			key: 'dress',
			width: '20vw',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('jbmc_' + index)(
						renderContent.dress(value, this.eTimeNumOptions)
					)}
				</FormItem>,
		}, {
			title: '如厕',
			dataIndex: 'toilet',
			key: 'toilet',
			width: '20vw',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('jbmc_' + index)(
						renderContent.toilet(value, this.eTimeNumOptions)
					)}
				</FormItem>,
		}, {
			title: '活动',
			dataIndex: 'activity',
			key: 'activity',
			width: '20vw',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('jbmc_' + index)(
						renderContent.activity(value, this.eTimeNumOptions)
					)}
				</FormItem>,
		}, {
			title: '下次随访日期',
			dataIndex: 'nextFUDate',
			key: 'nextFUDate',
			fixed: 'right',
			width: '6vw',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('jbmc_' + index)(
						renderContent.nextFUDate(value, this.eTimeNumOptions)
					)}
				</FormItem>,
		}, {
			title: '随访医生',
			dataIndex: 'fuDoc',
			key: 'fuDoc',
			fixed: 'right',
			width: '6vw',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('jbmc_' + index)(
						renderContent.fuDoc(value, this.eTimeNumOptions)
					)}
				</FormItem>,
		}, {
			title: '总评分',
			dataIndex: 'totalScore',
			key: 'totalScore',
			fixed: 'right',
			width: '4vw',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('jbmc_' + index)(
						renderContent.totalScore(value, this.eTimeNumOptions)
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
	        	 label={<span>老年人评估表
	        	 	{' '}
	        	 	<Tooltip title={`点击新增可以增加一条老年人评估记录`}>
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
						 style={{ marginLeft: 20 }}>删除</Button>
				    </Popconfirm>
					<Button
					 size="large"
					 type="primary"
					 icon="plus"
					 style={{ marginLeft: 20 }}
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
				size="middle"
   				title={title}
    			pagination={false}
    			bordered
    			scroll={{ x: 200 }} 
			>
			</Table>
		)
	}
}

AgedTable.propTypes = {}

function onFieldsChange(props, fields) {
	console.log("AgedTable onFieldsChange", props, fields)
}

function mapPropsToFields(props) {
	console.log("AgedTable mapPropsToFields", props)
}

export default Form.create()(AgedTable)