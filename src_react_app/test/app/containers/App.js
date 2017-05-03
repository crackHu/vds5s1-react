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
import classNames from 'classnames';
import {
	Menu,
	Icon,
	Dropdown,
	Popover,
	Breadcrumb,
	Alert,
	Affix,
	BackTop
} from 'antd';

import HeaderNav from './layouts/HeaderNav'
import Sidebar from './layouts/Sidebar'
import UserProfile from './UserProfile'

import {
	CONFIG
} from 'login_conf'

const USR = CONFIG.LS.USR
const UID = CONFIG.LS.UID
const LOGGEDIN = CONFIG.LS.LOGGEDIN

export default class App extends React.Component {

	constructor() {
		console.log("App.constructor")
		super()
		this.state = {
			/*small screen*/
			switchClass: false
		}
	}

	componentWillMount() {
		console.log("App.componentWillMount")
		if (screen.width <= 1200) {
			this.setState({
				switchClass: true
			})
		}
	}

	componentDidMount() {
		console.log("App.componentDidMount")
	}

	componentWillUpdate() {
		console.log("App.componentWillUpdate")
	}

	componentDidUpdate() {
		console.log("App.componentDidUpdate")
	}

	componentWillReceiveProps() {
		console.log("App.componentWillReceiveProps")
	}

	componentWillUnmount() {
		console.log("App.componentWillUnmount")

		this.handleUnload()
	}

	handleUnload = () => {
		/*localStorage.removeItem(LOGGEDIN)
		localStorage.removeItem(USR)
		localStorage.removeItem(UID)*/
	}

	render() {

		var leftClass = classNames({
			'left': true,
			'fluid': this.state.switchClass
		})
		var mainClass = classNames({
			'main': true,
			'fluid': this.state.switchClass
		})
		var userClass = classNames({
			'user-profile': true,
			'fluid': this.state.switchClass
		})

		return (
			<div className="container">
			  	{/*top*/}
			  	<Affix>
			        <div className="top">
			            <div className="logo"/>
			            <HeaderNav route={this.props.children.props.route}/>
			            {/*user-profile*/}
			            <div className={userClass}>
			            	<UserProfile />
						</div>
				    </div>
			    </Affix>
		        {/*content*/}
		        <div className="content">
		        	{/*left*/}
			        <div className={leftClass}>
			        	<Sidebar route={this.props.children.props.route}/>
		            </div>
		            {/*main*/}
            		<div className={mainClass}>
		          		{this.props.children}
		          		<div className="foot">
		          			Copyright © 2016 DingMedic. All Rights Reserved
		          		</div>
			        </div>
		        </div>
		        <BackTop />
		    </div>
		)
	}
}

App.propTypes = {
	children: PropTypes.object.isRequired,
}