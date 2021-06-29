import request from '@/utils/request'
import {filterParams} from '@/utils/index'
// 列表查询
export function operationList(params) {
  var q = filterParams(params)
  return request({
    url: '/venus/pm/operateRecord/management',
    method: 'get',
    params: q
  })
}