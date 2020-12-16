/**
 * @description user API 路由
 */

const router = require('koa-router')()
const { isExist, register, login, getUserInfo, changeInfo, changePassword, logout } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middleware/validator')
const { loginCheck } = require('../../middleware/loginCheck')

router.prefix('/api/user')

// 注册
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await register({
    userName,
    password
  })
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

// 登录
router.post('/login', genValidator(userValidate), async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

router.get('/userInfo', loginCheck, async (ctx, next) => {
  ctx.body = await getUserInfo(ctx)
})

router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { sign, city, avatar, gender } = ctx.request.body
  ctx.body = await changeInfo(ctx, { sign, city, avatar, gender })
})

router.patch('/changePassword', loginCheck, genValidator(userValidate),async (ctx, next) => {
  const { password, newPassword } = ctx.request.body
  const { id } = ctx.session.userInfo
  ctx.body = await changePassword(id, password, newPassword)
})

router.post('/logout', loginCheck, async (ctx, next) => {
  ctx.body = await logout(ctx)
})

module.exports = router