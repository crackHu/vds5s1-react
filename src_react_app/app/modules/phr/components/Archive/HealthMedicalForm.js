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
			onFieldsChange,
			changeGrdaJkzkSelectKey
		} = this.props
		const {
			getFieldDecorator
		} = this.props.form
		const {
			updatestate
		} = this.props.phr
		const {
			grdaJkzk,
			grdaJkjl,
		} = this.props.phr[FNAME]

		let fields = {}
		let grdaZyyyqk, grdaFmyjzs, grdaZyzlqk
		let objSize = [{}],
			grdaZyyyqkObjSize, grdaFmyjzsObjSize, grdaZyzlqkObjSize
		let selectKey = grdaJkzk['selectKey']
		for (let key in grdaJkzk) {
			let grdaJkzk_value = grdaJkzk[key]
			if (selectKey == key && grdaJkzk_value.constructor == Object) {
				fields = grdaJkzk_value
				grdaZyyyqk = grdaJkzk_value['grdaZyyyqk']
				grdaFmyjzs = grdaJkzk_value['grdaFmyjzs']
				grdaZyzlqk = grdaJkzk_value['grdaZyzlqk']
				break
			}
		}

		objSize = !!grdaJkjl ? grdaJkjl.objSize : objSize
		grdaZyyyqkObjSize = !!grdaZyyyqk ? grdaZyyyqk.objSize : grdaZyyyqkObjSize
		grdaFmyjzsObjSize = !!grdaFmyjzs ? grdaFmyjzs.objSize : grdaFmyjzsObjSize
		grdaZyzlqkObjSize = !!grdaZyzlqk ? grdaZyzlqk.objSize : grdaZyzlqkObjSize

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
									
									onFieldsChange={onFieldsChange}
									grdaZyyyqkObjSize = {grdaZyyyqkObjSize}
									grdaFmyjzsObjSize = {grdaFmyjzsObjSize}
									grdaZyzlqkObjSize = {grdaZyzlqkObjSize}
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
					 onFieldsChange={onFieldsChange}
					 changeGrdaJkzkSelectKey={changeGrdaJkzkSelectKey}
					 objSize={objSize}
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

HealthMedicalForm.propTypes = {
	changeGrdaJkzkSelectKey: PropTypes.func.isRequired,
	phr: PropTypes.object.isRequired
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