/**
 * @description 微博图片
 */

const seq = require('../seq')
const { INTEGER, STRING } = require('../types')

const Img = seq.define('img', {
  blogId: {
    type: INTEGER,
    allowNull: false,
    comment: '微博ID'
  },
  image: {
    type:STRING,
    comment: '图片地址'
  }
})

module.exports = Img
