const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => await db.collection('answers')
  .doc(event.id)
  .remove()
  
//删除课程回答