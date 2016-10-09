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
import {
	CONFIG
} from 'login_conf'

const USR = CONFIG.LS.USR
const DEFAULT_USR = CONFIG.DEFAULT_USR

const username = localStorage.getItem(USR) || DEFAULT_USR

/*用户简介*/
export default class UserProfile extends React.Component {

	Logout = () => {
		localStorage.removeItem('loggedIn')
		localStorage.removeItem('usr')
		location.href = '/'
	}

	render() {

		let avatarUrl = `url('${require('../assets/img/ding-medic-logo.png')}')`
		avatarUrl = `url('https://zos.alipayobjects.com/rmsportal/iXsgowFDTJtGpZM.png')`
		const regard = `${regards()}`
		const time = `${new Date()}`
		const overlay = (
			<Menu>
		    <Menu.Item key="0">
		    	<a style={{ textAlign: "center" }}>{time}</a>
		    </Menu.Item>
		    <Menu.Divider />
		    <Menu.Item key="1">
		    	<a onClick={this.Logout} style={{ textAlign: "center" }}>退出系统</a>
		    </Menu.Item>
		</Menu>
		);
		const title = () => {
			return (
				<div>
					time：{getDate()}
				</div>
			)
		}
		const content = () => {
			return (
				<div>
					<a onClick={this.Logout} style={{ textAlign: "center" }}>退出系统</a>
				</div>
			)
		}

		/*http://qmin91.com/file/dW1e3oxy57eec998475cb*/
		/*https://zos.alipayobjects.com/rmsportal/iXsgowFDTJtGpZM.png*/

		/*
			<span>{regard}</span>
				{' '}
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
				</Dropdown>*/

		return (
			<div>
				<span>{regard}</span>
				{' '}
				<Popover
					placement="bottom"
			    	title={title()} content={content()}
			    	overlayStyle={{width: '210px'}}
			    	trigger={['click']}>
					<a href="#">
				      	<span
				       	 className="avatar"
				       	 style={{backgroundImage: avatarUrl}} />
			          	<span className="text">{username}</span>
			          	{' '}
			          	<Icon type="down" className="x-icon"/>
				    </a>
				</Popover>
			</div>
		)
	}
}