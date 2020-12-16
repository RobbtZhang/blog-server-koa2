/**
 * @description 数据模型入口文件
 */

const User = require('./User')
const Blog = require('./Blog')
const Img = require('./Img')
const UserRelation = require('./UserRelation')

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

Blog.hasMany(Img, {
  foreignKey: 'blogId'
})

Img.belongsTo(Blog, {
  foreignKey: 'blogId'
})

UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})

User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followerId'
})

module.exports = {
  User,
  Blog,
  Img,
  UserRelation
}