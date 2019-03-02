const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => await db.collection('answers')
  .where({
    user_id:event.user_id
  })
  .get()

//获取用户回答