import request from '@/utils/request'
//查询所有广告类型
export function getDisplayScene (params) {
  return request({
    url: '/venus/pm/dictionary/getDisplayScene',
    method: 'get',
    params
  })
}
//查询送审任务记录
export function getTaskHistory (params) {
  return request({
    url: '/venus/pm/audit/getTaskHistory',
    method: 'post',
    data: params
  })
}

//查询送审任务列表
export function getTaskList (params) {
  return request({
    url: '/venus/pm/audit/getTaskList',
    method: 'post',
    data: params
  })
}

//删除送审任务
export function deleteTask (params){
  return request({
    url: '/venus/pm/audit/deleteTask',
    method: 'get',
    params
  })
}
//更新送审任务
export function updateTask (params){
  return request({
    url: '/venus/pm/audit/updateTask',
    method: 'post',
    data:params
  })
}
//获取开发者列表
export function getAuditPublishers (params){
  return request({
    url: '/venus/pm/audit/getAuditPublishers',
    method: 'get',
    params
  })
}
//获取dspIdlist
export function getAllDspIds (params){
  return request({
    url: '/venus/pm/audit/getAllDspIds',
    method: 'get',
    params
  })
}
//根据开发者查广告位
export function getPubAuditWithPlacements (params){
  return request({
    url: '/venus/pm/audit/getPubAuditWithPlacements',
    method: 'get',
    params
  })
}
//新建送审任务createSendTask
export function createSendTask (params){
  return request({
    url: '/venus/pm/audit/createSendTask',
    method: 'post',
    data:params
  })
}

//送审结果listgetSendCreatives
export function getSendCreatives (params){
  return request({
    url: '/venus/pm/audit/getSendCreatives',
    method: 'post',
    data:params
  })
}