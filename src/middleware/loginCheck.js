/**
 * @description 登录验证中间件
 */

const { loginCheckFailInfo } = require('../model/ErrorInfo')
const { resFail } = require('../model/ResModel')
// const allowPath = ['/api/user/isExist', '/api/user/login', '/api/user/register']

async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    await next()
    return
  }
  ctx.body = resFail(loginCheckFailInfo)
}

module.exports = {
  loginCheck
}
