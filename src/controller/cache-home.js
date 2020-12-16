/**
 * @description 首页
 */

const { getHomeCacheList } = require('../cache/blog')
const { resSucc } = require('../model/ResModel')

async function getHomeBlogList(pageIndex, pageSize) {
  const result = await getHomeCacheList(pageIndex, pageSize)
  return resSucc({
    isEmpty: result.blogList.length === 0,
    blogList: result.blogList,
    pageSize,
    pageSize,
    count: result.count
  })
}

module.exports  = {
  getHomeBlogList
}
