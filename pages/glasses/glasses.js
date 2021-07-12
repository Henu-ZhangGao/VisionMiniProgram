// pages/glasses/glasses.js
var context;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttons: [{ id:1, name:"0" }, { id: 2, name: "-1"}, { id: 3, name:"-2" }, { id: 4, name: "-3" },{ id: 5, name: "-4" },{ id: 6, name: "-5" },{ id: 7, name: "-6" },{ id: 8, name: "-7" },{ id: 9, name: "-8" },{ id: 10, name: "-9" },{ id: 11, name: "-10"}],
    blurR:0,
    widthCanvas:0,
    heightCanvas:0,
    isHidden:true,
  },
  isBtnHidden:function(e){
    this.setData({
      isHidden:!this.data.isHidden,
    })
    if(!this.data.isHidden)
    {
      this.setData({
        blurR:this.data.blurR-1,
      })
    }
    else
    {
      this.setData({
        blurR:this.data.blurR+1,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  radioButtonTap: function (e) {
    let id = e.currentTarget.dataset.id
    for (let i = 0; i < this.data.buttons.length; i++) {
      if (this.data.buttons[i].id == id) {
        //当前点击的位置为true即选中
        this.data.buttons[i].checked = true;
        this.setData({
          blurR:i*2/3,
        })
      }
      else {
        //其他的位置为false
        this.data.buttons[i].checked = false;
      }
    }
    this.setData({
      buttons: this.data.buttons
    })
  },
  checkButtonTap:function(e){
    let id = e.currentTarget.dataset.id
    for (let i = 0; i < this.data.buttons.length; i++) {
      if (this.data.buttons[i].id == id) {
        if (this.data.buttons[i].checked == true) {
          this.data.buttons[i].checked = false;
         
        } else {
          this.data.buttons[i].checked = true;
          
        }
      }
    }
   
   this.setData({
     buttons: this.data.buttons,
    })
  },
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      heightCanvas:wx.getSystemInfoSync().windowHeight,
      widthCanvas:wx.getSystemInfoSync().windowWidth,
    })
    context=wx.createCanvasContext('blackboard')
    var height=this.data.heightCanvas/2;
    var width=this.data.widthCanvas;
    context.setFillStyle('black');
    context.moveTo(0,height);
    console.log(width)
    console.log(height)
    context.bezierCurveTo(width/40,height*1.7,width-width/40,height*1.7,width,height);
    context.moveTo(width,height);
    context.lineTo(width,this.data.heightCanvas);
    context.lineTo(0,this.data.heightCanvas);
    context.lineTo(0,height);
    context.fill();
    context.moveTo(width,height);
    context.bezierCurveTo(width-width/40,-height/5,width/40,-height/5,0,height);
    context.moveTo(0,height);
    context.lineTo(0,0);
    context.lineTo(width,0);
    context.lineTo(width,height);
    context.fill();
    context.draw();
    this.data.buttons[0].checked = true;
    this.setData({
      buttons: this.data.buttons,
    });
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