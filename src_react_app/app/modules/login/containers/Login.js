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

import * as LoginAction from '../LoginAction'
import {
	CONFIG
} from 'login_conf'
import {
	msg,
	notify,
} from 'utils'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const USR = CONFIG.LS.USR
const LOGGEDIN = CONFIG.LS.LOGGEDIN

class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
		this.loading = false
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

		this.loading = false
		console.log('componentDidUpdate prevProps prevState', prevProps, prevState)
		const result = this.props.data.login.result
		if (result != null && result.status != null && result.status.timestamp != this.timestamp) {

			this.timestamp = result.status.timestamp
			const status = result.status
			const resultCode = status.resultCode
			const resultMsg = status.resultMsg
			console.log(JSON.stringify(status))
			if (resultCode == 0) {
				localStorage.setItem(LOGGEDIN, 1)
				localStorage.setItem(USR, this.username)

				//this.context.router.replace('/ant1');
				location.reload()
			} else {
				notify('error', '错误', resultMsg, 2);
			}
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const fieldsValue = this.props.form.getFieldsValue()
		this.username = fieldsValue.usr
		console.log('Received values of form:', fieldsValue);
		this.loading = true
		this.setState({
			loading: true
		})
		this.props.login(fieldsValue)
	}

	render() {

		const result = this.props.data.login.result
		console.log(result)

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
			          {getFieldDecorator('usr', { initialValue: 'lweihua' })(
			            <Input placeholder="请输入账号" />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="密&nbsp;&nbsp;码"
			        >
			          {getFieldDecorator('pwd', { initialValue: '123456' })(
			            <Input type="password" placeholder="请输入密码" />
			          )}
			        </FormItem>

			        <FormItem
			         {...buttonItemLayout}
			         style={{ marginTop: 24 }}>
			          <Button
			           loading={this.state.loading}
			           type="primary"
			           htmlType="submit">登陆</Button>
			        </FormItem>
			    </Form>
		    </div>
		)
	}
}

Login.PropTypes = {
	login: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
}

Login.contextTypes = {
	router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		data: state
	}
}

export default Form.create()(connect(mapStateToProps, LoginAction)(Login))