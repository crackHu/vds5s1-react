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
			startValue: null,
			endValue: null,
			endOpen: false,
		}

		this.disabledStartDate = (startValue) => {
			if (!startValue || !this.state.endValue) {
				return false;
			}
			return startValue.getTime() >= this.state.endValue.getTime();
		}
		this.disabledEndDate = (endValue) => {
			if (!endValue || !this.state.startValue) {
				return false;
			}
			return endValue.getTime() <= this.state.startValue.getTime();
		}
		this.onChange = (field, value) => {
			console.log(field, 'change', value);
			this.setState({
				[field]: value,
			});
		}
		this.onStartChange = (value) => {
			this.onChange('startValue', value);
		}
		this.onEndChange = (value) => {
			this.onChange('endValue', value);
		}
		this.handleStartToggle = ({
			open
		}) => {
			if (!open) {
				this.setState({
					endOpen: true
				});
			}
		}
		this.handleEndToggle = ({
			open
		}) => {
			this.setState({
				endOpen: open
			});
		}

		console.log("send")
		setTimeout(
			() => {
				this.props.searchCondition("message from son")
			}, 2000)
	}

	componentDidMout() {}

	render() {
		const FormItem = Form.Item;

		return (
			<Form inline>
				<FormItem label="个人编号"  >
		          <Input style={{ width: 378 }}/>
		        </FormItem>
				<FormItem label="姓名"  >
		          <Input />
		        </FormItem>
		        <br /><br />
		        <FormItem label="出生时间">
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
				<FormItem label="性别" >
		          <Select defaultValue="male" style={{ width: 80 }}>
				      <Option value="male">男</Option>
				      <Option value="female">女</Option>
				    </Select>
		        </FormItem>
		        <br /><br />
		        <FormItem label="常住类型" >
		          <Select style={{ width: 180 }}>
				      <Option value="phone">户籍（辖区）</Option>
				    </Select>
		        </FormItem>
		        <FormItem label="身份证号" >
	        		<Input style={{ width: 254 }}/>
		        </FormItem>
		        <br /><br />
		        <FormItem label="建档日期">
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
				<FormItem label="建档人">
		          <Input />
		        </FormItem>
		        <br /><br />
		        <FormItem label="录入日期">
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
				<FormItem label="录入人">
		          <Input />
		        </FormItem>
		        <br />
		        <br />
		        <FormItem label="档案状态" >
		          <Select style={{ width: 150 }}>
				      <Option value="phone">在册</Option>
				    </Select>
		        </FormItem>
		        <FormItem label="专档" >
		          <Input style={{ width: 180 }}/>
		        </FormItem>
			</Form>
		)
	}
}