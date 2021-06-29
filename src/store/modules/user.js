import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken,
         getTokenType, setTokenType, removeTokenType,
         getTokenId, setTokenId,removeTokenId,
         setAccountName, removeAccountName
        } from '@/utils/auth'
import { resetRouter } from '@/router'
import { setLocal } from '@/utils/persistent'
import Cookies from 'js-cookie'
import store from "@/store";
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}
const state = getDefaultState()
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLE: (state, role) => {
    state.roles = role
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { username, password, client_id, grant_type, client_secret } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password, client_id, grant_type, client_secret }).then(response => {
        const { data } = response
        const roles = data.roles.map(item => item.roleName)
        setLocal('ROLES', roles, true)
        commit('SET_TOKEN', data.access_token)
        commit('SET_ROLE', roles)

        setToken(data.access_token)
        setTokenType(data.token_type)
        setTokenId(data.id)
        if(data.accountName){
          setAccountName(data.accountName)
        }else{
          setAccountName('暂无')
        }

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { username, roles } = data
        const grantedAuthoritiesArray = []
        roles.forEach(item => {
          grantedAuthoritiesArray.push(item.roleName)
        });
        let role = ''
        if (grantedAuthoritiesArray.indexOf('ROLE_VENUS') > -1) {
          role = 'ROLE_VENUS'
        } else {
          role = 'ROLE_VENUS_PUBLISHER'
        }
        commit('SET_NAME', username)
        commit('SET_ROLE', role)
        Cookies.set('accountGuid', data.accountGuid)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        removeTokenType()
        // removeTokenId()
        // removeAccountName()
        Cookies.remove('accountGuid')
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

