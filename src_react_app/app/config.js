let baseUrl
if (process.env.NODE_ENV === 'production') {
  baseUrl = ''
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
export const spec_arc_type_config = {
  arcType: [{
    name: "个人基本信息表11",
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
    content: '<HealthMedicalForm />',
    key: "healthMedical"
  }],
  specArcType: [{
    name: "高血压专档",
    key: "hypertension"
  }, {
    name: "糖尿病专档",
    key: "diabetes"
  }, {
    name: "老年人专档",
    key: "aged"
  }, {
    name: "肿瘤病",
    key: "oncosis"
  }, {
    name: "残疾人",
    key: "handicapped"
  }, {
    name: "女性保健专档",
    key: "femalecare"
  }, {
    name: "孕产妇专档",
    key: "maternal"
  }, {
    name: "钉钉医疗档案",
    key: "ddmedical"
  }]
}