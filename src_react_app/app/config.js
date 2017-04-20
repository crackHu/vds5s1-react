//************* 全局配置 *************//
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

/************** 时间格式配置 **************/
export const DATE_FORMAT_STRING = 'YYYY-MM-DD'

/************** 保存数据提交客户端生成的UUID配置 **************/
export const UUID_ENABLE = true

/************** Tabs是否使用动画切换 **************/
export const TAB_ANIMATED = true

/************** 菜单配置 **************/
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
  },]
}

if (localStorage.hospital === 'dfj') {
  MENU_CONFIG.menuItem.push( {
    key: "Mass",
    path: "/masss",
    name: "消息发送",
    iconType: "message",
    sub: [{
      key: "Masss",
      path: "./modules/mass/containers/Masss",
      route: "/masss",
      name: "居民列表",
      iconType: "message"
    }, {
      key: "Situation",
      path: "./modules/mass/containers/Situation",
      route: "/masss/situations",
      name: "发送情况",
      iconType: "message"
    }, ]
  })
}

/************** 独立路由配置 **************/
export const INDEPENDENCE_ROUTE_CONFIG = [{
  path: "./modules/phr/containers/ArchiveCollection",
  route: "/phr/u/:id",
  sidebarKey: '',
  headerNavKey: 'ArchiveCollection'
}, {
  path: "./containers/CollectionsPage",
  route: "/CollectionsPage",
}, {
  path: "./modules/mass/containers/SituationDetail",
  route: "/masss/situation/:id",
}, ]

/************** 独立路由配置（没有IndexRoute） **************/
export const INDEPEND_ROUTE_CONFIG = [{
  path: "./modules/phr/containers/ArchiveCollection",
  route: "/phr/user/:id",
}, {
  path: "./components/EditableCellTable",
  route: "/EditableCellTable",
}, {
  path: "./components/EditableRowTable",
  route: "/EditableRowTable",
}, ]

export const STATUS_ROUTE_CONFIG = [{
  path: "./containers/NotFound",
  route: "/404",
}, ]