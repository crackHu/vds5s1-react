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

//菜单配置
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