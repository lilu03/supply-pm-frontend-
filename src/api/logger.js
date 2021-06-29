import request from '@/utils/request'
import { filterParams } from '@/utils/index'
export function operateRecord(params) {
    let p = filterParams(params)
    return request({
        url: '/venus/pm/operateRecord/management',
        method: 'get',
        params: p
    })
}