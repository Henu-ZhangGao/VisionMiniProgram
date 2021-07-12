// pages/physics/physics.js
const ctx=wx.createCanvasContext('convex_mirror')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttons: [{ id: 1, name: 1.56,edge:0,thickness:0,weight:0,deviant:0}, { id: 2, name: 1.60,edge:8,thickness:2,weight:11,deviant:1}, { id: 3, name: 1.67,edge:19,thickness:6,weight:12,deviant:2}, { id: 4, name: 1.74,edge:24,thickness:8,weight:26,deviant:3}],
    buttons_1:[{id:1, name: 1 }, {id:2, name: 2}, { id:3,name: 3 }, {id:4, name: 4},{id:5, name: 5 }, { id:6,name: 6}, {id:7, name: 7 }, {id:8, name: 8 },{id:9, name: 9 }, { id:10,name: 10}],
    height:0,
    width:0,
    r:35,
    i:0,
    edge:0,
    thickness:0,
    weight:0,
    degress:10,
    degress_1:10,
    length:8,
    deviant:0,
  },
  radioButtonTap_1: function (e) {
    let width=this.data.width
    let height=this.data.height
    let id = e.currentTarget.dataset.id
    for (let i = 0; i < this.data.buttons_1.length; i++) {
      if (this.data.buttons_1[i].id == id) {
        //当前点击的位置为true即选中
        this.data.buttons_1[i].checked = true;
        this.setData({
          degress:10-i,
          degress_1:10+i/2,
          length:8+i,
        })
        let j=(this.data.length-6)/3+this.data.i;
        let r=this.data.r;
        let degress=this.data.degress;
        let degress_1=this.data.degress_1;
        let length=this.data.length;
        let deviant=this.data.deviant;
        ctx.setStrokeStyle('#0099FF');
        ctx.arc(width/5,height/5,r,0,2*Math.PI);
        ctx.moveTo(width/10+r,height/2)
        ctx.arc(width/10,height/2,r,0,2*Math.PI);
        ctx.moveTo(width-width/5+r,height-height/5);
        ctx.arc(width-width/5,height-height/5,r,0,2*Math.PI);
        ctx.setFillStyle('#ffffff')
        ctx.setFontSize(17)
        ctx.fillText('-'+this.data.edge+'%',width/5-r/2,height/5+r/8)
        ctx.fillText('-'+this.data.thickness+'%',width/10-r/2,height/2+r/8)
        ctx.fillText('-'+this.data.weight+'%',width-width/5-r/2,height-height/5+r/8)
        ctx.setFontSize(13)
        ctx.fillText('边缘薄', width/5-r/1.7,height/5+r/1.5)
        ctx.fillText('中心厚度', width/10-r/1.4,height/2+r/1.5)
        ctx.fillText('重量轻',width-width/5-r/1.8,height-height/5+r/1.5)
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.setStrokeStyle('white');
        ctx.arc(width/5,height/5,r-i*2,0,2*Math.PI);
        ctx.moveTo(width/10+r-i*2,height/2)
        ctx.arc(width/10,height/2,r-i*2,0,2*Math.PI);
        ctx.moveTo(width-width/5+r-i*2,height-height/5);
        ctx.arc(width-width/5,height-height/5,r-i*2,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.setFillStyle('#008BFF')
        ctx.moveTo(width/2,height/4)
        ctx.bezierCurveTo(width/2-degress,height/2,width/2-degress,height/2,width/2,height*3/4)
        ctx.lineTo(width/2+length+j,height*3/4)
        ctx.bezierCurveTo(width/2-degress_1+length,height/2,width/2-degress_1+length,height/2,width/2+length+j,height/4)
        ctx.lineTo(width/2,height/4)
        ctx.fill()
        ctx.closePath();

        ctx.beginPath();
        ctx.setFillStyle('#FFFFFF')
        ctx.moveTo(width/2,height/4)
        ctx.bezierCurveTo(width/2-degress,height/2,width/2-degress,height/2,width/2,height*3/4)
        ctx.lineTo(width/2+length-deviant,height*3/4)
        ctx.bezierCurveTo(width/2-degress_1+length,height/2,width/2-degress_1+length,height/2,width/2+length-deviant,height/4)
        ctx.lineTo(width/2,height/4)
        ctx.fill()
        ctx.closePath();

        ctx.draw()
      }
      else {
        //其他的位置为false
        this.data.buttons_1[i].checked = false;
      }
    }
    this.setData({
      buttons_1: this.data.buttons_1
    })
    
  },
  radioButtonTap: function (e) {
    let width=this.data.width
    let height=this.data.height
    let id = e.currentTarget.dataset.id
    for (let i = 0; i < this.data.buttons.length; i++) {
      if (this.data.buttons[i].id == id) {
        this.setData({
          edge:this.data.buttons[i].edge,
          thickness:this.data.buttons[i].thickness,
          weight:this.data.buttons[i].weight,
          deviant:this.data.buttons[i].deviant,
          i:(this.data.buttons[i].id-1)/2,
        })
        let deviant=this.data.deviant;
        let j=(this.data.length-6)/3+this.data.i;
        //当前点击的位置为true即选中
        let r=this.data.r;//半径
        let degress=this.data.degress;
        let degress_1=this.data.degress_1;
        let length=this.data.length;
        this.data.buttons[i].checked = true;
        ctx.setStrokeStyle('#0099FF');
        ctx.arc(width/5,height/5,r,0,2*Math.PI);
        ctx.moveTo(width/10+r,height/2)
        ctx.arc(width/10,height/2,r,0,2*Math.PI);
        ctx.moveTo(width-width/5+r,height-height/5);
        ctx.arc(width-width/5,height-height/5,r,0,2*Math.PI);
        ctx.setFillStyle('#ffffff');
        ctx.setFontSize(17)
        ctx.fillText('-'+this.data.buttons[i].edge+'%', width/5-r/2,height/5+r/8)
        ctx.fillText('-'+this.data.buttons[i].thickness+'%',width/10-r/2,height/2+r/8)
        ctx.fillText('-'+this.data.buttons[i].weight+'%',width-width/5-r/2,height-height/5+r/8)
        ctx.setFontSize(13)
        ctx.fillText('边缘薄', width/5-r/1.7,height/5+r/1.5)
        ctx.fillText('中心厚度', width/10-r/1.4,height/2+r/1.5)
        ctx.fillText('重量轻',width-width/5-r/1.8,height-height/5+r/1.5)
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.setStrokeStyle('white');
        ctx.arc(width/5,height/5,r-i*2,0,2*Math.PI);
        ctx.moveTo(width/10+r-i*2,height/2)
        ctx.arc(width/10,height/2,r-i*2,0,2*Math.PI);
        ctx.moveTo(width-width/5+r-i*2,height-height/5);
        ctx.arc(width-width/5,height-height/5,r-i*2,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.setFillStyle('#008BFF')
        ctx.moveTo(width/2,height/4)
        ctx.bezierCurveTo(width/2-degress,height/2,width/2-degress,height/2,width/2,height*3/4)
        ctx.lineTo(width/2+length+j,height*3/4)
        ctx.bezierCurveTo(width/2-degress_1+length,height/2,width/2-degress_1+length,height/2,width/2+length+j,height/4)
        ctx.lineTo(width/2,height/4)
        ctx.fill()
        ctx.closePath();

        ctx.beginPath();
        ctx.setFillStyle('#FFFFFF')
        ctx.moveTo(width/2,height/4)
        ctx.bezierCurveTo(width/2-degress,height/2,width/2-degress,height/2,width/2,height*3/4)
        ctx.lineTo(width/2+length-deviant,height*3/4)
        ctx.bezierCurveTo(width/2-degress_1+length,height/2,width/2-degress_1+length,height/2,width/2+length-deviant,height/4)
        ctx.lineTo(width/2,height/4)
        ctx.fill()
        ctx.closePath();

        ctx.draw()
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      height:wx.getSystemInfoSync().windowHeight*0.8,
      width:wx.getSystemInfoSync().windowWidth*0.85,
    })
    let width=this.data.width
    let height=this.data.height
    let r=this.data.r;
    let degress=this.data.degress;
    let length=this.data.length;
    ctx.setStrokeStyle('#0099FF');
    ctx.arc(width/5,height/5,r,0,2*Math.PI);
    ctx.moveTo(width/10+r,height/2)
    ctx.arc(width/10,height/2,r,0,2*Math.PI);
    ctx.moveTo(width-width/5+r,height-height/5);
    ctx.arc(width-width/5,height-height/5,r,0,2*Math.PI);
    ctx.setFillStyle('#ffffff')
    ctx.setFontSize(17)
    ctx.fillText('-'+0+'%', width/5-r/2,height/5+r/8)
    ctx.fillText('-'+0+'%', width/10-r/2,height/2+r/8)
    ctx.fillText('-'+0+'%',width-width/5-r/2,height-height/5+r/8)
    ctx.setFontSize(13)
    ctx.fillText('边缘薄', width/5-r/1.7,height/5+r/1.5)
    ctx.fillText('中心厚度', width/10-r/1.4,height/2+r/1.5)
    ctx.fillText('重量轻',width-width/5-r/1.8,height-height/5+r/1.5)
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.setStrokeStyle('white');
    ctx.arc(width/5,height/5,r,0,2*Math.PI);
    ctx.moveTo(width/10+r,height/2)
    ctx.arc(width/10,height/2,r,0,2*Math.PI);
    ctx.moveTo(width-width/5+r,height-height/5);
    ctx.arc(width-width/5,height-height/5,r,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(width/2,height/4)
    ctx.bezierCurveTo(width/2-degress,height/2,width/2-degress,height/2,width/2,height*3/4)
    ctx.lineTo(width/2+length,height*3/4)
    ctx.bezierCurveTo(width/2-degress+length,height/2,width/2-degress+length,height/2,width/2+length,height/4)
    ctx.lineTo(width/2,height/4)
    ctx.fill()
    ctx.closePath();
    ctx.draw()

    this.data.buttons[0].checked = true;
    this.data.buttons_1[0].checked = true;
    this.setData({
      buttons: this.data.buttons,
      buttons_1:this.data.buttons_1,
    })
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