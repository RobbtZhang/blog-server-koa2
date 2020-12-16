/**
 * @description 个人主页信息
 */

const { loginCheck } = require('../../middleware/loginCheck')
const router = require('koa-router')()
const { getProfileBlogList } = require('../../controller/profile')
const { getFans, follow, unFollow, getFollowers } = require ('../../controller/user-relation')

router.prefix('/api/profile')

router.get('/profile', async (ctx, next) => {
  const { userId, pageIndex, pageSize } = ctx.request.query
  const result = await getProfileBlogList(userId, pageIndex, pageSize)
  ctx.body = result
})

router.get('/fans', loginCheck, async (ctx, next) => {
  const { userId } = ctx.request.query
  if (userId !== 'undefined') {
    const result = await getFans(userId)
    ctx.body = result
  }
  // ctx.body = await getFans(userId)
})

router.get('/follower', loginCheck, async (ctx, next) => {
  const { userId } = ctx.request.query
  if (userId !== 'undefined') {
    const result = await getFollowers(userId)
    ctx.body = result
  }
})

router.post('/follow', loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  ctx.body = await follow(myUserId, curUserId)
})

router.post('/unFollow', loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  ctx.body = await unFollow(myUserId, curUserId)
})

module.exports = router
