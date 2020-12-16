/**
 * @description user service
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

async function userLogin(userName, password) {
  let whereOpt = {
    userName
  }
  if (password) {
    whereOpt = Object.assign(whereOpt, { password })
  }
  const result = await User.findOne({
    attributes: ['id'],
    where: whereOpt
  })
  if (result == null) {
    return result
  }
  return result
}

async function createUser({ userName, password }) {
  const result = await User.create({
    userName,
    password
  })
  return result.dataValues
}

async function findUserInfo(userId) {
  const result = await User.findOne({
    attributes: ['id', 'userName', 'sign', 'gender', 'avatar', 'city'],
    where: {
      id: userId
    }
  })
  if (result == null) {
    return result
  }
  return formatUser(result.dataValues)
}

async function updateUser(
  { newPassword, newSign, newCity, newAvatar, newGender },
  { id, password }
) {
  const updateData = {}
  if (newPassword) {
    updateData.password = newPassword
  }
  if (newSign) {
    updateData.sign = newSign
  }
  if (newCity) {
    updateData.city = newCity
  }
  if (newAvatar) {
    updateData.avatar = newAvatar
  }
  if (newGender) {
    updateData.gender = newGender
  }
  const whereData = {
    id
  }
  if (password) {
    whereData.password = password
  }
  const result = await User.update(updateData, {
    where: whereData
  })
  return result[0] > 0
}

module.exports = {
  findUserInfo,
  userLogin,
  createUser,
  updateUser
}
