import React, {
	Component,
	PropTypes
} from 'react'
import { Card, Button, Modal, Checkbox, Steps, Icon } from 'antd'
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux'

import { queryMasss, statisticsMasss, onSelectChange, sendArticle, clearSelectChange } from '../index'
import CrudTable from 'app_base/components/CrudTable'
import { CrudTable as table_config } from '../config/masss_config'
import { AdvancedSearchForm as search_config } from '../config/masss_config'
import MasssStatistics from './MasssStatistics'
import Article from './Article'

const CheckboxGroup = Checkbox.Group;
const Step = Steps.Step;
const platformOptions = ['钉钉用户', '微信用户', '手机用户'];
const defaultCheckedList = ['钉钉用户', '微信用户'];

@connect(
	state => ({
		data: state.mass,
	}), {
		queryMasss,
		statisticsMasss,
		onSelectChange,
		sendArticle,
		clearSelectChange
	}
)
export default class Masss extends Component {

	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			checkedList: defaultCheckedList,
	    indeterminate: true,
	    checkAll: false,
	    isRefreshStat: false
		}
	}

	componentDidMount = () => {
		NProgress.done();
		// this.select()
	}

	componentWillReceiveProps = (nextProps) => {
		console.log('componentWillReceiveProps', this.props, nextProps)

		let isRefreshStat = false
		const { masss_selectedRowKeys } = nextProps.data
		if (this.props.data.masss_selectedRowKeys !== masss_selectedRowKeys) {
			isRefreshStat = true
		}
		this.setState({ isRefreshStat })
	}

	componentWillUnmount = () => {
		this.props.clearSelectChange('masss')
		this.props.clearSelectChange('article')
	}

	// modal
	showModal = () => {
    const list = this.props.data.masss_selectedRowKeys
    if (!list || list.length === 0) {
      return alert('请选择发送目标用户')
    }
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    let articleId
    try {
    	articleId = this.props.data.article_selectedRowKeys[0]
    } catch(e) {
    	return alert('请选中一篇患教')
    }
    const list = this.props.data.masss_selectedRowKeys
    if (!list || list.length === 0) {
    	return alert('请选择发送用户')
    }
    const { checkedList } = this.state
    const sendType = this.replaceSendType(checkedList)
    if (!sendType || sendType.length === 0) {
    	return alert('请选中发送用户类型')
    }
    this.props.sendArticle({ articleId, list, sendType })
  }
  replaceSendType = (checkedList) => {
  	// ['钉钉用户', '微信用户', '手机用户'
  	return checkedList.map((checked) => {
  		switch (checked) {
  			case '钉钉用户':
  				return 'ding'
  			case '微信用户':
  				return 'wechat'
  			case '手机用户':
  				return 'phone'
  		}
  	})
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  // 统计
  handleStatistics = () => {
  	const params = { list: this.props.data.masss_selectedRowKeys }
  	this.props.statisticsMasss(params)
  }

  // 多选
  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < platformOptions.length),
      checkAll: checkedList.length === platformOptions.length,
    });

  }
  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? platformOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }

	render() {
		const platformCheckboxGroup = (
			<div>
        <div style={{ borderBottom: '1px solid #E9E9E9' }}>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            全选(选中用户分类发送患教资料)
          </Checkbox>
        </div>
        <br />
        <CheckboxGroup options={platformOptions} value={this.state.checkedList} onChange={this.onChange} />
      </div>
     )

		const sendSteps = (
			<Steps size="small" current={3}>
			    <Step title="选择患教文章" />
			    <Step title="选择发送用户分类" />
			    <Step title="点击发送"  />
			  </Steps>
		)

		const statistics = (
			<Modal width={1000} title='消息发送' visible={this.state.visible}
        onOk={this.handleOk} okText="发送" onCancel={this.handleCancel}
      >
				{sendSteps}
      	<div style={{width: 500, marginTop: 20}}>
          <MasssStatistics
          	data={this.props.data.statistics}
          	select={this.handleStatistics}
          	isRefresh={this.state.isRefreshStat}
          />
        </div>
      	<div style={{width: 500, position: 'absolute', left: 500, top: 50, marginTop: 60}}>
        	<Article />
        </div>
        {platformCheckboxGroup}
      </Modal>
		)

		const rowSelection = {
      selectedRowKeys: this.props.data.masss_selectedRowKeys,
      onChange: (selectedRowKeys) => this.props.onSelectChange(selectedRowKeys, 'masss'),
    }

		return (
			<QueueAnim delay={10}>
				<div className='module' key ="masss">
					<Card title="居民列表">
						<Button type="primary" icon="message" onClick={this.showModal}>消息发送</Button>
						{statistics}
						<CrudTable
							data={this.props.data.masss_list}
							config={table_config}
							rowSelection={rowSelection}
							// advancedSearch={'AdvancedSearchForm'}
							advancedSearchConfig={search_config}
							select={this.props.queryMasss}
						/>
					</Card>
				</div>
			</QueueAnim>
		)
	}
}
