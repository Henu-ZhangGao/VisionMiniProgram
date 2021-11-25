// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activation_code: "",
    openid: ""
  },

  //获取输入的激活码
  bindKeyInput: function (e) {
    this.setData({
      activation_code: e.detail.value
    })
    console.log(this.data.activation_code)
  },

  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let active = wx.getStorageSync('active')
    if (active == true) {
      return wx.redirectTo({
        //url: '../index/index',
        url: '../index/index',
      })
    }
    let _this = this
    let openid = options.openid;
    //console.log(options.openid==undefined)
    if (options.openid == undefined) {
      openid = wx.getStorageSync('openid')
    }
    console.log(openid)
    if (openid == undefined) {
      wx.login({
        success(res) {
          if (res.code) {
            //console.log(res.code)
            //发起网络请求
            wx.request({
              url: 'https://shibik.cn/getCode/' + res.code,
              success(res) {
                var jsObject = JSON.parse(res.data.data.openid);
                openid = jsObject.openid
                wx.setStorage({
                  data: openid,
                  key: 'openid',
                })
              }
            })
          }
        }
      })
    }
    this.setData({
      openid: openid
    })
    wx.request({
      url: 'https://shibik.cn/get/sign/' + openid,
      success(res) {
        console.log(res)
        if (res.data.data.flag == "true") {
          return wx.redirectTo({
            //url: '../index/index',
            url: '../index/index',
          })
        }
      }
    })


  },

  // 激活
  activate: function () {
    console.log("a")
    console.log(this.data.openid)
    wx.request({
      url: 'https://shibik.cn/toActivate/' + this.data.openid + '/' + this.data.activation_code,
      success(res) {
        console.log(res)
        if (res.data.data.flag == "true") {
          wx.redirectTo({
            url: '../index/index',
          })
          wx.setStorageSync('active', true)
        } else {
          wx.showToast({
            title: '激活码不存在',
            duration: 2000,
            icon: 'error'
          })
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }


})