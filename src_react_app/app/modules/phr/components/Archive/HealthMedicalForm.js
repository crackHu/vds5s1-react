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
	PERSONALDETAIL_FIELDS_CONFIG as FIELDS,
	ARC_TYPE_CONFIG
} from 'phr_conf'
import * as AppActions from 'AppActions'
import * as PHRAction from 'phr/PHRAction'

import HealthMedicalTable from './HealthMedicalTable'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const FNAME = FIELDS.name

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
			onFieldsChangeByKey
		} = this.props
		const {
			getFieldDecorator
		} = this.props.form
		const {
			grdaJkzk,
			grdaJkjl,
			grdaZyyyqk,
			grdaFmyjzs,
			grdaZyzlqk,
		} = this.props.phr[FNAME]

		let fields = {}
		for (let key in grdaJkzk) {
			fields = grdaJkzk[key]
			break
		}
		const tabpane = (
			<Tabs defaultActiveKey = {this.arcType[1].sub[0].key}>
			    {

			    	this.arcType[1].sub.map((arc, index) => {
			    		let Container = require(`../${arc.content}`).default
						return (
						    <TabPane tab={arc.name} key={arc.key}>
								<Container
									fields={fields}
									grdaZyyyqkFields={grdaZyyyqk}
									grdaFmyjzsFields={grdaFmyjzs}
									grdaZyzlqkFields={grdaZyzlqk}
									
									onFieldsChange={onFieldsChangeByKey}
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
					 fields={grdaJkjl}
					 onFieldsChange={onFieldsChangeByKey}
					/>
				</div>
				<div>
					{tabpane}
				</div>
			</div>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("HealthMedicalForm onFieldsChange", props, fields)
		/*props.onFieldsChange({
			fields
		}, 'grdaJkzk');*/
}

function mapPropsToFields(props) {
	console.log("HealthMedicalForm mapPropsToFields", props)
	return props.phr[FNAME].grdaJkzk || {}
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
	...PHRAction,
	...AppActions,
})(HealthMedicalForm)