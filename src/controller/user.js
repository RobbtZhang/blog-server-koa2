/**
 * @description user controller
 */

const { userLogin, createUser, findUserInfo, updateUser } = require('../services/user')
const { resSucc, resFail } = require('../model/ResModel')
const { getUsersByFollower, getFollowersByUser } = require('../services/user-relations')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  isLogin,
  changeInfoFailInfo,
  changePasswordFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

async function isExist(userName) {
  const userInfo = await userLogin(userName)
  if (userInfo) {
    return resFail(registerUserNameExistInfo)
  } else {
    return resFail(registerUserNameNotExistInfo)
  }
}

async function register({ userName, password }) {
  const userInfo = await userLogin(userName)
  if (userInfo) {
    return resFail(registerUserNameExistInfo)
  }
  try {
    await createUser({ userName, password: doCrypto(password)})
    return resSucc()
  } catch (e) {
    console.err(e.message, e.stack)
    return resFail(registerFailInfo)
  }
}

async function login(ctx, userName, password) {
  const userInfo = await userLogin(userName, doCrypto(password))
  if (!userInfo) {
    return resFail(loginFailInfo)
  }
  if (!ctx.session.userInfo) {
    ctx.session.userInfo = userInfo
  }
  return resSucc({
    ...userInfo
  })
}

async function getUserInfo(ctx) {
  const id = ctx.session && ctx.session.userInfo && ctx.session.userInfo.id
  if (id) {
    const { count:fansCount } = await getUsersByFollower(id)
    const { count:followerCount } = await getFollowersByUser(id)
    const userInfo = await findUserInfo(id)
    if (userInfo) {
      return resSucc({
        ...userInfo,
        fansCount,
        followerCount
      })
    } else {
      return resFail({
        errno: 601,
        message: '用户不存在'
      })
    }
  }
  return resFail({
    errno: 601,
    message: '未登录'
  })
}

async function changeInfo (ctx, { sign, city, avatar, gender }) {
  const { id } = ctx.session.userInfo
  const result = updateUser({
    newSign: sign,
    newCity: city,
    newAvatar: avatar,
    newGender: gender
  }, {
    id
  })
  if (result) {
    Object.assign(ctx.session.userInfo, {
      sign, city, avatar, gender
    })
    return resSucc()
  }
  return resFail(changeInfoFailInfo)
}

async function changePassword(id, password, newPassword) {
  const result = await updateUser({
    newPassword: doCrypto(newPassword)
  }, {
    id,
    password: doCrypto(password)
  })
  if (result) {
    return resSucc()
  }
  return resFail(changePasswordFailInfo)
}

async function logout(ctx) {
  delete ctx.session.userInfo
  return resSucc()
}

module.exports = {
  getUserInfo,
  isExist,
  register,
  login,
  changeInfo,
  changePassword,
  logout
}