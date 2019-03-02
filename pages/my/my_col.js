// pages/my/my_col.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lessons: [],
    is_open:false

  },

  open:function(options){
    this.setData({
      is_open:!this.data.is_open
    })
    console.log(options)
  },
  parse_data1: function(data, data2) {
    // console.log(data)
    // console.log(data .teachers)
    var x1=require("../../mds/data_loc1.js")
    var tea = ''
    // if (typeof(data.teachers) == 'string' || data.teachers == 'null') {
    //   var tea = data.teachers.split(" ")
    // } else {
    //   tea = [""]
    // }

    // if (tea.length > 3) {
    //   tea = tea[0] + " " + tea[1] + " " + tea[2] + "…"
    // } else {
    //   tea = data.teachers
    // }
    var qq=""
    var x=data2.length
    if(x>3){
      x=3
      qq ="..."
    }
    
    for(var q=0; q<x; q++){
      qq = data2[q] + " " + qq
    }
    
    var p = {
      // user_name: data.user_name,
      teacher_name: qq,
      answer_count: data.answer_count,
      department: x1.dep_get(data.department).name,
      // id: data._id,
      class_id:data._id,
      class_name:data.class_name,
      is_collect:1
    }
    console.log(p)
    return p
  },

  lesson_info: function (options) {
    // console.log(options)
    var op = options.currentTarget.dataset.info
    wx.navigateTo({
      url: '../lesson/lesson?class_name=' + op.class_name + "&department=" + op.department + "&class_id=" + op.class_id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    

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
    var goods = app.globalData.temp.user_good
    var p = []
    var _this = this
    console.log(goods)
    goods.forEach(function (item) {
      if (item.type == 'lesson') {
        // p.push(goods[t])
        var w = item.id
        db.collection('class1').doc(w).get({
          success: function (res) {
            console.log(res)
            p.push(_this.parse_data1(res.data, item.content))
            _this.setData({
              lessons: p
            })
          },
          fail: console.log
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