import React, {
	Component,
	PropTypes
} from 'react'
import {
	Modal,
	Button,
	Tag,
	Tooltip,
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
		setTimeout(() => {
			this.props.switchModalVisible(false)
		}, 200)
	}

	download = (filePath) => {
		const fileName = `健康档案-导出-${new Date().format('yyyyMMddhhmmssS')}.zip`
		this.props.download({
			filePath,
		}, fileName)
	}

	render() {

		const {
			recordData
		} = this.props
		const {
			allRecord
		} = recordData

		let recordDataColumn = (
			<ul>
		  		<li>执行时间</li>
		  		<li>内容</li>
		  		<li>状态</li>
		  		<li>操作</li>
	  		</ul>
		)
		let tagStatus = {
			success: <Tag color="#87d068">导出成功</Tag>,
			process: <Tag color="#108ee9">正在导出</Tag>,
			error: <Tag color="#f50">导出失败</Tag>,
		}
		let recordDataUl = allRecord ? allRecord.map(item => {

			let status = 'initial',
				statusVal = item.ifExport,
				disabled = statusVal != '1'

			if (!isNaN(statusVal)) {
				switch (statusVal) {
					case '0':
						status = tagStatus.process
						break
					case '1':
						status = tagStatus.success
						break
					case '2':
						status = tagStatus.error
						break;
					default:
						status = 'unknown'
						break
				}
			}

			return (
				<ul key={item.id}>
		  			<li>{item.createDate}</li>
		  			<li>
		  				<Tooltip title={item.descript}>
					    	{item.descript}
					  	</Tooltip>
		  			</li>
			  		<li>{status}</li>
			  		<li>
			  			<Button
			  				disabled={disabled}
			  				size="small"
			  				type="ghost"
			  				onClick={() => this.download(item.url)}
			  			>
			  				下载
			  			</Button>
			  		</li>
		  		</ul>
			)
		}) : null

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
				        <QueueAnim
				        	className="demo-content"
				        	delay={10}
				        	key="demo"
				          	type={['right', 'left']}
				          	ease={['easeOutQuart', 'easeInOutQuart']}
				        >
				          {this.state.show ? [
				            <div className="demo-thead" key="a">
			              		{recordDataColumn}
				            </div>,
				            <div className="demo-tbody" key="b">
			              		{/*
			              			<ul key={Date.now()}>
										<li>{new Date().format('yyyy-MM-dd hh:mm:ss')}</li>
								  		<li>全部导出</li>
								  		<li>健康档案-导出-{new Date().format('yyyyMMddhhmmssS')}.zip</li>
								  		<li><a>下载</a></li>
			              			</ul>
		              			*/}
						  		{recordDataUl}
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