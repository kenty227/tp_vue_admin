import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import i18n from '@/lang' // Internationalization

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      const Base64 = require('js-base64').Base64
      config.headers['token'] = getToken() + '%' + Base64.encode((new Date()).getTime())
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
    // 二进制数据则直接返回
    if (response.request.responseType === 'arraybuffer' || response.request.responseType === 'blob') return response

    const res = response.data

    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      // 401: Illegal token / Other clients logged in / Token expired.
      if (res.code === 401) {
        toReLogin()
      } else {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }

      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // console.log('err' + error) // for debug

    // 401: Illegal token / Other clients logged in / Token expired.
    if (error.response.status === 401) {
      toReLogin()
      return Promise.reject()
    }

    const errMsg = 'message' in error.response.data ? error.response.data.message : error.message
    Message({
      message: errMsg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

const toReLogin = () => {
  MessageBox.confirm(i18n.t('logOut.confirmContent'), i18n.t('logOut.confirmTitle'), {
    confirmButtonText: i18n.t('logOut.confirmButtonText'),
    cancelButtonText: i18n.t('logOut.cancelButtonText'),
    type: 'warning'
  }).then(() => {
    store.dispatch('user/resetToken').then(() => {
      location.reload()
    })
  })
}

export default service
