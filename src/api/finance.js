import request from '@/utils/request'

/**
 * 查询账号的财务对账信息
 * @param params - { pubAccountId: string, start: string, end: string }
 * @returns {AxiosPromise}
 */
export function getReconciliationList (params) {
  return request({
    url: '/venus/pm/pubFinance/findList',
    method: 'get',
    params
  })
}

/**
 * 新增/修改财务对账信息
 * @param params - { id?: number, month: '2020-08', pubAccountId: string, rev: number, settleStatus: number }
 * @returns {AxiosPromise}
 */
export function saveOrUpdate (params) {
  return request({
    url: '/venus/pm/pubFinance/saveOrUpdate',
    method: 'post',
    data: params
  })
}

/**
 * 下载财务报表
 * @param params - { pubAccountId?: string, start: string, end: string }
 * @returns {AxiosPromise}
 */
export function downloadReport (params) {
  return request({
    url: '/venus/pm/pubFinance/downloadReport',
    method: 'get',
    responseType: 'blob',
    params
  })
}

/**
 * 下载上传文件示例
 * @returns {AxiosPromise}
 */
export function downloadUploadDemo () {
  return request({
    url: '/venus/pm/pubFinance/downloadDemo',
    method: 'get',
    // 防止内容乱码
    responseType: 'blob'
  })
}

/**
 * 上传财务报表
 * @returns {*}
 */
export function uploadReport () {
  return request({
    header: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/venus/pm/pubFinance/uploadReport',
    method: 'post'
  })
}
