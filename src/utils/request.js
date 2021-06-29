import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, getTokenType, removeToken, removeTokenType, removeTokenId, removeAccountName } from '@/utils/auth'
import { getFileNameFromBackend } from '@/utils/index'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      config.headers['Authorization'] = getTokenType() + ' ' + getToken()
      config.headers['Content-Type'] = 'application/json;application/octet-stream'
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // console.log(response.data)
    // console.log(typeof response.data)
    const res = response.data
    if (response.headers['content-type'] == "image/tiff") {
      return res
    }
    if (res.status == 401) {
      removeToken()
      removeTokenType()
      removeTokenId()
      removeAccountName()
      window.location.reload()
    }

    if (response.headers['content-type'] == 'application/vnd.ms-excel') {
      let fileName = getFileNameFromBackend(response.headers['content-disposition'])
      return {
        fileName: fileName,
        res
      }
    }

    if (res.code !== 200 && res !== 'Advertiser Account ID') {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(response)
    }

    else {
      return res
    }
  },
  error => {
    console.log(error, 'error')
    return Promise.reject(error)
  }
)

export default service
