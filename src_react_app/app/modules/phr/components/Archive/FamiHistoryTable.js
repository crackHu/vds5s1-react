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

/*const data = [];
for (let i = 0; i < 1; i++) {
	data.push({
		key: i,
		diseaseType: '',
		diseaseName: '',
		confirmTime: '',
		remark: ``,
	});
}*/

const getSelectOptions = (data) => {
	return data.map((item, i) => {
		return <Option key={item.value}>{item.value}</Option>
	})
}

/*家族史*/
class FamiHistoryTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			editSwitch: false,
			data: []
		}

		/*成员类别*/
		this.memberOptions = getSelectOptions(WIDGET_CONFIG.selectOption.memberType);
		/*疾病名称*/
		this.sickOptions = getSelectOptions(WIDGET_CONFIG.selectOption.sicknessName);
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	componentWillReceiveProps = (nextProps) => {
		console.log("FamiHistoryTable componentWillReceiveProps", nextProps)
		const data = this.state.data
		if (!!nextProps.fields && !!nextProps.fields.objSize && data.length == 0)
			this.setState({
				data: nextProps.fields.objSize
			})
	}

	componentDidUpdate = (prevProps, prevState) => {
		console.log('FamiHistoryTable componentDidUpdate', prevProps, prevState)
	}

	/*家族史 选中项发生变化时的回调*/
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
			editSwitch,
			data
		} = this.state

		const renderContent = {
			memberType(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Select style={{width: '40vh'}}>
							{option}
						</Select>
					)
				}
			},
			sicknessName(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Select style={{width: '40vh'}}>
							{option}
						</Select>
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
			title: '成员类别',
			dataIndex: 'memberType',
			key: 'memberType',
			width: '15%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('cylb_' + index)(
						renderContent.memberType(value, this.memberOptions)
					)}
				</FormItem>,
		}, {
			title: '疾病名称',
			dataIndex: 'sicknessName',
			key: 'sicknessName',
			width: '15%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('jbmc_' + index)(
						renderContent.sicknessName(value, this.sickOptions)
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
				<FormItem
	        	 label={<span>家族史
	        	 	{' '}
	        	 	<Tooltip title={`点击新增可以增加一条家族史`}>
	        	 		<Icon type="question-circle-o" />
	        	 	</Tooltip>
	        	 </span>}
	        	/>

				<Popconfirm
				 title={`确定要删除所选${selectedLength}条家族史吗？`}
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
				dataSource={data} 
				rowSelection={rowSelection}
				size="middle"
   				title={title}
    			footer={footer}
    			pagination={false}
    			bordered
			>
			</Table>
		)
	}
}

FamiHistoryTable.propTypes = {}

function onFieldsChange(props, fields) {
	console.log("FamiHistoryTable onFieldsChange", props, fields)
	props.onFieldsChange({
		fields,
	}, 'grdaJzs');
}

function mapPropsToFields(props) {
	console.log("FamiHistoryTable mapPropsToFields", props)
	return props.fields || {}
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(FamiHistoryTable)