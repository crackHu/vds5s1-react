import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
	Tabs,
	DatePicker
} from 'antd'
import {
	connect
} from 'react-redux';
import {
	ARC_TYPE_CONFIG
} from 'phr_conf'
import * as PHRAction from 'phr/PHRAction'

import HealthMedicalTable from './HealthMedicalTable'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

/*健康体检表*/
class HealthMedicalForm extends React.Component {

	constructor(props) {
		super(props);
		this.arcType = ARC_TYPE_CONFIG.arcType
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	render() {

		const {
			getFieldDecorator
		} = this.props.form
		console.log('render', this.props)
		const tabpane = (
			<Tabs defaultActiveKey = {this.arcType[1].sub[0].key}>
			    {
			    	this.arcType[1].sub.map((arc, index) => {
			    		let Container = require(`../${arc.content}`).default
						return (
						    <TabPane tab={arc.name} key={arc.key}>
								<Container
									fields={this.props.grdaJkzkFields[0]}
									grdaZyyyqkFields={this.props.grdaZyyyqkFields}
									grdaFmyjzsFields={this.props.grdaFmyjzsFields}
									grdaZyzlqkFields={this.props.grdaZyzlqkFields}
									
									onFieldsChange={this.props.onFieldsChange}
								/>
							</TabPane>
						)
					})
				}
		  	</Tabs>
		)

		return (
			<div>
				{/*体检记录*/}
				<div className="dashed_border form inside">
					<HealthMedicalTable
					 fields={this.props.grdaJkzkFields[0]}
					 onFieldsChange={this.props.onFieldsChange}
					/>
				</div>
				<div>
					{tabpane}
				</div>
			</div>
		)
	}
}

function onFieldsChange(props, fields, flag) {
	console.log("HealthMedicalForm onFieldsChange", props, fields, flag)
		/*props.onFieldsChange({
			fields
		}, 'grdaJkzk');*/
}

function mapPropsToFields(props) {
	console.log("HealthMedicalForm mapPropsToFields", props)
	return props.grdaJkzkFields || {}
}

function mapStateToProps(state) {
	console.log('HealthMedicalForm mapStateToProps:', state)
	return {
		phr: state.phr
	}
}

HealthMedicalForm = Form.create({
	onFieldsChange,
	mapPropsToFields
})(HealthMedicalForm)

export default connect(mapStateToProps, {
	...PHRAction
})(HealthMedicalForm)