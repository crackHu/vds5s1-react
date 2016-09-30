import React, {
	Component,
	PropTypes
} from 'react'
import {
	Form,
	Input,
} from 'antd'

const FormItem = Form.Item;

/*家族史与生活情况*/
class FamiLivelHistoryFrom extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount = () => {}

	componentDidMount = () => {}

	render() {
		const {
			getFieldDecorator
		} = this.props.form

		return (
			<p>FamiLivelHistoryFrom1</p>
		)
	}
}

function onFieldsChange(props, fields) {
	console.log("FamiLivelHistoryFrom onFieldsChange")
}

function mapPropsToFields(props) {
	console.log("FamiLivelHistoryFrom mapPropsToFields")
}

export default Form.create()(FamiLivelHistoryFrom)