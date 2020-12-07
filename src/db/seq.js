/**
 *  @description sequelize 实例
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF
const conf = {
  host,
  dialect: 'mysql'
}

if (isTest) {
  conf.logging = () => {} // 不打印 sql 语句
}

if (isProd) {
  conf.pool = {
    max: 5, // 连接池中最大的连接个数
    min: 0,
    idle: 10000 // 如果一个连接池 10s 之内没有被使用 则释放
  }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq