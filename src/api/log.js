import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/admin_log/index',
    method: 'post',
    data
  })
}

export function getUserList(data) {
  return request({
    url: '/admin_user/searchList',
    method: 'post',
    data
  })
}
