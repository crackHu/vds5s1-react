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
	Switch
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
	ARC_FORM_WIDGET_CONFIG as WIDGET_CONFIG
} from 'phr_conf'

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

const data = [];
for (let i = 0; i < 3; i++) {
	data.push({
		key: i,
		diseaseType: '手术',
		diseaseName: '慢性阻塞性肺疾病',
		confirmTime: '1950-1-1',
		remark: `西湖区湖底公园${i}号`,
	});
}

const getSelectOptions = (data) => {
	return data.map((item, i) => {
		return <Option key={i}>{item.value}</Option>
	})
}

/*既往史*/
class MedicalRecordsTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			editSwitch: false,
			data
		}

		/*既往史 类别*/
		this.dtOptions = getSelectOptions(WIDGET_CONFIG.selectOption.diseaseType);
		/*既往史 疾病名称*/
		this.dnOptions = getSelectOptions(WIDGET_CONFIG.selectOption.diseaseName);
	}
	componentWillMount = () => {}

	componentDidMount = () => {}

	/*既往史 选中项发生变化时的回调*/
	onSelectChange = (selectedRowKeys, selectedRows) => {
		console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
		this.setState({
			selectedRowKeys,
		});
	}

	/*既往史 编辑状态开关发生变化时的回调*/
	jwsEditSwitch = (checked = false) => {
		this.setState({
			editSwitch: checked
		})
	}

	/*span switch click*/
	jwsEditSwitchSpanClick = () => {
		this.setState({
			editSwitch: !this.state.editSwitch
		})
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
		const data = this.state.data
		let d = {}
		d.key = 11
		data.push(d)
		console.log('data:', data)
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
			diseaseType(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Select defaultValue={value}>
							{option}
						</Select>
					)
				}
			},
			diseaseName(value, option) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Select defaultValue={value}>
							{option}
						</Select>
					)
				}
			},
			confirmTime(value) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<DatePicker
							defaultValue={moment(value, DATE_FORMAT_STRING)}
							format={DATE_FORMAT_STRING}
						/>
					)
				}
			},
			remark(value) {
				if (editSwitch) {
					return <span>{value}</span>
				} else {
					return (
						<Input
							type="textarea"
							defaultValue={value}
							autosize={{ minRows: 1, maxRows: 2 }}
						/>
					)
				}
			},

		}
		const diseaseName = (text) => (
			editSwitch == true ? <span>{text}</span> : <Input defaultValue={text}/>
		)

		const columns = [{
			title: '类别',
			dataIndex: 'diseaseType',
			key: 'diseaseType',
			width: '20%',
			render: (value) => renderContent.diseaseType(value, this.dtOptions),
		}, {
			title: '疾病名称',
			dataIndex: 'diseaseName',
			key: 'diseaseName',
			width: '20%',
			render: (value) => renderContent.diseaseName(value, this.dnOptions),
		}, {
			title: '确诊时间',
			dataIndex: 'confirmTime',
			key: 'confirmTime',
			width: '15%',
			render: (value) => renderContent.confirmTime(value),
		}, {
			title: '备注',
			dataIndex: 'remark',
			key: 'remark',
			width: '40%',
			render: (value) => renderContent.remark(value),
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
				<span className="wrapper_border" onClick={this.jwsEditSwitchSpanClick}>
					编辑{' '}
					<Switch
					 checked={editSwitch}
					 onChange={this.jwsEditSwitch}
					 checkedChildren={'开'}
					 unCheckedChildren={'关'}
					/>
				</span>
				<Popconfirm
				 title="确定要删除所选既往史吗？"
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
		const footer = () => '选择一条多条记录进行编辑或删除操作'

		return (
			<Table
				key="table"
				columns={columns}
				dataSource={this.state.data} 
				rowSelection={rowSelection}
				size="middle"
   				title={title}
    			footer={footer}
			>
			</Table>
		)
	}
}

MedicalRecordsTable.propTypes = {}

function onFieldsChange(props, fields) {
	console.log("MedicalRecordsTable onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("MedicalRecordsTable mapPropsToFields")
}

export default Form.create()(MedicalRecordsTable)