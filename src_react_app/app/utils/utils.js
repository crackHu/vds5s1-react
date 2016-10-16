import moment from 'moment'
import {
  DATE_FORMAT_STRING
} from 'config'
import {
  CONFIG
} from 'login_conf'

// ------ 识别 debug production 模式 ------ //
const __DEBUG__ = !(process.env.NODE_ENV === 'production')

// 对URL地址进行拆分，返回其中附带的值
// a返回对象,b值得字符串集合,c子值（即类似于"XX=XX"）
// 当没有附带值是返回false
export function getUrlVal(url) {
  let a = {},
    b, c, u
  url = !url ? window.location.href : url
  u = url.split('?')
  if (u.length === 1) {
    return false
  } else {
    b = u[1].split('&')
    for (var i = 0; i < b.length; i++) {
      c = b[i].split('=')
      a[c[0]] = c[1]
    }
  }
  return a
}

//检查字段是否为空或不存在  
export function checkParams(params) {
  if (params === null || params === 'undefined' || !params)
    return ''
  else
    return params
}

export function getDate() {
  Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString()
    var mm = (this.getMonth() + 1).toString() // getMonth() is zero-based
    var dd = this.getDate().toString()
    return yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0]) // padding
  }
  Date.prototype.hhmmss = function() {
    var hh = this.getHours().toString()
    var mm = this.getMinutes().toString()
    var ss = this.getSeconds().toString()
    return hh + ':' + mm + ':' + ss
  }
  var d = new Date()
  return d.yyyymmdd() + ' ' + d.hhmmss()
}

// ------ 获取当前时间戳 ------ //
export function getDateTimestamp() {
  return Date.now()
}

export function getIndexOfObjWithKeyVal(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].hasOwnProperty(key) && array[i][key] === value) {
      return i;
    }
  }
  return -1;
}

export function emptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

//============================== 生成uuid ==============================
export function randomUUID() {
  var s = [],
    itoh = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

  // Make array of random hex digits. The UUID only has 32 digits in it, but we
  // allocate an extra items to make room for the '-'s we'll be inserting.
  for (var i = 0; i < 36; i++) {
    s[i] = Math.floor(Math.random() * 0x10);
  }

  // Conform to RFC-4122, section 4.4
  s[14] = 4; // Set 4 high bits of time_high field to version
  s[19] = (s[19] & 0x3) | 0x8; // Specify 2 high bits of clock sequence


  // Convert to hex chars
  for (var i = 0; i < 36; i++) {

    s[i] = itoh[s[i]];

  }

  // Insert '-'s
  s[8] = s[13] = s[18] = s[23] = '-';

  return s.join('');
}

// ------ user regards ------ //
export function regards() {

  const hour = new Date().getHours()

  if (hour < 6) {
    return ("凌晨好！")
  } else if (hour < 9) {
    return ("早上好！")
  } else if (hour < 12) {
    return ("上午好！")
  } else if (hour < 14) {
    return ("中午好！")
  } else if (hour < 17) {
    return ("下午好！")
  } else if (hour < 19) {
    return ("傍晚好！")
  } else if (hour < 22) {
    return ("晚上好！")
  } else {
    return ("夜里好！")
  }
}

// ------ custom private util ------ //
import {
  message,
  notification
} from 'antd'

//http://ant.design/components/message/
export function notify(type, msg, desc, duration) {
  notification[type]({
    message: msg,
    description: desc,
    duration: duration
  });
}

//http://ant.design/components/notification/
export function msg(type, content, duration) {
  switch (type) {
    case 'success':
      return message.success(content, duration)
    case 'error':
      return message.error(content, duration)
    case 'info':
      return message.info(content, duration)
    case 'warning':
      return message.warning(content, duration)
    case 'warn':
      return message.warn(content, duration)
    case 'loading':
      return message.loading(content, duration)
    default:
      return message.info(content, duration)
  }
}

// ------ 获取表单字段与值的封装对象 装箱 ------ // 
export function getFieldsObj(fields, fields_state, date_format) {
  let obj = {}
  fields.forEach((field, i) => {
    let state = fields_state[field]
    if (state) {
      let value = state.value
      if (isString(value)) {
        obj[field] = value
      } else if (isArray(value)) {
        obj[field] = value.join(',')
      } else if (typeof value == "object") {
        obj[field] = value.format(date_format)
      } else {
        obj[field] = value
      }
    }
  })
  return obj
}

