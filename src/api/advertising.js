import request from '@/utils/request'

// 广告位table展示
export function Management(params) {
    return request({
        url: '/venus/pm/placement/management',
        method: 'get',
        params
    })
}
// 每条数据展示
export function Find(params) {
    return request({
        url: '/venus/pm/placement/find',
        method: 'get',
        params
    })
}
// 获取广告位状态 字典
export function getPlacementStatus(params) {
    return request({
        url: '/venus/pm/dictionary/getPlacementStatus',
        method: 'get',
        params
    })
}
// AutopilotSource Auto字典
export function getAutopilotSource(params) {
    return request({
        url: '/venus/pm/dictionary/getAutopilotSource',
        method: 'get',
        params
    })
}
// getFixRevShareSource Fix字典
export function getFixRevShareSource(params) {
    return request({
        url: '/venus/pm/dictionary/getFixRevShareSource',
        method: 'get',
        params
    })
}
// getOutRevShare 外部fix字典
export function getOutRevShare(params) {
  return request({
      url: '/venus/pm/dictionary/getOutRevShare',
      method: 'get',
      params
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
// 视频时长  字典
export function getDuration(params) {
    return request({
        url: '/venus/pm/dictionary/getDuration',
        method: 'get',
        params
    })
}
// 广告位时延  字典
export function getSkipDelay(params) {
    return request({
        url: '/venus/pm/dictionary/getSkipDelay',
        method: 'get',
        params
    })
}
// // 应用管理保存接口
export function updateAdPool(params) {
    return request({
        url: '/venus/pm/placement/updateAdPool',
        method: 'post',
        data: params
    })
}
export function getDataSourceRTB(params) {
    return request({
        url: '/venus/pm/dictionary/getDataSourceRTB',
        method: 'get',
        params
    })
}
// export function getDataSource(params) {
//     return request({
//         url: '/venus/pm/dictionary/getDataSource',
//         method: 'get',
//         params
//     })
// }
