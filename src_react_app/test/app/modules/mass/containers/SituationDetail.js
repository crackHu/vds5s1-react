import React, {
	Component,
	PropTypes
} from 'react'
import { Card, Button, Icon } from 'antd'
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux'

import { querySituationDetail } from '../index'
import CrudTable from 'app_base/components/CrudTable'
import { CrudTable as table_config } from '../config/situationDetail_config'

@connect(
	state => ({
		data: state.mass,
	}), {
		querySituationDetail
	}
)
export default class SituationDetail extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	componentDidMount = () => {
		NProgress.done();
	}

	select = () => {
		this.props.querySituationDetail(this.props.params)
	}

	render() {

		const cardTitle = (
			<div>
				<span>任务详情</span>
				<div style={{float: 'right'}}>
					<Button type="primary" onClick={this.props.history.goBack}>
			        	<Icon type="left" />返 回
			        </Button>
		        </div>
			</div>
		)

		return (
			<QueueAnim delay={10}>
				<div className='module' key ="SituationDetail">
					<Card title={cardTitle}>
						<CrudTable
							data={this.props.data.situationDetail_list}
							config={table_config}
							select={this.select}
						/>
					</Card>
				</div>
			</QueueAnim>
		)
	}
}
