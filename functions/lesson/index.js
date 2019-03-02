const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async(event, context) => await db.collection('class_info')
  .where({
    department: _.in(event.dep),
    term: "2019a"
    // _.or([{
    //   department: _.in(event.dep)
    // }])
  })
  .skip(event.skip * 100)
  .get()

//筛选类别

// db.collection('class_info').where(
//   _.and([{
//     no1: _.nin(p)
//   },
//   {
//     no2: _.nin(p)
//   },
//   {
//     no3: _.nin(p)
//   }, {
//     no4: _.nin(p)
//   }, {
//     no5: _.nin(p)
//   }, {
//     no6: _.nin(p)
//   }, {
//     no7: _.nin(p)
//   }, {
//     no8: _.nin(p)
//   }, {
//     location: _.in(q)
//   }
//   ])
// ).get({
//   success(res) {
//     _this.setData({
//       lessons: _this.parse_data(res.data)
//     })
//   }
// })