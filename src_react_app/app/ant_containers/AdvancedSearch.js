import React from 'react'
import {
	Form,
	Input,
	DatePicker,
	Select,
	Row,
	Col,
	Modal,
	Button
} from 'antd'

export default class AdvancedSearch extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			born: {
				startValue: "2011-09-13 16:14:33",
				endValue: "2011-09-13 16:14:33",
				endOpen: false,
			},
			build: {
				startValue: null,
				endValue: null,
				endOpen: false,
			},
			entry: {
				startValue: null,
				endValue: null,
				endOpen: false,
			}
		}

		/*出生时间选择事件*/
		this.disabledStartDate_born = (startValue) => {
			if (!startValue || !this.state.born.endValue) {
				return false;
			}
			return startValue.getTime() >= this.state.born.endValue.getTime();
		}
		this.disabledEndDate_born = (endValue) => {
			if (!endValue || !this.state.born.startValue) {
				return false;
			}
			return endValue.getTime() <= this.state.born.startValue.getTime();
		}
		this.onChange_born = (field, value) => {
			console.log(field, 'change', value);
			/*this.setState({
				born: {
					[field]: value,
				}
			});*/

			console.log(this.state.born.endValue)
			this.setState({
				born: {
					endOpen: true,
					endValue: "asdfsd",
					startValue: "2016-09-13 16:14:33"
				},
				/*born: Object.assign({}, this.state.born, {
					startValue: "2016-09-13 16:14:33"
				})*/
			}, () => {
				console.log(this.state.born)
			});
		}
		this.onStartChange_born = (value) => {
			this.onChange_born('startValue', value);
			console.log(this.state.born)
		}
		this.onEndChange_born = (value) => {
			this.onChange_born('endValue', value);
		}
		this.handleStartToggle_born = ({
			open
		}) => {
			if (!open) {
				this.setState({
					born: {
						endOpen: true
					}
				});
			}
		}
		this.handleEndToggle_born = ({
			open
		}) => {
			this.setState({
				born: {
					endOpen: open
				}
			});
		}

		console.log("send")
		setTimeout(
			() => {
				this.props.searchCondition("message from son")
			}, 2000)
	}

	componentDidMount() {
		console.log(this.state.born)
	}

	componentDidUpdate = () => {
		console.log(this.state.born)
	}

	render() {
		const FormItem = Form.Item;
		const formItemLayout = {
			labelCol: {
				sm: 5
			},
			wrapperCol: {
				sm: 19
			},
		};
		const formDatePeriodLayout = {
			labelCol: {
				sm: 3
			},
			wrapperCol: {
				sm: 21
			},
		};

		return (
			<Form horizontal className="ant-advanced-search-form">
				<Row>
					<Col sm={16}>
						<FormItem label="个人编号"
				          labelCol={{ sm: 3 }}
				          wrapperCol={{ sm: 20 }}
				        >
				          <Input/>
				        </FormItem>
			        </Col>
			        <Col sm={8}>
						<FormItem label="姓&nbsp;&nbsp;&nbsp;&nbsp;名"
				          {...formItemLayout}
				        >
				          <Input />
				        </FormItem>
			        </Col>
		        </Row>
		        <Row>
		        	<Col sm={16}>
		        		<FormItem label="出生时间" 
		        		  {...formDatePeriodLayout}
				        >
				          	<DatePicker
					          disabledDate={this.disabledStartDate_born}
					          showTime
					          format="yyyy-MM-dd HH:mm:ss"
					          value={this.state.born.startValue}
					          placeholder="开始日期"
					          onChange={this.onStartChange_born}
					          toggleOpen={this.handleStartToggle_born}
					        />
					        {' '}至{' '}
					        <DatePicker
					          disabledDate={this.disabledEndDate_born}
					          showTime
					          format="yyyy-MM-dd HH:mm:ss"
					          value={this.state.born.endValue}
					          placeholder="结束日期"
					          onChange={this.onEndChange_born}
					          open={this.state.born.endOpen}
					          toggleOpen={this.handleEndToggle_born}
						    />
				        </FormItem>
		        	</Col>
		        	<Col sm={8}>
		        		<FormItem label="性&nbsp;&nbsp;&nbsp;&nbsp;别"
				          {...formItemLayout}
		        		>
				          <Select defaultValue="male">
						      <Option value="male">男</Option>
						      <Option value="female">女</Option>
						    </Select>
				        </FormItem>
		        	</Col>
		        </Row>
		        <Row>
		        	<Col sm={8}>
		        		<FormItem label="常住类型" 
				          labelCol={{ sm: 6 }}
				          wrapperCol={{ sm: 18 }}
				        >
				          <Select>
						      <Option value="phone">户籍（辖区）</Option>
						    </Select>
				        </FormItem>
		        	</Col>
		        	<Col sm={16}>
		        		<FormItem label="身份证号" 
				          labelCol={{ sm: 6 }}
				          wrapperCol={{ sm: 18 }}
				         >
			        		<Input />
				        </FormItem>
		        	</Col>
		        </Row>
		        <Row>
		        	<Col sm={16}>
		        		<FormItem label="建档日期"
		        		  {...formDatePeriodLayout}
		        		>
				          	<DatePicker
					          disabledDate={this.disabledStartDate}
					          showTime
					          format="yyyy-MM-dd HH:mm:ss"
					          value={this.state.startValue}
					          placeholder="开始日期"
					          onChange={this.onStartChange}
					          toggleOpen={this.handleStartToggle}
					        />
					        {' '}至{' '}
					        <DatePicker
					          disabledDate={this.disabledEndDate}
					          showTime
					          format="yyyy-MM-dd HH:mm:ss"
					          value={this.state.endValue}
					          placeholder="结束日期"
					          onChange={this.onEndChange}
					          open={this.state.endOpen}
					          toggleOpen={this.handleEndToggle}
						    />
				        </FormItem>
		        	</Col>
		        	<Col sm={8}>
						<FormItem label="建档人"
		        		  {...formItemLayout}
		        		>
				          <Input />
				        </FormItem>
		        	</Col>
		        </Row>
		        <Row>
		        	<Col sm={16}>
		        		<FormItem label="录入日期"
		        		  {...formDatePeriodLayout}
		        		>
				          	<DatePicker
					          disabledDate={this.disabledStartDate}
					          showTime
					          format="yyyy-MM-dd HH:mm:ss"
					          value={this.state.startValue}
					          placeholder="开始日期"
					          onChange={this.onStartChange}
					          toggleOpen={this.handleStartToggle}
					        />
					        {' '}至{' '}
					        <DatePicker
					          disabledDate={this.disabledEndDate}
					          showTime
					          format="yyyy-MM-dd HH:mm:ss"
					          value={this.state.endValue}
					          placeholder="结束日期"
					          onChange={this.onEndChange}
					          open={this.state.endOpen}
					          toggleOpen={this.handleEndToggle}
						    />
				        </FormItem>
		        	</Col>
		        	<Col sm={8}>
		        		<FormItem label="录入人"
		        		  {...formItemLayout}
		        		>
				          <Input />
				        </FormItem>
		        	</Col>
		        </Row>
		        <Row>
					<Col sm={8}>
						<FormItem label="档案状态"
				          labelCol={{ sm: 6 }}
				          wrapperCol={{ sm: 18 }}
				        >
				          <Select >
						      <Option value="phone">在册</Option>
						    </Select>
				        </FormItem>
		        	</Col>
		        	<Col sm={16}>
				        <FormItem label="专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;档" 
				          labelCol={{ sm: 6 }}
				          wrapperCol={{ sm: 18 }}
				        >
				          <Input />
				        </FormItem>
					</Col>
		        </Row>
			</Form>
		)
	}
}