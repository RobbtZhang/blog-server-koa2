const router = require('koa-router')()

router.get('/error', async (ctx, next) => {
  ctx.body = {
    code: 500,
    message: 'server error'
  }
})

module.exports = router