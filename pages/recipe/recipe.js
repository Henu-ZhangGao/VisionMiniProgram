// pages/recipe/recipe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHidden:false,
    nearsighte:0,
    astigmatism:0,
    digitalDegress:0,
    str_1:"建议购买专用的散光隐形眼镜",
    isAstigmatic:false,
  },
  formSubmit:function(e){
    console.log(e.detail.value)
    var astigmatism=-parseFloat(e.detail.value.astigmatism);
    var nearsighte=-parseFloat(e.detail.value.nearsighte);
    var sum=nearsighte;
    if(nearsighte>=400&&nearsighte<600){
      sum=nearsighte-25;
    }else if(nearsighte>=600&&nearsighte<800){
      sum=nearsighte-50;
    }else if(nearsighte>=800){
      sum=nearsighte-100;
    }
    if(astigmatism==0){
      this.setData({
        isAstigmatic:true,
      })
    }
    this.setData({
      isHidden:!this.data.isHidden,
      digitalDegress:sum+astigmatism/2,
    })
  },
  decrease:function(){
    this.setData({
      nearsighte:this.data.nearsighte-25,
    })
  },
  increase:function(){
    if(this.data.nearsighte<0){
      this.setData({
      nearsighte:this.data.nearsighte+25,
    })
  }
    
  },
  decrease_1:function(){
    this.setData({
      astigmatism:this.data.astigmatism-25,
    })
  },
  increase_1:function(){
    if(this.data.astigmatism<0){
      this.setData({
        astigmatism:this.data.astigmatism+25,
      })
    }
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

  }
})