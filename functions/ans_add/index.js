const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => await db.collection(event.db)
  .doc(event.id)
  .update({
    data: {
      answer_count: _.inc(event.add),
    }
  })

//课程回答数