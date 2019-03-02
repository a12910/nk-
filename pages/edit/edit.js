// pages/edit/edit.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lesson_info: {},
    lesson_sname: "",
    answer: "",
    teachers2: ['1', '2', '3', '4', '5'],
    teachers: [],
    teacher_index: 0,
    mark: 0,
    is_anonymous: 1,
    id: '',
    is_getinfo: false

  },
  mask1: function(options) {
    this.setData({
      is_getinfo: false
    })
  },

  is_niming() {
    var _this = this
    if (this.data.is_anonymous) {
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            _this.setData({
              is_getinfo: true
            })
          } else {
            wx.getUserInfo({
              success: function(res) {
                console.log(res)
                app.globalData.user_info.nickname = res.userInfo.nickName
                app.globalData.user_info.logo = res.userInfo.avatarUrl
                _this.setData({
                  is_anonymous: false
                })
              }
            })
          }
        }
      })
    }else{
      _this.setData({
        is_anonymous: true
      })
    }
    // this.setData({
    //   is_anonymous: !this.data.is_anonymous
    // })
  },

  teacher_choose(options) {
    console.log(options)
    this.setData({
      teacher_index: Number(options.detail.value)
    })
  },

  star_change(options) {
    // console.log(options)
    this.setData({
      mark: options.currentTarget.dataset.num + 1
    })
  },

  but_save: function() {
    // console.log(this.data.type)
    if (this.data.answer == "") {
      wx.showToast({
        title: '您还未输入评论',
        icon: 'none'
      })
      return
    }
    if (this.data.mark == 0) {
      wx.showToast({
        title: '您还未评分',
        icon: 'none'
      })
      return
    }

    var _this = this
    var timer = require('../../mds/md1.js')
    var time1 = JSON.stringify(timer.get_time())
    // console.log(_this.data.answer)
    var info = app.globalData.user_info
    if (this.data.is_anonymous == 1) {
      info.nickname = 'null',
        info.logo = 'null'
    }
    var send_data = {
      class_id: _this.data.lesson_info.class_id,
      answer_text: _this.data.answer,
      // lesson_name: _this.data.lesson,
      // location:_this.data.location,
      time: time1,
      // day: time1.day,
      // year: time1.year + 1,
      user_name: info.nickname,
      user_id: info.openid,
      logo: info.logo,
      teacher_name: _this.data.teachers2[_this.data.teacher_index],
      good_count: 0,
      department: _this.data.lesson_info.department.short,
      mark: _this.data.mark,
      // lesson_id:_this.data.id,
      // teacher_id: _this.data.teachers_info[_this.data.teacher_index],
      class_name: _this.data.lesson_info.class_name,
      answer_to: "null",
      lesson_id: "null",


    }
    // console.log(send_data)
    wx.cloud.callFunction({
      name: 'ans_add',
      data: {
        id: _this.data.teachers[_this.data.teacher_index].lesson_info[0]._id,
        db: 'class_info',
        add: 1
      },
      success: function(res){
        console.log(res)
      },
      fail: function(res){
        console.log
      }
    })

    db.collection('answers').add({
      data: send_data,
      success(res) {
        // console.log(res)
        // 

        wx.showToast({
          title: '保存答案成功',
          icon: 'success',
          duration: 1000,
          success(res) {
            setTimeout(function() {
              wx.navigateBack()
            }, 1000)
          }
        })

      },
      fail: console.log
    })

    


    // wx.cloud.callFunction({
    //   name: 'lesson_mark',
    //   data: {
    //     db: 'class_info',
    //     id: _this.data.teachers_info[_this.data.teacher_index].teacher_id,
    //     mark: _this.data.mark,
    //     add: 1
    //   },
    //   success:function(res){
    //     
    //   },
    //   fail: console.log
    // })
  },


  // ques_save:function(){
  //   var _this = this
  //   var time1 = new Date()
  //   var time = [time1.getFullYear(), time1.getMonth(), time1.getDate(), time1.getHours(), time1.getMinutes(), time1.getSeconds()]
  //   console.log(_this.data.answer0)
  //   db.collection('question').add({
  //     data: {
  //       question: _this.data.answer0,
  //       count:0,
  //       time:time
  //     },
  //     success(res) {
  //       console.log(res)
  //       wx.showToast({
  //         title: '保存问题成功',
  //         icon: 'success',
  //         duration: 1000,
  //       })
  //       wx.navigateBack()
  //     },
  //   })
  // },
  ans_save: function() {

  },
  ans0: function(e) {
    // console.log(e)
    this.data.answer = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var data = app.globalData.temp.edit_lesson
    console.log(data)
    this.setData({
      lesson_info: data.lesson_info,
      teachers: data.teachers,
      teachers2: data.teachers2,
      lesson_sname: data.lesson_info.class_name.length > 12 ? data.lesson_info.class_name.slice(0, 12) + '...' : data.lesson_info.class_name,
    })

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