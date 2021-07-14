import request from '@/utils/request'

// 用户
export function getUserList(data) {
  return request({
    url: '/admin_user/index',
    method: 'post',
    data
  })
}

export function userAdd(data) {
  return request({
    url: '/admin_user/add',
    method: 'post',
    data: { data }
  })
}

export function userEdit(data) {
  return request({
    url: '/admin_user/edit',
    method: 'post',
    data: { data }
  })
}

export function userEditDetail(params) {
  return request({
    url: '/admin_user/edit',
    method: 'get',
    params
  })
}

export function userDelete(params) {
  return request({
    url: '/admin_user/del',
    method: 'delete',
    params
  })
}

// 角色
export function getRoleList(params) {
  return request({
    url: '/admin_role/index',
    method: 'get',
    params
  })
}

export function searchRoleList(data) {
  return request({
    url: '/admin_role/searchList',
    method: 'post',
    data
  })
}

export function roleAdd(data) {
  return request({
    url: '/admin_role/add',
    method: 'post',
    data: { data }
  })
}

export function roleEdit(data) {
  return request({
    url: '/admin_role/edit',
    method: 'post',
    data: { data }
  })
}

export function roleDelete(params) {
  return request({
    url: '/admin_role/del',
    method: 'delete',
    params
  })
}

// 权限管理
export function getPermissionList(data) {
  return request({
    url: 'admin_permission/index',
    method: 'post',
    data
  })
}

export function permissionAdd(data) {
  return request({
    url: 'admin_permission/add',
    method: 'post',
    data: { data }
  })
}

export function permissionEdit(data) {
  return request({
    url: 'admin_permission/edit',
    method: 'post',
    data: { data }
  })
}

export function permissionDelete(params) {
  return request({
    url: 'admin_permission/del',
    method: 'delete',
    params
  })
}

export function getParentList(data) {
  return request({
    url: 'admin_permission/parentList',
    method: 'post',
    data
  })
}
