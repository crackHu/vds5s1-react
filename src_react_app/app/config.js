//*************全局配置*************//
let baseUrl
if (process.env.NODE_ENV === 'production') {
  baseUrl = ''
} else {
  baseUrl = ''
}

export const CONFIG = {
  baseUrl: baseUrl,
  projectName: "medicPHR",
  host: 'http://www.basoft.cn/',
  needDevTool: true
}

/**************时间格式配置**************/
export const DATE_FORMAT_STRING = 'YYYY-M-D'

/**************菜单配置**************/
export const MENU_CONFIG = {
  menuSidebarStyle: {
    width: 224
  },
  menuItem: [{
    key: "Home",
    path: "/home",
    name: "首页",
    iconType: "home",
    sub: [{
      key: "Home",
      path: "./containers/Home",
      route: "/home",
      name: "应用概况",
      iconType: "book"
    }]
  }, {
    key: "ArchiveCollection",
    path: "/phr/create",
    name: "档案管理",
    iconType: "credit-card",
    sub: [{
      key: "ArchiveList",
      path: "./modules/phr/containers/ArchiveList",
      route: "/phr/list",
      name: "个人档案列表",
      iconType: "book"
    }, {
      key: "ArchiveCollection",
      path: "./modules/phr/containers/ArchiveCollection",
      route: "/phr/:crud(/:grbh)",
      routePath: "/phr/create",
      name: "新建档案",
      iconType: "book"
    }, ]
  }, {
    key: "Statistics",
    path: "/stat",
    name: "数据统计",
    iconType: "line-chart",
    sub: [{
      key: "Statistics",
      path: "./modules/stat/containers/Statistics",
      route: "/stat",
      name: "建档明细",
      iconType: "book"
    }]
  }]
}