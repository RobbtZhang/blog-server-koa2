/**
 * @description json schema 验证中间件
 */

const { resFail } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

function genValidator(validateFn) {
  return async function(ctx, next) {
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      console.log(error)
      ctx.body = resFail(jsonSchemaFileInfo)
      return
    }
    await next()
  }
}

module.exports = {
  genValidator
}
