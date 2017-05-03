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
	Badge,
	Alert,
	Spin,
	Icon
} from 'antd';
import Tags from 'app_base/components/Tags'
import moment from 'moment'
import QueueAnim from 'rc-queue-anim';
import * as AppActions from 'AppActions'
import * as PHRAction from '../PHRAction'

import {
	shortcut
} from 'app_base/utils/shortcut'
import {
	__DEBUG__,
	msg,
	notify,
	notifyClsBtn,
	showConfirm,
	getDate,
	getFieldsObj,
	getFieldsArr,
	emptyObject,
	adjustGrdaJbzlField,
	getFieldsObjArr,
	getUrlVal,
} from 'utils'

import {
	DATE_FORMAT_STRING,
	TAB_ANIMATED,
	UUID_ENABLE
} from 'config'
import {
	ARC_TYPE_CONFIG,
	PERSONALDETAIL_FIELDS_CONFIG as FIELDS,
	SHORTCUT_SUBMIT_ARCHIVES
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
const LOGINTIME = LCONFIG.LS.LOGINTIME

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
		showFixSaveBtn: false,
		showResidentbpfb: false,
		spinning: false,
	}

	componentWillMount = () => {
		console.log('ArchiveCollection.componentWillMount', this.props.params, this.props.query, this.props)
		// this.props.getAreaConfig()
		let {
			id
		} = this.props.params
		if (!!id) {
			this.setState({
				spinning: true
			}, () => this.props.queryPHR(id))

		} else {
			this.props.clearStore({
				updatestate: false
			})
		}

		//2016年12月14日01:43:44 新窗口设置title
		let {
			open,
			title
		} = this.props.location.query
		if (!!open && !!title && open == 'win') {
			document.title = title
		}

	}

	componentDidMount = () => {
		NProgress.done();
		console.log('ArchiveCollection.state', this.state, this.props)

		document.onscroll = () => {
			let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			let showFixSaveBtn = scrollTop >= 141 ? true : false
			this.setState({
				showFixSaveBtn
			})
		}

		shortcut.add(SHORTCUT_SUBMIT_ARCHIVES, () => this.saveForm(), {
			'type': 'keydown',
			'propagate': true,
			'target': document
		});
	}

	componentWillReceiveProps = (nextProps) => {
		console.log("ArchiveCollection.componentWillReceiveProps", nextProps.phr, this.props.phr)

		const fields = nextProps.phr[FIELDSN]
		const resident = fields.resident || false
		this.setState({
			submitloading: nextProps.phr.submitloading,
			showResidentbpfb: resident
		})
		const labels = fields.labels || []
		const usersArc = this.state.arcType.slice(0)

		//定死this.state.arcType数组长度为2才更新，可完善
		if (!!fields && usersArc.length == 2) {
			for (let field in fields) {
				let fieldObj = fields[field]
				if (specArcKey.indexOf(field) > -1) {
					//专档对象且属性不止selectKey一个
					if (Object.getOwnPropertyNames(fieldObj).length > 1) {
						let spec = this.getSpecArcTypeByCKey(field)
						usersArc.push(spec)
					}
				}
			}
			this.labelTagArc.map((tagArc, index) => {
				let name = tagArc.name
				if (labels.indexOf(name) > -1) {
					usersArc.push(tagArc)
				}
			})
			this.setState({
				arcType: usersArc
			})
		}

		this.updateUStateText(nextProps.phr.updatestate, this.state.activeKey)
		// huyg
		// this.generateGrbh(nextProps)
	}

	componentWillUpdate = (nextProps, nextState) => {
		console.log('ArchiveCollection.componentWillUpdate', nextProps, nextState)
	}

	componentDidUpdate = (prevProps, prevState) => {
		console.log("ArchiveCollection.componentDidUpdate", this.props, prevProps, prevState)
	}

	componentWillUnmount = () => {

		document.onscroll = null
		shortcut.remove(SHORTCUT_SUBMIT_ARCHIVES)

		/*离开这个页面时 修改主表保存状态*/
		this.props.changeMasterSaved(false)
	}

	generateGrbh = (nextProps) => {
		const grbh = this.getArchiveGrbh()
		if (!nextProps.updatestate && !grbh) {
			this.getIndividualNumbe()
			console.debug('generateGrbh', grbh, this.props.updatestate, nextProps.updatestate, grbh)
			console.log(nextProps)
		}
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
		let ids

		if (__DEBUG__ || this.judgeBAExistAndNotify(activeKey, true)) {
			switch (activeKey) {
				case 'PersonalDetail':
					let grdaJbzlFields = FIELDS.grdaJbzl.fields
					let grdaJwsFields = FIELDS.grdaJws.fields
					let grdaJzsFields = FIELDS.grdaJzs.fields

					let grdaJbzlState = phr[FIELDSN].grdaJbzl
					let grdaJwsState = phr[FIELDSN].grdaJws
					let grdaJzsState = phr[FIELDSN].grdaJzs

					let grdaJbzl = getFieldsObj(grdaJbzlFields, grdaJbzlState, DATE_FORMAT_STRING, flag)
					adjustGrdaJbzlField(grdaJbzl)
					let grdaJws = getFieldsArr(grdaJwsFields, grdaJwsState, DATE_FORMAT_STRING, flag, true)
					let grdaJzs = getFieldsArr(grdaJzsFields, grdaJzsState, DATE_FORMAT_STRING, flag, true)

					//2016年11月28日 添加uuid
					ids = this.getMasterIds(flag, grdaJbzl, grdaJws, grdaJzs)

					console.info('submit ids', '=>', ids)
					console.info('submit grdaJbzl', '=>', grdaJbzl)
					console.info('submit grdaJws', '=>', grdaJws)
					console.info('submit grdaJzs', '=>', grdaJzs)

					// save|update PersonalDetail 基本档
					this.props[`${flag}${activeKey}`]({
						grdaJbzl,
						grdaJws,
						grdaJzs
					}, ids)
					break
				case 'HealthMedical':
					var key = 'grdaJkzk'
					flag = this.isArchiveUpdateState(key)
					var grdaJkzkState = phr[FIELDSN].grdaJkzk
					var arrObjFields = FIELDS[key].arrFields
					var arrFields = Object.keys(arrObjFields || {})
					var grdaJkzk = getFieldsObjArr(grdaJkzkState, arrObjFields, DATE_FORMAT_STRING, key, flag)

					//2016年11月28日 添加uuid
					ids = this.getIds(flag, grdaJkzk, key, arrFields)

					console.info('submit ids', '=>', ids)
					console.info('submit arrFields', '=>', arrFields)
					console.info('submit grdaJkzk', '=>', grdaJkzk)

					// save|update HealthMedical 健康体检表
					this.props[`${flag}${activeKey}`](key, grdaJkzk, ids)
					break
				case 'Hypertension':
					var key = 'gxyJxb'
					flag = this.isArchiveUpdateState(key)
					var gxyJxbState = phr[FIELDSN].gxyJxb
					var arrObjFields = FIELDS[key].arrFields
					var arrFields = Object.keys(arrObjFields || {})
					var gxyJxb = getFieldsObjArr(gxyJxbState, arrObjFields, DATE_FORMAT_STRING, key, flag)

					//2016年11月28日 添加uuid
					ids = this.getIds(flag, gxyJxb, key, arrFields)

					console.info('submit ids', '=>', ids)
					console.info('submit arrFields', '=>', arrFields)
					console.info('submit gxyJxb', '=>', gxyJxb)

					// save|update Hypertension 高血压
					this.props[`${flag}${activeKey}`](key, gxyJxb, ids)
					break
				case 'Diabetes':
					var key = 'tnbSfjl'
					flag = this.isArchiveUpdateState(key)
					var tnbSfjlState = phr[FIELDSN].tnbSfjl
					var arrObjFields = FIELDS[key].arrFields
					var arrFields = Object.keys(arrObjFields || {})
					var tnbSfjl = getFieldsObjArr(tnbSfjlState, arrObjFields, DATE_FORMAT_STRING, key, flag)

					//2016年11月28日 添加uuid
					ids = this.getIds(flag, tnbSfjl, key, arrFields)

					console.info('submit ids', '=>', ids)
					console.info('submit arrFields', '=>', arrFields)
					console.info('submit tnbSfjl', '=>', tnbSfjl)

					// save|update Diabetes 糖尿病
					this.props[`${flag}${activeKey}`](key, tnbSfjl, ids)
					break
				case 'Aged':
					var key = 'lnrSfb'
					flag = this.isArchiveUpdateState(key)
					var lnrSfbState = phr[FIELDSN].lnrSfb
					var arrObjFields = FIELDS[key].arrFields
					var arrFields = Object.keys(arrObjFields || {})
					var lnrSfb = getFieldsObjArr(lnrSfbState, arrObjFields, DATE_FORMAT_STRING, key, flag)

					//2016年11月28日 添加uuid
					ids = this.getIds(flag, lnrSfb, key, arrFields)

					console.info('submit ids', '=>', ids)
					console.info('submit arrFields', '=>', arrFields)
					console.info('submit lnrSfb', '=>', lnrSfb)

					// save|update HealthMedical 老年人
					this.props[`${flag}${activeKey}`](key, lnrSfb, ids)
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

	//2016年11月28日 提取uuid
	getIds = (flag, target, key, arrFields) => {

		let ids = undefined
		if ( /*flag == 'save' &&*/ UUID_ENABLE) {
			ids = []
			let targetObj = target[key]
			if (!!targetObj)
				for (let obj of targetObj) {
					let idsObj = {}

					//idsObj[key] = obj['id']
					idsObj[key] = {
						id: {
							value: obj['id']
						}
					}
					if (!!arrFields && arrFields.constructor == Array)
						for (let field of arrFields) {
							let objField = obj[field]
							if (!!objField) {
								idsObj[key][field] = {}
								objField.map((item, i) => {
										idsObj[key][field][`id_${i}`] = {
											value: item['id']
										}
									})
									/*for (let i = 0; i < objField.length; i++) {
										idsObj[key][field][`id_${i}`] = {
											value: objField[i]['id']
										}
									}*/
							}
						}
						/*for (let field of arrFields) {
							if (!!obj[field]) {
								idsObj[field] = []
								idsObj[key][field] = {}
								for (let arrObj of obj[field]) {
									idsObj[field].push(arrObj['id'])
								}
							}
						}*/
					ids.push(idsObj)
				}
		}
		return ids
	}

	getMasterIds = (flag, grdaJbzl, grdaJws, grdaJzs) => {

		let ids = undefined
		if (flag == 'save' && UUID_ENABLE) {
			let grdaJwsIds = [],
				grdaJzsIds = []
			if (!!grdaJws && !!grdaJwsIds)
				for (let obj of grdaJws) {
					grdaJwsIds.push(obj['id'])
				}
			if (!!grdaJzs && !!grdaJzsIds)
				for (let obj of grdaJzs) {
					grdaJzsIds.push(obj['id'])
				}

			let jwsLen = grdaJwsIds.length
			let jzsLen = grdaJzsIds.length
			let jwsIdsObj = {},
				jzsIdsObj = {}

			for (let i = 0; i < jwsLen; i++) {
				jwsIdsObj[`id_${i}`] = {
					value: grdaJwsIds[i]
				}
			}
			for (let i = 0; i < jzsLen; i++) {
				jzsIdsObj[`id_${i}`] = {
					value: grdaJzsIds[i]
				}
			}
			ids = {
				grdaJbzl: {
					id: {
						value: grdaJbzl['id'],
					}
				},
				grdaJws: jwsIdsObj,
				grdaJzs: jzsIdsObj,
			}
		}
		return ids
	}

	getIndividualNumbe = (addressArr, addrOther, flag) => {

		let addrArr = []
		if (addressArr) {
			addrArr = addressArr.slice(0)
			let idx = addrArr.indexOf("登峰街")
			if (idx > -1) {
				if (!addrArr[idx + 2]) {
					addrArr.splice(idx + 2, 1, null)
				}
			}
			addrArr.push(addrOther)
			let addressFields = FIELDS.grdaJbzl.addressFields
			let xzz_fields = addressFields.grda_xzz.slice(0)
			let hkdz_fields = addressFields.grda_hkdz.slice(0)

			if (flag == 'hkdz') {
				hkdz_fields.push('grda_hkdz_qt')
				this.props.getIndividualNumbe(addrArr, hkdz_fields)
			} else if (flag == 'xzz') {
				xzz_fields.push('grda_xzz_qt')
				this.props.getIndividualNumbe(addrArr, xzz_fields)
			} else {
				notify('warn', '警告', '您输入的现住址或户籍地址格式错误');
			}
		} else {
			this.props.getIndividualNumbe()
		}
		console.log('getIndividualNumbe', addressArr, addrOther, flag)
	}

	//检查基本档是否已经建立和提醒，按需关闭提交按钮加载状态
	judgeBAExistAndNotify = (activeKey, boolean) => {

		let grbh = this.getArchiveGrbh()
		let exist = !!grbh && !!grbh.value && !!this.props.phr.mastersaved
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

		let grbhObj = this.getArchiveGrbh()
		if (!!grbhObj && !!grbhObj.value && !!this.props.phr.mastersaved && targetKey !== 'Residentbpfb') {

			let grbh = grbhObj.value
			let isTag = this.isLabelTagArc(targetKey)
			if (isTag) {
				let tagArc = this.isLabelTagArc(targetKey, true)
				const name = tagArc.name
				const onOk = () => {
					this.props.delLabel(grbh, [tagArc.name])
					this.props.delLabelStore([tagArc.name])
					this.removeTarget(targetKey)
				}
				const onCancel = () => {}
				showConfirm(`是否移除 ${name} 标签？`, null, onOk, onCancel)
			} else {
				if (deleteAbled) {
					const name = this.getActiveName(targetKey)
					const spec = this.getSpecArcTypeByCName(name)
					const onOk = () => {
						const containKey = spec.containKey
						const recordKey = spec.recordKey

						const labels = this.props.phr[FIELDSN].labels
						if (!!labels && labels.constructor == Array && labels.includes(name.replace('专档', ''))) {
							this.props.delRecord(grbh, name)
							this.props.delRecordStore(containKey, recordKey)
						}
						this.removeTarget(targetKey)
					}
					const onCancel = () => {}
					showConfirm(`是否移除 ${name} 专档？`, null, onOk, onCancel)
				}
			}
		} else {
			this.removeTarget(targetKey)
		}

	}

	/*Tab remove target*/
	removeTarget = (targetKey) => {
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
		let tagArc = this.isLabelTagArc(tabKey, true)
		let isTagArc = !!tagArc && !!tagArc['labelTag']

		if (hasNotExist) {
			if (__DEBUG__ || this.judgeBAExistAndNotify(tabKey, true)) {
				if (isTagArc) {
					//标签档案
					const grbhObj = this.getArchiveGrbh()
					this.props.addLabel(grbhObj.value, [tagArc.name])
					this.addTab(tabKey)
				} else {
					this.addTab(tabKey)
				}
			} else return
		} else {
			if (isTagArc) {
				msg('warn', '标签已存在', 3)
			} else {
				msg('warn', '专档已存在', 3)
			}
		}
	}

	addTab = (tabKey) => {
		const arcType = this.state.arcType.slice(0);
		this.specArcType.forEach((specArc, index) => {
			if (specArc.key == tabKey) {
				arcType.push({
					name: specArc.name,
					content: specArc.content,
					key: tabKey
				});
				this.setState({
					activeKey: tabKey,
					arcType
				}, () => this.updateUStateText(this.props.phr.updatestate, tabKey));
			}
		})
	}

	/*获取激活档案名字*/
	getActiveName = (activeKey) => {
		const arcArr = this.state.arcType.filter(arc => arc.key == activeKey);
		const arc = this.getArcObj(arcArr)
		return arc.name
	}

	/*获取专档 通过containKey(json key)*/
	getSpecArcTypeByCKey = (ckey) => {
		const specArr = this.specArcType.filter(specArc => specArc.containKey == ckey);
		const spec = this.getArcObj(specArr)
		return spec
	}

	/*获取专档 通过专档名字name*/
	getSpecArcTypeByCName = (cname) => {
		const specArr = this.specArcType.filter(specArc => specArc.name == cname);
		const spec = this.getArcObj(specArr)
		return spec
	}

	/*获取专档 通过key*/
	getSpecArcTypeByKey = (key, boolean = true) => {
		const specArr = this.specArcType.filter(specArc => specArc.key == key);
		const spec = this.getArcObj(specArr, boolean)
		return spec
	}

	/*获取配置的档案对象 @boolean 是否校验*/
	getArcObj = (arcArr, boolean = true) => {
		if (boolean) {
			if (!arcArr || arcArr.length == 0) {
				throw Error('查询不到用户档案')
			} else if (arcArr.length != 1) {
				throw Error('用户档案数量异常')
			} else {
				return arcArr[0]
			}
		} else {
			return arcArr[0]
		}
	}

	/*判断是否标签档案 boolean是否返回对象*/
	isLabelTagArc = (key = this.state.activeKey, boolean = false) => {
		const spec = this.getSpecArcTypeByKey(key, false)
		if (boolean) {
			return spec
		}
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
			this.setState({
				spinning: false
			})
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
			operatText,
		})
	}

	routerPush = (pathname, query) => {
		console.log('ArchiveCollection routerPush', query)
		return this.context.router.push({
			pathname,
			query
		})
	}

	render() {

		const {
			phr
		} = this.props

		const {
			title,
			operatText,
			showFixSaveBtn,
			spinning
		} = this.state

		const sbComponent = (
			<Button
				type="primary"
				onClick={this.saveForm}
				loading={this.state.submitloading}
			>
				{operatText}
			</Button>
		)

		const isTag = this.isLabelTagArc()
		const hideSBCondition = isTag || this.state.activeKey === 'Residentbpfb'
		const saveBtn = showFixSaveBtn ? null : hideSBCondition ? null : sbComponent
		const fixSaveBtnSty = {
			float: 'right',
			marginRight: 25,
			position: 'fixed',
			right: 25,
			display: showFixSaveBtn ? 'block' : 'none'
		}
		const fixSaveBtn = hideSBCondition ? null : (
			<Affix offsetTop={141}>
				<div style={fixSaveBtnSty}>
    				<Badge status="processing" />
				    {sbComponent}
		 		</div>
		 	</Affix>
		)

		const moreSpecArc = (
			<Menu>
			    {
			    	this.specArcType.map((arc, index) => {
						if (!arc.hidden) {
							let link = (<a onClick = {() =>this.addSpecArcTab(arc.key)} >
											{arc.name}
										</a>)

							return (
								arc.key !== 'Residentbpfb' || this.state.showResidentbpfb || __DEBUG__ ?
							    <Menu.Item key={index} disabled={arc.disabled}>
						    		<a onClick = {() =>this.addSpecArcTab(arc.key)}>
								    	{	
								    		!!arc.labelTag ?
									    		<span>
													{arc.name} <Badge status="success" />
										  		</span>
									    	: arc.name
								    	}
									</a>
							    </Menu.Item>
							    : null
							)
						}
					})
				}
		  	</Menu>
		);

		const moreSpecArcDd = (
			<div>
				<Dropdown overlay={moreSpecArc} trigger={['click']}>
				    <a className="ant-dropdown-link">
				      添加专档 <Icon type="down" />
				    </a>
		  		</Dropdown>
		  		{getUrlVal().query != undefined 
		  			&& this.props.phr.updatestate ? (
		  			<div className="operate">
				      	<Button.Group>
			      			<Button type="ghost" onClick={() => this.routerPush('/phrs', getUrlVal())}>
					        	<Icon type="left" />返回
					      	</Button>
			  			 	<Button type="primary" onClick={() => {
			  			 		this.props.clearStore({
				  			 		updatestate: false,
				  			 	})
				  			 	this.setState({
									activeKey: this.arcType[0].key,
									arcType: this.arcType,
									submitloading: false,
									title: undefined,
									operatText: undefined,
									showFixSaveBtn: false
				  			 	})
			  			 	}}>
					        	录入下一条
					      	</Button>
				        </Button.Group>
			  		</div>
		  		) : null}
		  		
	  		</div>
		)

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

		const shortcut_tips = () => {
			let logintime = localStorage.getItem(LOGINTIME)
			let shortcut_tips_cs = localStorage.getItem('shortcut_tips_cs')

			return (__DEBUG__ || !shortcut_tips_cs || logintime != shortcut_tips_cs) ?
				< Alert
			key = {
				Date.now()
			}
			message = {
				`${SHORTCUT_SUBMIT_ARCHIVES} 快速 ${operatText}`
			}
			type = "info"
			closeText = "不再提醒"
			onClose = {
				() => {
					//set shortcut tip close timestamp
					localStorage.setItem('shortcut_tips_cs', logintime)
				}
			}
			showIcon / > : null
		}

		return (
			<QueueAnim delay={10}>
				<Spin spinning={spinning}>
					{fixSaveBtn}
					<div className='module' key="tabs">
						{shortcut_tips()}
						<Card title={title} extra={moreSpecArcDd}>
							<Tabs
								animated={TAB_ANIMATED}
								hideAdd
								onChange={this.changeTab}
								activeKey={this.state.activeKey}
								type="editable-card"
								onEdit={this.onTabEdit}
								defaultActiveKey="1"
								tabBarExtraContent={saveBtn}
							>
								{tabpane}
							</Tabs>
						</Card>
					</div>
				</Spin>
			</QueueAnim>
		)
	}
}

ArchiveCollection.propTypes = {
	getAreaConfig: PropTypes.func.isRequired,

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
	delRecord: PropTypes.func.isRequired,
	delRecordStore: PropTypes.func.isRequired,
	delLabelStore: PropTypes.func.isRequired,

	changeState: PropTypes.func.isRequired,
	clearStore: PropTypes.func.isRequired,
	saveFieldsChange: PropTypes.func.isRequired,
	queryPHR: PropTypes.func.isRequired,
	getIndividualNumbe: PropTypes.func.isRequired,
	changeSubmitLoad: PropTypes.func.isRequired,
	changeMasterSaved: PropTypes.func.isRequired,
	phr: PropTypes.object.isRequired
}

ArchiveCollection.contextTypes = {
	router: React.PropTypes.object.isRequired
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