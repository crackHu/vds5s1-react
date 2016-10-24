//*************全局配置*************//
let baseUrl, projectPath
if (process.env.NODE_ENV === 'production') {
  baseUrl = ''
  projectPath = "/medicPHR/app/"
} else {
  baseUrl = ''
  projectPath = '/'
}

export const CONFIG = {
  baseUrl: baseUrl,
  projectName: "medicPHR",
  projectPath: projectPath,
  host: 'http://dev.basoft.cn:10001/',
  needDevTool: true,
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
    path: "/phr",
    name: "档案管理",
    iconType: "credit-card",
    sub: [{
      key: "ArchiveCollection",
      path: "./modules/phr/containers/ArchiveCollection",
      route: "/phr",
      name: "新建档案",
      iconType: "book"
    }, {
      key: "ArchiveList",
      path: "./modules/phr/containers/ArchiveList",
      route: "/phrs",
      name: "个人档案列表",
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

/**************独立路由配置**************/
export const INDEPENDENCE_ROUTE_CONFIG = [{
  path: "./modules/phr/containers/ArchiveCollection",
  route: "/phr/u/:id",
  sidebarKey: '',
  headerNavKey: 'ArchiveCollection'
}]