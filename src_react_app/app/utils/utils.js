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

// ------ 日期格式化 ------ //
Date.prototype.format = function(format) {
  var o = {
    "M+": this.getMonth() + 1, //month 
    "d+": this.getDate(), //day 
    "h+": this.getHours(), //hour 
    "m+": this.getMinutes(), //minute 
    "s+": this.getSeconds(), //second 
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
    "S": this.getMilliseconds() //millisecond 
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
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

// ------ 设置 Cookie ------ //
export function setCookie(c_name, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = c_name + "=" + escape(value) +
    ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
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
      } else if (typeof value == 'number') {
        obj[field] = value + ''
      } else if (isArray(value)) {
        obj[field] = value.join(',')
      } else if (typeof value == 'object') {
        obj[field] = !!value ? value.format(date_format) : ''
      } else {
        obj[field] = value
      }
    }
  })

  console.debug('getFieldsObj', '=>', obj)
  return obj
}

// ------ 获取表单字段与值的封装对象 装箱 ------ // 
export function getFieldsObjWithout(fields_state, arrObjFields, date_format) {

  let obj = {}
  for (let field in fields_state) {
    let stateField = fields_state[field]
    if (stateField) {
      let value = stateField.value
      if (isString(value)) {
        //普通字符串
        obj[field] = value
      } else if (typeof value == 'number') {
        obj[field] = value + ''
      } else if (isArray(value)) {
        //数组 e.g.地址，多选
        obj[field] = value.join(',')
      } else if (typeof value == 'object') {
        //日期
        obj[field] = !!value ? value.format(date_format) : '0000-00-00 00:00:00'
      } else if (isNoValueAttrObj(value)) {
        //嵌套的子表 e.g.体检表的自由用药表
        for (let arrField in arrObjFields) {
          if (arrField == field) {
            let arrFields = arrObjFields[arrField].fields
            let delField = arrObjFields[arrField].delField
            console.log('getFieldsArr', arrFields, delField, stateField)
            obj[field] = getFieldsArr(arrFields, stateField, date_format)
            obj[delField] = stateField[delField]
          }
        }
      } else {
        obj[field] = value
      }
    }
  }

  console.debug('getFieldsObjWithout', '=>', obj)
  return obj
}


// ------ 获取表单字段与值的封装数组 装箱 ------ //
export function getFieldsArr(fields, fields_state, date_format) {

  let arr = []
  let length = 0
  try {
    length = fields_state['objSize'].length
  } catch (e) {
    console.error(e, 'getFieldsArr[objSize] exception')
  }
  if (!!fields_state) {
    //for (let i in fields) {
    for (let i = 0; i < length; i++) {
      let obj = {}
      fields.forEach((field, j) => {

        let state = fields_state[`${field}_${i}`]
        if (state) {
          let value = state.value
          if (isString(value)) {
            obj[field] = value
          } else if (typeof value == 'number') {
            obj[field] = value + ''
          } else if (isArray(value)) {
            obj[field] = value.join(',')
          } else if (typeof value == 'object') {
            !!value ? obj[field] = value.format(date_format) : ''
          } else {
            obj[field] = value
          }
        }
      })
      if (!emptyObject(obj)) {
        arr.push(obj)
      }
    }
  }

  console.debug('getFieldsArr', '=>', arr, fields, fields_state, fields_state['objSize'].length)
  return arr
}

// ------ 获取表单数组字段与值的封装数组(TODO 时间关系 没有传入字段配置) 装箱 ------ //
export function getFieldsObjArr(fields_state, arrObjFields, date_format, key) {

  let arr = []
  let obj = {}
  let del = {}

  if (!!fields_state) {
    for (let selectKey in fields_state) {
      if (selectKey != 'selectKey') {
        let selectValObj = fields_state[selectKey]

        if (selectKey.indexOf('del') > -1) {
          del[selectKey] = selectValObj
        } else {
          obj = getFieldsObjWithout(selectValObj, arrObjFields, date_format)
          arr.push(obj)
        }
      }
    }
  }

  console.debug('getFieldsObjArr', '=>', arr)
  return {
    [key]: arr,
    ...del
  }
}

