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
import * as AppActions from 'AppActions'
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
const DEFAULT = LCONFIG.DEFAULT

const user = JSON.parse(localStorage.getItem(USR))
const DEFAULT_USERNAME = DEFAULT.USERNAME
const userName = user ? user.userName : DEFAULT_USERNAME
const DEFAULT_DATE = '1950-1-1'
const DEFAULT_VALUE = {
	grda_csrq: {
		value: moment(DEFAULT_DATE, DATE_FORMAT_STRING)
	},
	grda_jdys: {
		value: userName
	},
	grda_jdrq: {
		value: moment(new Date(), DATE_FORMAT_STRING)
	},
	grda_lrr: {
		value: userName
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

		let obj = getFieldsObj(grdaJbzl.fields, this.props.phr[`${FIELDS.name}`], DATE_FORMAT_STRING)

		let grda_xzz1 = obj.grda_xzz
		if (grda_xzz1) {
			let grda_xzz = grda_xzz1.split(',')
			let grda_xzz_smc = grda_xzz[0]
			let grda_xzz_qxmc = grda_xzz[1]
			let grda_xzz_jdzmc = grda_xzz[2]
			let grda_xzz_jwcmc = grda_xzz[3]
			let grda_xzz_ljmc = grda_xzz[4]
			Object.assign(obj, {
				grda_xzz_smc
			}, {
				grda_xzz_qxmc
			}, {
				grda_xzz_jdzmc
			}, {
				grda_xzz_jwcmc
			}, {
				grda_xzz_ljmc
			})
		}

		let grda_hkdz1 = obj.grda_hkdz
		if (grda_hkdz1) {
			let grda_hkdz = grda_hkdz1.split(',')
			let grda_hkdz_xfmc = grda_hkdz[0]
			let grda_hkdz_smc = grda_hkdz[1]
			let grda_hkdz_qxmc = grda_hkdz[2]
			let grda_hkdz_jdzmc = grda_hkdz[3]
			let grda_hkdz_jwcmc = grda_hkdz[4]
			let grda_hkdz_ljmc = grda_hkdz[5]
			Object.assign(obj, {
				grda_hkdz_xfmc
			}, {
				grda_hkdz_smc
			}, {
				grda_hkdz_qxmc
			}, {
				grda_hkdz_jdzmc
			}, {
				grda_hkdz_jwcmc
			}, {
				grda_hkdz_ljmc
			})
		}

		obj.grda_jdrq = obj.grda_lrrq = '2016-10-13'
		obj.grda_jdrq = obj.grda_lrrq = '2016-10-13'
		obj.grda_csrq = '1950-1-1'
		delete obj.grda_hkdz
		delete obj.grda_xzz
		console.log('getFieldsObj', obj)
		let arr = getFieldsArr(grdaJws.fields, this.props.phr[`${FIELDS.name}`], DATE_FORMAT_STRING)
		console.log('getFieldsArr', arr)
		this.props.saveArchiveData({
			grdaJbzl: obj,
			grdaJws: arr,
			grdaJzs: []
		})
		this.setState({
			submit: false
		})
	}

	onFieldsChange = ({
		fields
	}, flag) => {
		console.log('onFieldsChange', fields, flag)
			/*let state = {}
			state = Object.assign(this.state[FIELDS.name], {}, {
				...fields
			})
			this.setState({
				[`${FIELDS.name}`]: state,
			})*/

		this.props.saveFieldsChange(fields)
	};

	getIndividualNumbe = (addressArr, grda_xzz_qt) => {

		let grda_xzz = addressArr.slice(0)
		grda_xzz.push(grda_xzz_qt)
		let grda_xzz_fields = FIELDS.grdaJbzl.addressFields.grda_xzz.slice(0)
		grda_xzz_fields.push('grda_xzz_qt')
		this.props.getIndividualNumbe(grda_xzz, grda_xzz_fields)
	}

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
						fields={this.props.phr[`${FIELDS.name}`]}
						onFieldsChange={this.onFieldsChange}
						getIndividualNumbe={this.getIndividualNumbe}
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
	getIndividualNumbe: PropTypes.func.isRequired,
	phr: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	console.log('ArchiveCollection mapStateToProps:', state)
	return {
		phr: state.phr
	}
}

export default connect(mapStateToProps, {
	...AppActions,
	...PHRAction
})(ArchiveCollection)