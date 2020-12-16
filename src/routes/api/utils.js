/**
 * @description utils api 路由
 */

const router = require('koa-router')()
const koaForm = require('formidable-upload-koa')
const { loginCheck } = require('../../middleware/loginCheck')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')

router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
  const file = ctx.req.files['file']
  if (!file) return
  const { size, path, name, type } = file
  ctx.body = await saveFile({
    size,
    name,
    type,
    filePath: path
  })
})

module.exports = router
