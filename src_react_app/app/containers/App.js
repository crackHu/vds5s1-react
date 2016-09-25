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
import HeaderNav from './frame/HeaderNav'
import Sidebar from './frame/Sidebar'

import {
	shortcut
} from '../utils/shortcut'

class App extends React.Component {

	constructor() {
		console.log("constructor")
		super()
		this.state = {
			/*small screen*/
			switchSSMode: false
		}
	}

	componentWillMount() {
		console.log("componentWillMount")
		if (screen.width <= 1200) {
			this.setState({
				switchSSMode: true
			})
		}
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

	render() {
		const SubMenu = Menu.SubMenu;
		const switchSSMode = this.state.switchSSMode
		return (
			<div className="container">
			  	{/*top*/}
		        <div className="top">
		            <div className="logo"/>
		            <HeaderNav route={this.props.children.props.route}/>
			    </div>
		        {/*content*/}
		        <div className="content">
		        	{/*left*/}
			        <div className={switchSSMode ? "left-fluid" : "left"}>
			        	<Sidebar route={this.props.children.props.route}/>
		            </div>
		            {/*main*/}
            		<div className={switchSSMode ? "main-fluid" : "main"}>
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