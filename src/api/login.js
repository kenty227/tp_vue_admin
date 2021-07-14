import request from '@/utils/request'

export function getVerify() {
  return request({
    url: '/base/getCaptcha',
    method: 'get',
    responseType: 'blob'
  })
}

export function login(data) {
  return request({
    url: '/base/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/login_user/info',
    method: 'get'
  })
}

export function refresh() {
  return request({
    url: '/login_user/refresh',
    method: 'get'
  })
}

export function updatePwd(data) {
  return request({
    url: '/login_user/updatePwd',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login_user/logout',
    method: 'get'
  })
}
