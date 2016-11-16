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
	Affix,
	Icon
} from 'antd';
import Tags from 'app_base/components/Tags'
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
const FIELDSN = FIELDS.name
const specArcKey = []
for (let field of ARC_TYPE_CONFIG.specArcType) {
	specArcKey.push(field.containKey)
}

class ArchiveCollection extends React.Component {

	arcType = ARC_TYPE_CONFIG.arcType.slice(0)
	specArcType = ARC_TYPE_CONFIG.specArcType.slice(0)
	labelTagArc = this.specArcType.filter(specArc => !!specArc.labelTag);
	state = {
		activeKey: this.arcType[0].key,
		arcType: this.arcType,
		submitloading: false,
		title: undefined,
		operatText: undefined,
	}

	componentWillMount = () => {
		console.log('ArchiveCollection.componentWillMount', this.props.params.id)
		let id = this.props.params.id
		if (!!id) {
			this.props.queryPHR(id)
		} else {
			this.props.clearStore({
				updatestate: false
			})
		}
	}

	componentDidMount = () => {
		console.log('ArchiveCollection.state', this.state, this.props)
	}

	componentWillUnmount = () => {}

	componentWillReceiveProps = (nextProps) => {
		console.log("ArchiveCollection.componentWillReceiveProps", nextProps.phr, this.props.phr)
		this.setState({
			submitloading: nextProps.phr.submitloading
		})
		const fields = nextProps.phr[FIELDSN]
		const labels = nextProps.phr[FIELDSN].labels || []
		const usersArc = this.state.arcType.slice(0)

		//定死this.state.arcType数组长度为2才更新，可完善
		if (!!fields && usersArc.length == 2) {
			for (let field in fields) {
				let fieldObj = fields[field]
				if (specArcKey.indexOf(field) > -1) {
					//专档对象且属性不止selectKey一个
					if (Object.getOwnPropertyNames(fieldObj).length > 1) {
						let spec = this.getSpecArcTypeByCKey(field)
						if (spec.length == 1) {
							usersArc.push(spec[0])
						} else throw Error('用户专档数量异常')
					}
				}
			}
			this.labelTagArc.map((tagArc, index) => {
				let name = tagArc.name
				if (labels.indexOf(name) > -1) {
					usersArc.push(tagArc)
				}
			})
			console.log('adfas', usersArc)
			this.setState({
				arcType: usersArc
			})
		}

		this.updateUStateText(nextProps.phr.updatestate, this.state.activeKey)
	}

	componentWillUpdate = (nextProps, nextState) => {
		console.log('ArchiveCollection.componentWillUpdate', nextProps, nextState)
	}

	componentDidUpdate = (prevProps, prevState) => {
		console.log("ArchiveCollection.componentDidUpdate", this.props, prevProps, prevState)
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
		let grbhObj = this.getArchiveGrbh()
		let grbh = !!grbhObj ? grbhObj.value : null
		let flag = updatestate ? 'update' : 'save'

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
					var key = 'grdaJkzk'
					var grdaJkzkState = phr[FIELDSN].grdaJkzk
					var arrObjFields = FIELDS.grdaJkzk.arrFields
					var grdaJkzk = getFieldsObjArr(grdaJkzkState, arrObjFields, DATE_FORMAT_STRING, key)
					flag = this.isArchiveUpdateState(key)

					// save|update HealthMedical 健康体检表
					this.props[`${flag}${activeKey}`](grdaJkzk)
					break
				case 'Hypertension':
					var key = 'gxyJxb'
					var gxyJxbState = phr[FIELDSN].gxyJxb
					var arrObjFields = FIELDS.gxyJxb.arrFields
					var gxyJxb = getFieldsObjArr(gxyJxbState, arrObjFields, DATE_FORMAT_STRING, key)
					flag = this.isArchiveUpdateState(key)

					// save|update Hypertension 高血压
					this.props[`${flag}${activeKey}`](gxyJxb)
					break
				case 'Diabetes':
					var key = 'tnbSfjl'
					var tnbSfjlState = phr[FIELDSN].tnbSfjl
					var arrObjFields = FIELDS.tnbSfjl.arrFields
					var tnbSfjl = getFieldsObjArr(tnbSfjlState, arrObjFields, DATE_FORMAT_STRING, key)
					flag = this.isArchiveUpdateState(key)

					// save|update Diabetes 糖尿病
					this.props[`${flag}${activeKey}`](tnbSfjl)
					break
				case 'Aged':
					var key = 'lnrSfb'
					var lnrSfbState = phr[FIELDSN].lnrSfb
					var arrObjFields = FIELDS.lnrSfb.arrFields
					var lnrSfb = getFieldsObjArr(lnrSfbState, arrObjFields, DATE_FORMAT_STRING, key)
					flag = this.isArchiveUpdateState(key)

					// save|update HealthMedical 老年人
					this.props[`${flag}${activeKey}`](lnrSfb)
					break
				case 'Oncosis':
					//肿瘤病
					this.props.addLabel(grbh, ['肿瘤病'])
					break
				case 'Handicapped':
					//残疾人
					this.props.addLabel(grbh, ['残疾人'])
					break
				case 'Femalecare':
					//女性保健专档
					this.props.addLabel(grbh, ['女性保健专档'])
					break
				case 'Maternal':
					//孕产妇专档
					this.props.addLabel(grbh, ['孕产妇专档'])
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

		let grbh = this.getArchiveGrbh()
		let exist = !!grbh && !!grbh.value
		if (activeKey != 'PersonalDetail') {
			if (!exist) {
				notify('warn', '警告', '请先填写并保存个人基本信息表');
				if (boolean) {
					this.props.changeSubmitLoad(false)
				}
			}
		} else {
			return true
		}
		return exist
	}

