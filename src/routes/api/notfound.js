const router = require('koa-router')()

router.get('*', async (ctx, next) => {
  ctx.body = {
    code: 404,
    message: 'not found'
  }
})

module.exports = router