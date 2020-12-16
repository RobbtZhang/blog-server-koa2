/**
 * @description blog缓存
 */

const { getBlogListByUser } = require('../services/profile')
const { get, set } = require('./_redis')

async function getHomeCacheList(pageIndex, pageSize) {
  const key = `${pageIndex}_${pageSize}`
  const cacheResult = await get(key)
  if (cacheResult != null) {
    return cacheResult
  }

  const result = await getBlogListByUser({ pageIndex, pageSize })

  set(key, result, 60)
  return result
}

module.exports = {
  getHomeCacheList
}
