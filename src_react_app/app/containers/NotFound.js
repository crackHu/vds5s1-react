import React, {
	PropTypes
} from 'react'
import {
	Select,

} from 'antd'
import {
	Link,
	IndexLink
} from 'react-router'

const Option = Select.Option;

/*404 NotFound*/
export default class NotFound extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			noneDis: false,
			otherDis: false,
		}

	}

	handleChange = (value) => {

		let noneDis, otherDis
		if (value == '无') {
			noneDis = false
			otherDis = true
		} else if (value == '') {
			noneDis = false
			otherDis = false
		} else {
			noneDis = true
			otherDis = false
		}
		this.setState({
			noneDis,
			otherDis,
		})
		console.log(`selected ${value}`);
	}

	render() {
		return (
			<div className="page-404">
				{/*<Select
					tags
					allowClear={true}
					onChange={this.handleChange}
					style={{ width: 200 }}
				>
					<Option value="jack" disabled={this.state.otherDis}>Jack</Option>
					<Option value="无" disabled={this.state.noneDis}>无</Option>
			      	<Option value="lucy" disabled={this.state.otherDis}>Lucy</Option>
			      	<Option value="disabled" disabled={this.state.otherDis}>Disabled</Option>
			      	<Option value="yiminghe" disabled={this.state.otherDis}>Yiminghe</Option>
				</Select>*/}
				<section>
					<h1>404</h1>
					<p>
						你要找的页面不存在
						<IndexLink to="/">返回首页</IndexLink>
					</p>
				</section>
			</div>
		)
	}
}