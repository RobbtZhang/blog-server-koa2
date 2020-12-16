/**
 * @description 创建微博
 */

const xss = require('xss')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { resSucc, resFail } = require('../model/ResModel')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const { createBlogImgs } = require('../services/img')
const { getUsersByFollower, getFollowersByUser } = require('../services/user-relations')

async function create({ userId, content, imgLists }) {
  try {
    const blog = await createBlog({
      userId,
      content: xss(content)
    })
    if (blog) {
      const { id: blogId } = blog
      if (imgLists && imgLists.length > 0) {
        imgLists.forEach(async image => {
          await createBlogImgs({
            blogId,
            image
          })
        })
      }
      return resSucc(blog)
    }
  } catch (e) {
    console.error(e.message)
    return resFail(createBlogFailInfo)
  }
}

async function getFollowersBlogs(userId, pageIndex = 0, pageSize = 3) {
  const result = await getFollowersBlogList({
    userId,
    pageIndex,
    pageSize
  })
  const { count: followerCount } = await getFollowersByUser(userId)
  const { count: fansCount } = await getUsersByFollower(userId)
  return resSucc({
    ...result,
    followerCount,
    fansCount
  })
}

module.exports = {
  create,
  getFollowersBlogs
}
