/**
 * Created by WuBaiJian on 20/12/07.
 */

import { parseTime } from '@/utils/index'

/**
 * @param {blob} data     EXCEL二进制流数据
 * @param {string} name   下载文件名，不包含后缀
 */
export function downCommon(data, name) {
  if (data.type === 'application/zip') {
    downZip(data, name)
  } else {
    downExcel(data, name)
  }
}

/**
 * @param {blob} data     EXCEL二进制流数据
 * @param {string} name   下载文件名，不包含后缀
 */
export function downExcel(data, name) {
  const downloadElement = document.createElement('a')
  // 创建下载链接
  const _URL = window.URL || window.webkitURL
  const href = _URL.createObjectURL(data)
  downloadElement.href = href
  // 生成下载文件名
  downloadElement.download = name + parseTime(new Date(), '_{y}{m}{d}{h}{i}{s}') + '.xlsx'

  document.body.appendChild(downloadElement)
  downloadElement.click()
  document.body.removeChild(downloadElement)
  _URL.revokeObjectURL(href)
}

/**
 * @param {blob} data     二进制数据流
 * @param {string} name   下载文件名，不包含后缀
 */
export function downZip(data, name) {
  const downloadElement = document.createElement('a')
  // 创建下载链接
  const _URL = window.URL || window.webkitURL
  const href = _URL.createObjectURL(data)
  downloadElement.href = href
  // 生成下载文件名
  downloadElement.download = name + parseTime(new Date(), '_{y}{m}{d}{h}{i}{s}') + '.zip'

  document.body.appendChild(downloadElement)
  downloadElement.click()
  document.body.removeChild(downloadElement)
  _URL.revokeObjectURL(href)
}