	getArchiveGrbh = () => {
		const {
			phr
		} = this.props

		let FIELDSN = FIELDS.name
		let grdaJbzlState = phr[FIELDSN].grdaJbzl
		let grbh = grdaJbzlState.grbh
		console.debug('getArchiveGrbh', grbh)
		return grbh
	}

	/*检查各个档案是不是处于updatestate @return update/save*/
	isArchiveUpdateState = (key) => {
		const {
			phr
		} = this.props

		let FIELDSN = FIELDS.name
		let keyState = phr[FIELDSN][key]
		let flag = 'save'
		try {
			for (let key1 in keyState) {
				//判断有没有del开头的属性
				if (key1.indexOf('del') > -1) {
					flag = 'update'
					break
				}
				let selectValue = keyState[key1]
				let id = selectValue['id'] || null
				if (!!id && !!id.value) {
					flag = 'update'
					break
				}
			}
		} catch (e) {
			notify('warn', '警告', '请先新增一条记录');
			this.props.changeSubmitLoad(false)
			throw Error(`isArchiveUpdateState => ${e.message}`)
		}
		console.debug('isArchiveUpdateState', flag)
		return flag
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
			console.log('this.state.arcType', this.state.arcType, arcType)
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
		})
		this.updateUStateText(this.props.phr.updatestate, activeKey)
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
					this.updateUStateText(this.props.phr.updatestate, tabKey)
				}
			})
		} else {
			msg('warn', '专档已存在', 3)
		}
	}

	/*获取激活档案名字*/
	getActiveName = (activeKey) => {
		const arc = this.state.arcType.filter(arc => arc.key == activeKey);
		return arc[0].name
	}

	/*获取专档*/
	getSpecArcTypeByCKey = (ckey) => {
		const spec = this.specArcType.filter(specArc => specArc.containKey == ckey);
		return spec
	}

	/*获取专档*/
	getSpecArcTypeByKey = (key) => {
		const spec = this.specArcType.filter(specArc => specArc.key == key);
		return spec
	}

	/*判断是否标签档案*/
	isLabelTagArc = (key) => {
		const spec = this.getSpecArcTypeByKey(key)[0]
		return !!spec && !!spec.labelTag
	}

	/*切换新增/更新状态文字*/
	updateUStateText = (updatestate, activeKey) => {
		let title, operatText
		let preText, prevText = ''
		let actName = this.getActiveName(activeKey)
		let isTag = this.isLabelTagArc(activeKey)
		console.log('isLabelTagArc', isTag)
		if (updatestate) {
			title = `编辑档案`
			preText = '更新'
			if (isTag) {
				preText = '添加'
				prevText = '标签'
			}
		} else {
			title = `新建档案`
			preText = '保存'
			if (isTag) {
				preText = '添加'
				prevText = '标签'
			}
		}
		operatText = `${preText}${actName}${prevText}`

		this.setState({
			title,
			operatText
		})
	}

	render() {

		const {
			phr
		} = this.props

		const {
			title,
			operatText
		} = this.state

		const operations = (
			true ? (
				<div style={{display: 'inline-flex'}}>
					{/*<Tags />*/}
					<Button type="primary" onClick={this.saveForm} loading={this.state.submitloading}>{operatText}</Button>
				</div>
			) : (
				<Affix>
					{/*<Tags />*/}
					<Button type="primary" onClick={this.saveForm} loading={this.state.submitloading}>{operatText}</Button>
				</Affix>
			)
		)
		const moreSpecArc = (
			<Menu>
			    {
			    	this.specArcType.map((arc, index) => {
						if (!arc.hidden) {
							return (
								    <Menu.Item key={index} disabled={arc.disabled}>
										<a onClick = {() =>this.addSpecArcTab(arc.key)} >{arc.name}</a>
								    </Menu.Item>
							)
						}
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
				grdaJzsFields = null
			if (!!fields) {
				/*个人基本信息*/
				grdaJbzlFields = fields['grdaJbzl']
					//个人基本信息-既往史
				grdaJwsFields = fields['grdaJws']
					//个人基本信息-家族史*/
				grdaJzsFields = fields['grdaJzs']
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

	saveHypertension: PropTypes.func.isRequired,
	updateHypertension: PropTypes.func.isRequired,

	saveDiabetes: PropTypes.func.isRequired,
	updateDiabetes: PropTypes.func.isRequired,

	saveAged: PropTypes.func.isRequired,
	updateAged: PropTypes.func.isRequired,

	addLabel: PropTypes.func.isRequired,
	delLabel: PropTypes.func.isRequired,

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
	}
}

export default connect(mapStateToProps, {
	...AppActions,
	...PHRAction
})(ArchiveCollection)