// ------ 获取表单字段与值对象的封装对象 拆箱 ------ //
export function getFieldsValueObj(dout, fields) {

  let obj = {}

  let dateFields = fields.dateFields || ''
  let cascadeFields = fields.cascadeFields || ''
  let multiFields = fields.multiFields || ''

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
        value: !!servdate ? moment(servdate, DATE_FORMAT_STRING) : null
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
export function getArrFieldsValueObj(doutArrObj, fields, fieldFlag, arrFields) {

  let obj = {}
  let selectKey
  if (!!doutArrObj && doutArrObj.length > 0)
    doutArrObj.forEach((fieldsObj, index) => {
      let fieldKey
      for (let field in fieldsObj) {
        if (field == fieldFlag) {
          fieldKey = fieldsObj[fieldFlag]
        }
      }
      let valueObj = getFieldsValueObj(fieldsObj, fields)
      if (!!fieldKey) {
        obj[fieldKey] = valueObj
        for (let arr in arrFields) {
          obj[fieldKey][arr] = getFieldsValueArrObj(valueObj[arr].value, arrFields[arr].fields)
        }
      }
    })
  for (let date in obj) {
    selectKey = date
    break
  }
  console.debug('getArrFieldsValueObj', '=>', obj)
  return {
    ...obj,
    selectKey
  }
}

// ------ 获取表单字段与值对象数组的封装对象 用于该表字段存在于主表字段情况（例：健康体检表中的体检记录 ------ //
export function getArrFieldsObjByObj(fieldObj, sfieldArr) {

  let obj = {}
  let index = 0
  let objSize = []
  for (let pkey in fieldObj) {
    let arr = []
    let pobj = fieldObj[pkey]
    let existsFlag = false
    for (let skey in pobj) {
      /*let sobj = sfieldArr.filter(field => field == skey)
      if (!!sobj && sobj.length > 0) {
        obj[`${sobj}_${index}`] = pobj[skey]
        arr.push(obj)
      }*/
      if (sfieldArr.indexOf(skey) > -1) {
        obj[`${skey}_${index}`] = pobj[skey]
        existsFlag = true
      }
    }
    if (existsFlag) {
      objSize.push({})
      index += 1
    }
  }

  console.debug('getArrFieldsObjByObj', '=>', obj)
  return {
    ...obj,
    objSize,
    selectedRowKeys: []
  }
}

// ------ 获取表单字段与值的封装数组 拆箱 ------ //
export function getFieldsValueArrObj(doutArr, fields) {

  if (!doutArr || !isArray(doutArr))
    throw Error('getFieldsValueArrObj param [doutArr] error')

  let fieldObjs = {}
  let objSize = []

  let dateFields = fields.dateFields || ''
  doutArr.forEach((dout, i) => {
    objSize.push({})
    for (let attr in dout) {
      fieldObjs[`${attr}_${i}`] = {}
      if (dateFields.indexOf(attr) > -1) {
        if (dout[attr] != '') {
          fieldObjs[`${attr}_${i}`].value = moment(dout[attr], DATE_FORMAT_STRING)
        }
        /*} else if (dout[attr] == '0000-00-00 00:00:00') {
          fieldObjs[`${attr}_${i}`].value = ''*/
      } else {
        fieldObjs[`${attr}_${i}`].value = dout[attr]
      }
    }
  })

  console.debug('getFieldsValueArrObj', '=>', fieldObjs)
  return {
    ...fieldObjs,
    objSize,
    selectedRowKeys: []
  }
}

// ------ 获取表单字段与值数组的封装数组 拆箱 ------ //
export function getArrFieldsValueArrObj(doutArrObj, fields, flag) {

  let arr = []
  if (!!doutArrObj && doutArrObj.length > 0)
    doutArrObj.forEach((obj, index) => {
      let arrObj = getFieldsValueArrObj(obj[flag], fields)
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

function isNoValueAttrObj(obj) {
  return !obj
}

// ------ 获取 moment 对象 ------ //
export function getMomentObj(date, dateFormat = DATE_FORMAT_STRING) {
  return moment(date, dateFormat)
}

// ------ 获取 moment format 对象 ------ //
export function getMomentFormat(moment, dateFormat = DATE_FORMAT_STRING) {
  return moment.format(dateFormat)
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

// ------ 数组去重 ------ //
function unique(arr) {
  var result = [],
    hash = {};
  for (var i = 0, elem;
    (elem = arr[i]) != null; i++) {
    if (!hash[elem]) {
      result.push(elem);
      hash[elem] = true;
    }
  }
  return result;
}

// ------ 移除子表（既往史、家族史...）记录通过选中的key ------ //
export function removeChildTRBySelKey(fields, stateField, selectedRowKeys, delField) {

  let obj = {
    objSize: [],
    selectedRowKeys: []
  }
  let idSet = new Set()
  let objSize = stateField.objSize || undefined
  if (!!objSize) {
    objSize = objSize.filter((item, index) => selectedRowKeys.indexOf(index) == -1)
    for (let i = 0; i < objSize.length; i++) {
      let indexSet = new Set()
      for (let key in stateField) {
        let stateFieldValue = stateField[key]
        if (!isArray(stateFieldValue)) {
          try {
            let indexof = key.lastIndexOf('_')
            let keysub = key.substring(0, indexof)
            let keyindex = key.substring(indexof + 1)
            let keyint = parseInt(keyindex)
            if (selectedRowKeys.indexOf(keyint) == -1) {
              indexSet.add(keyint)
              let indexArr = Array.from(indexSet)
              obj[`${keysub}_${i}`] = stateField[`${keysub}_${indexArr[i]}`]
              console.log('stateFieldValue', stateField[key], keysub, keyint, i)
            } else {
              if (key.indexOf('id_') > -1) {
                idSet.add(stateField[key].value)
              }
            }
          } catch (e) {
            throw Error(`removeChildTRBySelKey => ${e.message}`)
          }
        } else {
          if (i == 0) {
            if (key == 'objSize') {
              obj[key] = objSize
            } else if (key == 'selectedRowKeys') {
              obj['selectedRowKeys'] = []
            } else if (key == delField) {
              obj[delField] = stateFieldValue
            }
          }
        }
      }
    }
  } else {
    console.error('removeChildTRBySelKey[stateField.objSize] param error')
  }

  console.debug('removeChildTRBySelKey', '=>', obj, idSet)
  if (!!delField && !obj[delField]) {
    return {
      ...obj,
      [delField]: Array.from(idSet)
    }
  } else {
    return obj
  }
}

// ------ 移除体检表 体检记录、高血压 高血压记录……通过选中的key ------ //
export function removeTRBySelKey(stateField, selectedRowKeys, delField) {

  let obj = {}
  let selectKeyObj = {}
  let delIds = []
  if (!isObject(stateField) || !isArray(selectedRowKeys)) {
    throw Error('removeTRBySelKey param is error')
  }
  //第一次排除selectKey属性
  Object.keys(stateField).map((key, index) => {
    let valueObj = stateField[key]
    if (isObject(valueObj)) {
      obj[key] = valueObj
    } else {
      key == 'selectKey'
      selectKeyObj[key] = valueObj
    }
  })

  //第二次根据selectedRowKeys删除
  Object.keys(obj).map((key, index) => {
    let valueObj = obj[key]
    if (selectedRowKeys.indexOf(index) > -1) {
      console.log('o(^▽^)o')
      delete obj[key]
      let selectKey = selectKeyObj['selectKey']
      if (key == selectKey) {
        selectKeyObj['selectKey'] = null
      }
      let id = valueObj['id']
      if (!!id && !!id.value) {
        delIds.push(id.value)
      }
    }
  })
  if (selectKeyObj['selectKey'] == null) {
    selectKeyObj['selectKey'] = Object.keys(obj)[0]
  }

  console.log('removeTRBySelKey', '=>', obj, selectKeyObj)
  return {
    [delField]: delIds.length == 0 ? undefined : delIds,
    ...obj,
    ...selectKeyObj,
  }

}

// ------ 通过字段数组获取字段值数组 e.g. JKJL ------ //
export function getValueArrByFieldArr(fields, stateField, date_format) {

  let obj = {}
  for (let date in stateField) {
    let fieldArrObj = stateField[date]
    for (let field in fieldArrObj) {
      if (fields.indexOf(field) > -1) {
        let value = fieldArrObj[field].value
        let objField = obj[field]
        if (!objField) {
          obj[field] = []
        }
        if (isString(value)) {
          //普通字符串
          obj[field].push(value)
        } else if (typeof value == 'number') {
          obj[field].push(value + '')
        } else if (isArray(value)) {
          //数组 e.g.地址，多选
          obj[field].push(value.join(','))
        } else if (typeof value == 'object') {
          //日期
          !!value ? obj[field].push(value.format(date_format)) : ''
        } else {
          obj[field].push(value)
        }
      }
    }
  }

  console.debug('getValueArrByFieldArr', '=>', obj)
  return obj
}