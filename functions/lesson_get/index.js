const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => await db.collection('class_info')
  .where({
    class_id:event.class_id
  })
  .get()