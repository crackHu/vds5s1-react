/**************档案配置**************/
export const ARC_TYPE_CONFIG = {
	arcType: [{
		name: "个人基本信息表",
		content: 'Archive/PersonalDetailForm',
		key: "personalDetail",
		containKey: "grdaJbzl",
		sub: [{
			name: "一般情况",
			content: 'Archive/GeneralSituationForm',
			key: "generalSituation",
			containKey: "grdaJws",
		}, {
			name: "家族史与生活情况",
			content: 'Archive/FamiLivelHistoryFrom',
			key: "famiLivelHistory",
			containKey: "grdaJzs",
		}]
	}, {
		name: "健康体检表",
		content: 'Archive/HealthMedicalForm',
		key: "healthMedical",
		containKey: "grdaJkzk",
		sub: [{
			name: "体检表1",
			content: 'Archive/MedicalTable/MedicalTable1',
			key: "medicalTable1",
			containKey: "grdaJws",
		}, {
			name: "体检表2",
			content: 'Archive/MedicalTable/MedicalTable2',
			key: "medicalTable2",
			containKey: "grdaJws",
		}, {
			name: "体检表3",
			content: 'Archive/MedicalTable/MedicalTable3',
			key: "medicalTable3",
			containKey: "grdaJws",
		}, {
			name: "体检表4",
			content: 'Archive/MedicalTable/MedicalTable4',
			key: "medicalTable4",
			containKey: "grdaJws",
		}, {
			name: "体检表5",
			content: 'Archive/MedicalTable/MedicalTable5',
			key: "medicalTable5",
			containKey: "grdaJws",
		}, {
			name: "体检表6",
			content: 'Archive/MedicalTable/MedicalTable6',
			key: "medicalTable6",
			containKey: "grdaJws",
		}, ]
	}],
	specArcType: [{
		name: "高血压专档",
		content: 'SpecialArchive/HypertensionForm',
		key: "hypertension",
		containKey: 'gxyJxb',
	}, {
		name: "糖尿病专档",
		content: 'SpecialArchive/DiabetesForm',
		key: "diabetes",
		containKey: 'tnbSfjl'
	}, {
		name: "老年人专档",
		content: 'SpecialArchive/AgedForm',
		key: "aged",
		containKey: 'lnrSfb',
	}, {
		name: "肿瘤病",
		content: 'SpecialArchive/OncosisForm',
		key: "oncosis",
		containKey: "oncosis"
	}, {
		name: "残疾人",
		content: 'SpecialArchive/HandicappedForm',
		key: "handicapped",
		containKey: "handicapped"
	}, {
		name: "女性保健专档",
		content: 'SpecialArchive/FemalecareForm',
		key: "femalecare",
		containKey: "femalecare"
	}, {
		name: "孕产妇专档",
		content: 'SpecialArchive/MaternalForm',
		key: "maternal",
		containKey: "maternal",
	}, {
		name: "钉钉医疗档案",
		content: 'SpecialArchive/DDMedicalForm',
		key: "ddmedical",
		containKey: "ddmedical"
	}]
}

