import request from '@/utils/request'

// 白名单下载
export function downloadInclusionCsv(params) {
    return request({
        url: '/venus/pm/placement/downloadInclusionFile',
        method: 'get',
        params
    })
}
// 黑名单下载
export function downloadExclusionFile(params) {
  return request({
      url: '/venus/pm/placement/downloadExclusionFile',
      method: 'get',
      params
  })
}
// 白名单列表拉取（下面）
export function findInclusionByPlacementId(params) {
    return request({
        url: '/venus/pm/placement/findInclusionByPlacementId',
        method: 'get',
        params
    })
}
// 黑名单列表拉取（下面）
export function findExclusionByPlacementId(params) {
  return request({
      url: '/venus/pm/placement/findExclusionByPlacementId',
      method: 'get',
      params
  })
}
 // 黑白名单（上面）
 export function findAdvertiserByAccountIds(params) {
    return request({
      url: '/venus/pm/placement/findAdvertiserByAccountIds',
      method: 'post',
      data: params
    })
  }
 // 白名单批量增加（上面）
 export function createInclusion(param,params) {
    return request({
      url: '/venus/pm/placement/createInclusion?placementId=' + param.placementId,
      method: 'post',
      data: params
    })
}
 // 黑名单批量增加（上面）
 export function createExclusion(param,params) {
    return request({
      url: '/venus/pm/placement/createExclusion?placementId=' + param.placementId,
      method: 'post',
      data: params
    })
}
 // 白名单批量移除（下面）
 export function delInclusion(param,params) {
  return request({
    url: '/venus/pm/placement/delInclusion?placementId=' + param.placementId,
    method: 'post',
    data: params
  })
}
 // 黑名单批量移除（下面）
 export function delExclusion(param,params) {
  return request({
    url: '/venus/pm/placement/delExclusion?placementId=' + param.placementId,
    method: 'post',
    data: params
  })
}