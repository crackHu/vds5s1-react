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
	ARC_TYPE_CONFIG
} from 'phr_conf'

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

		const tabpane = (
			<Tabs defaultActiveKey = {this.arcType[1].sub[0].key}>
			    {
			    	this.arcType[1].sub.map((arc, index) => {
			    		let Container = require(`../${arc.content}`).default
						return (
						    <TabPane tab={arc.name} key={arc.key}>
								<Container
									fields={this.props.fields}
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
					<HealthMedicalTable/>
				</div>
				<div>
					{tabpane}
				</div>
			</div>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("HealthMedicalForm onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("HealthMedicalForm mapPropsToFields")
}

export default Form.create()(HealthMedicalForm)