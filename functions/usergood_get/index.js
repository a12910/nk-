const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => await db.collection('user_good')
  .where({
    user_id: event.user_id
  })
  .get()

  //获取用户收藏点赞