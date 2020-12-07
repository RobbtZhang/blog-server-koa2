/**
 * @description 环境变量
 */

const  ENV = process.env.NODE_ENV

module.exports = {
  isDev: ENV === 'dev',
  noDev: ENV !== 'dev',
  isProd: ENV === 'production',
  notProd: ENV !== 'production',
  isTest: ENV === 'test',
  noTest: ENV !== 'test'
}