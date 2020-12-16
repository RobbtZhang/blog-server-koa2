/**
 * @description home blog
 */

const router = require('koa-router')()
const { getHomeBlogList } = require('../../controller/cache-home')

router.prefix('/api/home')

router.get('/blog', async (ctx, next) => {
  const { pageIndex, pageSize } = ctx.request.query
  const result = await getHomeBlogList(pageIndex, pageSize)
  ctx.body = result
})

module.exports = router
