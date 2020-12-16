/**
 * @description 微博实例
 */

const seq = require('../seq')
const { INTEGER, STRING, TEXT } = require('../types')

const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '微博内容'
  }
})

module.exports = Blog
