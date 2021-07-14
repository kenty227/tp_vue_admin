import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/demo/index',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/demo/add',
    method: 'post',
    data: { data }
  })
}

export function editDetail(params) {
  return request({
    url: '/demo/edit',
    method: 'get',
    params
  })
}

export function edit(data) {
  return request({
    url: '/demo/edit',
    method: 'post',
    data: { data }
  })
}

export function del(data) {
  return request({
    url: '/demo/del',
    method: 'post',
    data
  })
}

export function importTemplate(params) {
  return request({
    url: '/demo/importTemplate',
    method: 'get',
    responseType: 'blob',
    params
  })
}

export function importExcel(file) {
  return request({
    url: '/demo/import',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: file
  })
}

export function exportExcel(data) {
  return request({
    url: '/demo/export',
    method: 'post',
    responseType: 'blob',
    data
  })
}
