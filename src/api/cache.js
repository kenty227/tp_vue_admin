import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/cache/index',
    method: 'post',
    data
  })
}

export function del(params) {
  return request({
    url: '/cache/del',
    method: 'delete',
    params
  })
}
