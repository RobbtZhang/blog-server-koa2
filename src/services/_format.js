/**
 * @description 数据格式化
 */

const { DEFAULT_AVATAR } = require('../conf/constant')

function _formatAvatar(userInfo) {
  if (userInfo.avatar == null) {
    userInfo.avatar = DEFAULT_AVATAR
  }
  return userInfo
}

function formatUser(list) {
  if (list == null) {
    return list
  }
  if (Array.isArray(list)) {
    return list.map(_formatAvatar)
  }
  return _formatAvatar(list)
}

function _formatContent(obj) {
  obj.contentFormat = obj.content
  const user = []
  const reg = /@(.+?)\s-\s(\d+?)\s/g
  obj.contentFormat = obj.contentFormat.replace(reg, (matchStr, userName, userId) => {
    user.push(['@' + userName + ' ', userId])
    matchStr = ''
    return matchStr
  })
  obj.atUser = user
  return obj
}

function formatBlog(list) {
  if (list == null) {
    return list
  }
  if (list instanceof Array) {
    return list.map(_formatContent)
  }
  let result = list
  result = _formatContent(result)
  return result
}

module.exports = {
  formatUser,
  formatBlog
}
