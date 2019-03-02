// pages/ask/ask.js
const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contact1: '',
    ques1: '',
  },

  contact_input: function(options) {
    // console.log(options)
    this.data.contact1 = options.detail.value
  },

  ques_input: function(options) {
    this.data.ques1 = options.detail.value
  },

  but_save: function(options) {
    var _this = this
    if (this.data.contact1 == "") {
      wx.showToast({
        title: '请填写联系信息',
        icon: 'none'
      })
      return
    }
    if (this.data.ques1 == "") {
      wx.showToast({
        title: '请填写反馈信息',
        icon: 'none'
      })
      return
    }
    db.collection('message').add({
      data: {
        contact: _this.data.contact1,
        ques: _this.data.ques1,
        time: Date()
      },
      success(res) {
        console.log(res)
        wx.showToast({
          title: '感谢您的建议',
        })
        var timer = setTimeout(function() {
          wx.navigateBack()
        }, 1000)
      }
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
      success: function(res) {
        wx.showToast({
          title: '南喃因你而更加精彩'
        })

      }
    }
  }

})