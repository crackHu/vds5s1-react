const DATE_PATTERN = 'yyyy-MM-dd'
const DATE_PATTERN_DETAIL = 'yyyy-MM-dd hh:mm:ss'

const CrudTable = {
	columns: [{
		title: '姓名',
		dataIndex: 'grdaXm',
		key: 'grdaXm',
	}, {
		title: '性别',
		dataIndex: 'grdaXb',
		key: 'grdaXb',
	}, {
		title: '出生日期',
		dataIndex: 'grdaCsrq',
		key: 'grdaCsrq',
		render: {
			format: DATE_PATTERN,
		}
	}, {
		custom: true,
		title: '现住址',
		joinColumn: ['grdaXzzSmc', 'grdaXzzQxmc', 'grdaXzzJdzmc', 'grdaXzzJwcmc', 'grdaXzzQt']
	}, {
		custom: true,
		title: '居民类型',
		groupIcon: {
			grdaIsDing: {
				default: 'not-dingding',
				0: 'not-dingding',
				1: 'dingding'
			},
			grdaIsWechat: {
				default: 'not-weixin',
				0: 'not-weixin',
				1: 'weixin'
			},
			grdaIsPhone: {
				default: 'not-phone',
				0: 'not-phone',
				1: 'phone'
			},
		}
	}]
}

const AdvancedSearchForm = {
	formItemLayout: {
		labelCol: {
			span: 6
		},
		wrapperCol: {
			span: 18
		},
	},
	item: [{
		label: '员工姓名',
		name: 'name',
		type: 'select',
		optionSessionStorageProperty: 'employee',
		options: [{"value":"方炎雄"},{"value":"许嘉莉"},{"value":"何锡川"},{"value":"黄东斌2"},{"value":"陈喆"},{"value":"李治中"},{"value":"郑叶舒"},{"value":"吴尉佳"},{"value":"邬捷卫"},{"value":"苏丹丹"},{"value":"詹锦媛"},{"value":"陈颍"},{"value":"李高伟"},{"value":"杨永"},{"value":"周志满"},{"value":"胡永钢"},{"value":"朱灿奕"}],
		config: {
			placeholder: '请选择员工姓名',
		}
	}, {
		label: '状态',
		name: 'status',
		type: 'select',
		optionSessionStorageProperty: 'status',
		options: [{"value":"未完成"},{"value":"已完成"}],
		config: {
			placeholder: '请选择项目状态',
		}
	}, {
		label: '短信用户名称',
		name: 'smsCpName',
		required: true,
		message: '不能为空',
		type: 'input',
		hidden: true,
		config: {
			placeholder: '请输入短信用户名称',
		}
	}, {
		label: 'appkey',
		name: 'smsCpAppKey',
		required: true,
		message: '不能为空',
		type: 'select',
		hidden: true,
		options: [{
			value: '111',
		}, {
			value: '222'
		}],
		config: {
			placeholder: '请输入短信用户appkey',
		}
	}, {
		label: 'secret',
		name: 'smsCpSecret',
		type: 'input',
		required: true,
		message: '不能为空',
		hidden: true,
		config: {
			placeholder: '请输入短信用户secret',
		}
	}, {
		label: '创建时间',
		name: 'smsCreateTime',
		type: 'datepicker',
		format: DATE_PATTERN,
		required: true,
		message: '不能为空',
		hidden: true,
		config: {
			showTime: true,
			style: {
				width: 197.33
			},
			placeholder: '请输入短信用户secret',
		}
	}, {
		label: '修改时间',
		name: 'smsModifyTime',
		type: 'datepicker',
		format: DATE_PATTERN,
		required: true,
		message: '不能为空',
		hidden: true,
		config: {
			showTime: true,
			style: {
				width: 197.33
			},
			placeholder: '请输入短信用户secret',
		}
	}, ]
}

module.exports = {
	CrudTable,
	AdvancedSearchForm,
}