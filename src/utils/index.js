/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
export function parseDate(date) {
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  return formatObj.y + '-' + add0(formatObj.m) + '-' + add0(formatObj.d) + ' ' + add0(formatObj.h) + ':' + add0(formatObj.i) + ':' + add0(formatObj.s)
}
function add0(val) {
  return val < 10 ? ('0' + val) : val
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}
export function environment() {
  let env = ''
  if (process.env.VUE_APP_BASE_API == '/dev-api') {
    env = 'dev'
  } else if (process.env.VUE_APP_BASE_API == '/prod-api') {
    env = 'prod'
  }
  return env
}

export function filterParams(obj) {
  var _newPar = {};
  for (var key in obj) {
    if ((obj[key] === 0 || obj[key] === false || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
      _newPar[key] = obj[key];
    }
  }
  return _newPar;
}


let arr = [{
  "channelId": "71226c7c48b248b2a0f2fc285cc59605",
  "startDate": "2020-09-30",
  "endDate": "2020-10-02",
  "startTime": "09:12:51",
  "endTime": "19:12:51",
  "pubExpectation": 200,
  "status": 0
},
{
  "channelId": "71226c7c48b248b2a0f2fc285cc59605",
  "startDate": "2020-09-30",
  "endDate": "2020-10-02",
  "startTime": "10:12:52",
  "endTime": "19:12:52",
  "pubExpectation": 200,
  "status": 0
},
{
  "channelId": "71226c7c48b248b2a0f2fc285cc59605",
  "startDate": "2020-09-30",
  "endDate": "2020-10-02",
  "startTime": "11:12:52",
  "endTime": "19:12:52",
  "pubExpectation": 200,
  "status": 0
},
{
  "channelId": "71226c7c48b248b2a0f2fc285cc59605",
  "startDate": "2020-10-03",
  "endDate": "2020-10-05",
  "startTime": "19:12:51",
  "endTime": "19:59:59",
  "pubExpectation": 200,
  "status": 1
}]
''
function arrFormat(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].id = arr[i].channelId + arr[i].startDate + arr[i].endDate
  }
  let obj = {}
  arr.forEach(element => {
    if (obj.hasOwnProperty(element.id)) {
      obj[element.id].push({
        startTime: element.startTime,
        endTime: element.endTime,
        channelId: element.channelId,
        pubExpectation: element.pubExpectation,
        status: element.status,
        startDate: element.startDate,
        endDate: element.endDate,
      })
    } else {
      obj[element.id] = [{
        startTime: element.startTime,
        endTime: element.endTime,
        channelId: element.channelId,
        pubExpectation: element.pubExpectation,
        status: element.status,
        startDate: element.startDate,
        endDate: element.endDate,
      }]
    }
  })
  return obj
}
arrFormat(arr)

export function deepCopy (obj) {
  var newobj = obj.constructor === Array ? [] : {};
  if(typeof obj !== 'object'){
      return;
  }
  for(var i in obj){
     newobj[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
  }
  return newobj
}

/**
 * 下载文件
 * @param data - 二进制文件
 * @param fileName - 文件名
 */
export function fileDownloadBlob(data, fileName) {
  let url = window.URL.createObjectURL(new Blob([data]))
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
}

/**
 * 获取headers中后端返回的文件名
 * @param cd - content-description
 * @returns {*} - fileName
 */
export function getFileNameFromBackend(cd) {
//从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
  let patten = new RegExp("filename=([^;]+\\.[^\\.;]+);*")
  let fileName = patten.exec(cd)[1]
  return fileName
}
