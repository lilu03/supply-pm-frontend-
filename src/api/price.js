import request from '@/utils/request'
// 最上面根据id或name搜索
export function findByName(params) {
  return request({
    url: '/venus/pm/placement/findByName',
    method: 'get',
    params
  })
}
//列表select
export function findDspByName(params) {
  return request({
    url: '/venus/pm/placementDynamicPE/findDspByName',
    method: 'get',
    params
  })
}
// li列表信息
export function findPlacementDynamicPE(params) {
  return request({
    url: '/venus/pm/placementDynamicPE/findPlacementDynamicPE',
    method: 'get',
    params
  })
}
// 保存信息
export function updatePlacementDynamicPE(params, placementId) {
  return request({
    url: `/venus/pm/placementDynamicPE/updatePlacementDynamicPE?placementId=${placementId}`,
    method: 'post',
    data: params
  })
}