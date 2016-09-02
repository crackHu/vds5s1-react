import React from 'react';
import ReactDOM from 'react-dom';
import {
	SplitButton,
	MenuItem,
	Glyphicon,
	Dropdown,
	Button,
	ButtonToolbar,
	Tabs,
	Tab,
	Form,
	FormControl,
	FormGroup,
	ControlLabel,
	Checkbox,
	Radio,
	Table
} from 'react-bootstrap';
import {
	DatePicker
} from 'antd'
import FieldGroup from '../components/FieldGroup';
import '../main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ArchivDetail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			"caseTableRowObj": null
		}
	}

	componentWillReceiveProps() {
		console.log("componentWillReceiveProps")
	}

	componentWillMount() {}

	componentDidMount() {}

	addCaseItmeFunc() {}

	editCaseItmeFunc() {}

	deleteCaseItmeFunc() {}

	saveCaseItmeFunc() {}

	cancelCaseItmeFunc() {}

	render() {
		return (
			<div className = "container">
				<div className = "row">
					<ButtonToolbar>
						<SplitButton bsStyle="default"  title="新建专档" id="split-button-basic">
					      <MenuItem eventKey="1">d1</MenuItem>
					      <MenuItem eventKey="2">d2</MenuItem>
					      <MenuItem eventKey="3">d3</MenuItem>
					      <MenuItem divider />
					      <MenuItem eventKey="4">d4</MenuItem>
					    </SplitButton>
					    <Button >删除转档</Button>
					    <Button >导出</Button>
					    <Button >关闭</Button>
				    </ButtonToolbar>
				    <br />
				    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
					    <Tab eventKey={1} title="个人基本信息表">
				    		<br />
							<Form inline>
								<FormGroup className="col-md-4" controlId="formInlineName" validationState="error">
								  <ControlLabel>姓名</ControlLabel>
								  {' '}
								  <FormControl type="text" value={this.props.peopleLogin}/>
								</FormGroup>

								<FormGroup className="col-md-4" controlId="formInlineEmail">
								  <ControlLabel>个人编号</ControlLabel>
								  {' '}
								  <FormControl type="text" value={this.props.peopleUrl}/>
								</FormGroup>

								<ButtonToolbar className="col-md-4">
									<Button type="submit">
									  <Glyphicon glyph="edit" /> 修改
									</Button>
									{' '}
									<Button type="submit">
									  <Glyphicon glyph="save" /> 保存
									</Button>
									{' '}
									<Button>
									  <Glyphicon glyph="remove" /> 取消
									</Button>
								</ButtonToolbar>

							 </Form>
					    </Tab>
					    <Tab eventKey={2} title="健康体检表">
				    		<br />Tab 2 content
				    	</Tab>
					</Tabs>

					<br /><br /><br />
					 <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
					    <Tab eventKey={1} title="一般情况">
					    	
							<Form inline action="#">
								{/*性别******************/}
								<br />
								<FormGroup controlId="formControlsSelect" validationState="error">
							      <ControlLabel>性别</ControlLabel>
							      {' '}
							      <FormControl componentClass="select" placeholder="sex">
									<option value="select"></option>
									<option value="select">男</option>
							        <option value="other">女</option>
							      </FormControl>
							    </FormGroup>
							    {' '}
								<FormGroup controlId="formInlineEmail" validationState="error">
									<label className="control-label">出生日期</label>
									{' '}
									<DatePicker />
								</FormGroup>
								{' '}
								<FormGroup controlId="formInlineEmail">
								  <ControlLabel>身份证号</ControlLabel>
								  {' '}
								  <FormControl type="text"/>
								</FormGroup>
								{' '}
								<FormGroup controlId="formInlineEmail">
								  <ControlLabel>工作单位</ControlLabel>
							      {' '}
							      <FormControl componentClass="select" placeholder="sex">
									<option value="select">北京市海淀区西北旺东路10号院百度科技园1号楼</option>
							      </FormControl>
								</FormGroup>
								{/*现住址******************/}
								<br /><br />
							     <ControlLabel className="mandatory">&nbsp;&nbsp;&nbsp;现住址：</ControlLabel>
								<FormGroup controlId="formControlsSelect">
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广州市</option>
							        <option value="other">东莞市</option>
							      </FormControl>
							     	<ControlLabel>&nbsp;市&nbsp;</ControlLabel>
							    </FormGroup>
								<FormGroup controlId="formControlsSelect">
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广州市</option>
							        <option value="other">东莞市</option>
							      </FormControl>
							     	<ControlLabel>&nbsp;区（县）&nbsp;</ControlLabel>
							    </FormGroup>
								<FormGroup controlId="formControlsSelect">
							   		&nbsp;
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广州市</option>
							        <option value="other">东莞市</option>
							      </FormControl>
							     	<ControlLabel>&nbsp;街（镇）&nbsp;</ControlLabel>
							    </FormGroup>
								<FormGroup controlId="formControlsSelect">
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广州市</option>
							        <option value="other">东莞市</option>
							      </FormControl>
							     	<ControlLabel>&nbsp;居委（村）&nbsp;</ControlLabel>
							    </FormGroup>
								<FormGroup controlId="formControlsSelect">
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广州市</option>
							        <option value="other">东莞市</option>
							      </FormControl>
							     	<ControlLabel>&nbsp;路（街）&nbsp;</ControlLabel>
								  <FormControl type="text"/>
							    </FormGroup>
								{/*户籍地址******************/}
								<br /><br />
								<ControlLabel className="mandatory">户籍地址：</ControlLabel>
								<FormGroup controlId="formControlsSelect">
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广东省</option>
							      </FormControl>
							      <ControlLabel>&nbsp;省&nbsp;</ControlLabel>
							    </FormGroup>
							    <FormGroup controlId="formControlsSelect">
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广州市</option>
							      </FormControl>
							      <ControlLabel>&nbsp;市&nbsp;</ControlLabel>
							    </FormGroup>
							    <FormGroup controlId="formControlsSelect">
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">天河区</option>
							      </FormControl>
							      <ControlLabel>&nbsp;区（县）&nbsp;</ControlLabel>
							     </FormGroup>
							    <FormGroup controlId="formControlsSelect">
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">大东街</option>
							      </FormControl>
							      <ControlLabel>&nbsp;街（镇）&nbsp;</ControlLabel>
							     </FormGroup>
							     <FormGroup controlId="formControlsSelect">
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">棠下</option>
							      </FormControl>
							      <ControlLabel>&nbsp;居委（村）&nbsp;</ControlLabel>
							     </FormGroup>
							     <FormGroup controlId="formControlsSelect">
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">胡岗新街</option>
							      </FormControl>
							       <ControlLabel>&nbsp;路（街）&nbsp;</ControlLabel>
								  <FormControl type="text"/>
							    </FormGroup>
								{/*本人电话******************/}
								<br /><br />
								<FormGroup controlId="formControlsSelect">
							      <ControlLabel>本人电话&nbsp;</ControlLabel>
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">18814141114</option>
							      </FormControl>
							    </FormGroup>
								<FormGroup controlId="formControlsSelect">
							      <ControlLabel>&nbsp;联系人姓名&nbsp;</ControlLabel>
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广州市</option>
							      </FormControl>
							    </FormGroup>
								<FormGroup controlId="formControlsSelect">
							      <ControlLabel>&nbsp;联系人电话&nbsp;</ControlLabel>
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广州市</option>
							      </FormControl>
							    </FormGroup>
								<FormGroup controlId="formControlsSelect">
							      <ControlLabel>&nbsp;常驻类型&nbsp;</ControlLabel>
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广州市</option>
							      </FormControl>
							    </FormGroup>
								<FormGroup controlId="formControlsSelect">
							      <ControlLabel>&nbsp;民族&nbsp;</ControlLabel>
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广州市</option>
							      </FormControl>
								  <FormControl type="text"/>
							    </FormGroup>
								{/*血型******************/}
								<br /><br />
								<FormGroup controlId="formControlsSelect">
							      <ControlLabel>
							      	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							      	血型
							      	&nbsp;
							      </ControlLabel>
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">A型</option>
							      </FormControl>
							    </FormGroup>
								<FormGroup controlId="formControlsSelect">
							      <ControlLabel>&nbsp;RH阴性&nbsp;</ControlLabel>
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">是</option>
							      </FormControl>
							    </FormGroup>
								<FormGroup controlId="formControlsSelect">
							      <ControlLabel>&nbsp;文化程度&nbsp;</ControlLabel>
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广州市</option>
							      </FormControl>
							    </FormGroup>
								<FormGroup controlId="formControlsSelect">
							      <ControlLabel>&nbsp;职业&nbsp;</ControlLabel>
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">商业服务人员</option>
							      </FormControl>
							    </FormGroup>
								<FormGroup controlId="formControlsSelect">
							      <ControlLabel>&nbsp;婚姻状况&nbsp;</ControlLabel>
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">已婚</option>
							      </FormControl>
							    </FormGroup>
								{/*医疗费用支付方式******************/}
								<br /><br />
								<FormGroup controlId="formControlsSelect">
							      <ControlLabel>医疗费用支付方式&nbsp;&nbsp;</ControlLabel>
									  <Checkbox inline>
										城镇职工基本医疗保险
									  </Checkbox>
									  {' '}
									  <Checkbox inline>
										城镇居民基本医疗保险
									  </Checkbox>
									  {' '}
									  <Checkbox inline>
										新型农村合作医疗
									  </Checkbox>
									  {' '}
									  <Checkbox inline>
										新型农村合作医疗
									  </Checkbox>
									  {' '}
									  <Checkbox inline>
										新型农村合作医疗
									  </Checkbox>
									  {' '}
									  <Checkbox inline>
										其他
									  </Checkbox>
									  {' '}
								  	  <FormControl type="text"/>
							    </FormGroup>
								{/*药物过敏史******************/}
								<br /><br />
								<FormGroup controlId="formControlsSelect">
							      <ControlLabel>药物过敏史&nbsp;&nbsp;</ControlLabel>
									  <Radio inline checked readOnly name="test">
										无
									  </Radio>
									  {' '}
									  <Radio inline name="test">
										有
									  </Radio>
									  {' '}
									  <Checkbox inline disabled>
										肾上腺素
									  </Checkbox>
									  {' '}
									  <Checkbox inline disabled>
										肾上腺素
									  </Checkbox>
									  {' '}
									  <Checkbox inline disabled>
										肾上腺素
									  </Checkbox>
									  {' '}
									  <Checkbox inline disabled>
										其他
									  </Checkbox>
									  {' '}
								  	  <FormControl type="text" disabled/>
							    </FormGroup>
							    <FormGroup controlId="formControlsSelect">
							      <ControlLabel>&nbsp;&nbsp;&nbsp;&nbsp;暴露史&nbsp;&nbsp;</ControlLabel>
									  <Radio inline name="test1">
										无
									  </Radio>
									  {' '}
									  <Radio inline name="test1">
										有：化学品
									  </Radio>
									  {' '}
									  <Checkbox inline >
										毒物
									  </Checkbox>
									  {' '}
									  <Checkbox inline disabled>
										射线
									  </Checkbox>
							    </FormGroup>
								{/*档案状态******************/}
								<br /><br />
								<FormGroup controlId="formControlsSelect">
							      <ControlLabel>档案状态&nbsp;</ControlLabel>
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">在册</option>
							      </FormControl>
							    </FormGroup>
								<FormGroup controlId="formControlsSelect">
							      <ControlLabel>&nbsp;建档人&nbsp;</ControlLabel>
							      <FormControl type="text"/>
							    </FormGroup>
								<FormGroup controlId="formControlsSelect">
							      <ControlLabel>&nbsp;建档日期&nbsp;</ControlLabel>
							      <DatePicker />
							    </FormGroup>
								<FormGroup controlId="formControlsSelect">
							      <ControlLabel>&nbsp;录入人&nbsp;</ControlLabel>
							      <FormControl type="text"/>
							    </FormGroup>
								<FormGroup controlId="formControlsSelect">
							      <ControlLabel>&nbsp;录入日期&nbsp;</ControlLabel>
							      <DatePicker />
							    </FormGroup>
								{/*既往史******************/}
								<br /><br /><br />
								<FormGroup controlId="formControlsSelect">
							      <ControlLabel>既往史&nbsp;</ControlLabel>
							    </FormGroup>
								
						        <div className="pull-right">
								    <Button bsStyle="link" onClick={this.addCaseItmeFunc.bind(this)}>
								    	<Glyphicon glyph="plus" /> 增加
								    </Button>
								    <Button bsStyle="link" onClick={this.editCaseItmeFunc.bind(this)}>
								    	<Glyphicon glyph="chevron-up" /> 修改
								    </Button>
								    <Button bsStyle="link" onClick={this.deleteCaseItmeFunc.bind(this)}>
								    	<Glyphicon glyph="ban-circle" /> 删除
								    </Button>
								    <Button bsStyle="link" onClick={this.saveCaseItmeFunc.bind(this)} disabled>
								    	<Glyphicon glyph="save" /> 保存
								    </Button>
								    <Button bsStyle="link" onClick={this.cancelCaseItmeFunc.bind(this)} disabled>
								    	<Glyphicon glyph="remove" /> 取消
								    </Button>
							    </div>
								<Table striped bordered condensed hover ref="caseTable">
								    <thead>
								      <tr>
								        <th>类别</th>
								        <th>疾病名称</th>
								        <th>确诊时间</th>
								        <th>备注</th>
								      </tr>
								    </thead>
								    <tbody>
								      <tr>
								        <td>
									  	  <FormControl type="text"/>
									  	</td>
								        <td>
									  	  <FormControl type="text"/>
									  	</td>
								        <td>
									  	  <DatePicker />
									  	</td>
								        <td>
									  	  <FormControl type="text"/>
									  	</td>
								      </tr>
								    </tbody>
								  </Table>

							 </Form>
					    </Tab>
					    <Tab eventKey={2} title="家族史与生活情况">
					    	Tab 2 content
					    </Tab>
					  </Tabs>

				</div>
			</div>
		)
	};
}