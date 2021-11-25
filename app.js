// app.js
App({
  onLaunch () {
    // 展示本地存储能力
    const that = this;
  // 获取系统信息
  const systemInfo = wx.getSystemInfoSync();
  // 胶囊按钮位置信息
  const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
  // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
  that.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
  that.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
  that.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
  that.globalData.menuHeight = menuButtonInfo.height;
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.Height=result.screenHeight
        this.globalData.Width=result.screenWidth
      },
    }),
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    navBarHeight: 0, // 导航栏高度
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
    menuHeight: 0,
    Height:0,
    Width:0,
    userInfo: null,
    userId:["SBK0001","SBK0002","SBK0003","SBK0004","SBK0005","SBK0006","SBK0007","SBK0008","SBK0009","SBK0010","SBK0011","SBK0012","SBK0013","SBK0014","SBK0015"],
    userPassword:["ZeNCks","tWN5DJ","D7HvhK","IDe5BL","2QBbIl","RbswbX","XOI0GP","IeVgZ0","uzg8xO","dXCi9W","U5mUEC","lQG22H","aDgsNc","aDgsNc","jWEfF3"],
  }
})
