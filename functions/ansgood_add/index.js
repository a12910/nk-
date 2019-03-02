const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async(event, context) => {
  if (event.db == "class1") {
    return await db.collection(event.db)
      .where({
        _id: event.id
      })
      .update({
        data: {
          collect_count: _.inc(event.add)
        }
      })
  } else {
    return await db.collection(event.db)
      .where({
        _id: event.id
      })
      .update({
        data: {
          good_count: _.inc(event.add)
        }
      })
  }

}
//回答赞数