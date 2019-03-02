//app.js
var app = getApp()

// const regeneratorRuntime = require('/mds/regenerator-runtime/runtime.js')
// require('/mds/regenerator-runtime/runtime.js')
// import regeneratorRuntime from '/mds/regenerator-runtime/runtime.js';
App({


  get_good: function(id) {
    console.log(id)
    var _this = this
    wx.cloud.callFunction({
      name: 'usergood_get',
      data: {
        user_id: id
      },
      success(res) {
        console.log(res)
        // for (var x = 0; x < res.result.data.length; x++) {
        //   _this.globalData.temp.user_good.push({
        //     id: res.result.data[x].id,
        //     type: res.result.data[x].type
        //   })
        // }
        _this.globalData.temp.user_good = res.result.data
        console.log(_this.globalData.temp.user_good)

      }
    })
  },

  onLaunch: function() {
    wx.cloud.init()
    var _this = this
    var openid = wx.getStorageSync('user_openid')

    // db.collection('class_info').where({
    //   class_id:''
    // }).get({
    //   success:function(res){
    //     console.log(res)
    //   }
    // })
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.userInfo']) {
    //       wx.authorize({
    //         scope: 'scope.userInfo',
    //         success() {
    //           wx.getUserInfo({
    //             success: function (res) {
    //               console.log(res)
    //               _this.globalData.user_info.nickname = res.userInfo.nickName
    //               _this.globalData.user_info.logo = res.userInfo.avatarUrl
    //             },

    //           })
    //         }
    //       })
    //     }else{
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res)
    //           _this.globalData.user_info.nickname = res.userInfo.nickName
    //           _this.globalData.user_info.logo = res.userInfo.avatarUrl
    //           // wx.setStorage({
    //           //   key: 'user_logo',
    //           //   data: res.userInfo.avatarUrl,
    //           // })
    //           // wx.setStorage({
    //           //   key: 'user_nickname',
    //           //   data: res.userInfo.nickName,
    //           // })
    //           // that.update()
    //         },

    //       })
    //     }
    //   }
    // })


    
    if (openid == undefined || openid == '') {
      wx.cloud.callFunction({
        name: 'user_info',
        success: function(res) {
          console.log(res)
          _this.globalData.user_info.openid = res.result.openid
          _this.get_good(res.result.openid)
          wx.setStorage({
            key: 'user_openid',
            data: res.result.openid,
          })
        }
      })

    } else {
      // var logo = wx.getStorageSync('user_logo')
      // var nickname = wx.getStorageSync('user_nickname')
      this.globalData.user_info.openid = openid
      // this.globalData.user_info.logo = logo
      // this.globalData.user_info.nickname = nickname
      _this.get_good(openid)
      var db = wx.cloud.database()
      db.collection('admin_user').where({
        openid:openid
      }).get({
        success:function(res){
          console.log(res)
          _this.globalData.user_info.is_admin = res.data.length==1
        },
        fail:function(res){
          console.log(res)
        }
      })

    }

  },
  globalData: {
    temp: {
      user_good: [],
      edit_lesson: []
    },
    user_info: {
      openid: '',
      nickname: '',
      logo: '',
      is_admin: false,
    }

  },
})