/**
 * @description 用户数据模型
 */

const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名，唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  },
  gender: {
    type: DECIMAL,
    default: 3,
    comment: '性别（1 男性，2 女性，3 保密）',
  },
  sign: {
    type: STRING,
    comment: '签名'
  },
  avatar: {
    type: STRING,
    comment: '头像 地址'
  },
  city: {
    type: STRING,
    comment: '城市'
  }
})

module.exports = User
