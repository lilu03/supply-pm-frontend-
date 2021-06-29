/**
 * @author Skylar Zhang <skylar.zhang@inmobi.com>
 * @description storage封装
 */

// 默认缓存有效时间
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

/**
 * 创建缓存, 默认创建sessionStorage
 * @param {string} prefixKey 前缀
 * @param {Storage} storage
 * @returns {WebStorage}
 */
export const createStorage = (prefixKey = '', storage) => {
  const WebStorage = class WebStorage {
    constructor() {
      this.storage = storage || localStorage
      this.prefixKey = prefixKey
    }

    _getKey(key) {
      return  `${this.prefixKey}${key}`.toUpperCase()
    }

    /**
     * 设置缓存
     * @param {string} key 缓存键
     * @param {*} value 缓存值
     * @param {*} expire 过期时间 单位:秒
     * @memberOf Cache
     */
    set(key, value, expire = DEFAULT_CACHE_TIME | null) {
      const stringData = JSON.stringify({
        value,
        expire: expire ? new Date().getTime() + expire * 1000 : null
      })
      this.storage.setItem(this._getKey(key), stringData)
    }

    /**
     * 读取缓存
     * @param {string} key 缓存键
     * @param {*} def 默认值
     * @returns {string} 缓存值
     * @memberOf Cache
     */
    get(key, def = '') {
      const item = this.storage.getItem(this._getKey(key))

      if (item) {
        try {
          const data = JSON.parse(item)
          const { expire, value } = data

          if (expire === null || expire >= new Date().getTime()) {
            return value
          }
          this.remove(this._getKey(key))
        } catch(e) {
          return def
        }
      }
    }

    /**
     * 删除缓存
     * @param {string} key 缓存键
     * @memberOf Cache
     */
    remove(key) {
      this.storage.removeItem(this._getKey(key))
    }

    /**
     * 清空缓存
     * @memberOf Cache
     */
    clear() {
      this.storage.clear()
    }
  }
  return new WebStorage()
}
