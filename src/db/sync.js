/**
 * @description sequelize 同步数据库
 */

const seq = require('./seq')
require('./model/index')

seq.authenticate().then(() => {
  console.log('authenticate success')
}).catch (() => {
  console.log('authenticate fail')
})

// 同步 { force: true } 强制执行删除后创建
seq.sync().then(() => {
  console.log('sync ok')
  process.exit()
})