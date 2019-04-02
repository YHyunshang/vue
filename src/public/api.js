import _ from 'lodash'
import axios from 'axios'
import ApiList from './api.json'
import Vue from 'vue'
import {MessageBox, Message} from 'element-ui'
Vue.component(MessageBox.name, MessageBox)

let CancelToken = axios.CancelToken
let cancel
const _parseJSON = str => {
  if (typeof str === 'object') {
    return str
  }
  try {
    return JSON.parse(str)
  } catch (ex) {}
  return str
}
// 在请求头内携带token
const axiosHeaders = (states, data) => {
  if (states && data) {
    axios.interceptors.request.use(
    config => {
      config.headers[states] = `${data}`
      return config
    },
    err => {
      return Promise.reject(err)
    })
  }
}

const getUrl = key => {
  if (typeof ApiList[key] === 'undefined' || ApiList[key] === '') {
    return ''
  }
  let url = ApiList[key]
  return url
}

const post = (state, url, data, params) => {
  const sec = 10 * 1000
  let postData = {}
  let _data = _.assign({}, data)
  _.forEach(_data, (val, key) => {
    if (['timeout'].indexOf(key) === -1) {
      postData[key] = val
    }
  })
  let timeout = _data['timeout'] || sec
  return axios({
    method: state,
    url: url,
    data: postData,
    params: params,
    timeout: timeout,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    CancelToken: new CancelToken(function executor (c) {
      cancel = c
    }),
    // `onUploadProgress` 允许为上传处理进度事件
    onUploadProgress: function (progressEvent) {
      // 对原生进度事件的处理
    },
  // // `onDownloadProgress` 允许为下载处理进度事件
    onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
    }
  })
  .then(function (resp) {
    if (resp.data.status > 200 && resp.data.status < 900000) {
      MessageBox.alert('系统好像开小差了，请稍后再试~', '提示', {
        confirmButtonText: '我要反馈'
      }).then(() => {

      })
    }

    if (resp.data.status === 900000) {
      MessageBox.alert('会话过期，请重新登陆！', '提示', {
        confirmButtonText: '确定',
        callback: action => {

        }
      })
    }
    return resp
  })
  .catch(function (err) {
    if (err.code === 'ECONNABORTED') {  // 接口超时
      Message({
        message: '链接超时，请稍后再试',
        type: 'warning'
      })
    } else if (!err.response) {  // 网络连接失败
      MessageBox.alert('请检查网络连接', '提示')
    } else {
      MessageBox.alert('系统好像开小差了，请稍后再试~', '提示', {
        confirmButtonText: '我要反馈'
      }).then(() => {

      })
    }
    return Promise.reject(new Error(err))
  })
}

const promise = function (node) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (typeof node === 'function') {
        resolve(node())
      } else {
        resolve(node)
      }
    }, 100)
  })
}

const getQueryString = (name) => {
  if (name === undefined || name === null || name === '') {
    return false
  }
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return decodeURI(r[2])
  } else {
    return null
  }
}

export default {
  getUrl,
  post,
  promise,
  _parseJSON,
  axiosHeaders,
  getQueryString,
  cancel: () => {
    cancel && cancel()
  }
}
