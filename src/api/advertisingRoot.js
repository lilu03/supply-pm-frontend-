import request from '@/utils/request'
// 不同类型
export function getAdPoolType(params) {
  return request({
    url: '/venus/pm/dictionary/getAdPoolType',
    method: 'get',
    params
  })
}

// 查询账户详情
export function findAdPool(params) {
  return request({
    url: '/venus/pm/adPool/findAdPool',
    method: 'get',
    params
  })
}
// 保存
export function updateAdPool(params) {
  return request({
    url: '/venus/pm/adPool/updateAdPool',
    method: 'post',
    data:params
  })
}