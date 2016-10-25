import moment from 'moment'
import {
  DATE_FORMAT_STRING
} from 'config'
import {
  CONFIG
} from 'login_conf'

// ------ 识别 debug production 模式 ------ //
export const __DEBUG__ = !(process.env.NODE_ENV === 'production')

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

  console.debug('getFieldsObj', '=>', obj)
  return obj
}

// ------ 获取表单字段与值的封装对象 装箱 ------ // 
export function getFieldsObjWithout(fields_state, date_format) {
  let obj = {}

  for (let field in fields_state) {
    let stateField = fields_state[field]
    if (stateField) {
      let value = stateField.value
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
  }

  console.debug('getFieldsObj', '=>', obj)
  return obj
}

// ------ 获取表单字段与值的封装数组 装箱 ------ //
export function getFieldsArr(fields, fields_state, date_format) {

  let arr = []
  if (!!fields_state) {
    for (let i in fields) {
      let obj = {}
      fields.forEach((field, j) => {

        let state = fields_state[`${field}_${i}`]
        if (state) {
          let value = state.value
          if (isString(value)) {
            obj[field] = value
          } else {
            if (!!value) {
              obj[field] = value.format(date_format)
            } else {
              obj[field] = '0000-00-00 00:00:00'
            }
          }
        }
      })
      if (!emptyObject(obj)) {
        arr.push(obj)
      }
    }
  }

  console.debug('getFieldsArr', '=>', arr)
  return arr
}

// ------ 获取表单字段与值对象的封装对象 拆箱 ------ //
export function getFieldsValueObj(dout, files) {

  let obj = {}

  let dateFields = files.dateFields || ''
  let cascadeFields = files.cascadeFields || ''
  let multiFields = files.multiFields || ''

  /*init cascade array*/
  for (let cascades in cascadeFields) {
    obj[cascades] = {
      value: []
    }
  }
  for (let field in dout) {
    // 接口数据
    let servdate = dout[field]
      /*时间字段转换*/
    if (dateFields.indexOf(field) > -1) {
      obj[field] = {
        value: moment(servdate, DATE_FORMAT_STRING)
      }
    } else if (multiFields.indexOf(field) > -1) {
      /*多选字段转换*/
      obj[field] = {
        value: servdate == '' ? [] : servdate.split(',')
      }
    } else {
      /*地区级联字段转换*/
      for (let cascades in cascadeFields) {
        cascadeFields[cascades].forEach((cascade, index) => {
          if (cascade.indexOf(field) > -1) {
            obj[cascades].value[index] = servdate
          }
        })
      }
      /*正常字段处理*/
      obj[field] = {
        value: servdate
      }
    }
  }

  console.debug('getFieldsValueObj', '=>', obj)
  return obj
}

// ------ 获取表单字段与值对象数组的封装对象 拆箱 ------ //
export function getArrFieldsValueObj(doutArrObj, files) {

  let arr = []
  if (!!doutArrObj)
    doutArrObj.forEach((obj, index) => {
      let arrObj = getFieldsValueObj(obj, files)
      arr.push(arrObj)
    })

  console.debug('getArrFieldsValueObj', '=>', arr)
  return arr
}

// ------ 获取表单字段与值的封装数组 拆箱 ------ //
export function getFieldsValueArrObj(doutArr, files) {

  if (!doutArr || !isArray(doutArr))
    throw Error('getFieldsValueArrObj param [doutArr] error')

  let fieldObjs = {}
  let objSize = []

  let dateFields = files.dateFields || ''
  doutArr.forEach((dout, i) => {
    objSize.push({})
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
    objSize
  }
}

// ------ 获取表单字段与值数组的封装数组 拆箱 ------ //
export function getArrFieldsValueArrObj(doutArrObj, files, flag) {

  let arr = []
  if (!!doutArrObj)
    doutArrObj.forEach((obj, index) => {
      let arrObj = getFieldsValueArrObj(obj[flag], files)
      arr.push(arrObj)
    })

  console.debug('getArrFieldsValueArrObj', '=>', arr)
  return arr
}

function isObject(obj) {
  return typeof obj == "object" && !!obj && obj.constructor == Object
}

function isArray(arr) {
  return typeof arr == "object" && !!arr && arr.constructor == Array
}

function isString(str) {
  return typeof str == "string" && !!str && str.constructor == String
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
  return {
    ...user,
    UID
  }
}

// ------ 调整cascade字段 ------ //
export function adjustGrdaJbzlField(grdaJbzl) {

  let grda_xzz1 = grdaJbzl.grda_xzz
  if (grda_xzz1) {
    let grda_xzz = grda_xzz1.split(',')
    let grda_xzz_smc = grda_xzz[0]
    let grda_xzz_qxmc = grda_xzz[1]
    let grda_xzz_jdzmc = grda_xzz[2]
    let grda_xzz_jwcmc = grda_xzz[3]
    let grda_xzz_ljmc = grda_xzz[4]
    Object.assign(grdaJbzl, {
      grda_xzz_smc
    }, {
      grda_xzz_qxmc
    }, {
      grda_xzz_jdzmc
    }, {
      grda_xzz_jwcmc
    }, {
      grda_xzz_ljmc
    })
  }

  let grda_hkdz1 = grdaJbzl.grda_hkdz
  if (grda_hkdz1) {
    let grda_hkdz = grda_hkdz1.split(',')
    let grda_hkdz_xfmc = grda_hkdz[0]
    let grda_hkdz_smc = grda_hkdz[1]
    let grda_hkdz_qxmc = grda_hkdz[2]
    let grda_hkdz_jdzmc = grda_hkdz[3]
    let grda_hkdz_jwcmc = grda_hkdz[4]
    let grda_hkdz_ljmc = grda_hkdz[5]
    Object.assign(grdaJbzl, {
      grda_hkdz_xfmc
    }, {
      grda_hkdz_smc
    }, {
      grda_hkdz_qxmc
    }, {
      grda_hkdz_jdzmc
    }, {
      grda_hkdz_jwcmc
    }, {
      grda_hkdz_ljmc
    })
  }

  delete grdaJbzl.grda_hkdz
  delete grdaJbzl.grda_xzz
}