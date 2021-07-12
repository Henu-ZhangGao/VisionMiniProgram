// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    navbar: ['首页', '功能'], 
    currentTab: 0, 
  },
  navbarTap: function(e){ 
    this.setData({ 
    currentTab: e.currentTarget.dataset.idx 
    }) 
  },
  // 事件处理函数
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  glassTest(){
    wx.navigateTo({
      url: '../glassTest/glassTest',
    })
  },
  recipe(){
    wx.navigateTo({
      url: '../recipe/recipe',
    })
  },
  docterRecipe(){
    wx.navigateTo({
      url: '../docterRecipe/docterRecipe',
    })
  },
  visualTrainingIntervent(){
    wx.navigateTo({
      url: '../visualTrainingIntervent/visualTrainingIntervent',
    })
  },
  astigmia(){
    wx.navigateTo({
      url: '../astigmia/astigmia',
    })
  },
  camera(){
    wx.navigateTo({
      url: '../camera/camera',
    })
  },
  car(){
    wx.navigateTo({
      url: '../car/car',
    })
  },
  eye_axis(){
    wx.navigateTo({
      url: '../eye_axis/eye_axis',
    })
  },
  glasses(){
    wx.navigateTo({
      url: '../glasses/glasses',
    })
  },
  multifocal(){
    wx.navigateTo({
      url: '../multifocal/multifocal',
    })
  },
  physics(){
    wx.navigateTo({
      url: '../physics/physics',
    })
  },
  sun(){
    wx.navigateTo({
      url: '../sun/sun',
    })
  },
  uv(){
    wx.navigateTo({
      url: '../uv/uv',
    })
  },
  simulate(){
    wx.navigateTo({
      url: '../simulate/simulate',
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
