import request from '@/utils/request'
import { getToken } from '@/utils/auth'
// 账号列表查询
export function getPubList(params) {
  return request({
    url: '/venus/pm/pub/getPubList',
    method: 'post',
    data: params
  })
}
// 
// 财务列表查询
export function getPubListDetail(params) {
  return request({
    url: '/venus/pm/pub/getPubListDetail',
    method: 'post',
    data: params
  })
}
// 查询账户详情
export function getPubDetailInfo(params) {
  return request({
    url: '/venus/pm/pub/getPubDetailInfo',
    method: 'get',
    params
  })
}

// 账户注销
export function cancelPubAccount(params) {
  return request({
    url: '/venus/pm/pub/cancelPubAccount',
    method: 'get',
    params
  })
}

// 账户信息修改
export function editPubDetailInfo(params) {
  return request({
    url: '/venus/pm/pub/editPubDetailInfo',
    method: 'post',
    data: params
  })
}

/// PM账户联系邮箱修改接口
export function changePubContactEmail(params) {
  return request({
    url: '/venus/pm/pub/changePubContactEmail',
    method: 'post',
    data: params
  })
}
/// PM审核单条记录查询接口
export function getPubAuditInfo(params) {
  return request({
    url: '/venus/pm/pub/getPubAuditInfo',
    method: 'get',
    params
  })
}
/// PM审核保存接口
export function addPubAuditRecord(params) {
  return request({
    url: '/venus/pm/pub/addPubAuditRecord',
    method: 'post',
    data: params
  })
}
///PM用户退出接口
export function logOut(params) {
  // let token=getToken('token/')
  return request({
    url: '/venus/pm/api/user/logOut',
    method: 'post',
    // headers: {'Authorization': 'bearer token'},
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
