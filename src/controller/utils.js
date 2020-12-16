/**
 * @description utils controller
 */

const path = require('path')
const { resSucc, resFail } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')

const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

const MAX_SIZE = 1024 * 1024 * 500

fse.pathExists(DIST_FOLDER_PATH).then((exist) => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

async function saveFile({ name, type, size, filePath }) {
  if (size > MAX_SIZE) {
    await fse.remove(filePath)
    resFail(uploadFileSizeFailInfo)
  }
  const fileName = Date.now() + '.' + name
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
  await fse.move(filePath, distFilePath)
  return resSucc({
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
}