// ------ 获取表单字段与值的封装数组 装箱 ------ //
export function getFieldsArr(fields, fields_state, date_format) {

  let arr = []
  for (let i in fields) {
    let obj = {}
    fields.forEach((field, j) => {

      let state = fields_state[`${field}_${i}`]
      if (state) {
        let value = state.value
        if (isString(value)) {
          obj[field] = value
        } else {
          obj[field] = value.format(date_format)
        }
      }
    })
    if (!emptyObject(obj)) {
      arr.push(obj)
    }
  }
  return arr
}

// ------ 获取表单字段与值对象的封装对象 拆箱 ------ //
export function getFieldsValueObj(dout, fields) {

  let obj = {}
  let xzz = []
  let hkdz = []
  let multi = []

  let dateFields = fields.grdaJbzl.dateFields
  let casXZZFields = fields.grdaJbzl.addressFields.grda_xzz
  let casHKDZFields = fields.grdaJbzl.addressFields.grda_hkdz
  let multiFields = fields.grdaJbzl.multiFields

  for (let field in dout) {
    /*时间字段转换*/
    if (dateFields.indexOf(field) > -1) {
      obj[field] = {
        value: moment(dout[field], DATE_FORMAT_STRING)
      }
    } else {
      let xzzIndex = casXZZFields.indexOf(field)
      if (xzzIndex > -1) {
        xzz[xzzIndex] = dout[field]
      }
      let hkdzIndex = casHKDZFields.indexOf(field)
      if (hkdzIndex > -1) {
        hkdz[hkdzIndex] = dout[field]
      }
      /*多选字段转换*/
      if (multiFields.indexOf(field) > -1) {
        obj[field] = {
          value: dout[field].split(',')
        }
      } else {
        obj[field] = {
          value: dout[field]
        }
      }
    }
  }

  let grda_xzz = {
      grda_xzz: {
        value: xzz
      }
    },
    grda_hkdz = {
      grda_hkdz: {
        value: hkdz
      }
    }
  Object.assign(obj, grda_xzz, grda_hkdz)

  console.debug('getFieldsValueObj', '=>', obj)
  return obj
}

// ------ 获取表单字段与值的封装数组 拆箱 ------ //
export function getFieldsValueArrObj(doutArr, dateFields) {

  let fieldObjs = {}
  let size = 0

  doutArr.forEach((dout, i) => {

    size += 1
    for (let attr in dout) {

      fieldObjs[`${attr}_${i}`] = {}
      if (dateFields.indexOf(attr) > -1) {
        if (dout[attr] != '') {
          fieldObjs[`${attr}_${i}`].value = moment(dout[attr], DATE_FORMAT_STRING)
        }
      } else {
        fieldObjs[`${attr}_${i}`].value = dout[attr]
      }
    }
  })
  console.debug('getFieldsValueArrObj', '=>', fieldObjs)
  return {
    ...fieldObjs,
    size
  }
}

function isObject(obj) {
  return typeof obj == "object" && obj.constructor == Object
}

function isArray(arr) {
  return typeof arr == "object" && arr.constructor == Array
}

function isString(str) {
  return typeof str == "string" && str.constructor == String
}

// ------ 获取 moment 对象 ------ //
export function getMomentObj(date, dateFormat) {
  return moment(date, dateFormat)
}

// ------ 获取登陆用户对象 ------ //
export function getLoginUser() {

  const USR = CONFIG.LS.USR
  const UID = CONFIG.LS.UID
  const LOGGEDIN = CONFIG.LS.LOGGEDIN
  const user = JSON.parse(localStorage.getItem(USR))
  if (!__DEBUG__ && (!eval(user) || !eval(UID) || !eval(LOGGEDIN) || LOGGEDIN == '0')) {
    const msg = '登陆用户异常！'
    notify('error', '内部错误', msg);
    return;
  }
  return {
    ...user,
    UID
  }
}