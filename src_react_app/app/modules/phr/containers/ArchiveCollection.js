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
	emptyObject,
	adjustGrdaJbzlField,
	getFieldsObjArr,
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

const TabPane = Tabs.TabPane;

class ArchiveCollection extends React.Component {

	arcType = ARC_TYPE_CONFIG.arcType.slice(0)
	specArcType = ARC_TYPE_CONFIG.specArcType.slice(0)
	state = {
		activeKey: this.arcType[0].key,
		arcType: this.arcType,
		submitloading: false,
		id: null
	}

	componentWillMount = () => {
		console.log('ArchiveCollection.componentWillMount', this.props.params.id)
		let id = this.props.params.id
		if (!!id) {
			this.props.queryPHR(id)
		}
	}

	componentDidMount = () => {
		console.log('ArchiveCollection.state', this.state, this.props)
	}

	componentWillUnmount = () => {}

	componentWillReceiveProps = (nextProps) => {
		console.log("ArchiveCollection.componentWillReceiveProps", nextProps)
		this.setState({
			submitloading: nextProps.phr.submitloading
		})
	}

	componentWillUpdate = () => {
		console.log('ArchiveCollection.componentWillUpdate')
	}

	componentDidUpdate = (prevProps, prevState) => {
		console.log("ArchiveCollection.componentDidUpdate", prevProps, prevState)
	}

	/*save archiv*/
	saveForm = (e) => {
		const {
			phr
		} = this.props
		const {
			activeKey
		} = this.state

		this.setState({
			submitloading: true
		})
		let updatestate = phr.updatestate
		let flag = updatestate ? 'update' : 'save'
		let FIELDSN = FIELDS.name

		if (this.judgeBAExistAndNotify(activeKey, true)) {
			switch (activeKey) {
				case 'PersonalDetail':
					let grdaJbzlFields = FIELDS.grdaJbzl.fields
					let grdaJwsFields = FIELDS.grdaJws.fields
					let grdaJzsFields = FIELDS.grdaJzs.fields

					let grdaJbzlState = phr[FIELDSN].grdaJbzl
					let grdaJwsState = phr[FIELDSN].grdaJws
					let grdaJzsState = phr[FIELDSN].grdaJzs

					let grdaJbzl = getFieldsObj(grdaJbzlFields, grdaJbzlState, DATE_FORMAT_STRING)
					adjustGrdaJbzlField(grdaJbzl)
					let grdaJws = getFieldsArr(grdaJwsFields, grdaJwsState, DATE_FORMAT_STRING)
					let grdaJzs = getFieldsArr(grdaJzsFields, grdaJzsState, DATE_FORMAT_STRING)

					// save|update PersonalDetail 基本档
					this.props[`${flag}${activeKey}`]({
						grdaJbzl,
						grdaJws,
						grdaJzs
					})
					break
				case 'HealthMedical':
					let grdaJkzkState = phr[FIELDSN].grdaJkzk
					let arrObjFields = FIELDS.grdaJkzk.arrFields
					let grdaJkzk = getFieldsObjArr(grdaJkzkState, arrObjFields, DATE_FORMAT_STRING)

					flag = this.isArchiveUpdateState('grdaJkzk')

					// save|update HealthMedical 健康体检表
					this.props[`${flag}${activeKey}`]({
						grdaJkzk
					})
					break
				case 'Hypertension':
					// save|update Hypertension 高血压
					// TODO
					break
				case 'Diabetes':
					// save|update Diabetes 糖尿病
					// TODO
					break
				case 'Aged':
					// save|update HealthMedical 老年人
					// TODO
					break
				default:
					console.log(`${flag}${activeKey}`, 'dev...')
			}
		}


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
		this.props.saveFieldsChange(fields, flag)
	};

	getIndividualNumbe = (addressArr, grda_xzz_qt) => {

		let grda_xzz = addressArr.slice(0)
		grda_xzz.push(grda_xzz_qt)
		let grda_xzz_fields = FIELDS.grdaJbzl.addressFields.grda_xzz.slice(0)
		grda_xzz_fields.push('grda_xzz_qt')
		this.props.getIndividualNumbe(grda_xzz, grda_xzz_fields)
	}

	//检查基本档是否已经建立和提醒，按需关闭提交按钮加载状态
	judgeBAExistAndNotify = (activeKey, boolean) => {

		const {
			phr
		} = this.props

		let FIELDSN = FIELDS.name
		let grdaJbzlState = phr[FIELDSN].grdaJbzl
		let grbh = grdaJbzlState.grbh
		let exist = !!grbh && !!grbh.value

		if (activeKey != 'PersonalDetail') {
			if (!exist) {
				notify('warn', '警告', '请先新建保存个人基本信息表');
				if (boolean) {
					this.props.changeSubmitLoad(false)
				}
			}
		} else {
			return true
		}
		return exist
	}

