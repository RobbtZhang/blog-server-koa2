/**
 * @description blog service
 */

const { Blog, User, UserRelation, Img } = require('../db/model/index')
const { formatBlog } = require('./_format')

async function createBlog({ userId, content }) {
  const result = await Blog.create({
    userId,
    content
  })
  return result.dataValues
}

async function getFollowersBlogList({userId, pageIndex = 0, pageSize = 3}) {
  console.log(userId, pageIndex, pageSize)
  const result = await Blog.findAndCountAll({
    limit: Number(pageSize),
    offset: (pageIndex - 1) * pageSize,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'sign', 'avatar']
      },
      {
        model: Img,
        attributes: ['image']
      },
      {
        model: UserRelation,
        attributes: ['userId', 'followerId'],
        where: {
          userId
        }
      }
    ],
    distinct: true // 去除重复
  })
  // console.log(result.rows.map(row => row.dataValues))
  let blogList = result.rows.map(row => row.dataValues)
  blogList = blogList.map(blog => {
    // console.log(blog.user, blog.imgs)
    const user = blog.user.dataValues
    const imgs = blog.imgs.map(img => {
      // console.log(img.image)
      return img.image
    })
    blog.user = user
    blog.imgs = imgs
    return blog
  })
  return {
    count: result.count,
    blogList: formatBlog(blogList)
  }
}

module.exports = {
  createBlog,
  getFollowersBlogList
}
