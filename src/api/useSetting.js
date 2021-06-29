import request from '@/utils/request'

// 应用管理设置列表查询
export function Management(params) {
  return request({
    url: '/venus/pm/app/management',
    method: 'get',
    params
  })
}
// 应用管理每页详情
export function Find(params) {
  return request({
    url: '/venus/pm/app/find',
    method: 'get',
    params
  })
}
//广告位审核
export function findPlacement(params) {
  return request({
    // url: '/venus/pm/placement/findReviewing',
    url: '/venus/pm/placement/findDetail',
    method: 'get',
    params
  })
}
//广告位审核通过
export function reviewPass(params) {
  return request({
    url: '/venus/pm/placement/reviewPass',
    method: 'get',
    params
  })
}
//广告位审核驳回
export function reviewReject(params) {
  return request({
    url: '/venus/pm/placement/reviewReject',
    method: 'get',
    params
  })
}
//广告位审核驳回字典
export function getRejectCode(params) {
  return request({
    url: '/venus/pm/dictionary/getRejectCode',
    method: 'get',
    params
  })
}
//广告素材-广告创意类型
export function getCreativeType(params) {
  return request({
    url: '/venus/pm/dictionary/getCreativeType',
    method: 'get',
    params
  })
}


// 应用管理保存接口
export function updateAdPool(params) {
  return request({
    url: '/venus/pm/app/updateAdPool',
    method: 'post',
    data: params
  })
}
// 应用/ 广告位/ 广告源设置  字典
export function getDataSource(params) {
  return request({
    url: '/venus/pm/dictionary/getDataSource',
    method: 'get',
    params
  })
}
// 应用状态 字典
export function getAppStatus(params) {
  return request({
    url: '/venus/pm/dictionary/getPlacementStatus',
    method: 'get',
    params
  })
}
// 应用操作系统 字典
export function getAppPlatform(params) {
  return request({
    url: '/venus/pm/dictionary/getAppPlatform',
    method: 'get',
    params
  })
}
//广告位类型字典
export function getAdType(params) {
  return request({
    url: '/venus/pm/dictionary/getAdType',
    method: 'get',
    params
  })
}
//应用内广告展示场景
export function getDisplayScene(params) {
  return request({
    url: '/venus/pm/dictionary/getDisplayScene',
    method: 'get',
    params
  })
}

export function getLayoutStyle(params) {
  return request({
    url: '/venus/pm/dictionary/getLayoutStyle',
    method: 'get',
    params
  })
}


export function getImg(params) {
  return request({
    url: '/venus/pm/file/img',
    method: 'get',
    params
  })
}