	/*检查各个档案是不是处于updatestate @return update/save*/
	isArchiveUpdateState = (key) => {
		const {
			phr
		} = this.props

		let FIELDSN = FIELDS.name
		let keyState = phr[FIELDSN][key]
		let selectKey = keyState.selectKey || undefined
		let selectValue = !!selectKey ? keyState[selectKey] : undefined
		let grbh = !!selectValue ? selectValue['grbh'] : undefined

		return !!grbh ? 'update' : 'save'
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
		if ('PersonalDetail' === targetKey || 'HealthMedical' === targetKey) {
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
				activeKey,
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

	getActiveName = () => {
		const arc = this.state.arcType.filter(arc => arc.key == this.state.activeKey);
		return arc[0].name
	}

	render() {

		const {
			phr
		} = this.props

		let title, operatText
		if (phr.updatestate) {
			title = `编辑档案`
			operatText = `更新${this.getActiveName()}`
		} else {
			title = `新建档案`
			operatText = `保存${this.getActiveName()}`
		}

		const operations = (
			<div>
				{phr.updatestate ? (
					<div>
						<Button type="ghost" onClick={() => this.props.clearStore()} shape="circle-outline" icon="close-circle-o" />
						<Button type="ghost" onClick={() => this.props.changeState()} shape="circle-outline" icon="swap" />
						<Button type="primary" onClick={this.saveForm} loading={this.state.submitloading}>{operatText}</Button>
					</div>
				) : (
					<div>
						<Button type="primary" onClick={this.saveForm} loading={this.state.submitloading}>{operatText}</Button>
					</div>
				)}
			</div>
		)
		const moreSpecArc = (
			<Menu>
			    {
			    	this.specArcType.map((arc, index) => {
						return (
						    <Menu.Item key={index} disabled={arc.disabled}>
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
		/*{React.createElement(require(`../modules/phr/components/${arc.content}`).default,{
			fields: this.state[FIELDS.name],
			onFieldsChange: this.onFieldsChange
		})}*/
		const tabpane = this.state.arcType.map(arc => {

			let Container = require(`../components/${arc.content}`).default
			let fields = this.props.phr[FIELDS.name]
			let grdaJbzlFields, grdaJwsFields,
				grdaJzsFields, grdaJkzkFields,
				gxyJxbFields, tnbSfjlFields,
				lnrSfbFields, grdaZyyyqkFields,
				grdaFmyjzsFields, grdaZyzlqkFields,
				gxyYyqkFields, tnbYyqkFields = null
			if (!!fields) {
				/*个人基本信息*/
				grdaJbzlFields = fields['grdaJbzl']
					//个人基本信息-既往史
				grdaJwsFields = fields['grdaJws']
					//个人基本信息-家族史*/
				grdaJzsFields = fields['grdaJzs']

				/*健康体检表*/
				grdaJkzkFields = fields['grdaJkzk']
					//健康体检表-主要用药情况
				grdaZyyyqkFields = fields['grdaZyyyqk']
					//健康体检表-非免疫规划预防接种史
				grdaFmyjzsFields = fields['grdaFmyjzs']
					//健康体检表-住院治疗情况
				grdaZyzlqkFields = fields['grdaZyzlqk']

				/*高血压*/
				gxyJxbFields = fields['gxyJxb']
					//高血压-用药情况
				gxyYyqkFields = fields['gxyYyqk']

				/*糖尿病*/
				tnbSfjlFields = fields['tnbSfjl']
					//糖尿病-用药情况
				tnbYyqkFields = fields['tnbYyqk']

				/*老年人*/
				lnrSfbFields = fields['lnrSfb']
			}
			return (
				<TabPane tab={arc.name} key={arc.key}>
					<Container
						grdaJbzlFields={grdaJbzlFields}
						grdaJwsFields={grdaJwsFields}
						grdaJzsFields={grdaJzsFields}

						onFieldsChange={this.onFieldsChange}
						getIndividualNumbe={this.getIndividualNumbe}
						updatestate={this.props.phr.updatestate}
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
	savePersonalDetail: PropTypes.func.isRequired,
	updatePersonalDetail: PropTypes.func.isRequired,
	saveHealthMedical: PropTypes.func.isRequired,
	updateHealthMedical: PropTypes.func.isRequired,
	changeState: PropTypes.func.isRequired,
	clearStore: PropTypes.func.isRequired,
	saveFieldsChange: PropTypes.func.isRequired,
	queryPHR: PropTypes.func.isRequired,
	getIndividualNumbe: PropTypes.func.isRequired,
	changeSubmitLoad: PropTypes.func.isRequired,
	phr: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	console.log('ArchiveCollection mapStateToProps:', state)
	return {
		phr: state.phr,
		childTable: state.childTable,
	}
}

export default connect(mapStateToProps, {
	...AppActions,
	...PHRAction
})(ArchiveCollection)