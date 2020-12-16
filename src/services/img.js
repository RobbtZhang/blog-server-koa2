/**
 * @description 添加blog图片
 */

const { Img } = require('../db/model/index')

async function createBlogImgs({ blogId, image }) {
  const result = Img.create({
    blogId,
    image
  })
  return result.dataValues
}

module.exports = {
  createBlogImgs
}
