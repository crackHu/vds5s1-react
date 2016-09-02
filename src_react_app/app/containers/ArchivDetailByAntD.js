import React from 'react';
import {
	Menu,
	Icon,
	Breadcrumb
} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import AntContainer1 from './AntContainer1';
import AntContainer2 from './AntContainer2';

import '../main.css';

export default class ArchivDetailByAntD extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			current: 'mail',
		}
	}

	handleClick(e) {
		console.log('click ', e);
		this.setState({
			current: e.key,
		});
	}
	render() {
		return (
			<div className="ant-layout-top">
			      <div className="ant-layout-header">
			        <div className="ant-layout-wrapper">
			          <div className="ant-layout-logo">
			          </div>
			          <Menu theme="dark" mode="horizontal"
			            defaultSelectedKeys={['1']} style={{lineHeight: '64px'}}>
			            <Menu.Item key="1">导航一</Menu.Item>
			            <Menu.Item key="2">导航二</Menu.Item>
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
			          <div style={{ height: 210 }}>
			          	<AntContainer2 />
			          </div>
			        </div>
			      </div>
			      <div className="ant-layout-footer">
			      Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
			      </div>
			    </div>
		);
	}
}