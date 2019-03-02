// pages/lesson/lesson.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_edit: false,
    lesson_info: {
      class_name: "大学语文",
      department: { "name": "文学院", "short": "LITE" },
      is_collect: 0,
      class_id: "5c6630a9c03eebaccc21a6b4"
    },
    lessons: [],
    teachers: [],
    teachers2: [], // 获取包含对应教师的评论
    answers: [],
    order_time: true,
    user_id: "",
    is_admin: false,
  },

  is_good: function(id) {
    var goods = app.globalData.temp.user_good
    // console.log(goods)
    // console.log(id)
    for (var e = 0; e < goods.length; e++) {
      if (goods[e].id == id) {
        return 1
      }
    }
    return 0
  },

  good_change(options) {
    // console.log(options)
    var _this = this
    var dataset = options.currentTarget.dataset
    // console.log(app.globalData)
    var xx = require("../../mds/answer.js")

    if (dataset.type == 0) {
      xx.ans_good({
        id:dataset.id,
        content:_this.data.teachers2,
        db:'answers'
      })
      this.data.answers[dataset.index].is_good = 1
      this.data.answers[dataset.index].good_count += 1
      this.setData({
        answers: this.data.answers
      })
    } else {
      //app.globalData
      xx.ans_notgood({
        id:dataset.id,
        db:'answers'
      })
      for (var t = 0; t < app.globalData.temp.user_good.length; t++) {
        if (app.globalData.temp.user_good[t].id == dataset.id) {
          app.globalData.temp.user_good.splice(t, 1)
          break
        }
      }
      this.data.answers[dataset.index].is_good = 0
      this.data.answers[dataset.index].good_count -= 1
      this.setData({
        answers: this.data.answers
      })
    }



  },

  lescollect_change: function(options) {
    var x = this.data.lesson_info.is_collect
    var id = this.data.lesson_info.class_id
    var xx = require("../../mds/answer.js")
    var _this = this
    if (x == 0) {
      this.data.lesson_info.is_collect = 1
      xx.ans_good({
        id:id,
        content:_this.data.teachers2,
        db:'class1',
        type:'lesson'
      })

      // app.globalData.temp.user_good.push({
      //   id: id,
      //   type: 'lesson'
      // })
      // db.collection('user_good').add({
      //   data: {
      //     id: id,
      //     user_id: app.globalData.user_info.openid,
      //     type: 'lesson',
          
      //   }
      // })
      // wx.cloud.callFunction({
      //   name: 'ansgood_add',
      //   data: {
      //     id: id,
      //     add: 1,
      //     openid: app.globalData.user_info.openid,
      //     db: 'class1'
      //   },
      //   // success: console.log,
      //   fail: console.log
      // })
      wx.showToast({
        title: '已收藏',
      })
    } else {
      this.data.lesson_info.is_collect = 0
      xx.ans_notgood({
        id:id,
        db:'class1'
      })
      for (var t = 0; t < app.globalData.temp.user_good.length; t++) {
        if (app.globalData.temp.user_good[t].id == id) {
          app.globalData.temp.user_good.splice(t, 1)
          break
        }
      }
      // db.collection('user_good').where({
      //   id: id,
      //   user_id: app.globalData.user_info.openid
      // }).get({
      //   success: function(res) {
      //     console.log(res)
      //     for (var w = 0; w < res.data.length; w++) {
      //       db.collection('user_good').doc(res.data[w]._id).remove({
      //         fail: console.log,
      //         success: console.log
      //       })
      //     }
      //   }
      // })

      // wx.cloud.callFunction({
      //   name: 'ansgood_add',
      //   data: {
      //     id: id,
      //     add: -1,
      //     openid: app.globalData.user_info.openid,
      //     db: 'class1'
      //   },
      //   // success: console.log,
      //   fail: console.log
      // })
      wx.showToast({
        title: '已取消收藏',
      })
    }

    this.setData({
      lesson_info: this.data.lesson_info
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */

  parse_data1: function(data) {
    var _this = this
    var p = []

    _this.data.teachers2 = []
    for (var i = 0; i < data.length; i++) {
      // console.log(p)
      if (data[i].teacher_name.indexOf("外聘") > -1) {
        continue
      }
      if (_this.data.teachers2.indexOf(data[i].teacher_name) == -1) {
        p.push({
          teacher_name: data[i].teacher_name,
          mark_sum: 0,
          mark: 0,
          mark_num: 0,
          lesson_info: [data[i]]
        })
        _this.data.teachers2.push(data[i].teacher_name)
      } else {
        p[_this.data.teachers2.indexOf(data[i].teacher_name)].lesson_info.push(data[i])
      }

    }
    console.log(p)
    this.setData({
      teachers: p
    })
  },

  parse_data2: function(data) {
    var _this = this
    var p = []
    console.log(data)
    var times = require('../../mds/md1.js')


    for (var i = 0; i < data.length; i++) {
      // console.log(data[i].time.replace(/\'/g, "\""))
      var t = JSON.parse(data[i].time.replace(/\'/g, "\""))
      var name = (data[i].user_name == "null" || data[i].user_name == undefined ? "匿名用户" : data[i].user_name)
      if (name.length > 5) {
        name = name.slice(0, 5) + '...'
      }
      data[i].time = {
        normal: t,
        exa: times.get_timecount(t)
      }
      data[i].is_good = _this.is_good(data[i]._id)
      data[i].logo = (data[i].logo == "null" || data[i].logo == undefined ? 'png/users.png' : data[i].logo)
      data[i].user_name = name
      p.push(data[i])

      if (data[i].mark != 0) {
        _this.data.teachers.forEach(function(v) {
          if (v.teacher_name == data[i].teacher_name) {
            v.mark_sum += data[i].mark
            v.mark_num += 1
            v.mark = v.mark_sum / v.mark_num
          }
        })
      }
    }

    // console.log(p)
    this.setData({
      answers: p,
      teachers:_this.data.teachers
    })
  },

  order_change: function(options) {

    if (this.data.order_time) {
      this.data.answers.sort(function(a, b) {
        return b.good_count - a.good_count
      })
      this.setData({
        answers: this.data.answers,
        order_time: !this.data.order_time,

      })
    } else {

      var dd = require('../../mds/sort.js')
      // console.log(this.data.answers)
      this.setData({
        answers: dd.sort(this.data.answers),
        order_time: !this.data.order_time,
      })

    }

  },

  my_answer: function(options) {
    var info = this.data.lesson_info
    // var teacher_id = ''
    // for (var j = 0; j < this.data.teachers; j++) {

    // }
    app.globalData.temp.edit_lesson = this.data
    wx.navigateTo({
      url: '../edit/edit',
    })
  },

  ans_delete: function(options) {
    var _this = this
    console.log(options)
    var info = options.currentTarget.dataset.info
    if(info.answer_text==undefined){
      info.answer_text=""
    }
    wx.showModal({
      title: '删除答案',
      content: info.answer_text,
      showCancel: true,
      success(res) {
        // console.log(res)
        if (res.confirm) {
          var xx = require("../../mds/answer.js")
          xx.ans_del({
            _id:info._id,
            class_id: _this.data.lesson_info.class_id
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
          _this.data.teachers.forEach(function(item){
            if(item.teacher_name==info.teacher_name){
              item.mark_sum -= info.mark
              item.mark_num -= 1
              if(item.mark_num==0){
                item.mark=0
              }else{
                item.mark = item.mark_sum / item.mark_num
              }
              _this.setData({
                teachers:_this.data.teachers
              })
            }
          })
          // console.log(_this.data.answers)
          _this.setData({
            answers: _this.data.answers
          })
          // wx.cloud.callFunction({
          //   name: 'ans_add',
          //   data: {
          //     class_id: _this.data.lesson_info.class_id,
          //     add: -1,
          //     db: 'class1'
          //   },
          //   // success: console.log,
          //   fail: console.log
          // })

          // if (!(info.mark == 0 || info.mark == undefined)) {
          //   var t_id = _this.data.teachers[_this.data.teachers2.indexOf(info.teacher)].teacher_id
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

  send_main: function(options) {
    console.log(options)
    var info = options.currentTarget.dataset.info
    var _this = this
    if(!this.data.is_admin){
      return
    }
    wx.showModal({
      title: '管理员',
      content: '是否移至主页？',
      showCancel: true,
      success(res) {
        if (res.confirm) {
          // var send_data = {
          //   class_id: info.class_id,
          //   user_name: info.user_name,
          //   department: info.department,
          //   answer_text: info.answer_text,
          //   type: 'lesson',
          //   logo: info.logo,
          //   teacher_name: info.teacher_name,
          //   time : JSON.stringify(info.time.normal),
          //   class_name:info.class_name,
          //   good_count:info.good_count,

          // }
          console.log(info)
          info.type="lesson"
          info.time = JSON.stringify(info.time.normal)
          delete info._id
          delete info[""]
          db.collection('main_page').add({
            data: info,
            success: console.log,
            fail:console.log
          })
        }
      }
    })
  },
  onLoad: function(options) {
    var _this = this
    // console.log(options)

    if (options == undefined) {
      var x = this.is_good(this.data.lesson_info.class_id)
      console.log(x)
      this.data.lesson_info.is_collect= x,
      this.setData({
        lesson_info: _this.data.lesson_info,
        user_id: app.globalData.user_info.openid,
        is_admin: app.globalData.user_info.is_admin
      })
      return
    }
    var x1=require("../../mds/data_loc1.js")

    var date = new Date()
    db.collection('static').add({
      data:{
        type:'lesson',
        class_name:options.class_name,
        class_id:options.class_id,
        time:date.date()
      },
      success:console.log
    })
    this.data.lesson_info = {
      class_name: options.class_name,
      department: x1.dep_get(options.department),
      is_collect: this.is_good(options.class_id),
      class_id: options.class_id,
    }


    //collect
    this.setData({
      lesson_info: _this.data.lesson_info,
      user_id: app.globalData.user_info.openid,
      is_admin: app.globalData.user_info.is_admin
    })




    // db.collection('question').where({
    //   question: db.RegExp({
    //     regexp: _this.data.lesson_info.id,
    //     options: 'i',
    //   })
    // }).get({
    //   success(res) {
    //     console.log(res.data)
    //     var p = _this.parse_data(res.data, "ques")
    //     // console.log(p)
    //     _this.setData({
    //       question_list: p,
    //       now_page: 0,
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var _this = this
    var options = this.data.lesson_info

    db.collection('class_info').where({
      class_id: _this.data.lesson_info.class_id
    }).get({
      success(res) {
        _this.parse_data1(res.data)
        console.log(_this.data.lesson_info.class_id)
        wx.cloud.callFunction({
          name: 'ans_get',
          data: {
            class_id: _this.data.lesson_info.class_id
          },
          success(res) {
            console.log(res)
            _this.parse_data2(res.result.data)
            _this.order_change()
          },
          fail(res) {
            console.log(res)
          }
        })
      }
    })


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
    var _this = this
    var info = this.data.lesson_info
    return {
      title:_this.data.lesson_info.class_name,
      path:'/pages/lesson/lesson?class_id=' + info.class_id + '&department=' + info.department.short + '&class_name=' + info.class_name,
      success:function(res){
        wx.showToast({
          title:'南喃因你而更加精彩'
        })

      }
    }
  }
})