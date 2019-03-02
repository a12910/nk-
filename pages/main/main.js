// pages/blank/blank.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lesson_hot: [],
    is_admin: false,
    is_edit: false,
    doc_id: '',
    is_open: false,
    p_index:0,
  },

  about_us: function (options) {
    wx.showModal({
      title: '版本信息',
      content: 'v0.16.6',
      showCancel: false
    })

  },
  search_navi: function(res) {
    wx.navigateTo({
      url: '../search/search',
    })
    // wx.redirectTo({
    //   url: '../search/search',
    // })
  },

  to_lesson: function(options) {
    if (this.data.is_edit) {
      return
    }
    var info = options.currentTarget.dataset.info
    wx.navigateTo({
      url: '../lesson/lesson?class_id=' + info.class_id + '&class_name=' + info.class_name + '&department=' + info.department,
    })
  },
  to_menu: function(options) {
    // console.log(options)
    wx.navigateTo({
      url: '../settings/settings',
    })
    // this.setData({
    //   is_open:!this.data.is_open
    // })
    // this.setData({
    //   p_index:1
    // })
  },
  main_order: function(options) {
    var data = options.currentTarget.dataset
    var _this = this
    if (!this.data.is_edit) {
      return
    }
    console.log(data)
    wx.showActionSheet({
      itemList: ['+1', '-1', '删除'],
      success(res) {
        console.log(res)

        var num = Number(res.tapIndex)
        console.log(num)
        var ans = _this.data.lesson_hot
        if (num == 0) {
          console.log(ans)
          if (data.index == 0) {
            return
          } else {
            var x = ans[data.index - 1]
            ans[data.index - 1] = ans[data.index]
            ans[data.index] = x
          }
          console.log(ans)
        } else if (num == 1) {
          if (data.index == ans.length - 1) {
            return
          } else {
            var x = ans[data.index + 1]
            ans[data.index + 1] = ans[data.index]
            ans[data.index] = x
          }
        } else if (num == 2) {
          wx.cloud.callFunction({
            name: 'main_save',
            data: {
              type: 'delete',
              id: ans[data.index]._id
            },
            success: console.log,
            fail: console.log

          })
          ans.splice(data.index, 1)
        }
        _this.setData({
          lesson_hot: ans
        })
      }
    })
  },

  edit_mode: function(options) {
    var _this = this
    if(!this.data.is_admin){
      return
    }
    this.setData({
      is_edit: !this.data.is_edit
    })
    if (!this.data.is_edit) {
      var data = this.data.lesson_hot
      var send_data = []
      for (var i = 0; i < 8; i++) {
        if (i < data.length) {
          send_data.push(data[i]._id)
        } else {
          send_data.push('null')
        }
      }
      wx.cloud.callFunction({
        name: 'main_save',
        data: {
          datas: send_data,
          id: _this.data.doc_id,
          type: 'update'
        },
        fail: console.log
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    var _this = this
    var list = []
    this.setData({
      is_admin: app.globalData.user_info.is_admin
    })
    db.collection('main_page').where({
      type: 'list'
    }).get({
      success: function(res) {
        console.log(res)
        var list0 = res.data[0]
        _this.data.doc_id = res.data[0]._id
        db.collection('main_page').where({
          type: 'lesson'
        }).get({
          success(res) {
            console.log(res)
            var list1 = res.data
            for (var o = 1; o <= 8; o++) {
              if (list0[String(o)] == 'null') {
                break
              } else if (list1.length == 0) {
                break
              } else {
                for (var t = 0; t < list1.length; t++) {
                  if (list1[t]._id == list0[String(o)]) {
                    list1[t]['class_name'] = list1[t].class_name.length > 12 ? list1[t].class_name.slice(0, 12) + '...' : list1[t].class_name
                    list.push(list1[t])
                    list1.splice(t, 1)
                    break
                  }
                }
              }
            }
            if (list1.length > 0) {
              for (var t = 0; t < list1.length; t++) {
                list1[t]['class_name'] = list1[t].class_name.length > 12 ? list1[t].class_name.slice(0, 12) + '...' : list1[t].class_name
                list.push(list1[t])
              }
            }
            _this.setData({
              lesson_hot: list
            })
          }

        })
      }
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
  onLoad: function() {
    
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
    // return {
    //   title: 'NK好课优选',
    //   path: '/pages/main/main',
    //   success: function (res) {
    //     wx.showToast({
    //       title: '南喃因你而更加精彩'
    //     })

    //   }
    // }
  }
})