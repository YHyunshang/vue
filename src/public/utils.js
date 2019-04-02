import _ from 'lodash'
import md5 from 'md5'

let date = null
let offSet = 60 * 1000 * (new Date(0)).getTimezoneOffset()
let week = {
  '0': '日',
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六'
}

let regObj = {
  'chsName': /^[\u4E00-\u9FFF]([\u4E00-\u9FFF]{0,3})[\u4E00-\u9FFF]$/, // 2-5汉字
  'vCode4': /^\d(\d{2})\d$/, // 4位验证码
  'vCode6': /^\d(\d{4})\d$/, // 6位验证码
  'mobile': /^1\d{10}$/, // 通用手机号
  'email': /^(\w)+[(\.\w+)|(\-\w+)]*@(\w)+(([\.|\-]\w+)+)$/, // 邮箱
  'strongPwd': /^(?=.*[A-Za-z]+)(?=.*\d+)(?=.*[\~\!\@\#\$%\^&\*\(\)_\+\{\}\:\;\"\"\'\/\`\?\<\>\.\,\[\]\-\=\\\|]+)[A-Za-z\d\x21-\x7e]{8,16}$/ // 强密码
}

const arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 加权因子
const arrValid = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] // 校验码
let regFunc = {
  idNum (cid) {
    if (/^\d{17}(\d|x|X)$/i.test(cid)) {
      let sum = 0
      let idx = 0
      for (var i = 0; i < cid.length - 1; i++) {
        // 对前17位数字与权值乘积求和
        sum += parseInt(cid.substr(i, 1), 10) * arrExp[i]
      }
      // 计算模（固定算法）
      idx = sum % 11
      return arrValid[idx] === cid.substr(17, 1).toUpperCase()
    } else if (/^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(cid)) {
      return true
    } else {
      return false
    }
  }
}

let crypts = {
  encode (val) {
    if (val === undefined) {
      return window.encodeURIComponent('')
    }

    if (typeof val === typeof 1) {
      val += ''
    }

    if (_.isObject(val)) {
      return window.encodeURIComponent(JSON.stringify(val))
    } else if (typeof val === typeof 'a') {
      return window.encodeURIComponent(val)
    } else {
      return window.encodeURIComponent('')
    }
  },
  decode (val) {
    try {
      return JSON.parse(window.decodeURIComponent(val))
    } catch (e) {
      return window.decodeURIComponent(val)
    }
  }
}

let cookiePosBegin = -1
let cookiePosEnd = -1

export const validator = (val, type) => {
  if (type === 'idNum') {
    return regFunc.idNum(val)
  } else if (typeof type === typeof 'a' && !!regObj[type]) {
    return regObj[type].test(val)
  } else {
    return false
  }
}

export const dateFormatter = (datetime, fmt, fix) => {
  offSet = !fix ? 0 : offSet
  if (datetime instanceof Date) {
    date = datetime
  } else {
    date = new Date(+datetime + offSet)
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': (date.getHours() % 12) === 0 ? 12 : (date.getHours() % 12), // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[date.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export const cookieCan = (name, value, options, noMd5) => {
  if (typeof name !== typeof 'a') {
    return ''
  }

  if (
    typeof value === typeof 'a' || // 字符串
    typeof value === typeof 1 || // 数字
    !_.isEmpty(value) || // 非空对象
    _.isEqual(value, {}) ||
    _.isEqual(value, [])
  ) {
    // 存
    if (typeof value === typeof 1) {
      value += ''
    }

    options = options || {expires: 30}
    date = new Date()
    date.setMilliseconds(date.getMilliseconds() + (+options.expires * 24 * 60 * 60 * 1000))
    document.cookie = [
      (!noMd5 ? md5(name) : name),
      '=', crypts.encode(value),
      options.expires ? '; expires=' + date.toUTCString() : '',
      options.path ? '; path=' + options.path : '',
      options.domain ? '; domain=' + options.domain : '',
      options.secure ? '; secure' : ''
    ].join('')

    return ''
  } else {
    // 取值
    if (document.cookie.length > 0) {
      if (!noMd5) {
        cookiePosBegin = document.cookie.indexOf(md5(name)) + md5(name).length + 1
      } else {
        cookiePosBegin = document.cookie.indexOf(name) + name.length + 1
      }
      cookiePosEnd = document.cookie.indexOf(';', cookiePosBegin)
      if (cookiePosEnd === -1) {
        cookiePosEnd = document.cookie.length
      }
      return crypts.decode(document.cookie.substring(cookiePosBegin, cookiePosEnd))
    } else {
      return ''
    }
  }
}

export const sessionCan = (name, obj) => {
  if (
    (typeof name === typeof 'a') &&
    _.isEmpty(obj) &&
    !_.isEqual(obj, {}) &&
    !_.isEqual(obj, [])
  ) { // 取
    if (!window.sessionStorage) {
      return cookieCan(name) || {}
    } else {
      return crypts.decode(window.sessionStorage.getItem(md5(name))) || {}
    }
  } else if (
    (typeof name === typeof 'a') &&
    (!_.isEmpty(obj) || _.isEqual(obj, {}) || _.isEqual(obj, []))
  ) { // 存
    if (!window.sessionStorage) {
      cookieCan(name, obj)
    } else {
      window.sessionStorage.setItem(md5(name), crypts.encode(obj))
    }
    return {}
  } else {
    return {}
  }
}

export const storageCan = (name, obj) => {
  if (
    (typeof name === typeof 'a') &&
    _.isEmpty(obj) &&
    !_.isEqual(obj, {}) &&
    !_.isEqual(obj, [])
  ) { // 取
    if (!window.localStorage) {
      return cookieCan(name) || {}
    } else {
      return crypts.decode(window.localStorage.getItem(md5(name))) || {}
    }
  } else if (
    (typeof name === typeof 'a') &&
    (!_.isEmpty(obj) || _.isEqual(obj, {}) || _.isEqual(obj, []))
  ) { // 存
    if (!window.localStorage) {
      cookieCan(name, obj)
    } else {
      window.localStorage.setItem(md5(name), crypts.encode(obj))
    }
    return {}
  } else {
    return {}
  }
}

// only get val from cookie when key is NOT md5 encoded
export const pureCookie = (name, value, options) => {
  return cookieCan(name, value, options, true)
}

/*
 * 数组重排方法，
 * @params  origin 原始数组
 *          target 需要挪动的数组
 *          direction 方向 'left' or 'right'
 */
export const reAlignArray = (origin, target, direction) => {
  let newArr = origin ? _.clone(origin) : []
  let index = -1
  let edgeIndex = -1
  let item = null

  target = target || []
  direction = direction || 'right'

  if (direction === 'right') { // 右移
    edgeIndex = newArr.indexOf(target[target.length - 1])
    // 边界条件
    if (edgeIndex >= (newArr.length - 1) || edgeIndex === -1) {
      return newArr
    }
    // 倒序循环
    for (let i = target.length - 1; i >= 0; i--) {
      item = target[i]
      index = newArr.indexOf(item)
      if (index < (newArr.length - 1)) {
        newArr[index] = newArr[index + 1]
        newArr[index + 1] = item
      }
    }
  } else { // 左移
    edgeIndex = newArr.indexOf(target[0])
    // 边界条件
    if (edgeIndex <= 0 || edgeIndex === -1) {
      return newArr
    }
    // 正序循环
    for (var i = 0; i < target.length; i++) {
      item = target[i]
      index = newArr.indexOf(item)
      if (index > 0) {
        newArr[index] = newArr[index - 1]
        newArr[index - 1] = item
      }
    }
  }
  return newArr
}

export const convertSecondToTime = sec => {
  if (sec === 0) {
    return sec
  }
  let hh = 0
  let mm = 0
  let ss = 0
  const step = 60
  const fix = t => {
    return t < 10 ? '0' + t : t + ''
  }
  const timeOffset = (t, step) => {
    return [Math.floor(t / step), t % step]
  }
  [mm, ss] = timeOffset(sec, step)
  if (mm > 59) {
    [hh, mm] = timeOffset(mm, step)
  }
  return [fix(hh), fix(mm), fix(ss)].join(':')
}

export const formatCellData = (val, suffix = '') => val === undefined ? '--' : `${val}${suffix}`

export const tableCellFormatter = {
  number: function (val, suffix = '') {
    if (val === undefined) {
      return '--'
    } else if (Number.isNaN(val)) {
      return val
    } else {
      return `${Number(val).toFixed(2)}${suffix}`
    }
  },
  text: function (val, suffix = '') {
    if (val === undefined) {
      return '--'
    } else {
      return `${val}${suffix}`
    }
  }
}

export default {
  validator,
  dateFormatter,
  storageCan,
  sessionCan,
  cookieCan,
  pureCookie,
  reAlignArray,
  convertSecondToTime,
  formatCellData,
  tableCellFormatter
}
