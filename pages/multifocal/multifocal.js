// pages/multifocal/multifocal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttons: [{ id: 1, name: '无镜片'}, { id: 2, name: '常规镜片'}, { id: 3, name: '离焦镜片' }],
    "url":"http://139.196.151.36:8080/img/multifocal_1.png"
  },
  radioButtonTap: function (e) {
    let id = e.currentTarget.dataset.id
    for (let i = 0; i < this.data.buttons.length; i++) {
      if (this.data.buttons[i].id == id) {
        //当前点击的位置为true即选中
        this.data.buttons[i].checked = true
        let str="http://139.196.151.36:8080/img/multifocal_" + id + ".png"
        this.setData({url:str})
      }
      else {
        //其他的位置为false
        this.data.buttons[i].checked = false
      }
    }
    this.setData({
      buttons: this.data.buttons
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.buttons[0].checked = true;
    this.setData({
      buttons: this.data.buttons,
    })
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

  }
})