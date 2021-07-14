import request from '@/utils/request'

/**
 * 通用上传方法
 */
export function common(file, params = {}) {
  return request({
    url: '/upload/index',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    params,
    data: file
  })
}

export function uploadWithProgress(file, onUploadProgress, params = {}) {
  return request({
    url: '/upload/index',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
    data: file,
    params
  })
}

export function uploadVideo(file, params = {}, onUploadProgress) {
  return request({
    url: '/upload/index',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    params,
    data: file,
    onUploadProgress
  })
}
