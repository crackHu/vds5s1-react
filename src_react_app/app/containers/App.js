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
	message,
	Alert,
	Affix,
	BackTop
} from 'antd';

import fetch from 'isomorphic-fetch'
import * as AppActions from '../actions/AppActions';
import HeaderNav from './frame/HeaderNav'
import Sidebar from './frame/Sidebar'
import UserProfile from './UserProfile'

import {
	CONFIG
} from 'login_conf'
import {
	shortcut
} from '../utils/shortcut'
import moment from 'moment-timezone/moment-timezone';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const USR = CONFIG.LS.USR
const LOGGEDIN = CONFIG.LS.LOGGEDIN

class App extends React.Component {

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

		window.addEventListener('unload', this.handleUnload);
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
	}

	handleUnload = () => {
		localStorage.removeItem(LOGGEDIN)
		localStorage.removeItem(USR)
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
			        </div>
		        </div>
		        <BackTop />
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