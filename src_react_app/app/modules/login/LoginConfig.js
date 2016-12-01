const __DEBUG__ = !(process.env.NODE_ENV === 'production')
const loginon = __DEBUG__ ? 1 : 0

/**************登录配置**************/
export const CONFIG = {

	/*登录开关 1:系统不需要登录 0:系统需要登录*/
	LOGIN_ON: loginon,

	/*默认用户配置*/
	DEFAULT: {
		USERNAME: 'admin',
		ROLENAME: '开发测试',
		DEPTNAME: '开发测试'
	},

	/*登录信息标识保存Local Storage配置*/
	LS: {
		LOGGEDIN: 'TE9HR0VESU4=',
		USR: 'VVNS',
		UID: 'dWlk'
	},

}