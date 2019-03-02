// pages/settings/settings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  about_us:function(options){
    wx.showModal({
      title: '联系我们',
      content: 'a12910@qq.com',
      showCancel:false
    })
  
  },

  to_page:function(options){
    console.log(options)
    wx.navigateTo({
      url: options.target.dataset.url,
    })
  },

  about_us2:function(options){
    wx.showToast({
      title: '关注南喃校园公众号查看更多信息',
      icon:'none'
    })
  },
  back2:function(options){
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
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