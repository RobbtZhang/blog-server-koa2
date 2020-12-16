/**
 * @description 用户关系 
 */

const { User, UserRelation } = require('../db/model/index')

async function getUsersByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'sign', 'avatar'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation, 
        where: {
          followerId,
          relation: 1
        }
      }
    ],
    distinct: true // 去除重复
  })
  if (result.count > 0) {
    let userList = result.rows.map(row => row.dataValues)
    userList = userList.map(user => {
      delete user.userRelations
      return user
    })
    return {
      count: result.count,
      userList
    }
  } else {
    return {
      count: result.count,
      userList: []
    }
  }
}

async function getFollowersByUser(userId) {
  const result = await UserRelation.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'sign', 'avatar']
      }
    ],
    where: {
      userId,
      relation: 1
    },
    distinct: true // 去除重复
  })
  if (result.count > 0) {
    let userList = result.rows.map(row => row.dataValues)
    userList = userList.map(item => {
      let user = item.user
      user = user.dataValues
      return user
    })
    return {
      count: result.count,
      userList
    }
  } else {
    return {
      count: 0,
      userList: []
    }
  }
}

async function addFollower(userId, followerId) {
  const res = await UserRelation.findOne({
    attributes: ['id'],
    where: {
      userId,
      followerId
    }
  })
  if (!res) {
    const result = await UserRelation.create({
      userId,
      followerId,
      relation: 1
    })
    return result.dataValues
  } else {
    const result = await UserRelation.update({
      relation: 1
    }, {
      where: {
        userId,
        followerId
      }
    })
  }
}

async function removeFollower(userId, followerId) {
  const result = await UserRelation.update({
    relation: 0
  }, {
    where: {
      userId,
      followerId
    }
  })
}

module.exports = {
  getUsersByFollower,
  addFollower,
  removeFollower,
  getFollowersByUser
}