/**************表单控件配置**************/
//档案表单
export const ARC_FORM_WIDGET_CONFIG = {
	selectOption: {

		/*True or false*/
		tof: [{
			key: 'true',
			value: '是'
		}, {
			key: 'false',
			value: '否'
		}],

		/*性别*/
		sex: [{
			key: 'male',
			value: '男'
		}, {
			key: 'female',
			value: '女'
		}, {
			key: 'unknown',
			value: '未知的性别'
		}],

		/*常住类型 居住类型*/
		permanentType: [{
			key: 'jurisdiction',
			value: '户籍（辖区）'
		}, {
			key: 'nojurisdiction',
			value: 'test'
		}],

		/*档案状态*/
		archiveStatus: [{
			key: '1',
			value: '在册'
		}, {
			key: '0',
			value: '不在册'
		}],

		/*民族*/
		"nationality": [{
			"key": "01",
			"value": "汉族"
		}, {
			"key": "02",
			"value": "蒙古族"
		}, {
			"key": "03",
			"value": "回族"
		}, {
			"key": "04",
			"value": "藏族"
		}, {
			"key": "05",
			"value": "维吾尔族"
		}, {
			"key": "06",
			"value": "苗族"
		}, {
			"key": "07",
			"value": "彝族"
		}, {
			"key": "08",
			"value": "壮族"
		}, {
			"key": "09",
			"value": "布依族"
		}, {
			"key": "10",
			"value": "朝鲜族"
		}, {
			"key": "11",
			"value": "满族"
		}, {
			"key": "12",
			"value": "侗族"
		}, {
			"key": "13",
			"value": "瑶族"
		}, {
			"key": "14",
			"value": "白族"
		}, {
			"key": "15",
			"value": "土家族"
		}, {
			"key": "16",
			"value": "哈尼族"
		}, {
			"key": "17",
			"value": "哈萨克族"
		}, {
			"key": "18",
			"value": "傣族"
		}, {
			"key": "19",
			"value": "黎族"
		}, {
			"key": "20",
			"value": "傈僳族"
		}, {
			"key": "21",
			"value": "佤族"
		}, {
			"key": "22",
			"value": "畲族"
		}, {
			"key": "23",
			"value": "高山族"
		}, {
			"key": "24",
			"value": "拉祜族"
		}, {
			"key": "25",
			"value": "水族"
		}, {
			"key": "26",
			"value": "东乡族"
		}, {
			"key": "27",
			"value": "纳西族"
		}, {
			"key": "28",
			"value": "景颇族"
		}, {
			"key": "29",
			"value": "柯尔克孜族"
		}, {
			"key": "30",
			"value": "土族"
		}, {
			"key": "31",
			"value": "达斡尔族"
		}, {
			"key": "32",
			"value": "仫佬族"
		}, {
			"key": "33",
			"value": "羌族"
		}, {
			"key": "34",
			"value": "布朗族"
		}, {
			"key": "35",
			"value": "撒拉族"
		}, {
			"key": "36",
			"value": "毛难族"
		}, {
			"key": "37",
			"value": "仡佬族"
		}, {
			"key": "38",
			"value": "锡伯族"
		}, {
			"key": "39",
			"value": "阿昌族"
		}, {
			"key": "40",
			"value": "普米族"
		}, {
			"key": "41",
			"value": "塔吉克族"
		}, {
			"key": "42",
			"value": "怒族"
		}, {
			"key": "43",
			"value": "乌孜别克族"
		}, {
			"key": "44",
			"value": "俄罗斯族"
		}, {
			"key": "45",
			"value": "鄂温克族"
		}, {
			"key": "46",
			"value": "崩龙族"
		}, {
			"key": "47",
			"value": "保安族"
		}, {
			"key": "48",
			"value": "裕固族"
		}, {
			"key": "49",
			"value": "京族"
		}, {
			"key": "50",
			"value": "塔塔尔族"
		}, {
			"key": "51",
			"value": "独龙族"
		}, {
			"key": "52",
			"value": "鄂伦春族"
		}, {
			"key": "53",
			"value": "赫哲族"
		}, {
			"key": "54",
			"value": "门巴族"
		}, {
			"key": "55",
			"value": "珞巴族"
		}, {
			"key": "56",
			"value": "基诺族"
		}],

		/*血型*/
		bloodType: [{
			key: "AT",
			value: "A型"
		}, {
			key: "BT",
			value: "B型"
		}, {
			key: "OT",
			value: "O型"
		}],

		/*RH阴性*/
		rhNegative: [{
			key: 'panda',
			value: '是'
		}, {
			key: 'nopanda',
			value: 'test'
		}],

		/*文化程度*/
		lvOfEducation: [{
			key: 'college',
			value: '大专'
		}, {
			key: 'Undergraduate',
			value: '本科'
		}],

		/*职业*/
		profession: [{
			key: 'waiter',
			value: '商业  人员'
		}, {
			key: 'technicist',
			value: '技术人员'
		}],

		/*婚姻状况*/
		maritalStatus: [{
			key: '已婚',
			value: '已婚'
		}, {
			key: '未婚',
			value: '未婚'
		}],

		/*既往史 类别*/
		diseaseType: [{
			value: '疾病'
		}, {
			value: '手术'
		}, {
			value: '外伤'
		}, {
			value: '输血'
		}],

		/*既往史 疾病名称*/
		diseaseName: [{
			value: '无'
		}, {
			value: '高血压'
		}, {
			value: '糖尿病'
		}, {
			value: '冠心病'
		}, {
			value: '慢性阻塞性肺疾病'
		}, {
			value: '恶性肿瘤'
		}, {
			value: '脑卒中'
		}, {
			value: '重性精神疾病'
		}, {
			value: '结核病'
		}, {
			value: '肝炎'
		}, {
			value: '其他法定传染病'
		}, {
			value: '职业病'
		}, {
			value: '其他'
		}],

		/*家庭史 成员类别*/
		memberType: [{
			value: '父亲'
		}, {
			value: '母亲'
		}, {
			value: '兄弟姐妹'
		}, {
			value: '子女'
		}],

		/*家庭史 疾病名称*/
		sicknessName: [{
			value: '无'
		}, {
			value: '高血压'
		}, {
			value: '糖尿病'
		}, {
			value: '冠心病'
		}, {
			value: '慢性阻塞性肺疾病'
		}, {
			value: '恶性肿瘤'
		}, {
			value: '脑卒中'
		}, {
			value: '重性精神疾病'
		}, {
			value: '结核病'
		}, {
			value: '肝炎'
		}, {
			value: '先天畸形'
		}, {
			value: '其他'
		}],

		/*家族史 厨房排风设施*/
		ventilationFacilities: [{
			value: '无'
		}, {
			value: '抽油烟'
		}, {
			value: '换气扇'
		}, {
			value: '烟囱'
		}],

		/*家族史 燃料类型*/
		fuelType: [{
			value: '液化气'
		}, {
			value: '煤'
		}, {
			value: '天然气'
		}, {
			value: '沼气'
		}, {
			value: '柴火'
		}, {
			value: '其他'
		}],

		/*家族史 饮水*/
		drinking: [{
			value: '自来水'
		}, {
			value: '经净化过滤的水'
		}, {
			value: '井水'
		}, {
			value: '河湖水'
		}, {
			value: '塘水'
		}, {
			value: '其他'
		}],

		/*家族史 厕所*/
		toilet: [{
			value: '卫生厕所'
		}, {
			value: '一格或二格粪池式'
		}, {
			value: '马桶'
		}, {
			value: '露天粪坑'
		}, {
			value: '简易棚厕'
		}],

		/*家族史 禽畜栏*/
		livestock: [{
			value: '单设'
		}, {
			value: '室内'
		}, {
			value: '室外'
		}, {
			value: '无'
		}],

		/*健康体检表 一般状况 健康状态自我评估*/
		healthSelfAss: [{
			value: '满意'
		}, {
			value: '基本满意'
		}, {
			value: '说不清楚'
		}, {
			value: '太不满意'
		}, {
			value: '不满意'
		}],

		/*健康体检表 一般状况 自理能力自我评估*/
		abilitySelfAss: [{
			value: '可自理(0~3分)'
		}, {
			value: '轻度依赖(4~8分)'
		}, {
			value: '中度依赖(9~18分)'
		}, {
			value: '不能自理(≥19分)'
		}],

		/*健康体检表 一般状况 认识能力*/
		understandAbility: [{
			value: '粗筛阴性'
		}, {
			value: '粗筛阳性'
		}],

		/*健康体检表 一般状况 情感状态*/
		emotionalState: [{
			value: '粗筛阴性'
		}, {
			value: '粗筛阳性'
		}],

		/*健康体检表 生活方式 锻炼频率*/
		exerciseFrequency: [{
			value: '每天'
		}, {
			value: '每周一次以上'
		}, {
			value: '偶尔'
		}, {
			value: '不锻炼'
		}],

		/*健康体检表 生活方式 饮食习惯*/
		eatingHabits: [{
			value: '荤素均衡'
		}, {
			value: '荤食为主'
		}, {
			value: '素食为主'
		}, {
			value: '嗜盐'
		}, {
			value: '嗜油'
		}, {
			value: '嗜糖'
		}],

		/*健康体检表 生活方式 吸烟状况*/
		smokingStatus: [{
			value: '从不吸烟'
		}, {
			value: '已戒烟'
		}, {
			value: '吸烟'
		}, {
			value: '被动吸烟'
		}],

		/*健康体检表 生活方式 饮酒频率*/
		drinkingFrequency: [{
			value: '从不'
		}, {
			value: '偶尔'
		}, {
			value: '经常'
		}, {
			value: '每天'
		}],

		/*健康体检表 生活方式 是否戒酒*/
		isGiveUpDrinking: [{
			value: '未戒酒'
		}, {
			value: '已戒酒'
		}],

		/*健康体检表 生活方式 一年内是否醉酒*/
		isDrunk: [{
			value: '是'
		}, {
			value: '否'
		}],

		/*健康体检表 生活方式 职业病危害因素接触史*/
		hazardFactors: [{
			value: '无'
		}, {
			value: '有'
		}],
	},

	/*现住址*/
	cascadeOptions: {
		curAddress: [{
			value: '广州市',
			label: '广州市',
			children: [{
				value: '越秀区',
				label: '越秀区',
				children: [{
					value: '大东街',
					label: '大东街',
					children: [{
						value: '署前',
						label: '署前',
						children: [{
							value: '庙前西街',
							label: '庙前西街',
						}],
					}],
				}, {
					value: '启明',
					label: '启明',
					children: [{
						value: '启明一马路',
						label: '启明一马路'
					}],
				}],
			}],
		}],

		/*户籍地址*/
		censusRegister: [{
			value: '广东省',
			label: '广东省',
			children: [{
				value: '广州市',
				label: '广州市',
				children: [{
					value: '越秀',
					label: '越秀',
					children: [{
						value: '大东街',
						label: '大东街',
						children: [{
							value: '署前',
							label: '署前',
							children: [{
								value: '庙前西街',
								label: '庙前西街',
							}],
						}],
					}],
				}],
			}]
		}]
	},
	checkboxGroupOptions: {

		/*医疗费用支付方式*/
		medicalPayMethod: [{
			key: 'a',
			label: '城镇职工基本医疗保险',
			value: '城镇职工基本医疗保险'
		}, {
			key: 'b',
			label: '城镇居民基本医疗保险',
			value: '城镇居民基本医疗保险'
		}, {
			key: 'c',
			label: '新型农村合作医疗',
			value: '新型农村合作医疗'
		}, {
			key: 'd',
			label: '贫困救助',
			value: '贫困救助'
		}, {
			key: 'e',
			label: '商业医疗保险',
			value: '商业医疗保险'
		}, {
			key: 'f',
			label: '全公费',
			value: '全公费'
		}, {
			key: 'h',
			label: '全自费',
			value: '全自费'
		}],

		/*药物过敏*/
		drugAllergy: [{
			key: 'adrenaline',
			label: '肾上腺素',
			value: '肾上腺素'
		}, {
			key: 'a',
			label: '大姨妈素',
			value: '大姨妈素'
		}, {
			key: 'b',
			label: '肾上腺素',
			value: '肾上腺素1'
		}],

		/*暴露史*/
		exposureHistory: [{
			key: 'poison',
			label: 'aa',
			value: '毒物'
		}, {
			key: 'radial',
			label: 'bb',
			value: '射线'
		}],

		/*家族史 残疾情况*/
		disability: [{
			key: 'eye',
			label: 'bb',
			value: '视力残疾'
		}, {
			key: 'ear',
			label: 'cc',
			value: '听力残疾'
		}, {
			key: 'language',
			label: 'dd',
			value: '言语残疾'
		}, {
			key: 'body',
			label: 'ee',
			value: '肢体残疾'
		}, {
			key: 'intelligence',
			label: 'ff',
			value: '智力残疾'
		}, {
			key: 'mind',
			label: 'gg',
			value: '精神残疾'
		}],

		/*健康体检表 症状*/
		symptoms: [{
			key: '无症状',
			label: '无症状',
			value: '无症状'
		}, {
			key: '头疼',
			label: '头疼',
			value: '头疼'
		}, {
			key: '头晕',
			label: '头晕',
			value: '头晕'
		}, {
			key: '心悸',
			label: '心悸',
			value: '心悸'
		}, {
			key: '胸闷',
			label: '胸闷',
			value: '胸闷'
		}, {
			key: '胸痛',
			label: '胸痛',
			value: '胸痛'
		}, {
			key: '慢性咳嗽',
			label: '慢性咳嗽',
			value: '慢性咳嗽'
		}, {
			key: '咳痰',
			label: '咳痰',
			value: '咳痰'
		}, {
			key: '呼吸困难',
			label: '呼吸困难',
			value: '呼吸困难'
		}, {
			key: '多饮',
			label: '多饮',
			value: '多饮'
		}, {
			key: '多尿',
			label: '多尿',
			value: '多尿'
		}, {
			key: '体重下降',
			label: '体重下降',
			value: '体重下降'
		}, {
			key: '乏力',
			label: '乏力',
			value: '乏力'
		}, {
			key: '关节肿痛',
			label: '关节肿痛',
			value: '关节肿痛'
		}, {
			key: '视力模糊',
			label: '视力模糊',
			value: '视力模糊'
		}, {
			key: '手脚麻木',
			label: '手脚麻木',
			value: '手脚麻木'
		}, {
			key: '尿急',
			label: '尿急',
			value: '尿急'
		}, {
			key: '尿痛',
			label: '尿痛',
			value: '尿痛'
		}, {
			key: '便秘',
			label: '便秘',
			value: '便秘'
		}, {
			key: '腹泻',
			label: '腹泻',
			value: '腹泻'
		}, {
			key: '恶心呕吐',
			label: '恶心呕吐',
			value: '恶心呕吐'
		}, {
			key: '眼花',
			label: '眼花',
			value: '眼花'
		}, {
			key: '耳鸣',
			label: '耳鸣',
			value: '耳鸣'
		}, {
			key: '乳房胀痛',
			label: '乳房胀痛',
			value: '乳房胀痛'
		}, ],

		/*健康体检表 生活方式 饮酒种类*/
		drinkingKinds: [{
			key: '白酒',
			label: '白酒',
			value: '白酒'
		}, {
			key: '啤酒',
			label: '啤酒',
			value: '啤酒'
		}, {
			key: '红酒',
			label: '红酒',
			value: '红酒'
		}, {
			key: '黄酒',
			label: '黄酒',
			value: '黄酒'
		}],

		/*健康体检表 生活方式 毒物种类*/
		poisonKinds: [{
			key: '粉尘',
			label: '粉尘',
			value: '粉尘'
		}, {
			key: '放射物质',
			label: '放射物质',
			value: '放射物质'
		}, {
			key: '物理因素',
			label: '物理因素',
			value: '物理因素'
		}, {
			key: '化学物质',
			label: '化学物质',
			value: '化学物质'
		}],


	}
}

