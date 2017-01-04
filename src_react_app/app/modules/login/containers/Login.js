import React, {
	PropTypes
} from 'react'
import {
	connect
} from 'react-redux';
import {
	Form,
	Input,
	Button,
	Checkbox,
	Radio,
	Tooltip,
	Icon,
	Row,
	Col
} from 'antd';

import Immutable from 'immutable';
import * as LoginAction from '../LoginAction'
import {
	CONFIG
} from 'login_conf'
import {
	msg,
	notify,
	setCookie,
} from 'utils'

//require('../../../assets/scss/public.scss')
import 'app_base/assets/scss/public.scss'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const USR = CONFIG.LS.USR
const UID = CONFIG.LS.UID
const LOGINTIME = CONFIG.LS.LOGINTIME
const LOGGEDIN = CONFIG.LS.LOGGEDIN

class Login extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: false
		}
		this.username = undefined
		this.timestamp = Date.now()
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	componentWillUpdate = () => {
		console.log('componentWillUpdate')
	}

	componentWillReceiveProps = (nextProps) => {
		console.log('componentWillReceiveProps nextProps:', nextProps)
		this.setState({
			loading: false
		})
	}

	componentDidUpdate = (prevProps, prevState) => {
		console.log('componentDidUpdate prevProps prevState', prevProps, prevState)

		const result = this.props.logged.result
		if (result != null) {
			const status = result.status
			const dout = result.dout
			if (status != null && status.timestamp != this.timestamp) {
				this.timestamp = status.timestamp
				const resultCode = status.resultCode
				const resultMsg = status.resultMsg
				if (resultCode == 0) {
					localStorage.setItem(LOGGEDIN, 1)
					localStorage.setItem(UID, dout.uid ? dout.uid : '')
					setCookie('uid', dout.uid ? dout.uid : '')
					localStorage.setItem(LOGINTIME, JSON.stringify(Date.now()))
					delete dout.uid
					localStorage.setItem(USR, JSON.stringify(dout))
					location.reload()
				}
			}
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const fieldsValue = this.props.form.getFieldsValue()
		this.username = fieldsValue.usr
		console.log('Received values of form:', fieldsValue);
		this.setState({
			loading: true
		})
		this.props.login(fieldsValue)
	}

	render() {

		const {
			getFieldDecorator
		} = this.props.form;

		const formItemLayout = {
			labelCol: {
				xs: 10,
				sm: 10,
				md: 10,
			},
			wrapperCol: {
				xs: 10,
				sm: 6,
				md: 4,
			},
		};
		const buttonItemLayout = {
			wrapperCol: {
				xs: {
					span: 10,
					offset: 10
				},
				sm: {
					span: 6,
					offset: 10
				},
				md: {
					span: 4,
					offset: 10
				}
			}
		}

		return (
			<div style={{paddingTop: '30vh'}}>
				<img
				 src={require('../../../assets/img/logo2.png')}
				 style={{margin: "0 0 1.5em 41vw"}}
				/>
				<Form horizontal onSubmit={this.handleSubmit}>
			        <FormItem
			          {...formItemLayout}
			          label="账&nbsp;&nbsp;号"
			        >
			          {getFieldDecorator('usr')(
			            <Input placeholder="请输入账号" />
			          )}
			        </FormItem>
			        <FormItem
		          		{...formItemLayout}
		          		label="密&nbsp;&nbsp;码"
						extra = "一周之内自动登录"
			        >
			          {getFieldDecorator('pwd')(
			            <Input type="password" placeholder="请输入密码" />
			          )}
			        </FormItem>

			        <FormItem
			         {...buttonItemLayout}
			         style={{ marginTop: 24 }}>
			          <Button
			           loading={this.state.loading}
			           type="primary"
			           htmlType="submit">登录</Button>
			        </FormItem>
			    </Form>
		    </div>
		)
	}
}

Login.PropTypes = {
	login: PropTypes.func.isRequired,
	logged: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
	console.log('Login.mapStateToProps:', state)
	return {
		logged: state.login
	}
}

export default Form.create()(connect(mapStateToProps, LoginAction)(Login))