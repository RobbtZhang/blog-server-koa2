/**
 * @description 用户关注关系
 */

const seq = require('../seq')
const { INTEGER } = require('../types')

const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 id'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注用户的 id'
  },
  relation: {
    type: INTEGER,
    allowNull: false,
    comment: '是否关注状态，关注状态为1 取消关注0'
  }
})

module.exports = UserRelation
