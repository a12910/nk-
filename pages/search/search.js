// pages/search/search.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    now_ques: "",
    // is_sift: true,
    // departments: [],
    // lesson_type: [],
    lessons: [],
    on_but: false,
    select_datas:''
  },
  bar_select(options) {
    console.log(options)
    this.setData({
      select_type: Number(options.currentTarget.dataset.num)
    })
  },
  bar_select1(options){
      console.log(options)
      var num = options.currentTarget.dataset.num
      var num2 = Number(options.detail.value)
      this.data.select_datas[num].choose_index = num2

      this.setData({
          select_datas:this.data.select_datas
      })
  },
  
  on_cli: function(options) {
    this.setData({
      on_but: true
    })
  },
  end_cli: function(options) {
    this.setData({
      on_but: false
    })
  },


  to_back: function(options) {
    wx.navigateBack()
  },

  parse_data0: function(data) {

  },
  parse_data1: function(data, type) {
    var p = []
    if (!type) {
      p = this.data.lessons
    }

    // console.log(data)
    for (var d = 0; d < data.length; d++) {
      // console.log(data[d].teachers)
      var w = 0
      for (w = 0; w < p.length; w++) {
        if (p[w]._id == data[d].class_id) {
          if (p[w].teachers.indexOf(data[d].teacher_name) == -1) {
            p[w].teachers.push(data[d].teacher_name)
            p[w].answer_count += data[d].answer_count
          }else{
            if(p[w].answer_count==0){
              p[w].answer_count += data[d].answer_count
            }
          }
          break
        }
      }
      if (w != p.length) {
        continue
      }
      
      p.push({
        class_name: data[d].class_name,
        class_name2:data[d].class_name.length>10?data[d].class_name.slice(0,10)+"...":data[d].class_name,
        _id: data[d].class_id,
        answer_count: 0,
        department: data[d].department,
        teachers: [data[d].teacher_name]
      })
      // console.log(p)
    }

    var xx = require('../../mds/data_loc1.js')

    for (var d = 0; d < p.length; d++) {
      // var tea = p[d].teachers
      // var i = tea.length
      // var tea2 = ''

      // if (tea.length >= 3) {
      //   tea = tea[0] + " " + tea[1] + " " + tea[2] + "…"
      // } else if (tea.length == 2) {
      //   tea = tea[0] + " " + tea[1]
      // } else if (tea.length == 1) {
      //   tea = tea[0]
      // } else {
      //   tea = '未知教师'
      // }
      p[d].department = xx.dep_get(p[d].department).name
      // p[d].teachers = tea
    }


    console.log(p)
    this.setData({
      lessons: p
    })
  },


//   dep_choose: function(options) {
//     var _this = this
//     // console.log(options)
//     var x = options.currentTarget.dataset.name

//     for (var i = 0; i < this.data.departments.length; i++) {
//       var t = this.data.departments[i]
//       if (t.name == x) {
//         if (t.type == 1) {
//           this.data.departments[i].type = 0
//         } else {
//           this.data.departments[i].type = 1
//         }
//         _this.setData({
//           departments: this.data.departments
//         })
//         return
//       }
//     }
//   },

  choose_all: function() {
    for (var i = 0; i < this.data.departments.length; i++) {
      this.data.departments[i].type = 1
    }
    this.setData({
      departments: this.data.departments
    })
  },

  choose_no: function() {
    for (var i = 0; i < this.data.departments.length; i++) {
      this.data.departments[i].type = 0
    }
    this.setData({
      departments: this.data.departments
    })
  },

  confirm: function(options) {
    var _this = this
    var app = getApp()
    console.log(options)
    var dep_1 = this.data.departments
    var les_type = _this.data.lesson_type
    var q = []
    for (var t = 0; t < dep_1.length; t++) {
      if (dep_1[t].type == 1) {
        if (dep_1[t].name == "校公共必修课") {
          q = q.concat(["AMTD", "COTD", "ENTD", "IPTD", "MITD", "PETD", "CPTD", "LITE"])
        } else {
          q.push(dep_1[t].short)
        }

      }
    }
    console.log(q)
    if(q==[]){
      wx.showToast({
        title: '请选择课程来源',
        icon:'none'
      })
      return
    }
    // console.log(this.data.now_ques)
    this.data.lesson_skip = 0
    this.data.lessons=[]
    // if (_this.data.now_ques == "") {
    //   _this.data.now_ques = "大语"
    // }

    var terms = ["2019a", "2018b"]
    terms = _this.data.now_ques == "" ? ["2019a"] : ["2019a", "2018b"]
    var date = new Date()
    db.collection('static').add({
      data:{
        type:'search',
        name:_this.data.now_ques,
        department:q,
        time:date.Date()
      },
      success:console.log
    })

    db.collection('class_info')
      .where(
        _.and([
          _.or([{
            department: _.in(q),
            term: _.in(terms)
          }]),
          _.or([{
            lesson_name: db.RegExp({
              regexp: _this.data.now_ques,
              options: 'i',
            })
          }, {
            class_sname: db.RegExp({
              regexp: _this.data.now_ques,
              options: 'i',
            })
          }])

        ])

      )
      .count({
        success: function(res) {
          console.log(res.total)
          if (res.total > 555 && _this.data.now_ques == "") {
            wx.showToast({
              title: '请输入课程名',
              icon: 'none'
            })
            return
          }
          if(res.total==0){
            _this.setData({
              is_sift: false,
              lessons:[]
            })
          }
          for (var sk = 0; sk < Math.ceil(res.total / 100); sk++) {
            wx.cloud.callFunction({
              name: _this.data.now_ques == "" ? "lesson" : 'lesson_select',
              data: {
                dep: q,
                skip: sk,
                name: _this.data.now_ques
              },
              success(res) {
                console.log(res)
                _this.setData({
                  is_sift: false
                })
                _this.parse_data1(res.result.data, sk == 0)
              },
              fail: console.log
            })
          }
        }
      })



  },

  quesInput: function(options) {
    var _this = this
    // console.log(options)
    if (options != undefined) {
      this.setData({
        now_ques: options.detail.value
      })
    }
    if (this.data.now_ques == "") {
      this.setData({
        is_sift: true,
        lessons: [],
      })

    } else {
      this.setData({
        // is_sift: false,
      })
    }


  },

  lesson_info: function(options) {
    // console.log(options)
    wx.navigateTo({
      url: '../lesson/lesson?name=' + options.currentTarget.dataset.info.name + "&location=" + options.currentTarget.dataset.info.location + "&id=" + options.currentTarget.dataset.info.id,
    })
  },

  sift2: function(options) {
    this.setData({
      is_sift: !this.data.is_sift
    })
  },

  stop_move: function() {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var x1 = require('datas.js')
    // console.log(x1.dep_get0)
    this.setData({
      select_datas:x1.get_all()
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
    // if (this.data.now_ques != "") {
    //   this.confirm()
    // }
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