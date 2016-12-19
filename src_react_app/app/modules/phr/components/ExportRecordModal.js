import React, {
	Component,
	PropTypes
} from 'react'
import {
	Modal,
	Button
} from 'antd'
import QueueAnim from 'rc-queue-anim';

/*导出日志*/
class ExportRecordModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show: true
		}
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

	/*modal event*/
	handleOk = (e) => {
		e.preventDefault();
		console.log('点了确认')
		this.setState({
			modalLoading: true,
		});
	}

	handleCancel = (e) => {
		console.log('点了取消')
		this.setState({
			show: !this.state.show
		});
		setTimeout(this.props.switchModalVisible(false), 3000)

	}

	handleSwitchClick = () => {
		this.setState({
			show: !this.state.show
		});
	}

	render() {

		return (
			<div>
				<Modal title="导出日志" width={760} visible={this.props.modalVisible} maskClosable={true}
			      onCancel={this.handleCancel} onOk={this.handleOk}
			      footer={[
		            <Button key="back" type="ghost" size="large" icon="rollback" onClick={this.handleCancel}>
		            	关 闭
		            </Button>
		          ]}>
          			<div className="queue-demo">
				        <QueueAnim className="demo-content">
				          {this.state.show ? [
				            <div className="demo-thead" key="a">
			              		<ul>
			                 		<li>执行时间</li>
							  		<li>内容</li>
							  		<li>文件名</li>
			              		</ul>
				            </div>,
				            <div className="demo-tbody" key="b">
			              		<ul>
			                 		<li>{new Date().format('yyyy-MM-dd hh:mm:ss')}</li>
							  		<li>全部导出</li>
							  		<li>健康档案-导出-{new Date().format('yyyyMMddhhmmssS')}.zip</li>
							  		<li><a>下载</a></li>
			              		</ul>
			              		<ul>
			                 		<li>{new Date().format('yyyy-MM-dd hh:mm:ss')}</li>
							  		<li>全部导出</li>
							  		<li>健康档案-导出-{new Date().format('yyyyMMddhhmmssS')}.zip</li>
							  		<li><a>下载</a></li>
			              		</ul>
			              		<ul>
			                 		<li>{new Date().format('yyyy-MM-dd hh:mm:ss')}</li>
							  		<li>全部导出</li>
							  		<li>健康档案-导出-{new Date().format('yyyyMMddhhmmssS')}.zip</li>
							  		<li><a>下载</a></li>
			              		</ul>
			              		
				            </div>
				          ] : null}
				        </QueueAnim>
			      	</div>
		        </Modal>
			</div>
		)
	}
}

export default ExportRecordModal