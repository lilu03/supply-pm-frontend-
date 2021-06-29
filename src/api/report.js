import request from '@/utils/request'
export function getPubRevReportSC() {
  return request({
    url: '/venus/report/getPubRevReportSC',
    method: 'get'
  })
}
// 七、应用APP信息查询接口
export function selectSimpleAppInfo(params) {
  return request({
    url: '/venus/app/selectSimpleAppInfo',
    method: 'post',
    params
  })
}
// 八、广告位Placement信息查询接口
export function selectSimplePlmInfo(params) {
  return request({
    url: '/venus/placement/selectSimplePlmInfo',
    method: 'post',
    params
  })
}
// 十 收益报表查询接口
export function selectPubRevInfo(params) {
  return request({
    url: '/venus/report/selectPubRevInfo',
    method: 'post',
    data: JSON.stringify(params)
  })
}
export function selectPubRevRTInfo(params) {
  return request({
    url: '/venus/report/selectPubRevRTInfo',
    method: 'post',
    data: JSON.stringify(params)
  })
}
// 十一导出接口
export function exportPubRevReport(params) {
  return request({
    url: '/venus/report/exportPubRevReport',
    method: 'post',
    responseType: 'arraybuffer',
    data: JSON.stringify(params)
  })
}
// 实时数据
export function exportPubRevRTReport(params) {
  return request({
    url: '/venus/report/exportPubRevRTReport',
    method: 'post',
    responseType: 'arraybuffer',
    data: JSON.stringify(params)
  })
}

