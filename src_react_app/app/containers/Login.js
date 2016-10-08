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

import * as ArchiveActions from '../actions/ArchiveActions'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class Login extends React.Component {

	componentWillMount = () => {}

	componentDidMount = () => {}

	componentDidUpdate = () => {
		console.log("data,,,,,,,", this.props.data.archive.data)
			//this.props.route.login(this.props.data.archive.data)
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('Received values of form:', this.props.form.getFieldsValue());
		this.props.login(this.props.form.getFieldsValue())
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
			<div style={{marginTop: '30vh'}}>
				<img
				 src={require('../assets/img/logo2.png')}
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
			          {getFieldDecorator('pass', { initialValue: '123456' })(
			            <Input type="password" placeholder="请输入密码" />
			          )}
			        </FormItem>

			        <FormItem
			         {...buttonItemLayout}
			         style={{ marginTop: 24 }}>
			          <Button type="primary" htmlType="submit">登陆</Button>
			        </FormItem>
			    </Form>
		    </div>
		)
	}
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
	return {
		data: state
	}
}

export default connect(mapStateToProps, ArchiveActions)(Form.create()(Login))