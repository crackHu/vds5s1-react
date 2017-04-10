import React, {
	Component,
	PropTypes
} from 'react'
import { Card } from 'antd'
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux'

import { queryArticle, onSelectChange } from '../index'
import CrudTable from 'app_base/components/CrudTable'
import { CrudTable as table_config } from '../config/article_config'

@connect(
	state => ({
		data: state.mass,
	}), {
		queryArticle,
    onSelectChange
	}
)
export default class Article extends Component {

	constructor(props) {
		super(props);
		this.state = {
      selectedRowKeys: [] // Check here to configure the default column
    }
	}

	componentDidMount = () => {
		NProgress.done();
	}

	componentWillReceiveProps = (nextProps) => {
	}

  onSelectChange = (selectedRowKeys, test) => {
    console.log('onSelectChange', selectedRowKeys,test)
    this.setState({ selectedRowKeys });

  }

	render() {

    const { selectedRowKeys } = this.state
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: (asf) => this.onSelectChange(asf, 'test'),
    // }

    const rowSelection = {
      selectedRowKeys: this.props.data.article_selectedRowKeys,
      onChange: (selectedRowKeys) => this.props.onSelectChange(selectedRowKeys, 'article'),
    }

		return (
			<QueueAnim delay={10}>
				<div className='module' key ="article">
					<Card title="患教列表">
						<CrudTable
              size={'small'}
              rowSelection={rowSelection}
							data={this.props.data.article_list}
							config={table_config}
							select={this.props.queryArticle}
						/>
					</Card>
				</div>
			</QueueAnim>
		)
	}
}
