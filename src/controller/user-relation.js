/**
 * @description userrelation
 */

const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')
const { resSucc, resFail } = require('../model/ResModel')
const { getUsersByFollower, addFollower, removeFollower, getFollowersByUser } = require('../services/user-relations')

async function getFans(userId) {
  const { count, userList } = await getUsersByFollower(userId)
  return resSucc({
    count,
    userList
  })
}

async function follow(myUserId, curUserId) {
  try {
    await addFollower(myUserId, curUserId)
    return resSucc()
  } catch (e) {
    return resFail(addFollowerFailInfo)
  }
}

async function unFollow(myUserId, curUserId) {
  const result = removeFollower(myUserId, curUserId)
  if (result) {
    return resSucc()
  }
  return resFail(deleteFollowerFailInfo)
}

async function getFollowers(userId) {
  const { count, userList } = await getFollowersByUser(userId)
  return resSucc({
    count,
    userList
  })
}

module.exports = {
  getFans,
  follow,
  unFollow,
  getFollowers
}
