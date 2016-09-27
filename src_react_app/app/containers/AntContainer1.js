import React, {
	PropTypes,
} from 'react';
import {
	connect
} from 'react-redux';
import {
	Tabs,
	Button,
	Card,
	Menu,
	Dropdown,
	Icon
} from 'antd';
import QueueAnim from 'rc-queue-anim';
import fetch from 'isomorphic-fetch'
import * as ArchiveActions from '../actions/ArchiveActions'

import {
	msg,
	notify,
	getDate
} from '../utils/utils'
import {
	arc_type_config
} from 'config'

const TabPane = Tabs.TabPane;

class AntContainer1 extends React.Component {

	constructor(props) {
		super(props);
		this.arcType = arc_type_config.arcType
		this.specArcType = arc_type_config.specArcType
		this.state = {
			activeKey: this.arcType[0].key,
			arcType: this.arcType,
		}
	}

	componentDidMount = () => {}

	componentWillUnmount = () => {}

	componentWillUpdate = () => {
		console.log('componentWillUpdate' + this.state)
	}

	componentDidUpdate = () => {
		console.log("componentDidUpdate", this.state.grbh, this.state.grda_xm, this.state.sex, this.state.birthday)
	}

	/*save archiv*/
	saveForm = (e) => {
		this.props.saveArchiveData({
			'grbh': this.state.grbh.value,
			'grda_xm': this.state.grda_xm.value,
		});
	}

	onFieldsChange = ({
		fields
	}) => {
		this.setState({
			...fields,
		});
	};

	/*Tab Edit event*/
	onTabEdit = (targetKey, action) => {
		console.log(targetKey, action)
		this[action](targetKey);
	}

	/*Tab remove*/
	remove = (targetKey) => {
		let deleteAbled = true

		/*this.arcType.forEach((pane, i) => {*/
		if ('personalDetail' === targetKey || 'healthMedical' === targetKey) {
			msg('warn', '不能删除档案基本信息表(个人基本信息表、健康体检表)', 3)
			return deleteAbled = false
		}
		/*})*/
		if (deleteAbled) {
			let activeKey = this.state.activeKey;
			let lastIndex;
			this.state.arcType.forEach((pane, i) => {
				if (pane.key === targetKey) {
					lastIndex = i - 1;
				}
			});
			const arcType = this.state.arcType.filter(pane => pane.key !== targetKey);
			if (lastIndex >= 0 && activeKey === targetKey) {
				activeKey = arcType[lastIndex].key;
			}
			this.setState({
				arcType,
				activeKey
			});
		}
	}

	/*Tab switch*/
	changeTab = (activeKey) => {
		this.setState({
			activeKey
		});
	}

	/*add special archiv tab*/
	addSpecArcTab = (tabKey) => {
		const arcType = this.state.arcType;
		let hasNotExist = true
		this.state.arcType.forEach((arcType, index) => {
			if (arcType.key == tabKey) return hasNotExist = false
		})
		if (hasNotExist) {
			this.specArcType.forEach((specArc, index) => {
				if (specArc.key == tabKey) {
					arcType.push({
						name: specArc.name,
						content: specArc.content,
						key: tabKey
					});
					this.setState({
						activeKey: tabKey,
						arcType: arcType
					});
				}
			})
		} else {
			msg('warn', '专档已存在', 3)
		}
	}

	render() {
		const operations = <Button type="primary" onClick={this.saveForm}>保存档案</Button>
		const moreSpecArc = (
			<Menu>
			    {
			    	this.specArcType.map((arc, index) => {
						return (
						    <Menu.Item key={index}>
						      <a onClick = {() =>this.addSpecArcTab(arc.key)} >{arc.name}</a>
						    </Menu.Item>
						)
					})
				}
		  	</Menu>
		);
		const moreSpecArcDd = <Dropdown overlay={moreSpecArc} trigger={['click']}>
							    <a className="ant-dropdown-link" href="#">
							      添加专档 <Icon type="down" />
							    </a>
							  </Dropdown>
		const tabpane = this.state.arcType.map(pane =>
			<TabPane tab={pane.name} key={pane.key}>
				{React.createElement(require(`../components/${pane.content}`).default,{
					fields: this.state, onFieldsChange: this.onFieldsChange
				})}
			</TabPane>)

		return (
			<QueueAnim delay={10}>
				<div className='module' key="tabs">
					<Card title="新建档案" extra={moreSpecArcDd}>
						<Tabs
							hideAdd
							onChange={this.changeTab}
							activeKey={this.state.activeKey}
							type="editable-card"
							onEdit={this.onTabEdit}
							defaultActiveKey="1"
							tabBarExtraContent={operations}
						>
							{tabpane}
						</Tabs>
					</Card>
				</div>
			</QueueAnim>
		)
	}
}

AntContainer1.propTypes = {
	saveArchiveData: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		data: state
	}
}

export default connect(mapStateToProps, ArchiveActions)(AntContainer1)