// pages/simulate/simulate.js
const ctx = wx.createCanvasContext('Clear');
let width;
let height;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width:0,
    height:0,
    byclear: 1,
    url:"http://119.45.23.48:8080/img/simulate_1.jpg",
    url_1:"http://119.45.23.48:8080/img/simulate_",
    isHidden:false,
  },
  top:function(){
    this.setData({
      url:this.data.url_1+"1.jpg",
    })
  },
  left:function(){
    this.setData({
      url:this.data.url_1+"3.jpg",
    })
  },
  right:function(){
    this.setData({
      url:this.data.url_1+"2.jpg",
    })
  },
  middle:function(){
    this.setData({
      url:this.data.url_1+"4.jpg",
    })
  },
  bottom:function(){
      this.setData({
        url:this.data.url_1+"5.jpg",
      })
  },
  toContainerOne:function(){
    this.setData({
      url_1:"http://119.45.23.48:8080/img/simulate_",
      url:"http://119.45.23.48:8080/img/simulate_1.jpg"
    })
  },
  toContainerTwo:function(){
    this.setData({
      url_1:"http://119.45.23.48:8080/img/simulate",
      url:"http://119.45.23.48:8080/img/simulate1.jpg"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  checkWidthAndHeight:function(options){
    let byclear = this.data.byclear;
    this.setData({
      width:options.detail.width,
      height:options.detail.height,
    })
    width=this.data.width;
    height=this.data.height;
    ctx.scale(415 * byclear / width, 410 * byclear /width);
    ctx.drawImage('../../image/simulate.jpg',0,0,width,height);
    ctx.setStrokeStyle('black');
    ctx.arc(width/2,height/2,100,2*Math.PI);
    ctx.stroke();
    ctx.draw();
    ctx.draw(false,function(){
      wx.canvasGetImageData({
        canvasId: 'Clear',
        x: 0,
        y: 0,
        width: width,
        height: height,
        success(result) {
          let data = result.data;
          const size = 3;
          const totalnum = (2*size+1)*(2*size+1);
          for(let i=size;i<result.height-size;i++){
            for(let j=size;j<result.width-size;j++){
              var totalR=0,totalG=0,totalB=0;
              for(let dx=-size;dx<=size;dx++){
                for(let dy=-size;dy<=size;dy++){
                  var x = i+dx;
                  var y = j+dy;
                  var p = x * result.width + y;
                  totalR += data[p * 4 + 0];
                  totalG += data[p * 4 + 1];
                  totalB += data[p * 4 + 2];
                }
              }

              var p = i * result.width + j;
              var resR = totalR / totalnum;
              var resG = totalG / totalnum;
              var resB = totalB / totalnum;
              data[p * 4 + 0] = resR;
              data[p * 4 + 1] = resG;
              data[p * 4 + 2] = resB;
            }
          }
            wx.canvasPutImageData({
              canvasId: 'Clear',
              x: 0,
              y: 0,
              width: width,
              height:height,
              data: data,
            })
        }
      })
    })
  },
  onLoad: function (options) {
    var that = this;
    // 根据屏幕的宽度计算标准比例值。这里讲375作为标准值
    wx.getSystemInfo({
      success: function(res) {
        let Byclear = res.screenWidth / 375;
        that.setData({
          byclear:Byclear,
        })
      },
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