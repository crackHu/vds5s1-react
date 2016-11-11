import React, {
	Component,
	PropTypes
} from 'react'
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
import {
	AS_FORM_WIDGET_CONFIG as WIDGET_CONFIG
} from 'phr_conf'

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

/*高级搜索*/
class AdvancedSearch extends Component {

	constructor(props) {
		super(props);
		this.state = {}

		/*性别*/
		this.sexOptions = WIDGET_CONFIG.selectOption.sex;
		/*常住类型 居住类型*/
		this.perTypeOptions = WIDGET_CONFIG.selectOption.permanentType;
		/*档案状态*/
		this.arcStatusOptions = WIDGET_CONFIG.selectOption.archiveStatus;
		/*档案类型（所属专档、排除专档）*/
		this.specArcTypeOptions = WIDGET_CONFIG.selectOption.specArcType;
		/*所属居委类型*/
		this.jwcmcTypeOptions = WIDGET_CONFIG.selectOption.jwcmcType;
		/*所属街道*/
		this.streetTypeOptions = WIDGET_CONFIG.selectOption.streetType;
	}

	getSelectOptions = (data) => {
		if (data) {
			return data.map((item, i) => {
				return <Option key={i}>{item.value}</Option>
			})
		}
	}

	/*modal event*/
	handleOk = (e) => {
		e.preventDefault();
		console.log('点了确认')
		console.log(this.props.form.getFieldsValue())
		this.props.sendSearchCondition(this.props.form.getFieldsValue());
		this.setState({
			modalLoading: true,
		});
		setTimeout(() => {
			this.setState({
				modalLoading: false,
			});
			this.props.switchModalVisible(false)
		}, 1500);
	}

	handleCancel = (e) => {
		console.log('点了取消')
		this.props.switchModalVisible(false)
	}

