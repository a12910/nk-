const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => await db.collection('answers')
  .where({
    class_id:event.class_id
  })
  .get()

//获取课程回答