/**
 * @description 个人主页微博信息查询
 */

const { Blog, User, Img } = require('../db/model/index')
const { formatBlog } = require('./_format')

async function getBlogListByUser({ userId, pageIndex, pageSize }) {
  const userWhereOpts = {}
  if (userId) {
    userWhereOpts.id = userId
  }
  const result = await Blog.findAndCountAll({
    limit: Number(pageSize), // 每页多少条
    offset: pageSize * (pageIndex - 1), // 跳过多少条
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'sign', 'avatar', 'city'],
        where: userWhereOpts
      },
      {
        model: Img,
        attributes: ['image']
      }
    ],
    // distinct: true // 去除重复
  })
  // console.log(result)
  // result.count 总数
  // result.rows 查询结果数组
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
  // console.log(result)
  return {
    count: result.count,
    blogList: formatBlog(blogList)
  }
}

module.exports = {
  getBlogListByUser
}
