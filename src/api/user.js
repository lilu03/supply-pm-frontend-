import request from '@/utils/request'
import { getTokenType } from '@/utils/auth'

export function login(params) {
  return request({
    url: '/venus/pm/api/user/login',
    method: 'post',
    data: params
  })
}

export function logout(token) {
  return request({
    url: '/auth/api/exit',
    method: 'delete',
    params: {
      access_token: token
    }
  })
}

export function resetUserPassword(params) {
  return request({
    url: '/venus/pm/user/resetUserPassword',
    method: 'post',
    data: params
  })
}

/**
 * 获取用户角色权限
 * @returns {AxiosPromise}
 */
export function getUserRoles() {
  return request({
    url: '/venus/pm/user/getRoles',
    method: 'get'
  })
}
