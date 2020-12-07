/**
 * @description 存储配置
 */

 const { isProd } = require('../utils/env')

 let REDIS_CONF = {
   prot: 6379,
   host: '127.0.0.1',
   password: 'zhangyingsheng'
 }

 let MYSQL_CONF = {
   host: 'localhost',
   user: 'root',
   password:'zhangyingsheng',
   port: '3306',
   database: 'blog_koa2_db'
 }

 if (isProd) {
  let REDIS_CONF = {
    prot: 6379,
    host: '127.0.0.1',
    password: 'zhangyingsheng'
  }
 
  let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password:'zhangyingsheng',
    port: '3306',
    database: 'blog_koa2_db'
  }
 }

 module.exports = {
   REDIS_CONF,
   MYSQL_CONF
 }