// pages/my/my1.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answers: [],
    my_good: [],
    user_id: ""
  },

  parse_data: function(data) {
    var _this = this
    var p = []
    // console.log(data)
    var times = require('../../mds/md1.js')


    for (var i = 0; i < data.length; i++) {
      var t = JSON.parse(data[i].time.replace(/\'/g, "\""))

      var name = (data[i].user_name == "null" || data[i].user_name == undefined ? "匿名用户" : data[i].user_name)
      if (name.length > 5) {
        name = name.slice(0, 5) + '...'
      }
      data[i].user_name = name
      data[i].logo = (data[i].logo == "null" || data[i].logo == undefined ? 'png/logo.jpeg' : data[i].logo),
      data[i].time = times.get_timecount2(t)
      // p.push({
      //   name: name,
      //   logo: (data[i].logo == "" || data[i].logo == undefined ? 'png/logo.jpeg' : data[i].logo),
      //   answer: data[i].answer,
      //   good_count: Number(data[i].good_count),
      //   _id: data[i]._id,
      //   id: (data[i].id == "" ? "null" : data[i].id),
      //   is_good: 0,
      //   time: (data[i].time == "" ? 0 : data[i].time),
      //   time_count: times.get_timecount(t),
      //   teacher: data[i].teacher,
      //   day: (data[i].day == "" ? 0 : data[i].day),
      //   year: (data[i].year == "" ? 2018 : data[i].year - 1),
      //   mark: data[i].mark,
      //   lesson_id: data[i].lesson_id,
      //   teacher_id: data[i].teacher_id,
      //   location:data[i].location,
      //   lesson:data[i].lesson
      // })
      p.push(data[i])
    }

    // console.log(p)
    return p
  },

  ans_del: function(options) {

    var _this = this
    console.log(options)
    var info = options.currentTarget.dataset.info
    wx.showModal({
      title: '删除答案',
      content: info.answer_text,
      showCancel: true,
      success(res) {
        // console.log(res)
        if (res.confirm) {
          var xx=require("../../mds/answer.js")
          xx.ans_del({
            _id:info._id,
            class_id:info.class_id
          })
          // wx.cloud.callFunction({
          //   name: 'ans_del',
          //   data: {
          //     id: info._id
          //   },
          //   // success: console.log
          // })
          // db.collection('answer').doc(info._id).remove({
          //   fail:console.log,
          //   success:console.log
          // })
          for (var t = 0; t < _this.data.answers.length; t++) {
            if (_this.data.answers[t]._id == info._id) {
              _this.data.answers.splice(t, 1)
              break
            }
          }
          // console.log(_this.data.answers)
          _this.setData({
            answers: _this.data.answers
          })
          // if (info.lesson_id != undefined || info.lesson_id != "") {
          //   wx.cloud.callFunction({
          //     name: 'ans_add',
          //     data: {
          //       id: info.lesson_id,
          //       add: -1,
          //       db: 'classes'
          //     },
          //     // success: console.log,
          //     fail: console.log
          //   })
          // }


          // if (!(info.mark == 0 || info.mark == undefined||info.teacher_id==undefined)) {
          //   var t_id = info.teacher_id
          //   wx.cloud.callFunction({
          //     name: 'lesson_mark',
          //     data: {
          //       db: 'class_info',
          //       id: t_id,
          //       mark: 0 - info.mark,
          //       add: -1
          //     },
          //     // success: console.log,
          //     fail: console.log
          //   })
          // }

        } else {

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    this.data.user_id = app.globalData.user_info.openid
    console.log(this.data.user_id)
    wx.cloud.callFunction({
      name: 'userans_get',
      // 传递给云函数的参数
      data: {
        user_id: _this.data.user_id
      },
      success: res => {
        console.log(res)
        _this.setData({
          answers: _this.parse_data(res.result.data)
        })
      },
      fail: err => {
        // handle error
      }
    })



  },


  to_lesson:function(options){
    var info = options.currentTarget.dataset.info
    wx.navigateTo({
      url: '../lesson/lesson?class_id=' + info.class_id + '&class_name=' + info.class_name + '&department=' + info.department,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: 'NK好课优选',
      path: '/pages/main/main',
      success: function (res) {
        wx.showToast({
          title: '南喃因你而更加精彩'
        })

      }
    }
  
  }
})