// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => await db.collection(event.db).doc(event.id).update({
  data:{
    class_id:event.class_id
  }
})
  
