/**
 * @description 个人主页信息获取
 */

const { getBlogListByUser } = require('../services/profile')
const { resSucc, resFail } = require('../model/ResModel')
const { getUsersByFollower, getFollowersByUser } = require('../services/user-relations')

async function getProfileBlogList(userId, pageIndex = 0, pageSize = 3) {
  const result = await getBlogListByUser({
    userId,
    pageIndex,
    pageSize
  })
  const { count: followerCount } = await getFollowersByUser(userId)
  const { count: fansCount } = await getUsersByFollower(userId)
  return resSucc({
    isEmpty: result.blogList.length === 0,
    blogList: result.blogList,
    pageIndex,
    pageSize,
    count: result.count,
    fansCount,
    followerCount
  })
}

module.exports = {
  getProfileBlogList
}
