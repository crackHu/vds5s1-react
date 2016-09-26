let baseUrl
if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://localhost:8080'
} else {
  baseUrl = ''
}

export const config = {
  baseUrl: baseUrl,
  projectName: "vds5s1",
  host: 'http://www.basoft.cn/',
  needDevTool: false
}

/**************菜单配置**************/
export const menu_config = {
  headerNav: [{
    key: "home",
    path: "/",
    name: "首页",
    iconType: "home"
  }, {
    key: "AntContainer1",
    path: "/AntContainer1",
    name: "档案管理",
    iconType: "credit-card"
  }, {
    key: "AntContainer2",
    path: "/AntContainer2",
    name: "测试2",
    iconType: "code"
  }, {
    key: "ArchivDetail",
    path: "/ArchivDetail",
    name: "数据统计",
    iconType: "line-chart"
  }]
}

/**************档案配置**************/
export const arc_type_config = {
  arcType: [{
    name: "个人基本信息表",
    content: 'PersonalDetailForm',
    key: "personalDetail",
    sub: [{
      name: "一般情况",
      content: 'GeneralSituationForm',
      key: "generalSituation"
    }, {
      name: "家族史与生活情况",
      content: 'FamiLivelHistoryFrom',
      key: "famiLivelHistory"
    }]
  }, {
    name: "健康体检表",
    content: 'HealthMedicalForm',
    key: "healthMedical"
  }],
  specArcType: [{
    name: "高血压专档",
    content: 'HealthMedicalForm',
    key: "hypertension"
  }, {
    name: "糖尿病专档",
    content: 'HealthMedicalForm',
    key: "diabetes"
  }, {
    name: "老年人专档",
    content: 'HealthMedicalForm',
    key: "aged"
  }, {
    name: "肿瘤病",
    content: 'HealthMedicalForm',
    key: "oncosis"
  }, {
    name: "残疾人",
    content: 'HealthMedicalForm',
    key: "handicapped"
  }, {
    name: "女性保健专档",
    content: 'HealthMedicalForm',
    key: "femalecare"
  }, {
    name: "孕产妇专档",
    content: 'HealthMedicalForm',
    key: "maternal"
  }, {
    name: "钉钉医疗档案",
    content: 'HealthMedicalForm',
    key: "ddmedical"
  }]
}

/**************表单控件配置**************/
export const arc_form_widget_config = {
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
      key: 'unknown',
      value: '未知的性别'
    }, {
      key: 'male',
      value: '男'
    }, {
      key: 'female',
      value: '女'
    }],

    /*居住类型*/
    permanentType: [{
      key: '1',
      value: '户籍（辖区）'
    }, {
      key: '2',
      value: 'test'
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
      key: "A型",
      value: "A型"
    }, {
      key: "B型",
      value: "B型"
    }, {
      key: "O型",
      value: "O型"
    }],

    /*RH阴性*/
    rhNegative: [{
      key: '1',
      value: '是'
    }, {
      key: '2',
      value: 'test'
    }],

    /*文化程度*/
    lvOfEducation: [{
      key: '1',
      value: '大专'
    }, {
      key: '2',
      value: '本科'
    }],

    /*职业*/
    profession: [{
      key: '1',
      value: '商业服务人员'
    }, {
      key: '2',
      value: '技术人员'
    }],

    /*婚姻状况*/
    maritalStatus: [{
      key: '1',
      value: '已婚'
    }, {
      key: '2',
      value: '未婚'
    }],
  },

  /*现住址*/
  cascadeOptions: {
    curAddress: [{
      value: 'guangzhou',
      label: '广州市',
      children: [{
        value: 'yuexiu',
        label: '越秀区',
        children: [{
          value: 'dadongjie',
          label: '大东街',
          children: [{
            value: 'shuqian',
            label: '署前',
            children: [{
              value: 'miaoqianxijie',
              label: '庙前西街',
            }],
          }],
        }, {
          value: 'qiming',
          label: '启明',
          children: [{
            value: 'yimalu',
            label: '启明一马路'
          }],
        }],
      }],
    }],

    /*户籍地址*/
    censusRegister: [{
      value: 'guangdongsheng',
      label: '广东省',
      children: [{
        value: 'guangzhou',
        label: '广州市',
        children: [{
          value: 'yuexiu',
          label: '越秀',
          children: [{
            value: 'dadongjie',
            label: '大东街',
            children: [{
              value: 'shuqian',
              label: '署前',
              children: [{
                value: 'miaoqianxijie',
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
      label: '城镇职工基本医疗保险',
      value: '1'
    }, {
      label: '城镇居民基本医疗保险',
      value: '2'
    }, {
      label: '新型农村合作医疗',
      value: '3'
    }, {
      label: '贫困救助',
      value: '4'
    }, {
      label: '商业医疗保险',
      value: '5'
    }, {
      label: '全公费',
      value: '6'
    }, {
      label: '全自费',
      value: '7'
    }, {
      label: '其他',
      value: 'other'
    }],

    /*药物过敏*/
    drugAllergy: [{
      label: '肾上腺素',
      value: 'Apple'
    }, {
      label: '肾上腺素',
      value: 'Pear'
    }, {
      label: '肾上腺素',
      value: 'Orange'
    }, {
      label: '其他',
      value: 'Orange2'
    }],

    /*暴露史*/
    exposureHistory: [{
      label: '毒物',
      value: 'Apple'
    }, {
      label: '射线',
      value: 'Pear'
    }]
  }
}