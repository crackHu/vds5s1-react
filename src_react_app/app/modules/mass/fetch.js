// import 'whatwg-fetch'
const __DEV__ = process.env.NODE_ENV === 'development'
const requestFilter = (response) => {
  console.debug('requestFilter =>', response)
  let { code, message, data, status} = response
  return new Promise((resolve, reject) => {
    if (code) {
      if (code === '1001') {
        resolve(data)
      } else {
        reject(response)
        logger(response, 'warn', message)
      }
    }
    if (status) {
      reject(response)
      logger(response, 'error')
    }
  })
}
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const logger = (object, type = 'debug', alerted = false) => {
  if (alerted) {
    alert(alerted)
  }
  let obj = JSON.stringify(object)
  console[type]('logger =>', object, obj)
  let notice = `${formatTime(new Date())} [${type}] [${alerted}]`
  localStorage[notice] = `object: ${object}; parse: ${obj}`
}

const post = async (url, param = null) => {
  // JSON.stringify(param)
  let options = {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(param),
    headers: {
      "Content-Type": "application/json"
    }
  }
  return await get(url, options)
}

const get = async (url, options = { credentials: "include" }) => {
  // fetch(url, options)
  //   .then(response => response.json())
  //   .then(response => {
  //     return requestFilter(response, correct_cb, failure_cb)
  //   }).catch(e => {
  //     logger(e, 'error')
  //   })
  options = __DEV__ ? {} : { credentials: "include" }
  try {
    let response = await fetch(url, options)
    let data = await response.json()
    return requestFilter(data)
  } catch (e) {
    logger(e, 'error')
  }
}


module.exports = {
  post,
  get
}