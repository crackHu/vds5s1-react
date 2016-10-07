import React, {
	PropTypes
} from 'react'

import {
	Menu,
	Icon,
	Dropdown,
	Popover,
	Alert
} from 'antd';

import {
	regards,
	getDate
} from 'utils'

const username = localStorage.getItem('username') || '系统管理员'

/*用户简介*/
export default class UserProfile extends React.Component {


	render() {
		const regard = `${regards()}`
		const time = `${getDate()}`
		const overlay = (
			<Menu>
			    <Menu.Item key="0">
			    	<a style={{ textAlign: "center" }}>{regard}</a>
			    </Menu.Item>
			    <Menu.Item key="2">
			    	<a style={{ textAlign: "center" }}>{time}</a>
			    </Menu.Item>
			    <Menu.Divider />
			    <Menu.Item key="1">
			    	<a style={{ textAlign: "center" }}>退出系统</a>
			    </Menu.Item>
			</Menu>
		);
		const content1 = <a style={{ textAlign: "center" }}>{regards()}</a>
		const content = <a>退出系统</a>

		/*http://qmin91.com/file/dW1e3oxy57eec998475cb*/

		/*
			<Popover
				placement="bottom"
		    	title={content1} content={content}
		    	trigger={['click']}>
				<a href="#">
			      	<span
			       	 className="avatar"
			       	 style={{backgroundImage: 'url("https://zos.alipayobjects.com/rmsportal/iXsgowFDTJtGpZM.png")'}} />
		          	<span className="text">{REGARDS()}胡永刚</span>
		          	{' '}
		          	<Icon type="down" className="x-icon"/>
			    </a>
			</Popover>*/

		return (
			<Dropdown
		    	overlay={overlay}
		    	trigger={['click']}>
				<a href="#">
			      	<span
			       	 className="avatar"
			       	 style={{backgroundImage: 'url("https://zos.alipayobjects.com/rmsportal/iXsgowFDTJtGpZM.png")'}} />
		          	<span className="text">{username}</span>
		          	{' '}
		          	<Icon type="down" className="x-icon"/>
			    </a>
			</Dropdown>
		)
	}
}