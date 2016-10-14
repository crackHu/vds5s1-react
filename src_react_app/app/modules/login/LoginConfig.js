const __DEBUG__ = !(process.env.NODE_ENV === 'production')
const loginon = __DEBUG__ ? 1 : 0

/**************登陆配置**************/
export const CONFIG = {

	/*登陆开关 1:系统不需要登陆 0:系统需要登陆*/
	LOGIN_ON: loginon,

	/*默认用户配置*/
	DEFAULT: {
		USERNAME: 'admin',
		ROLENAME: '开发测试',
		DEPTNAME: '开发测试'
	},

	/*登陆信息标识保存Local Storage配置*/
	LS: {
		LOGGEDIN: 'TE9HR0VESU4=',
		USR: 'VVNS',
		UID: 'dWlk'
	},

}