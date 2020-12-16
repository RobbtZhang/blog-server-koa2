/**
 * @description response 返回数据格式
 */

function resSucc(data = {}) {
  return {
    errno: 0,
    data
  }
}

function resFail(errMsg = {}) {
  return errMsg
}

module.exports = {
  resSucc,
  resFail
}