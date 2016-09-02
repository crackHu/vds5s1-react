import React from 'react'
import {
	Link,
	hashHistory
} from 'react-router'
import {
	Menu,
	Icon,
	Breadcrumb
} from 'antd';


export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.handleClick = (e) => {
			if (e.key) {
				hashHistory.push(e.key)
			}
		};
	}

	render() {
		return (
			<div className="ant-layout-top">
		      <div className="ant-layout-header">
		        <div className="ant-layout-wrapper">
		          <div className="ant-layout-logo">
		          </div>
		          <Menu theme="dark" mode="horizontal"
		            defaultSelectedKeys={['AntContainer1']} onClick={this.handleClick} style={{lineHeight: '64px'}}>
		            <Menu.Item key="AntContainer1">导航一</Menu.Item>
		            <Menu.Item key="333">导航二</Menu.Item>
		            <Menu.Item key="3">导航三</Menu.Item>
		          </Menu>
		        </div>
		      </div>
		      <div className="ant-layout-wrapper">
		        <div className="ant-layout-breadcrumb">
		          <Breadcrumb>
		            <Breadcrumb.Item>首页</Breadcrumb.Item>
		            <Breadcrumb.Item>应用列表</Breadcrumb.Item>
		            <Breadcrumb.Item>某应用</Breadcrumb.Item>
		          </Breadcrumb>
		        </div>
		        <div className="ant-layout-container">
		          <div style={{ height: '100%' }}>
		          	{children}
		          </div>
		        </div>
		      </div>
		      <div className="ant-layout-footer">
		      	Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
		      </div>
		    </div>
		)
	}
}

App.propTypes = {
	children: React.PropTypes.object.isRequired,
}