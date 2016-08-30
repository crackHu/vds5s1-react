import React from 'react';
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
	ControlLabel
} from 'react-bootstrap';
import {
	DateField,
	Calendar
} from 'react-date-picker'
import 'react-date-picker/index.css'

import FieldGroup from '../components/FieldGroup';

export default class ArchivDetail extends React.Component {

	constructor(props) {
		super(props);
	}

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
					    	
							<Form inline >
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
									<DateField dateFormat="YYYY-MM-DD" />
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
								<FormGroup controlId="formControlsSelect" validationState="error">
							      <ControlLabel>&nbsp;&nbsp;&nbsp;&nbsp;现住址</ControlLabel>
							      {' '}
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广州市</option>
							        <option value="other">东莞市</option>
							      </FormControl>
							    </FormGroup>
							    {' 市 '}
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广州市</option>
							        <option value="other">东莞市</option>
							      </FormControl>
							    {' 区（县） '}
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广州市</option>
							        <option value="other">东莞市</option>
							      </FormControl>
							    {' 街（镇） '}
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广州市</option>
							        <option value="other">东莞市</option>
							      </FormControl>
							    {' 居委（村） '}
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广州市</option>
							        <option value="other">东莞市</option>
							      </FormControl>
							    {' 路（街） '}
								  <FormControl type="text"/>
								{/*户籍地址******************/}
								<br /><br />
								<FormGroup controlId="formControlsSelect" validationState="error">
							      <ControlLabel>户籍地址</ControlLabel>
							      {' '}
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广东省</option>
							      </FormControl>
							    </FormGroup>
							    {' 省 '}
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广州市</option>
							      </FormControl>
							    {' 市 '}
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">天河区</option>
							      </FormControl>
							    {' 区（县） '}
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">大东街</option>
							      </FormControl>
							    {' 街（镇） '}
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">棠下</option>
							      </FormControl>
							    {' 居委（村） '}
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">胡岗新街</option>
							      </FormControl>
							    {' 路（街） '}
								  <FormControl type="text"/>
								{/*本人电话******************/}
								<br /><br />
								<FormGroup controlId="formControlsSelect" validationState="error">
							      <ControlLabel>本人电话</ControlLabel>
							      {' '}
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">18814141114</option>
							      </FormControl>
							    </FormGroup>
							    {' 省 '}
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">广州市</option>
							      </FormControl>
							    {' 市 '}
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">天河区</option>
							      </FormControl>
							    {' 区（县） '}
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">大东街</option>
							      </FormControl>
							    {' 街（镇） '}
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">棠下</option>
							      </FormControl>
							    {' 居委（村） '}
							      <FormControl componentClass="select" placeholder="province">
									<option value="select"></option>
									<option value="select">胡岗新街</option>
							      </FormControl>
							    {' 路（街） '}
								  <FormControl type="text"/>


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