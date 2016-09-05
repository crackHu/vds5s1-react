import React, {
	PropTypes
} from 'react'
import {
	Link,
	hashHistory
} from 'react-router'
import {
	connect
} from 'react-redux';
import {
	Menu,
	Icon,
	Breadcrumb,
	message
} from 'antd';
import fetch from 'isomorphic-fetch'
import * as AppActions from '../actions/AppActions';

const menuObjArr = [{
	"path": "/AntContainer1",
	"name": "测试1"
}, {
	"path": "/AntContainer2",
	"name": "测试2"
}, {
	"path": "/ArchivDetail",
	"name": "测试3"
}]

class App extends React.Component {

	constructor() {
		console.log("constructor")
		super();
		//菜单导航默认设置
		this.state = {
			"menuObjArr": menuObjArr,
			"menuName": menuObjArr[0].name,
			"menuPath": menuObjArr[0].path,
			"menuIndex": "0",
		}
		this.handleClick = (e) => {
			if (e.key) {
				console.log("handleClick")
				let menuObj = this.state.menuObjArr[e.key];
				hashHistory.push(menuObj.path);
				this.setState({
					"menuName": menuObj.name,
					"menuPath": menuObj.path,
					"menuIndex": e.key,
				})
			}
		};
	}

	componentWillMount() {
		console.log("componentWillMount")
		this.historyRouteChange()
			//console.log(this.props.getMenu())
	}

	componentDidMount() {
		console.log("componentDidMount")

		shortcut.add("ctrl+q", function() {
			const hide = message.loading('正在保存中...', 110);

			const url = "https://api.github.com/search/users?q=a"
			const init = {
				cache: 'no-cache'
			}
			fetch(url)
				.then(response => response.json())
				.then((data) => {
					console.log(data.items)
					hide()
					message.success('保存成功')
				})
				.catch((e) => {
					console.error("Oops, error", e)
					hide()
					message.warn('保存失败 ' + '[' + e + ']');
				})
		}, {
			'type': 'keydown',
			'propagate': true,
			'target': document
		});
	}
	componentWillUpdate() {
		console.log("componentWillUpdate")
	}

	componentDidUpdate() {
		console.log("componentDidUpdate")
	}

	componentWillReceiveProps() {
		console.log("componentWillReceiveProps")
	}

	componentWillUnmount() {
		console.log("componentWillUnmount")
	}

	historyRouteChange = () => {
		let historyPathname = this.props.location.pathname
		if (historyPathname != '/') {
			for (let index in menuObjArr) {
				if (menuObjArr[index].path == historyPathname) {
					this.setState({
						"menuName": menuObjArr[index].name,
						"menuIndex": index,
					})
				}
			}
		}
	}

	render() {
		return (
			<div className="ant-layout-top">
		      <div className="ant-layout-header">
		        <div className="ant-layout-wrapper">
		          <div className="ant-layout-logo">
		          </div>
		          <Menu theme="dark" mode="horizontal"
		            defaultSelectedKeys={[this.state.menuIndex]} selectedKeys={[this.state.menuIndex]} onClick={this.handleClick} style={{lineHeight: '64px'}}>
		           	{this.state.menuObjArr.map((menu, index) => {
		           		return (
		           			<Menu.Item key={index}>{menu.name}</Menu.Item>
		           			)
		           	})}
		          </Menu>
		        </div>
		      </div>
		      <div className="ant-layout-wrapper">
		        <div className="ant-layout-breadcrumb">
		          <Breadcrumb>
					<Breadcrumb.Item>首页</Breadcrumb.Item>
		            <Breadcrumb.Item>{this.state.menuName}</Breadcrumb.Item>
		          </Breadcrumb>
		        </div>
		        <div className="ant-layout-container">
		          <div style={{ height: '100%' }}>
		          	{this.props.children}
		          </div>
		        </div>
		      </div>
		      <div className="ant-layout-footer">
		{ /*Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持*/ }
		      </div>
		    </div>
		)
	}
}

App.propTypes = {
	children: PropTypes.object.isRequired,
	getMenu: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		data: state
	}
}

export default connect(mapStateToProps, AppActions)(App)