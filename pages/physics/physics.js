// pages/physics/physics.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:false,
    buttons: [{ id: 1, name: 1.56,edge:0,thickness:0,weight:0,deviant:0}, { id: 2, name: 1.60,edge:8,thickness:2,weight:11,deviant:1}, { id: 3, name: 1.67,edge:19,thickness:6,weight:12,deviant:2}, { id: 4, name: 1.74,edge:24,thickness:8,weight:26,deviant:3}],
    buttons_1:[{id:1, name: 1 }, {id:2, name: 2}, { id:3,name: 3 }, {id:4, name: 4},{id:5, name: 5 }, { id:6,name: 6}, {id:7, name: 7 }, {id:8, name: 8 },{id:9, name: 9 }, { id:10,name: 10}],
    height:0,
    width:0,
    r:30,
    i:0,
    j:0,
    para:[0,0,0],
    degress:[10,5],
    length:10,
    deviant:0,
    ctx:null,
    propGlass:[[0,0,0],[0,0,0]],
  },
  radioButtonBottom: function (e) {
    let ctx
    if(this.data.checked){
      ctx=this.data.ctx[0]
    }
    else{
      ctx=this.data.ctx[1]
    }
    let width=this.data.canvasHightAndWidth[0][0]
    let height=this.data.canvasHightAndWidth[0][1]
    let j
    let r
    let degress
    let degress_1

    // this.drawEyeGlass('#FFFFFF',ctx,width,height,degress,degress_1,length,-deviant)
    let id = e.currentTarget.dataset.id
    for (let i = 0; i < this.data.buttons_1.length; i++) {
      if (this.data.buttons_1[i].id == id) {
        //当前点击的位置为true即选中
        this.data.buttons_1[i].checked = true;
        this.setData({
          "degress[0]":10+i,
          i:i,
        })
        j=height/20+this.data.i-this.data.j;
        r=this.data.r;
        degress=this.data.degress[0];
        degress_1=this.data.degress[1];

        this.drawcircle(ctx,width,height,r)
      
        this.drawEyeGlass('#FFFFFF',ctx,width,height,degress,degress_1,j)

        // this.drawEyeGlass('#FFFFFF',ctx,width,height,degress,degress_1,length,-deviant)
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
  radioButtonRight: function (e) {
    let ctx
    ctx=this.data.ctx[0]
    let r=this.data.r;//半径
    let width=this.data.canvasHightAndWidth[0][0]
    let height=this.data.canvasHightAndWidth[0][1]
    let degress
    let degress_1
    let j
    let id = e.currentTarget.dataset.id
    for (let i = 0; i < this.data.buttons.length; i++) {
      if (this.data.buttons[i].id == id) {
        let list=[this.data.buttons[i].edge,this.data.buttons[i].thickness,this.data.buttons[i].weight]
        if(ctx==this.data.ctx[0]){
          list=[list,this.data.propGlass[1]]
          this.setData({
            propGlass:list,
          })
        }
        else{
          list=[this.data.propGlass[0],list]
          this.setData({
            propGlass:list,
          })
        }
        
        this.setData({
          para:[this.data.propGlass[0][0]-this.data.propGlass[1][0],this.data.propGlass[0][1]-this.data.propGlass[1][1],this.data.propGlass[0][2]-this.data.propGlass[1][2]],
          j:i
        })
        j=height/20+this.data.i-this.data.j;
        //当前点击的位置为true即选中
        degress=this.data.degress[0];
        degress_1=this.data.degress[1];
        this.data.buttons[i].checked = true;
        
        this.drawcircle(this.data.ctx[1],width,height,r)

        this.drawEyeGlass('#FFFFFF',ctx,width,height,degress,degress_1,j)
        //中间镜片蓝色部分

        // this.drawEyeGlass('#FFFFFF',ctx,width,height,degress,degress_1,length,-deviant)
        //中间镜片白色部分
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
  drawcircle(ctx,width,height,r){
    if(ctx==this.data.ctx[0]){
      return 0;
    }
    let left=width/6;
    ctx.clearRect(0,0,width/5,height)
    ctx.beginPath();
    ctx.strokeStyle='#0099FF';
    ctx.arc(left,height/5,r,0,2*Math.PI);
    ctx.moveTo(left+r,height/2)
    ctx.arc(left,height/2,r,0,2*Math.PI);
    ctx.moveTo(left+r,height-height/5);
    ctx.arc(left,height-height/5,r,0,2*Math.PI);
    ctx.closePath();
    //文字周边圆圈

    // ctx.beginPath();
    // ctx.strokeStyle='white';
    // ctx.arc(width/5,height/5,r,0,2*Math.PI);
    // ctx.moveTo(width/10+r-i*2,height/2)
    // ctx.arc(width/10,height/2,r,0,2*Math.PI);
    // ctx.moveTo(width/5+r-i*2,height-height/5);
    // ctx.arc(width/5,height-height/5,r,0,2*Math.PI);
    // ctx.stroke();
    // ctx.closePath();
    //文字周边圆圈
    
    ctx.fillStyle='#ffffff'
    ctx.fontSize=17
    ctx.fillText(this.data.para[0]+'%',left-r/2,height/5+r/8)
    ctx.fillText(this.data.para[1]+'%',left-r/2,height/2+r/8)
    ctx.fillText(this.data.para[2]+'%',left-r/2,height-height/5+r/8)
    ctx.fontSize=13
    ctx.fillText('边缘薄', left-r/1.7,height/5+r/1.5)
    ctx.fillText('中心厚度', left-r/1.4,height/2+r/1.5)
    ctx.fillText('重量轻',left-r/1.8,height-height/5+r/1.5)
    ctx.stroke();
    ctx.closePath();

    //文字部分   


   
  },
  drawEyeGlass(color,ctx,width,height,degress,degress_1=5,deviant){
    // degress_1=degress_1/100
    // degress=degress/100
    // let temp=-width/10
    // deviant=deviant/5
    // console.log(deviant)
    let x=width/5*2
    let y=height/2
    let length=width/7*4
    // deviant=height/20
    // degress=10
    // degress_1=5
    if(this.data.checked){
      ctx.clearRect(0,0,width,height)
    }
    ctx.clearRect(width/3,0,width,height)
    ctx.beginPath();
    ctx.fillStyle=color
    ctx.moveTo(x,y-deviant)
    ctx.lineTo(x,y)
    ctx.bezierCurveTo(x+length/2,y+degress_1,x+length/2,y+degress_1,x+length,y)
    ctx.lineTo(x+length,y-deviant)
    ctx.bezierCurveTo(x+length/2,y-deviant+degress,x+length/2,y-deviant+degress,x,y-deviant)
    ctx.fill()
    ctx.closePath();
  },
  // drawEye(color,ctx,width,height,degress,degress_1,length,deviant){
  //   degress_1=degress_1/100
  //   degress=degress/100
  //   let temp=-width/10
  //   deviant=deviant/5
  //   console.log(deviant)
  //   if(this.data.checked){
  //     ctx.clearRect(0,0,width,height)
  //   }
  //   ctx.clearRect(width/3,0,width,height)
  //   ctx.beginPath();
  //   ctx.fillStyle=color
  //   ctx.moveTo(width/4-temp,height/2)
  //   ctx.bezierCurveTo(width/2-temp,height/2+degress,width/2-temp,height/2+degress,width*3/4-temp,height/2)
  //   ctx.lineTo(width*3/4-temp,height/2+deviant)
  //   ctx.bezierCurveTo(width/2-temp,height/2+degress_1+length,width/2-temp,height/2+degress_1+length,width/4-temp,height/2+deviant)
  //   ctx.lineTo(width/4-temp,height/2)
  //   ctx.fill()
  //   ctx.closePath();
  // },
  canvasChange(){
    this.setData({
      checked:!this.data.checked
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
    let r=this.data.r;
    let degress=this.data.degress;
    let length=this.data.length;
    const query = wx.createSelectorQuery()
    query.select('#convex_mirror')
    .fields({ 
      node: true,
      size: true })
    query.select('#convex_mirror_1').fields({ 
      node: true,
      size: true })
    .exec((res) => {
      console.log(res)
      const canvas = [res[0].node,res[1].node]
      const ctx = [canvas[0].getContext('2d'),canvas[1].getContext('2d')]
      const dpr = wx.getSystemInfoSync().pixelRatio
      canvas[0].width = res[0].width * dpr
      canvas[0].height = res[0].height * dpr
      canvas[1].width = res[0].width * dpr
      canvas[1].height = res[0].height * dpr
      ctx[0].scale(dpr, dpr)
      ctx[1].scale(dpr, dpr)
      this.setData({
        canvasHightAndWidth:[[res[0].width,res[0].height],[res[1].width,res[1].height]],
        canvas:canvas,
        ctx:ctx,
      })
      this.drawEyeGlass('#FFFFFF',ctx[0],res[0].width,res[0].height,degress[0],degress[1],res[0].height/20)
      this.drawcircle(ctx[1],res[1].width ,res[1].height,r)
      this.drawEyeGlass('#FFFFFF',ctx[1],res[1].width ,res[1].height,degress[0],degress[1],res[1].height/20)
    })
    

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