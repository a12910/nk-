const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => await db.collection(event.db)
  .where({
    _id: event.id
  })
  .update({
    data: {
      mark: _.inc(event.mark),
      mark_count:_.inc(event.add)
    }
  })

//课程评分