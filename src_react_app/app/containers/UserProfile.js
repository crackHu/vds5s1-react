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


const DEFAULT = CONFIG.DEFAULT
const DEFAULT_USERNAME = DEFAULT.USERNAME
const DEFAULT_ROLENAME = DEFAULT.ROLENAME
const DEFAULT_DEPTNAME = DEFAULT.DEPTNAME

const USR = CONFIG.LS.USR
const user = JSON.parse(localStorage.getItem(USR))
const userName = user ? user.userName : DEFAULT_USERNAME
const roleName = user ? user.roleName : DEFAULT_ROLENAME
const deptName = user ? user.deptName : DEFAULT_DEPTNAME

/*用户简介*/
export default class UserProfile extends React.Component {

	Logout = () => {
		location.href = '/'

		//this.context.router.replace('/');
	}

	render() {

		let avatarUrl = `url('${require('../assets/img/ding-medic-logo.png')}')`
		avatarUrl = `url('https://zos.alipayobjects.com/rmsportal/iXsgowFDTJtGpZM.png')`
		const regard = `${regards()}`
		const time = `${new Date()}`
		const overlay = (
			<Menu>
		    <Menu.Item key="0">
		    	<a style={{ textAlign: "center" }}>
	          		部&nbsp;&nbsp;门：{deptName}
	          		角&nbsp;&nbsp;色：{roleName}
		    	</a>
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
				</div>
			)
		}
		const content = () => {
			return (
				<div>
	          		<p style={{textAlign: 'center'}}>部&nbsp;&nbsp;门：{deptName}</p>
	          		<p style={{textAlign: 'center'}}>角&nbsp;&nbsp;色：{roleName}</p>
	          		<div style={{height: '.5em'}} />
					<p style={{ textAlign: "right" }}>
						<a onClick={this.Logout}>退出系统</a>
					</p>
				</div>
			)
		}

		/*http://qmin91.com/file/dW1e3oxy57eec998475cb*/
		/*https://zos.alipayobjects.com/rmsportal/iXsgowFDTJtGpZM.png*/

		/*
			    	title={title()}
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
			    	content={content()}
			    	overlayStyle={{width: '200px'}}
			    	trigger={['click']}>
					<a href="#">
				      	<span
				       	 className="avatar"
				       	 style={{backgroundImage: avatarUrl}} />
			          	<span className="text">
			          		{userName}
			          	</span>
			          	{' '}
			          	<Icon type="down" className="x-icon"/>
				    </a>
				</Popover>
			</div>
		)
	}
}

UserProfile.contextTypes = {
	router: React.PropTypes.object.isRequired
}