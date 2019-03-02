const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async(event, context) => {
  if(event.type=='update'){
    await db.collection('main_page')
    .doc(event.id)
    .update({
      data: {
        1: event.datas[0],
        2: event.datas[1],
        3: event.datas[2],
        4: event.datas[3],
        5: event.datas[4],
        6: event.datas[5],
        7: event.datas[6],
        8: event.datas[7],
      }
    })
  }else if(event.type=='delete'){
    await db.collection('main_page').doc(event.id).remove()
  }
  
}
//更新首页

// exports.main = async (event, context) => await db.collection('main_page')
//   .doc(event.id)
//   .update({
//     data: {
//       1: event.datas[0],
//       2: event.datas[1],
//       3: event.datas[2],
//       4: event.datas[3],
//       5: event.datas[4],
//       6: event.datas[5],
//       7: event.datas[6],
//       8: event.datas[7],
//     }
//   })