//高级搜索表单控件
export const AS_FORM_WIDGET_CONFIG = {

	selectOption: {

		/*性别*/
		sex: [{
			key: 'male',
			value: '男'
		}, {
			key: 'female',
			value: '女'
		}],

		/*常住类型 居住类型*/
		permanentType: [{
			key: 'jurisdiction',
			value: '户籍（辖区）'
		}, {
			key: 'nojurisdiction',
			value: 'test'
		}],

		/*档案状态*/
		archiveStatus: [{
			key: '1',
			value: '在册'
		}, {
			key: '0',
			value: '不在册'
		}],

		/*档案类型（所属专档、排除专档）*/
		specArcType: [{
			key: "hypertension",
			value: "高血压专档",
		}, {
			key: "diabetes",
			value: "糖尿病专档",
		}, {
			key: "aged",
			value: "老年人专档",
		}, {
			key: "oncosis",
			value: "肿瘤病",
		}, {
			key: "handicapped",
			value: "残疾人",
		}, {
			key: "femalecare",
			value: "女性保健专档",
		}, {
			key: "maternal",
			value: "孕产妇专档",
		}, {
			key: "ddmedical",
			value: "钉钉医疗档案",
		}]
	}
}

/**************个人档案列表每页条数配置**************/
export const ARCHIVE_LIST_PAGESIZE = 10

