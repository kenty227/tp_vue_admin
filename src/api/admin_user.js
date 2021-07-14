import request from '@/utils/request'

export function searchUserList(data) {
  return request({
    url: '/admin_user/searchList',
    method: 'post',
    data
  })
}
