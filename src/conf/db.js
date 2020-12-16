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
   host: '127.0.0.1',
   user: 'root',
   password:'[Zys,950610.]',
   port: '3306',
   database: 'blog_koa2_db'
 }

 if (isProd) {
  let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
 
  let MYSQL_CONF = {
    host: '127.0.0.1',
    user: 'root',
    password:'[Zys,950610.]',
    port: '3306',
    database: 'blog_koa2_db'
  }
 }

 module.exports = {
   REDIS_CONF,
   MYSQL_CONF
 }