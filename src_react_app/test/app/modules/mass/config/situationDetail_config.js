const DATE_PATTERN = 'yyyy-MM-dd'
const DATE_PATTERN_DETAIL = 'yyyy-MM-dd hh:mm:ss'

const CrudTable = {
	columns: [{
		title: '姓名',
		dataIndex: 'infoName',
		key: 'infoName',
	}, {
		title: '创建时间',
		dataIndex: 'infoCreateTime',
		key: 'infoCreateTime',
		render: {
			format: DATE_PATTERN_DETAIL,
		}
	}, {
		title: '发送时间',
		dataIndex: 'infoSendTime',
		key: 'infoSendTime',
		render: {
			format: DATE_PATTERN_DETAIL,
		}
	}, {
		title: '发送方式',
		dataIndex: 'infoSendType',
		key: 'infoSendType',
		render: {
			switch: true,
			condition: {
				1: '微信',
				2: '钉钉',
				3: '手机'
			}
		}
	}, {
		title: '发送情况',
		dataIndex: 'infoSendMsg',
		key: 'infoSendMsg',
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