/**************个人基本信息表字段配置**************/
export const PERSONALDETAIL_FIELDS_CONFIG = {
	name: 'PHR_FIELDS_DATA',
	fieldsKey: {
		grdaJbzl: 'grdaJbzl',
		grdaJws: 'grdaJws',
		grdaJzs: 'grdaJzs',
		grdaJkzk: {
			grdaFmyjzs: 'grdaFmyjzs',
			grdaZyyyqk: 'grdaZyyyqk',
			grdaZyzlqk: 'grdaZyzlqk',
			grdaWtml: 'grdaWtml'
		},
		lnrSfb: 'lnrSfb',
		gxyJxb: 'gxyJxb',
		tnbSfjl: 'tnbSfjl'
	},
	grdaJbzl: {
		name: 'grdaJbzl',
		dateFields: [
			'grda_csrq',
			'grda_jdrq',
			'grda_lrrq',
		],
		addressFields: {
			grda_xzz: [
				/*现住址_市名称*/
				'grda_xzz_smc',
				/*现住址_区(县)名称*/
				'grda_xzz_qxmc',
				/*现住址_街道(镇)名称*/
				'grda_xzz_jdzmc',
				/*现住址_居委(村)名称*/
				'grda_xzz_jwcmc',
				/*现住址_路(街)名称*/
				'grda_xzz_ljmc',
			],
			grda_hkdz: [
				/*户口地址_省份名称*/
				'grda_hkdz_xfmc',
				/*户口地址_市名称*/
				'grda_hkdz_smc',
				/*户口地址_区(县)名称*/
				'grda_hkdz_qxmc',
				/*户口地址_街道(镇)名称*/
				'grda_hkdz_jdzmc',
				/*户口地址_居委(村)名称*/
				'grda_hkdz_jwcmc',
				/*户口地址_路_街_名称*/
				'grda_hkdz_ljmc',
			]
		},
		multiFields: [
			/*医疗费用支付方式*/
			'grda_ylfdxs',
			/*过敏物质*/
			'grda_gmwz',
			/*暴露史*/
			'grda_zyblqk',
		],
		fields: [
			/*姓名*/
			'grda_xm',
			/*个人编号*/
			'grbh',

			/*性别*/
			'grda_xb',
			/*出生日期*/
			'grda_csrq',
			/*身份证号码*/
			'grda_sfzhm',
			/*民族名称*/
			'grda_mzmc',

			/*现住址*/
			'grda_xzz',

			/*现住址_市名称*/
			'grda_xzz_smc',
			/*现住址_区(县)名称*/
			'grda_xzz_qxmc',
			/*现住址_街道(镇)名称*/
			'grda_xzz_jdzmc',
			/*现住址_居委(村)名称*/
			'grda_xzz_jwcmc',
			/*现住址_路(街)名称*/
			'grda_xzz_ljmc',

			/*现住址_其它*/
			'grda_xzz_qt',

			/*常住类型*/
			'grda_hklx',

			/*户口地址*/
			'grda_hkdz',

			/*户口地址_省份名称*/
			'grda_hkdz_xfmc',
			/*户口地址_市名称*/
			'grda_hkdz_smc',
			/*户口地址_区(县)名称*/
			'grda_hkdz_qxmc',
			/*户口地址_街道(镇)名称*/
			'grda_hkdz_jdzmc',
			/*户口地址_居委(村)名称*/
			'grda_hkdz_jwcmc',
			/*户口地址_路_街_名称*/
			'grda_hkdz_ljmc',

			/*户口地址_其它*/
			'grda_hkdz_qt',
			/*婚姻状况*/
			'grda_hys',

			/*本人电话*/
			'grda_brdh',
			/*联系人姓名*/
			'grda_lxrxm',
			/*联系人电话*/
			'grda_lxrdh',
			/*档案状态*/
			'grda_dazt',

			/*血型I*/
			'grda_xxfli',
			/*RH阴性*/
			'grda_xxflii',
			/*职业*/
			'grda_zygzmc',

			/*工作单位*/
			'grda_gzdw',
			/*文化程度*/
			'grda_whcd',

			/*医疗费用支付方式*/
			'grda_ylfdxs',

			/*药物过敏*/
			'grda_gms',
			/*过敏物质*/
			'grda_gmwz',
			/*暴露史*/
			'grda_zyblqk',

			/*建档人*/
			'grda_jdys',
			/*建档日期*/
			'grda_jdrq',
			/*录入人*/
			'grda_lrr',
			/*录入日期*/
			'grda_lrrq',

			/*家族史选项卡*/
			/*残疾情况*/
			'grda_cjqk',
			/*遗传病史*/
			'grda_ycbsjbmc',
			/*残疾情况*/
			'grda_cjqk',
			/*厨房排风设施*/
			'grda_cfpfss',
			/*燃料类型*/
			'grda_rllx',
			/*饮水*/
			'grda_ys',
			/*厕所*/
			'grda_cs',
			/*禽畜栏*/
			'grda_csl'

		]
	},
	grdaJws: {
		name: 'grdaJws',
		dateFields: [
			'qzne',
		],
		fields: [
			/*类别*/
			'lb',
			/*疾病名称*/
			'jbmc',
			/*时间*/
			'qzne',
			/*备注*/
			'jzyymc',
		]
	},
	grdaJzs: {
		name: 'grdaJzs',
		fields: [
			/*成员类别*/
			'cylb',
			/*疾病名称*/
			'jbmc',
			/*备注*/
			'bz',
		]
	},
}