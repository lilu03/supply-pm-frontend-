import axios from 'axios'
const base = 'http://10.14.45.20:8080'
import { Message } from 'element-ui'

// axios.interceptors.request.use(function(config) {
//   console.log('config, ', config)
// }, function(error) {
//   console.error('error, ', error)
// })
// axios.interceptors.response.use(data => {
//   console.log('data', data)
// })
const POST = (url, params) => axios.post(`${base}${url}`, params, {
  headers: { 'content-type': 'application/json' }
}).then(res => {
  if (res.data == 'OK') {
    return res
  } else {
    console.log(res)
    Message({
      message: res.data.status.status || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(res.data || 'Error'))
  }
}).catch(res => {
  // Message({
  //   message: 'Error222222',
  //   type: 'error',
  //   duration: 5 * 1000
  // })
  return Promise.reject(new Error(res.message || 'Error'))
})
export default POST
