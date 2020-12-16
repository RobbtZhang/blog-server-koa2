const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const cors = require('koa2-cors')
const koaStatic = require('koa-static')
const path = require('path')

const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')

const index = require('./routes/index')
const user = require('./routes/api/user')
const utils = require('./routes/api/utils')
const createBlog = require('./routes/api/create-blog')
const profile = require('./routes/api/profile')
const home = require('./routes/api/home')
const notfound = require('./routes/api/notfound')
const error = require('./routes/api/error')

const { loginCheck } = require('./middleware/loginCheck')

// error handler

let onerrorConf = {}

if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}

onerror(app, onerrorConf)

// 跨域
app.use(cors({
  origin: function (ctx) { //设置允许来自指定域名请求
      return 'http://localhost:8080' // 只允许http://localhost:8080这个域名的请求
  },
  maxAge: 5, // 指定本次预检请求的有效期，单位为秒。
  credentials: true, // 是否允许发送Cookie
}))

// 跨域配置
// {
//   origin: function(ctx) { //设置允许来自指定域名请求
//       return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
//   },
//   maxAge: 5, //指定本次预检请求的有效期，单位为秒。
//   credentials: true, //是否允许发送Cookie
//   allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
// }


// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))


app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'blog.sid', //cookie name default: koa.sid
  prefix: 'blog:sess:', // redis key 的前缀， 默认是koa：session：
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 // ms
  },
  // ttl: 5, 默认 cookie 过期时间
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// 自定义中间件
// app.use(loginCheck)

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(utils.routes(), utils.allowedMethods())
app.use(createBlog.routes(), createBlog.allowedMethods())
app.use(profile.routes(), profile.allowedMethods())
app.use(home.routes(), home.allowedMethods())
app.use(error.routes(), error.allowedMethods())
app.use(notfound.routes(), notfound.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
