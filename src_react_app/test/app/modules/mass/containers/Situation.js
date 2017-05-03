import React, {
	Component,
	PropTypes
} from 'react'
import { Card } from 'antd'
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux'

import { querySituation } from '../index'
import CrudTable from 'app_base/components/CrudTable'
import { CrudTable as table_config } from '../config/situation_config'

@connect(
	state => ({
		data: state.mass,
	}), {
		querySituation
	}
)
export default class Situation extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	componentDidMount = () => {
		NProgress.done();
	}

	render() {
		return (
			<QueueAnim delay={10}>
				<div className='module' key ="situation">
					<Card title="发送情况">
						<CrudTable
							data={this.props.data.situation_list}
							config={table_config}
							select={this.props.querySituation}
						/>
					</Card>
				</div>
			</QueueAnim>
		)
	}
}
