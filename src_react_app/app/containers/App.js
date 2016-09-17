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

import {
	shortcut
} from '../utils/shortcut'

const menuObjArr = [{
	path: "/",
	name: "首页",
	iconType: "home"
}, {
	path: "/AntContainer1",
	name: "档案管理",
	iconType: "credit-card"
}, {
	path: "/AntContainer2",
	name: "测试2",
	iconType: "code"
}, {
	path: "/ArchivDetail",
	name: "数据统计",
	iconType: "line-chart"
}]

class App extends React.Component {

	constructor() {
		console.log("constructor")
		super();
		//菜单导航默认设置
		this.state = {
			"menuObjArr": menuObjArr,
			"menuName": "welcome",
			"menuPath": menuObjArr[0].path,
			"menuIndex": "",
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
	}

	componentDidMount() {
		console.log("componentDidMount")

		shortcut.add("ctrl+z", function() {
			const hide = message.loading('正在保存中...', 110);

			const url = "https://api.github.com/search/users?q=a"
			const init = {
				cache: 'no-cache'
			}
			fetch(url)
				.then(response => response.json())
				.then((data) => {
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
		const SubMenu = Menu.SubMenu;

		return (
			<div className="container">
			  	{/*top*/}
		        <div className="top">
		            <div className="logo"/>
		            <Menu theme="blue" mode="horizontal" className="c-ant-menu"
		              defaultSelectedKeys={[this.state.menuIndex]} selectedKeys={[this.state.menuIndex]} onClick={this.handleClick} style={{lineHeight: '64px'}}>
		           	  {this.state.menuObjArr.map((menu, index) => {
		           		return (
		           			<Menu.Item key={index}>
		           				<Icon type={menu.iconType} />{menu.name}
		           			</Menu.Item>
		           			)
			           	})}
			        </Menu>
			    </div>
		        {/*content*/}
		        <div className="content">
		        	{/*left*/}
			        <aside className="left">
		            	<Menu theme="blue-dark" defaultOpenKeys={['sub1']} style={{ width: 240}} selectedKeys={[this.props.route.menuKey]} mode="inline">
			        		<SubMenu key="sub1" title={<span><Icon type="book" /><span>首页</span></span>}>
			        			<Menu.Item key="account"><Link to='/account'>账号管理</Link></Menu.Item>
			        			<Menu.Item key="survey"><Link to='/survey'>应用概况</Link></Menu.Item>
			        			<Menu.Item key="message">消息通知</Menu.Item>
			        		</SubMenu>
			      		</Menu>
			      		<Menu theme="blue-dark" defaultOpenKeys={['sub1','sub2']} style={{ width: 240}} selectedKeys={[this.props.route.menuKey]} mode="inline">
			        		<SubMenu key="sub1" title={<span><Icon type="book" /><span>内容维护</span></span>}>
			        			<Menu.Item key="topic"><Link to='/topic'>xx管理</Link></Menu.Item>
			        			<Menu.Item key="xx1">xxxx管理</Menu.Item>
			        			<Menu.Item key="xx2">xx管理</Menu.Item>
			        			<Menu.Item key="xx3">xx监控</Menu.Item>
			        			<Menu.Item key="xx4">xx模板</Menu.Item>
			        		</SubMenu>
			        		<SubMenu key="sub2" title={<span><Icon type="user" /><span>用户管理</span></span>}>
			        			<Menu.Item key="user">用户管理</Menu.Item>
			        		</SubMenu>
			      		</Menu>
			      		<Menu theme="blue-dark" defaultOpenKeys={['sub1']} style={{ width: 240}} selectedKeys={[this.props.route.menuKey]} mode="inline">
			        		<SubMenu key="sub1" title={<span><Icon type="book" /><span>交易中心</span></span>}>
			        			<Menu.Item key="xx5">交易明细</Menu.Item>
			        			<Menu.Item key="xx6">提现审核</Menu.Item>
			        			<Menu.Item key="xx7">交易数据分析</Menu.Item>
			        			<Menu.Item key="xx8">内容监控</Menu.Item>
			        		</SubMenu>
			      		</Menu>
			      		<Menu theme="blue-dark" defaultOpenKeys={['sub1']} style={{ width: 240}} openKeys={['sub1']} onOpen={this.onToggle} onClose={this.onToggle} selectedKeys={[this.props.route.menuKey]} mode="inline">
			        		<SubMenu key="sub1" title={<span><Icon type="book" /><span>xxxxx</span></span>}>
			        			<Menu.Item key="xx9">xxxxxx</Menu.Item>
			        			<Menu.Item key="xx10">xxxxxx</Menu.Item>
			        		</SubMenu>
			      		</Menu>
		            </aside>
		            {/*main*/}
            		<div className="main">
		          		{this.props.children}
			        </div>
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