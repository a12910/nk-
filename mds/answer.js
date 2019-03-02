const app = getApp()
const db=wx.cloud.database()
function ans_del(data) {
  var info = data
  wx.cloud.callFunction({
    name: 'ans_del',
    data: {
      id: info._id
    },
    // success: console.log
  })

  wx.cloud.callFunction({
    name: 'ans_add',
    data: {
      class_id: info.class_id,
      add: -1,
      db: 'class1'
    },
    // success: console.log,
    fail: console.log
  })
}

function ans_good(dataset) {
  if(dataset.content==undefined){
    dataset.content= ""
  }
  app.globalData.temp.user_good.push({
    id: dataset.id,
    type: dataset.type,
    content: dataset.content
  })
  db.collection('user_good').add({
    data: {
      id: dataset.id,
      user_id: app.globalData.user_info.openid,
      type: dataset.type,
      content:dataset.content
    }
  })
  wx.cloud.callFunction({
    name: 'ansgood_add',
    data: {
      id: dataset.id,
      add: 1,
      openid: app.globalData.user_info.openid,
      db: dataset.db
    },
    // success: console.log,
    fail: console.log
  })

}

function ans_notgood(dataset) {
  db.collection('user_good').where({
    id: dataset.id,
    user_id: app.globalData.user_info.openid
  }).get({
    success: function(res) {
      // console.log(res)
      for (var w = 0; w < res.data.length; w++) {
        db.collection('user_good').doc(res.data[w]._id).remove()
      }
    }
  })
  wx.cloud.callFunction({
    name: 'ansgood_add',
    data: {
      id: dataset.id,
      add: -1,
      openid: app.globalData.user_info.openid,
      db: dataset.db
    },
    // success: console.log,
    fail: console.log
  })

}

module.exports.ans_del = ans_del
module.exports.ans_good = ans_good
module.exports.ans_notgood = ans_notgood