import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
	DatePicker,
	Select,
	Row,
	Col,
	Modal,
	Button
} from 'antd'

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

/*高级搜索*/
class ExportRecordModal extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	getSelectOptions = (data) => {
		if (data) {
			return data.map((item, i) => {
				return <Option key={i}>{item.value}</Option>
			})
		}
	}

	/*modal event*/
	handleOk = (e) => {
		e.preventDefault();
		console.log('点了确认')
		this.setState({
			modalLoading: true,
		});
		this.props.switchModalVisible(false)
	}

	handleCancel = (e) => {
		console.log('点了取消')
		this.props.switchModalVisible(false)
	}

	componentWillMount = () => {
		console.log('ExportRecordModal componentWillMount')
	}

	componentDidMount = () => {
		console.log('ExportRecordModal componentDidMount', this.props)
	}

	componentDidUpdate = () => {
		console.log('ExportRecordModal componentDidUpdate')
	}

	componentWillReceiveProps = (nextProps) => {
		console.log('ExportRecordModal componentWillReceiveProps', this.props, nextProps)
	}

	render() {

		return (
			<div>
				<Modal title="导出日志" width={760} visible={this.props.modalVisible} maskClosable={false}
			      onCancel={this.handleCancel} onOk={this.handleOk} confirmLoading={this.state.modalLoading}
			      footer={[
		            <Button key="back" type="ghost" size="large" icon="rollback" onClick={this.handleCancel}>
		            	关 闭
		            </Button>,
		            <Button key="submit" type="primary" size="large" icon="search" onClick={this.handleOk} loading={this.state.modalLoading}>
		             	查 询
		            </Button>,
		          ]}>
          			test
		        </Modal>
			</div>
		)
	}
}

export default ExportRecordModal