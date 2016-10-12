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
import moment from 'moment'
import QueueAnim from 'rc-queue-anim';
import * as PHRAction from '../PHRAction'

import {
	msg,
	notify,
	getDate,
	getFieldsObj,
	getFieldsArr,
	emptyObject
} from 'utils'
import {
	DATE_FORMAT_STRING
} from 'config'
import {
	ARC_TYPE_CONFIG,
	PERSONALDETAIL_FIELDS_CONFIG as FIELDS
} from 'phr_conf'
import {
	CONFIG as LCONFIG
} from 'login_conf'

const USR = LCONFIG.LS.USR
const DEFAULT_USR = LCONFIG.DEFAULT_USR
const username = localStorage.getItem(USR) || DEFAULT_USR
const DEFAULT_DATE = '1950-1-1'
const DEFAULT_VALUE = {
	grda_csrq: {
		value: moment(DEFAULT_DATE, DATE_FORMAT_STRING)
	},
	grda_jdys: {
		value: username
	},
	grda_jdrq: {
		value: moment(new Date(), DATE_FORMAT_STRING)
	},
	grda_lrr: {
		value: username
	},
	grda_lrrq: {
		value: moment(new Date(), DATE_FORMAT_STRING)
	},
}

const TabPane = Tabs.TabPane;

/*基本资料 字段*/
const grdaJbzl = FIELDS.grdaJbzl

/*既往史 字段*/
const grdaJws = FIELDS.grdaJws

/*家族史 字段*/
const grdaJzs = FIELDS.grdaJzs

class ArchiveCollection extends React.Component {

	arcType = ARC_TYPE_CONFIG.arcType
	specArcType = ARC_TYPE_CONFIG.specArcType
	state = {
		activeKey: this.arcType[0].key,
		arcType: this.arcType,
		[`${FIELDS.name}`]: DEFAULT_VALUE,
		submit: false,
		id: null
	}

	componentWillMount = () => {
		console.log('ArchiveCollection.componentWillMount', this.props.params.id)
		let id = this.props.params.id
		if (id) {
			this.props.queryPHR(id)
		}
	}

	componentDidMount = () => {
		console.log('ArchiveCollection.state', this.state)
	}

	componentWillUnmount = () => {}

	componentWillUpdate = () => {
		console.log('ArchiveCollection.componentWillUpdate')
	}

	componentDidUpdate = () => {
		console.log("ArchiveCollection.componentDidUpdate", this.state, this.props.phr)

		/*if (!emptyObject(this.props.data.phr)) {
			console.log('phr resp data:', this.props.data.phr)
			let result = this.props.data.phr.result
			if (result && result.status && result.dout) {
				let status = result.status
				let	dout = result.dout
				if (status.resultCode > 0) {
				}
			}
		}*/
	}

	/*save archiv*/
	saveForm = (e) => {
		this.setState({
			submit: true
		})

		let obj = getFieldsObj(grdaJbzl.fields, this.state[FIELDS.name], DATE_FORMAT_STRING)
		console.log('getFieldsObj', obj)
		let arr = getFieldsArr(grdaJws.fields, this.state[FIELDS.name])
		console.log('getFieldsArr', arr)
		this.props.saveArchiveData({
			grdaJbzl: obj,
			grdaJws: arr,
			grdaJzs: []
		})
	}

	onFieldsChange = ({
		fields
	}) => {
		console.log('onFieldsChange', fields)
			/*let state = {}
			state = Object.assign(this.state[FIELDS.name], {}, {
				...fields
			})
			this.setState({
				[`${FIELDS.name}`]: state,
			})*/

		this.props.saveFieldsChange(fields)
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

		let title, operatText
		if (this.props.params.id) {
			title = '编辑档案'
			operatText = '更新档案'
		} else {
			title = '新建档案'
			operatText = '保存档案'
		}

		const operations = <Button type="primary" onClick={this.saveForm} loading={this.state.submit}>{operatText}</Button>
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
		/*trigger={['click']}*/
		const moreSpecArcDd = <Dropdown overlay={moreSpecArc}>
							    <a className="ant-dropdown-link">
							      添加专档 <Icon type="down" />
							    </a>
							  </Dropdown>

		{ /*动态加载档案组件*/ }

		/*{React.createElement(require(`../modules/phr/components/${pane.content}`).default,{
			fields: this.state[FIELDS.name],
			onFieldsChange: this.onFieldsChange
		})}*/
		const tabpane = this.state.arcType.map(pane => {

			let Container = require(`../components/${pane.content}`).default
			return (
				<TabPane tab={pane.name} key={pane.key}>
					<Container
						fields={this.props.phr}
						onFieldsChange={this.onFieldsChange}
					/>
				</TabPane>
			)
		})


		return (
			<QueueAnim delay={10}>
				<div className='module' key="tabs">
					<Card title={title} extra={moreSpecArcDd}>
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

ArchiveCollection.propTypes = {
	saveArchiveData: PropTypes.func.isRequired,
	saveFieldsChange: PropTypes.func.isRequired,
	queryPHR: PropTypes.func.isRequired,
	phr: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	console.log('mapStateToProps:', state)
	return {
		phr: state.phr
	}
}

export default connect(mapStateToProps, PHRAction)(ArchiveCollection)