	/*range date change*/
	onChange = (dates, dateStrings) => {
		console.log(dates, dateStrings)
		console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	componentDidUpdate = () => {}

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
		const {
			getFieldDecorator
		} = this.props.form

		return (
			<div>
				<Modal title="档案查询" width={760} visible={this.props.modalVisible} maskClosable={false}
			      onCancel={this.handleCancel} onOk={this.handleOk} confirmLoading={this.state.modalLoading}
			      footer={[
		            <Button key="back" type="ghost" size="large" icon="rollback" onClick={this.handleCancel}>
		            	关 闭
		            </Button>,
		            <Button key="submit" type="primary" size="large" icon="search" onClick={this.handleOk} loading={this.state.modalLoading}>
		             	查 询
		            </Button>,
		          ]}>
          			<Form horizontal className="ant-advanced-search-form">
						<Row>
							<Col sm={16}>
								<FormItem label="个人编号"
						          labelCol={{ sm: 3 }}
						          wrapperCol={{ sm: 20 }}
						        >
					        	{getFieldDecorator('grbh')(
											<Input />
										)}
						        </FormItem>
					        </Col>
					        <Col sm={8}>
								<FormItem label="姓&nbsp;&nbsp;&nbsp;&nbsp;名"
						          {...formItemLayout}
						        >
						        {getFieldDecorator('grda_xm')(
											<Input />
										)}
						        </FormItem>
					        </Col>
				        </Row>
				        <Row>
				        	<Col sm={16}>
				        		<FormItem label="出生时间" 
				        		  {...formDatePeriodLayout}
						        >
						        {getFieldDecorator('grda_csrq')(
									    <RangePicker
									     showTime
									     format="YYYY/MM/DD HH:mm:ss"
									     onChange={this.onChange} />
								     )}
						        </FormItem>
				        	</Col>
				        	<Col sm={8}>
				        		<FormItem label="性&nbsp;&nbsp;&nbsp;&nbsp;别"
						          {...formItemLayout}
				        		>
				        		{getFieldDecorator('grda_xb')(
									    <Select>
							       		{this.getSelectOptions(this.sexOptions)}
										  </Select>
								     )}
						        </FormItem>
				        	</Col>
				        </Row>
				        <Row>
				        	<Col sm={16}>
				        		<FormItem label="建档日期"
				        		  {...formDatePeriodLayout}
				        		>
				        		{getFieldDecorator('grda_jdrq')(
						          	<RangePicker
								     showTime
								     format="YYYY-MM-DD HH:mm:ss"
								     onChange={this.onChange} />
								     )}
						        </FormItem>
				        	</Col>
				        	<Col sm={8}>
								<FormItem label="建档人"
				        		  {...formItemLayout}
				        		>
						         {getFieldDecorator('grda_jdys')(
											<Input />
										)}
						        </FormItem>
				        	</Col>
				        </Row>
				        <Row>
				        	<Col sm={16}>
				        		<FormItem label="录入日期"
				        		  {...formDatePeriodLayout}
				        		>
				        		{getFieldDecorator('grda_lrrq')(
						          	<RangePicker
								     showTime
								     format="YYYY-MM-DD HH:mm:ss"
								     onChange={this.onChange} />
								     )}
						        </FormItem>
				        	</Col>
				        	<Col sm={8}>
				        		<FormItem label="录入人"
				        		  {...formItemLayout}
				        		>
					          {getFieldDecorator('grda_lrr')(
											<Input />
										)}
						        </FormItem>
				        	</Col>
				        </Row>
				        <Row>
				        	<Col sm={8}>
				        		<FormItem label="常住类型" 
						          labelCol={{ sm: 6 }}
						          wrapperCol={{ sm: 17 }}
						        >
						        {getFieldDecorator('grda_hklx')(
						          <Select>
						       			{this.getSelectOptions(this.perTypeOptions)}
									  	</Select>
								  	)}
						        </FormItem>
				        	</Col>
							<Col sm={8}>
								<FormItem label="档案状态"
						          labelCol={{ sm: 6 }}
						          wrapperCol={{ sm: 17 }}
						        >
						        {getFieldDecorator('grda_dazt')(
						          <Select>
					      				{this.getSelectOptions(this.arcStatusOptions)}
								  		</Select>
								  	)}
						        </FormItem>
				        	</Col>
				        	<Col sm={8}>
				        		<FormItem label="身份证" 
						          labelCol={{ sm: 5 }}
						          wrapperCol={{ sm: 19 }}
						         >
					        	{getFieldDecorator('grda_sfzhm')(
											<Input />
										)}
						        </FormItem>
				        	</Col>
				        </Row>
				        <Row>
				        	<Col sm={12}>
						        <FormItem label="所属街道" 
						          labelCol={{ sm: 4 }}
						          wrapperCol={{ sm: 20 }}
						        >
						        {getFieldDecorator('grda_jdzmc')(
					          	<Select
					          	 multiple
					          	 placeholder="请选择" >
									  		{this.getSelectOptions(this.streetTypeOptions)}
											</Select>
										)}
						        </FormItem>
							</Col>
				        	<Col sm={12}>
						        <FormItem label="所属居委" 
						          labelCol={{ sm: 6 }}
						          wrapperCol={{ sm: 18 }}
						        >
						        {getFieldDecorator('grda_jwcmc')(
					          	<Select
					          	 multiple
					          	 placeholder="请选择" >
											  {this.getSelectOptions(this.jwcmcTypeOptions)}
											</Select>
										)}
						        </FormItem>
							</Col>
				        </Row>
				        <Row>
							<Col sm={12}>
								<FormItem label="所属专档"
						          labelCol={{ sm: 4 }}
						          wrapperCol={{ sm: 20 }}
						        >
						        {getFieldDecorator('grda_sszd')(
					          	<Select
					          	 multiple
					          	 placeholder="请选择" >
											  {this.getSelectOptions(this.specArcTypeOptions)}
											</Select>
										)}
						        </FormItem>
				        	</Col>
				        	<Col sm={12}>
						        <FormItem label="排除专档" 
						          labelCol={{ sm: 6 }}
						          wrapperCol={{ sm: 18 }}
						        >
						        {getFieldDecorator('grda_pczd')(
						          <Select multiple placeholder="请选择" >
										  	{this.getSelectOptions(this.specArcTypeOptions)}
											</Select>
										)}
						        </FormItem>
							</Col>
				        </Row>
				        <Row>
				        	<Col sm={24}>
						        <FormItem label="重复档案" 
						          labelCol={{ sm: 2 }}
						          wrapperCol={{ sm: 22 }}
						        >
						        {getFieldDecorator('grda_cfda')(
					          	<Select
					          	 multiple
					          	 placeholder="请选择" >
											  {this.getSelectOptions(this.specArcTypeOptions)}
											</Select>
										)}
						        </FormItem>
							</Col>
				        </Row>
					</Form>
		        </Modal>
			</div>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("AdvancedSearch onFieldsChange", fields)
	props.onFieldsChange({
		fields
	});
}

function mapPropsToFields(props) {
	console.log("AdvancedSearch mapPropsToFields", props)
	return props.fields;
}

export default Form.create({
	onFieldsChange,
	mapPropsToFields
})(AdvancedSearch)