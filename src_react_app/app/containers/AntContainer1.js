import React from 'react';
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
/*个人基本信息表*/
import PersonalDetailForm from '../components/PersonalDetailForm'
/*健康体检表*/
import HealthMedicalForm from '../components/HealthMedicalForm'

import {
	msg,
	notify
} from '../utils/utils'
import {
	spec_arc_type_config
} from 'config'

const TabPane = Tabs.TabPane;
const panes = [{
	title: '个人基本信息表',
	content: <PersonalDetailForm />,
	key: '1'
}, {
	title: '健康体检表',
	content: <HealthMedicalForm />,
	key: '2'
}];

export default class AntContainer1 extends React.Component {

	constructor(props) {
		super(props);
		this.newTabIndex = 0;
		this.state = {
			activeKey: panes[0].key,
			panes: panes
		}
	}

	/*save archiv*/
	saveForm = (e) => {
		const hide = msg('loading', '正在保存中...', 110);

		const url = "https://api.github.com/search/users?q=a"
		const init = {
			cache: 'no-cache'
		}
		fetch(url)
			.then(response => response.json())
			.then((data) => {
				console.log(data)
				hide()
				msg('success', '保存成功')
			})
			.catch((e) => {
				console.error("Oops, error", e)
				hide()
				msg('warn', '保存失败 ' + '[' + e + ']')
			})
	}

	/*Tab Edit event*/
	onTabEdit = (targetKey, action) => {
		console.log(targetKey, action)
		this[action](targetKey);
	}

	/*Tab remove*/
	remove = (targetKey) => {
		let activeKey = this.state.activeKey;
		let lastIndex;
		this.state.panes.forEach((pane, i) => {
			if (pane.key === targetKey) {
				lastIndex = i - 1;
			}
		});
		const panes = this.state.panes.filter(pane => pane.key !== targetKey);
		if (lastIndex >= 0 && activeKey === targetKey) {
			activeKey = panes[lastIndex].key;
		}
		this.setState({
			panes,
			activeKey
		});
	}

	/*Tab switch*/
	changeTab = (activeKey) => {
		this.setState({
			activeKey
		});
	}

	/*add special archiv tab*/
	addSpecArcTab = (tabKey) => {
		console.log(tabKey)
		const panes = this.state.panes;
		const activeKey = `newTab${this.newTabIndex++}`;
		panes.push({
			title: '新建页签',
			content: '新页面',
			key: activeKey
		});
		this.setState({
			panes,
			activeKey
		});
	}

	render() {
		const operations = <Button type="primary" onClick={this.saveForm}>保存档案</Button>
		const moreSpecArc = (
			<Menu>
			    {
			    	spec_arc_type_config.specArcType.map((arc, index) => {
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
		const tabpane = this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)

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