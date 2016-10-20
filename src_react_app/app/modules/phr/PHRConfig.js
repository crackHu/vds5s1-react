/**************档案配置**************/
export const ARC_TYPE_CONFIG = {
	arcType: [{
		name: "个人基本信息表",
		content: 'Archive/PersonalDetailForm',
		key: "personalDetail",
		containKey: "grdaJbzl",
		disabled: false,
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
		disabled: false,
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
		disabled: false,
	}, {
		name: "糖尿病专档",
		content: 'SpecialArchive/DiabetesForm',
		key: "diabetes",
		containKey: 'tnbSfjl',
		disabled: false,
	}, {
		name: "老年人专档",
		content: 'SpecialArchive/AgedForm',
		key: "aged",
		containKey: 'lnrSfb',
		disabled: false,
	}, {
		name: "肿瘤病",
		content: 'SpecialArchive/OncosisForm',
		key: "oncosis",
		containKey: "oncosis",
		disabled: true,
	}, {
		name: "残疾人",
		content: 'SpecialArchive/HandicappedForm',
		key: "handicapped",
		containKey: "handicapped",
		disabled: true,
	}, {
		name: "女性保健专档",
		content: 'SpecialArchive/FemalecareForm',
		key: "femalecare",
		containKey: "femalecare",
		disabled: true,
	}, {
		name: "孕产妇专档",
		content: 'SpecialArchive/MaternalForm',
		key: "maternal",
		containKey: "maternal",
		disabled: true,
	}, {
		name: "钉钉医疗档案",
		content: 'SpecialArchive/DDMedicalForm',
		key: "ddmedical",
		containKey: "ddmedical",
		disabled: true,
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

		/*健康体检表 脏器功能 口唇*/
		oral: [{
			value: '红润'
		}, {
			value: '苍白'
		}, {
			value: '发绀'
		}, {
			value: '皲裂'
		}, {
			value: '疱疹'
		}],

		/*健康体检表 脏器功能 齿列*/
		dentition: [{
			value: '正常'
		}, {
			value: '缺齿'
		}, {
			value: '龋齿'
		}, {
			value: '义齿(假牙)'
		}],

		/*健康体检表 脏器功能 咽部*/
		pharyngeal: [{
			value: '无充血'
		}, {
			value: '充血'
		}, {
			value: '淋巴滤泡增生'
		}],

		/*健康体检表 脏器功能 听力*/
		hearing: [{
			value: '听见'
		}, {
			value: '听不清或无法听见'
		}],

		/*健康体检表 脏器功能 运动能力*/
		sportsAbility: [{
			value: '可顺利完成'
		}, {
			value: '无法独立完成其中任何一个动作'
		}],

		/*健康体检表 查体 眼底*/
		fundus: [{
			value: '正常'
		}, {
			value: '异常'
		}],

		/*健康体检表 查体 皮肤*/
		skin: [{
			value: '正常'
		}, {
			value: '潮红'
		}, {
			value: '苍白'
		}, {
			value: '发绀'
		}, {
			value: '黄染	'
		}, {
			value: '色素沉着'
		}],

		/*健康体检表 查体 巩膜*/
		sclera: [{
			value: '正常'
		}, {
			value: '黄染'
		}, {
			value: '充血'
		}],

		/*健康体检表 查体 淋巴结*/
		lymph: [{
			value: '未触及'
		}, {
			value: '锁骨上'
		}, {
			value: '腋窝'
		}],

		/*健康体检表 肺 桶状胸*/
		barrelChest: [{
			value: '是'
		}, {
			value: '否'
		}],

		/*健康体检表 肺 呼吸音*/
		breathSounds: [{
			value: '正常'
		}, {
			value: '异常'
		}],

		/*健康体检表 肺 罗音*/
		rale: [{
			value: '无'
		}, {
			value: '干罗音'
		}, {
			value: '湿罗音'
		}],

		/*健康体检表 心脏 心律*/
		rhythm: [{
			value: '齐'
		}, {
			value: '不齐'
		}, {
			value: '绝对不齐'
		}],

		/*健康体检表 心脏 杂音*/
		noise: [{
			value: '无'
		}, {
			value: '有'
		}],

		/*健康体检表 腹部 压痛*/
		tenderness: [{
			value: '无'
		}, {
			value: '有'
		}],

		/*健康体检表 腹部 包块*/
		piece: [{
			value: '无'
		}, {
			value: '有'
		}],

		/*健康体检表 腹部 肝大*/
		hepatomegaly: [{
			value: '无'
		}, {
			value: '有'
		}],

		/*健康体检表 腹部 脾大*/
		splenomegaly: [{
			value: '无'
		}, {
			value: '有'
		}],

		/*健康体检表 移动性浊音*/
		dullness: [{
			value: '无'
		}, {
			value: '有'
		}],

		/*健康体检表 下肢水肿*/
		edema: [{
			value: '无'
		}, {
			value: '单侧'
		}, {
			value: '双侧不对称'
		}, {
			value: '双侧对称'
		}],

		/*健康体检表 足背动脉搏动*/
		pulse: [{
			value: '未触及'
		}, {
			value: '触及双侧对称'
		}, {
			value: '触及左侧弱或消失'
		}, {
			value: '触及右侧弱或消失'
		}],

		/*健康体检表 肛门指诊*/
		anusDre: [{
			value: '未及异常'
		}, {
			value: '触痛'
		}, {
			value: '包块'
		}, {
			value: '前列腺异常'
		}],

		/*健康体检表 乳腺*/
		gland: [{
			value: '未及异常'
		}, {
			value: '乳房切除'
		}, {
			value: '异常泌乳'
		}, {
			value: '乳腺包块'
		}],

		/*健康体检表 妇科 外阴*/
		vulva: [{
			value: '未见异常'
		}, {
			value: '异常'
		}],

		/*健康体检表 妇科 阴道*/
		vagina: [{
			value: '未见异常'
		}, {
			value: '异常'
		}],

		/*健康体检表 妇科 宫颈*/
		cervical: [{
			value: '未见异常'
		}, {
			value: '异常'
		}],

		/*健康体检表 妇科 宫体*/
		corpus: [{
			value: '未见异常'
		}, {
			value: '异常'
		}],

		/*健康体检表 妇科 附件*/
		attachment: [{
			value: '未见异常'
		}, {
			value: '异常'
		}],

		/*健康体检表 辅助检查 空腹血糖*/
		glucose: [{
			value: '正常'
		}, {
			value: '异常'
		}],

		/*健康体检表 辅助检查 心电图*/
		electrocardiogram: [{
			value: '正常'
		}, {
			value: '异常'
		}],

		/*健康体检表 辅助检查 大便潜血*/
		defecateBlood: [{
			value: '阴性'
		}, {
			value: '阳性'
		}],

		/*健康体检表 辅助检查 乙型肝炎表面抗原*/
		antigen: [{
			value: '阴性'
		}, {
			value: '阳性'
		}],

		/*健康体检表 辅助检查 胸部x线片*/
		xRay: [{
			value: '正常'
		}, {
			value: '异常'
		}],

		/*健康体检表 辅助检查 b超*/
		ultrasound: [{
			value: '正常'
		}, {
			value: '异常'
		}],

		/*健康体检表 辅助检查 宫颈涂片*/
		cervicalSmear: [{
			value: '正常'
		}, {
			value: '异常'
		}],

		/*健康体检表 中医体质辨识 平和质*/
		gentleTempe: [{
			value: '是'
		}, {
			value: '基本是'
		}],

		/*健康体检表 中医体质辨识 非平和质 (...气虚质)*/
		unGentleTempe: [{
			value: '是'
		}, {
			value: '倾向是'
		}],

		/*健康体检表 主要用药情况 用药用量*/
		dosage: [{
			value: 'tid mg'
		}, {
			value: 'bid mg'
		}, {
			value: 'qd mg'
		}],

		/*健康体检表 主要用药情况 用药时间*/
		usageDate: [{
			value: '年'
		}, {
			value: '月'
		}, {
			value: '周'
		}, {
			value: '日'
		}],

		/*健康体检表 主要用药情况 服药依从性*/
		adherence: [{
			value: '规律'
		}, {
			value: '间断'
		}, {
			value: '不服药'
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

		/*健康体检表 现存主要健康问题 脑血管疾病*/
		cerebrovascularDis: [{
			key: '未发现',
			label: '未发现',
			value: '未发现'
		}, {
			key: '缺血性卒中',
			label: '缺血性卒中',
			value: '缺血性卒中'
		}, {
			key: '脑出血',
			label: '脑出血',
			value: '脑出血'
		}, {
			key: '蛛网膜下腔出血',
			label: '蛛网膜下腔出血',
			value: '蛛网膜下腔出血'
		}, {
			key: '短暂性脑缺血发作',
			label: '短暂性脑缺血发作',
			value: '短暂性脑缺血发作'
		}],

		/*健康体检表 肾脏疾病*/
		kidneyDis: [{
			key: '未发现',
			label: '未发现',
			value: '未发现'
		}, {
			key: '糖尿病肾病',
			label: '糖尿病肾病',
			value: '糖尿病肾病'
		}, {
			key: '肾功能衰竭',
			label: '肾功能衰竭',
			value: '肾功能衰竭'
		}, {
			key: '急性肾炎',
			label: '急性肾炎',
			value: '急性肾炎'
		}, {
			key: '慢性肾炎衰竭',
			label: '慢性肾炎衰竭',
			value: '慢性肾炎衰竭'
		}],

		/*健康体检表 心脏疾病*/
		heartDis: [{
			key: '未发现',
			label: '未发现',
			value: '未发现'
		}, {
			key: '心肌梗死',
			label: '心肌梗死',
			value: '心肌梗死'
		}, {
			key: '心绞痛',
			label: '心绞痛',
			value: '心绞痛'
		}, {
			key: '冠状动脉血运重建',
			label: '冠状动脉血运重建',
			value: '冠状动脉血运重建'
		}, {
			key: '充血性心力',
			label: '充血性心力',
			value: '充血性心力'
		}, {
			key: '心前区疼痛',
			label: '心前区疼痛',
			value: '心前区疼痛'
		}],

		/*健康体检表 血管疾病*/
		vascularDis: [{
			key: '未发现',
			label: '未发现',
			value: '未发现'
		}, {
			key: '夹层动脉瘤',
			label: '夹层动脉瘤',
			value: '夹层动脉瘤'
		}, {
			key: '动脉闭塞性疾病',
			label: '动脉闭塞性疾病',
			value: '动脉闭塞性疾病'
		}],

		/*健康体检表 眼部疾病*/
		eyeDis: [{
			key: '未发现',
			label: '未发现',
			value: '未发现'
		}, {
			key: '视网膜出血或渗出',
			label: '视网膜出血或渗出',
			value: '视网膜出血或渗出'
		}, {
			key: '视乳头水肿',
			label: '视乳头水肿',
			value: '视乳头水肿'
		}, {
			key: '白内障',
			label: '白内障',
			value: '白内障'
		}],

		/*健康体检表 神经系统疾病*/
		nervousDis: [{
			key: '未发现',
			label: '未发现',
			value: '未发现'
		}],

		/*健康体检表 其他系统疾病*/
		otherDis: [{
			key: '未发现',
			label: '未发现',
			value: '未发现'
		}],

		/*健康体检表 健康评价 异常情况*/
		abnormal: [{
			key: '体检无异常',
			label: '体检无异常',
			value: '体检无异常'
		}, {
			key: '有异常',
			label: '有异常',
			value: '有异常'
		}],

		/*健康体检表 健康指导*/
		healthGuide: [{
			key: '纳入慢性病患者健康管理',
			label: '纳入慢性病患者健康管理',
			value: '纳入慢性病患者健康管理'
		}, {
			key: '建议复查',
			label: '建议复查',
			value: '建议复查'
		}, {
			key: '建议转诊',
			label: '建议转诊',
			value: '建议转诊'
		}],

		/*健康体检表 危险因素控制*/
		riskFactorsCon: [{
			key: '戒烟',
			label: '戒烟',
			value: '戒烟'
		}, {
			key: '健康饮酒',
			label: '健康饮酒',
			value: '健康饮酒'
		}, {
			key: '饮食',
			label: '饮食',
			value: '饮食'
		}, {
			key: '锻炼',
			label: '锻炼',
			value: '锻炼'
		}, {
			key: '减体重 目标(kg)：',
			label: '减体重 目标(kg)：',
			value: '减体重 目标(kg)：'
		}, {
			key: '建议接种疫苗',
			label: '建议接种疫苗',
			value: '建议接种疫苗'
		}, ],


	}
}

//专档表单
export const SPEC_ARC_FORM_WIDGET_CONFIG = {
	selectOption: {

		/*高血压记录表 糖尿病记录表 老年人评估表 随访方式*/
		followUpWay: [{
			value: '门诊'
		}, {
			value: '家庭'
		}, {
			value: '电话'
		}],

		/*高血压记录表 摄盐程度*/
		intakeSalt: [{
			value: '轻'
		}, {
			value: '中'
		}, {
			value: '重'
		}],

		/*高血压记录表 糖尿病记录表 心理调整*/
		psyAdjustment: [{
			value: '良好'
		}, {
			value: '一般'
		}, {
			value: '差'
		}],

		/*高血压记录表 糖尿病记录表 遵医行为*/
		behaviorMed: [{
			value: '良好'
		}, {
			value: '一般'
		}, {
			value: '差'
		}],

		/*高血压记录表 糖尿病记录表 药物依从性*/
		adherenceMed: [{
			value: '规律'
		}, {
			value: '间断'
		}, {
			value: '不服药'
		}],

		/*高血压记录表 糖尿病记录表 药物不良反应*/
		drugReactions: [{
			value: '无'
		}],

		/*高血压记录表 糖尿病记录表 此次随访分类*/
		followUpClass: [{
			value: '控制满意'
		}, {
			value: '控制不满意'
		}, {
			value: '不良反应'
		}, {
			value: '并发症'
		}],

		/*糖尿病记录表 足背动脉搏动*/
		arteryPulse: [{
			value: '未触及'
		}, {
			value: '触及'
		}],

		/*糖尿病记录表 主食*/
		stapleFood: [{
			value: '轻'
		}, {
			value: '中'
		}, {
			value: '重'
		}],

		/*高血压记录表 糖尿病记录表 用药情况 每日次数*/
		dailyNum: [{
			value: 'qd'
		}, {
			value: 'bid'
		}, {
			value: 'tid'
		}],

		/*高血压记录表 糖尿病记录表 用药情况 每次用量*/
		eTimeNum: [{
			value: 'mg'
		}, {
			value: '粒'
		}],
	},
	checkboxGroupOptions: {

		/*高血压记录表 症状*/
		hSymptoms: [{
			key: '无症状',
			label: '无症状',
			value: '无症状'
		}, {
			key: '头痛头晕',
			label: '头痛头晕',
			value: '头痛头晕'
		}, {
			key: '恶心呕吐',
			label: '恶心呕吐',
			value: '恶心呕吐'
		}, {
			key: '眼花耳鸣',
			label: '眼花耳鸣',
			value: '眼花耳鸣'
		}, {
			key: '呼吸困难',
			label: '呼吸困难',
			value: '呼吸困难'
		}, {
			key: '心悸胸闷',
			label: '心悸胸闷',
			value: '心悸胸闷'
		}, {
			key: '鼻衄出血不止',
			label: '鼻衄出血不止',
			value: '鼻衄出血不止'
		}, {
			key: '四肢发麻',
			label: '四肢发麻',
			value: '四肢发麻'
		}, {
			key: '下肢水肿',
			label: '下肢水肿',
			value: '下肢水肿'
		}, ],

		/*糖尿病记录表 症状*/
		dSymptoms: [{
			key: '无症状',
			label: '无症状',
			value: '无症状'
		}, {
			key: '多饮',
			label: '多饮',
			value: '多饮'
		}, {
			key: '多食',
			label: '多食',
			value: '多食'
		}, {
			key: '多尿',
			label: '多尿',
			value: '多尿'
		}, {
			key: '视力模糊',
			label: '视力模糊',
			value: '视力模糊'
		}, {
			key: '感染',
			label: '感染',
			value: '感染'
		}, {
			key: '手脚麻木',
			label: '手脚麻木',
			value: '手脚麻木'
		}, {
			key: '下肢浮肿',
			label: '下肢浮肿',
			value: '下肢浮肿'
		}, {
			key: '体重明显下降',
			label: '体重明显下降',
			value: '体重明显下降'
		}, ],
	},

	cascadeOptions: {

	},

	rateOptions: {
		/*老年人自评表*/
		/*进餐*/
		eating: [{
			level: '可自理：独立完成',
			score: '0分'
		}, {
			level: '轻度依赖',
			score: '0分'
		}, {
			level: '中度依赖：需要协助，如切碎、搅拌食物等',
			score: '3分'
		}, {
			level: '不能自理：完成需要帮助',
			score: '5分'
		}, ],
		/*梳洗*/
		wash: [{
			level: '可自理：独立完成',
			score: '0分'
		}, {
			level: '轻度依赖：能独立地洗头、梳头、刷牙、剃须等；洗澡需要协助',
			score: '1分'
		}, {
			level: '中度依赖：下协助下和适当时间内，能完成部分熟悉活动',
			score: '3分'
		}, {
			level: '不能自理：完成需要帮助',
			score: '7分'
		}, ],
		/*穿衣*/
		dress: [{
			level: '可自理：独立完成',
			score: '0分'
		}, {
			level: '轻度依赖',
			score: '0分'
		}, {
			level: '中度依赖：需要协助，在适当的时间内完成部分穿衣',
			score: '3分'
		}, {
			level: '不能自理：完成需要帮助',
			score: '5分'
		}, ],
		/*如厕*/
		toilet: [{
			level: '可自理：不需协助，可自控',
			score: '0分'
		}, {
			level: '轻度依赖：偶尔失禁，但基本上能如厕或使用便具',
			score: '1分'
		}, {
			level: '中度依赖：经常失禁，在很多提示和协助下尚能如厕或使用便具',
			score: '5分'
		}, {
			level: '不能自理：完全失禁，完全需要帮助',
			score: '10分'
}, ], /*活动*/
		activity: [{
			level: '可自理：独立完成所有活动',
			score: '0分'
		}, {
			level: '轻度依赖：借助较小的外力或辅助装置嗯能够完成站立、行走、上下楼梯等',
			score: '1分'
		}, {
			level: '中度依赖：借助较大的外力才能完成站立、行走，不能上下楼梯',
			score: '5分'
		}, {
			level: '不能自理：卧床不起，活动完全需要帮助',
			score: '10分'
		}, ],
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