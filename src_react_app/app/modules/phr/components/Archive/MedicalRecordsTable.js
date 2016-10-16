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
	Switch,
	Tooltip
} from 'antd'

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

/*既往史*/
class MedicalRecordsTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			editSwitch: false,
			data: new Array()
		}

		/*既往史 类别*/
		this.dtOptions = getSelectOptions(WIDGET_CONFIG.selectOption.diseaseType);
		/*既往史 疾病名称*/
		this.dnOptions = getSelectOptions(WIDGET_CONFIG.selectOption.diseaseName);
	}

	componentWillMount = () => {}

	componentDidMount = () => {
		console.log('MedicalRecordsTable componentDidMount', this.props)
	}

	componentDidUpdate = () => {
		console.log('MedicalRecordsTable componentDidUpdate', this.props)

		const data = this.state.data
		const fields = this.props.fields
		const size = !!fields ? fields.size : 0
		console.log('componentDidUpdate', data.length, size)
		if (data.length != size) {
			let dataArr = new Array()
			for (let i = 0; i < size; i++) {
				dataArr.push({})
			}
			this.setState({
				data: dataArr
			})
		}
	}

	componentWillReceiveProps = () => {
		console.log("MedicalRecordsTable componentWillReceiveProps")

	}

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
			diseaseType(value, option) {
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
			diseaseName(value, option) {
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
			confirmTime(value) {
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
			title: '类别',
			dataIndex: 'diseaseType',
			key: 'diseaseType',
			width: '20%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('lb_' + index)(
						renderContent.diseaseType(value, this.dtOptions)
					)}
				</FormItem>,
		}, {
			title: '疾病名称',
			dataIndex: 'diseaseName',
			key: 'diseaseName',
			width: '20%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('jbmc_' + index)(
						renderContent.diseaseName(value, this.dnOptions)
					)}
				</FormItem>,
		}, {
			title: '确诊时间',
			dataIndex: 'confirmTime',
			key: 'confirmTime',
			width: '15%',
			render: (value, row, index) =>
				<FormItem>
					{getFieldDecorator('qzne_' + index)(
						renderContent.confirmTime(value)
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
	        	<FormItem
	        	 label={<span>既往史
	        	 	{' '}
	        	 	<Tooltip title={`点击新增可以增加一条家族史数据`}>
	        	 		<Icon type="question-circle-o" />
	        	 	</Tooltip>
	        	 </span>}
	        	/>

				{/*<span className="wrapper_border" onClick={this.jwsEditSwitchSpanClick}>
					编辑{' '}
					<Switch
					 checked={editSwitch}
					 onChange={this.jwsEditSwitch}
					 checkedChildren={'开'}
					 unCheckedChildren={'关'}
					/>
				</span>*/}

				<Popconfirm
					title = {
						`确定要删除所选${selectedLength}条既往史吗？`
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
    			footer={footer}
    			pagination={false}
			>
			</Table>
		)
	}
}

MedicalRecordsTable.propTypes = {}

function onFieldsChange(props, fields) {
	console.log("MedicalRecordsTable onFieldsChange", props, fields)
	props.onFieldsChange({
		fields,
	}, 'grdaJws');
}

function mapPropsToFields(props) {
	console.log("MedicalRecordsTable mapPropsToFields", props)
	return props.fields || {}
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(MedicalRecordsTable)