/**
 *  @description 创建博客
 */

const { loginCheck } = require('../../middleware/loginCheck')
const { create, getFollowersBlogs } = require('../../controller/create-blog')
const blogValidate = require('../../validator/blog')
const { genValidator } = require('../../middleware/validator')

const router = require('koa-router')()

router.prefix('/api/blog')

router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, imgLists } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({
    userId,
    content,
    imgLists
  })
})

router.get('/followBlogs', loginCheck, async (ctx, next) => {
  const { userId, pageIndex, pageSize } = ctx.request.query
  ctx.body = await getFollowersBlogs(userId, pageIndex, pageSize)
})

module.exports = router
