/**
 * @author Skylar Zhang <skylar.zhang@inmobi.com>
 * @description persistent cache
 */
import { createStorage } from '@/utils/storage/storage'
import { BASE_LOCAL_CACHE_KEY, BASE_SESSION_CACHE_KEY } from '@/const/cacheConst'

const ls = createStorage('', localStorage)
const ss = createStorage('', sessionStorage)

const cacheStorage = {
  local: {},
  session: {}
}

/**
 * 初始化
 */
function initCache() {
  cacheStorage.local = ls.get(BASE_LOCAL_CACHE_KEY) || {}
  cacheStorage.session = ss.get(BASE_SESSION_CACHE_KEY) || {}
}
initCache()

/**
 * 设置local
 * @param key
 * @param value
 * @param immediate
 */
export function setLocal(key, value, immediate = false) {
  cacheStorage.local[BASE_LOCAL_CACHE_KEY] = cacheStorage.local[BASE_LOCAL_CACHE_KEY] || {}
  cacheStorage.local[BASE_LOCAL_CACHE_KEY][key] = value

  if (immediate) {
    const localCache = cacheStorage.local
    ls.set(BASE_LOCAL_CACHE_KEY, localCache)
  }
}

/**
 * 读取local
 * @param key
 * @returns {null|*}
 */
export function getLocal(key) {
  try {
    return cacheStorage.local[BASE_LOCAL_CACHE_KEY][key]
  } catch(error) {
    return null
  }
}

/**
 * 删除local
 * @param key
 */
export function removeLocal(key) {
  if (cacheStorage.local[BASE_LOCAL_CACHE_KEY]) {
    Reflect.deleteProperty(cacheStorage.local[BASE_LOCAL_CACHE_KEY], key)
  }
}

/**
 * 清空local
 */
export function clearLocal() {
  cacheStorage.local = {}
  ls.clear()
}

/**
 * 设置session
 * @param key
 * @param value
 * @param immediate
 */
export function setSession(key, value, immediate = false) {
  cacheStorage.session[BASE_SESSION_CACHE_KEY] = cacheStorage.session[BASE_SESSION_CACHE_KEY] || {}
  cacheStorage.session[BASE_SESSION_CACHE_KEY][key] = value

  if (immediate) {
    const sessionCache = cacheStorage.session
    ss.set(BASE_SESSION_CACHE_KEY, sessionCache)
  }
}

/**
 * 读取session
 * @param key
 * @returns {null|*}
 */
export function getSession(key) {
  try {
    return cacheStorage.session[BASE_SESSION_CACHE_KEY][key]
  } catch(error) {
    return null
  }
}

/**
 * 删除session
 * @param key
 */
export function removeSession(key) {
  if (cacheStorage.session[BASE_SESSION_CACHE_KEY]) {
    Reflect.deleteProperty(cacheStorage.session[BASE_SESSION_CACHE_KEY], key)
  }
}

/**
 * 清空session
 */
export function clearSession() {
  cacheStorage.session = {}
  ss.clear()
}

/**
 * 清空缓存
 */
export function clearAll() {
  clearLocal()
  clearSession()
}

(() => {
  window.addEventListener('beforeunload', () => {
    // const localCache = cacheStorage.local
    // const sessionCache = cacheStorage.session
    //
    // ls.set(BASE_LOCAL_CACHE_KEY, localCache)
    // ss.set(BASE_SESSION_CACHE_KEY, sessionCache)
  })

  function storageChange(e) {
    const { key, newValue, oldValue} = e

    if (!key) {
      clearAll()
      return
    }

    if (!!newValue && !!oldValue) {
      if (BASE_LOCAL_CACHE_KEY === key) {
        clearLocal();
      }
      if (BASE_SESSION_CACHE_KEY === key) {
        clearSession();
      }
    }
  }
  window.addEventListener('storage', storageChange)
})()
