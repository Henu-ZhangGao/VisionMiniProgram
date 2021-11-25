// pages/glassTest/glassTest.js
var that;
var deltaX = 0;
var minValue = 1;
let app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight:0,
    height:0,
    url:["http://139.196.151.36:8080/img/rule_1.png","http://139.196.151.36:8080/img/rule.png","http://139.196.151.36:8080/img/red.png","http://139.196.151.36:8080/img/_red.png","http://139.196.151.36:8080/img/_yellow.png"],
    btn_1:[{id:'1',text:'固定'},{id:'2',text:'照片'},{id:'3',text:'+'},{id:'4',text:'-'}],
    heightContainer:0,
    widthContainer:0,
    heightPupil:[[0,0],
                 [0,0]],
    eyeDistance:[0,0],
    tempFilePaths:"http://139.196.151.36:8080/img/glassesTest.jpg",
    change:[true,true],
    str:["保存","重测"],
    isHidden:false,
    distance:0,
    scale:1,
    baseHeight:299,
    baseWidth:353,
    scaleWidth:300,
    scaleHeight:100,
    diff:0,
    rotate:0,
    isRun:true,
    x:0,
    y:0,
    _xMove:0,
    _yMove:0,
    scrollHeight:0,
    isShow:true,
    X1:0,
    X2:0,
    Y1:0.2*app.globalData.Height,
    Y2:0,
    isRun1:true,
    index:1,
    isDisappear:false,
    value: 0,
    res:[],
    eyePupil:[],
    biasValue:[0,0],
    // tableHead:['左瞳高(mm)','右瞳高(mm)','落差(mm)'],
    // tableData:['0.00','0.00','0.00'],
    // column:['左眼(mm)','右眼(mm)','瞳距差(mm)'],
    // tableContent:['0.00','0.00','0.00'],
  },
  /*
    params:
      eyeLocation:眼睛编号
      e:Dom的信息集合
  */
  changeBias:function(e){
    let arr=e.detail.value.split(",")
    let bias=[parseFloat(arr[0]),parseFloat(arr[1]),parseFloat(arr[2])];
    this.setData({
      biasValue:bias
    })
    this.drawEyePupil()
 },
  computerPosition:function(e,eyeLocation){
    if(!this.data.isHidden){
      this.setData({
        ["heightPupil["+eyeLocation+"][0]"]:(1-e.detail.y/149.8)*this.data.heightContainer,
        // 2.3*(this.data.res[0].top+this.data.res[0].height-this.data.navBarHeight-e.touches[0].pageY)/(app.globalData.Height-this.data.navBarHeight)*this.data.heightContainer,
        "eyeDistance[0]":(this.data.heightPupil[1][0]-this.data.heightPupil[0][0]),
        //纵向模式
      })
    }
    else{
      if(eyeLocation==1){
        this.setData({
          ["heightPupil["+eyeLocation+"][1]"]:(e.detail.x/this.data.res[1].width-1/2)*this.data.widthContainer,
          "eyeDistance[1]":(Math.abs(this.data.heightPupil[1][1]-this.data.heightPupil[0][1])),
          //横向模式
        })
      }
      else{
        this.setData({
          ["heightPupil["+eyeLocation+"][1]"]:(1/2-e.detail.x/this.data.res[1].width)*this.data.widthContainer,
          "eyeDistance[1]":(Math.abs(this.data.heightPupil[1][1]-this.data.heightPupil[0][1])),
          //横向模式
        })
      }
      
    }
  },
  getDomInfo(ClassOrId){
    let that = this;
    var temp=this.data.res;
    let query = wx.createSelectorQuery();
    query.select(ClassOrId).boundingClientRect();
    query.exec(function (res) {
      //res就是 该元素的信息 数组
      temp.push(res[0])
      that.data.res=temp

    })
  },
  changeImage:function(e){
      this.setData({
        isShow:!this.data.isShow
      })
      if(!this.data.isShow){
        wx.showToast({
                title: '数据已隐藏,再次点击即可显示',
                icon:'none',
                duration:1000
              })
      }
      else{
        wx.showToast({
          title: '数据已显示',
          icon:'none',
          duration:1000
        })
      }
  },
  changeHeight:function(e){
    let value=e.detail.value
    this.setData({
      heightContainer:value,
    })
    this.setData({
      "heightPupil[0][0]":10/6*((this.data.res[0].top+this.data.res[0].height-this.data.Y1)/app.globalData.Height)*this.data.heightContainer,
      "heightPupil[1][1]":10/7*(0.6-(this.data.Y2/app.globalData.Width))*this.data.heightContainer,
      "eyeDistance[0]":this.data.heightPupil[1][0]-this.data.heightPupil[0][0],
    })
    this.setData({
      tableData:[this.data.heightPupil[0][0].toFixed(2),this.data.heightPupil[1][0].toFixed(2),this.data.eyeDistance[0].toFixed(2)]
    })
    var context = wx.createCanvasContext('ruler');
    this.onDrawRuler(context, this.data.res[0].top,this.data.res[0].bottom-this.data.navBarHeight-10, 148.5/this.data.heightContainer, 300, 310, true);
    console.log(this.data.res[0])
    context.draw();
  },
  imgload(e){
    this.setData({
      baseWidth: e.detail.width, //获取图片真实宽度,一号线和二号线的差距()
      baseHeight: e.detail.height, //获取图片真实高度
      scaleWidth: this.data.baseWidth+"px", //给图片设置宽度
      scaleHeight: this.data.baseHeight+"px", //给图片设置高度
    })
  },
  upload(path) {
      let that=this
      wx.showToast({
        icon: "loading",
        title: "正在上传"
      }),

      wx.uploadFile({
        url: "https://heshuo.wang:5000/FileUploadServlet",
        filePath: path[0], 
        name: 'pic',
        header: { "Content-Type": "multipart/form-data" },
        success: function (res) {
          console.log(res);
          if (res.statusCode != 200) { 
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
            return;
          }
          let list=res.data
          console.log(list)
          var reg=/\d+\.?\d/gm
          list=list.match(reg)
          let temp=[parseFloat(list[0]),parseFloat(list[1]),parseFloat(list[2]),parseFloat(list[3])]
          that.setData({
            eyePupil:temp
          })
        },
        fail: function (e) {
          console.log(e);
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
        },
        complete: function () {
          wx.hideToast();  //隐藏Toast
        }
      })
  },

  touchstartCallback: function(e) {
    // 单手指缩放开始，不做任何处理
    if (e.touches.length == 1)
    {
      this.setData({
        _xMove:e.touches[0].clientX,
        _yMove:e.touches[0].clientY,
      })
      return;
    }
    // 当两根手指放上去的时候，将距离(distance)初始化。
    let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    //计算开始触发两个手指坐标的距离
    let distance = Math.sqrt(xMove * xMove + yMove * yMove);
    this.setData({
      distance: distance,
    })
  },
  touchmoveCallback: function(e) {
    // 单手指缩放不做任何操作
    if (e.touches.length == 1)
    {
      let xMove=e.touches[0].clientX-this.data._xMove;
      let yMove=e.touches[0].clientY-this.data._yMove;
      this.setData({
        x:this.data.x+xMove,
        y:this.data.y+yMove,
        _xMove:e.touches[0].clientX,
        _yMove:e.touches[0].clientY,
      })
      return;
    }
    //双手指运动 x移动后的坐标和y移动后的坐标
    let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    //双手指运动新的 ditance
    let distance = Math.sqrt(xMove * xMove + yMove * yMove);
    //计算移动的过程中实际移动了多少的距离
    let distanceDiff = distance - this.data.distance;
    let newScale = this.data.scale + 0.005 * distanceDiff
    // 为了防止缩放得太大，所以scale需要限制，同理最小值也是
      this.setData({
        distance: distance,
        scale: newScale,
        baseWidth: baseWidth,
        baseHeight: baseHeight,
        diff: distanceDiff,
      })
      const query = wx.createSelectorQuery()
    query.select('#eyePupuil')
    .fields({ 
      node: true,
      size: true })
    .exec((res) => {
      res[0].width=this.data.baseWidth
      res[0].height=this.data.baseHeight
    })
    //为了防止缩放得太小，所以scale需要限制
      // this.setData({
      //   distance: distance,
      //   scale: newScale,
      //   scaleWidth: '100%',
      //   scaleHeight: '100%',
      //   diff: distanceDiff
      // })
  },
  changeWidth:function(e){
    console.log(this.data.res)
    this.setData({
      widthContainer:e.detail.value,
    })
    this.setData({
      "heightPupil[0][1]":10/7*(0.42-(this.data.X1/app.globalData.Width))*this.data.widthContainer,
      "heightPupil[1][1]":10/7*((this.data.X2/app.globalData.Width)-0.42)*this.data.widthContainer,
    })
    this.setData({
      "eyeDistance[1]":parseFloat(Math.abs(this.data.heightPupil[1][1]-this.data.heightPupil[0][1]))
    })
    // this.setData({
    //   tableContent:[this.data.heightPupil[1].toFixed(2),this.data.heightPupil_1[1].toFixed(2),this.data.eyeDistance[1].toFixed(2)]
    // })
    var context = wx.createCanvasContext('ruler_');
    this.onDrawRuler_(context, (this.data.res[1].width)/2, this.data.res[1].width, 460/this.data.widthContainer, 80, 90, true);
    context.draw();
  },
  onDrawRuler_: function (context, start, end, onemm, lineStart, lineEnd, isLeft) {
    var conunt = 0;
    var textPx = isLeft ? lineEnd + 3 : lineStart - 10
    for (var i = start; i < end; i += onemm) {
      var temp = 0;
      if (conunt % 10 == 0) {
        temp += 10;
        var tempTextPx = isLeft ? textPx + temp + 10 : textPx - temp
        context.fillText(conunt / 10,i,tempTextPx)
      } else if (conunt % 5 == 0) {
        temp += 5;
      }
      var tempLineStart = isLeft ? lineStart : lineStart - temp;
      var tempLineEnd = isLeft ? lineEnd + temp : lineEnd;
      context.setFontSize(10)
      context.moveTo(i,tempLineStart)
      context.lineTo(i,tempLineEnd)
      context.stroke();
      conunt++
    }
    conunt=0;
    for (var i = start; i > 2*start - end; i -= onemm) {
      var temp = 0;
      if (conunt % 10 == 0) {
        temp += 10;
        var tempTextPx = isLeft ? textPx + temp + 10 : textPx - temp
        context.fillText(conunt / 10,i,tempTextPx)
      } else if (conunt % 5 == 0) {
        temp += 5;
      }
      var tempLineStart = isLeft ? lineStart : lineStart - temp;
      var tempLineEnd = isLeft ? lineEnd + temp : lineEnd;
      context.setFontSize(10)
      context.moveTo(i,tempLineStart)
      context.lineTo(i,tempLineEnd)
      context.stroke();
      conunt++
    }
  },
  location(){
    this.setData({
      isHidden:!this.data.isHidden,
      isRun:true,
    })
    if(!this.data.change[0]){
      this.setData({
        tableData:this.data.temp[0],
      })
    }
    if(!this.data.isHidden){
      this.setData({
        isDisappear:!this.data.change[0]
      })
    }
    else{
      this.setData({
        isDisappear:!this.data.change[1]
      })
    }
  },
  save(){
    if(!this.data.isHidden)
    {
      this.setData({
        "temp[0]":this.data.tableData,
        "change[0]":!this.data.change[0],
      })
      this.setData({
        isDisappear:!this.data.change[0],
      })
    }
    else{
      this.setData({
        "temp[1]":this.data.tableContent,
        "change[1]":!this.data.change[1],
      })
      this.setData({
        isDisappear:!this.data.change[1],
      })
    }
    
    this.drawCrossLine();
  },
  drawCrossLine(){
    const query = wx.createSelectorQuery()
    var eyePupil=[this.data.eyePupil[0]-this.data.biasValue[0],this.data.eyePupil[1]-this.data.biasValue[1],this.data.eyePupil[2]-this.data.biasValue[0],this.data.eyePupil[3]-this.data.biasValue[1]];
    query.select('#eyePupuil')
    .fields({ 
      node: true,
      size: true })
    .exec((res) => {
        let canvas=res[0].node
        let ctx=canvas.getContext('2d')
        let r=10
        
        // const img=canvas.createImage()
        // const dpr=wx.getSystemInfoSync().pixelRatio
        // img.src=this.data.tempFilePaths
        // img.onload=()=>{
        //   ctx.drawImage(img,0,0,canvas.width/dpr,canvas.height/dpr)
        // }
        ctx.beginPath();
        ctx.strokeStyle="white"
        ctx.fillStyle="white"
        if(this.data.biasValue[2]==1){
          eyePupil[0]=this.data.eyePupil[0]
          eyePupil[1]=this.data.eyePupil[1]
        }
        else if(this.data.biasValue[2]==0){
          eyePupil[3]=this.data.eyePupil[3]
          eyePupil[2]=this.data.eyePupil[2]
        }
          ctx.beginPath();
          ctx.moveTo(eyePupil[2],eyePupil[3]-r)
          ctx.lineTo(eyePupil[2],eyePupil[3]+r)
          ctx.moveTo(eyePupil[2]-r,eyePupil[3])
          ctx.lineTo(eyePupil[2]+r,eyePupil[3])
          ctx.stroke();
          ctx.arc(eyePupil[2],eyePupil[3],r/3,0,Math.PI*2)
          ctx.fill()
          ctx.closePath();
          ctx.moveTo(eyePupil[0],eyePupil[1]-r)
          ctx.lineTo(eyePupil[0],eyePupil[1]+r)  
          ctx.moveTo(eyePupil[0]-r,eyePupil[1])
          ctx.lineTo(eyePupil[0]+r,eyePupil[1])        
          ctx.stroke();
          ctx.arc(eyePupil[0],eyePupil[1],r/3,0,Math.PI*2)
          ctx.fill();
          ctx.closePath();
    })
  },
  drawEyePupil(){
    const query = wx.createSelectorQuery()
    query.select('#eyePupuil')
    .fields({ 
      node: true,
      size: true })
    .exec((res) => {
          const canvas=res[0].node
          const ctx=canvas.getContext('2d')
          const dpr = wx.getSystemInfoSync().pixelRatio
          canvas.width =this.data.baseWidth * dpr
          canvas.height = this.data.baseHeight * dpr
          ctx.scale(dpr, dpr);
          console.log(canvas)
          ctx.clearRect(0,0,canvas.width,canvas.height)
          const img=canvas.createImage()
          img.src=this.data.tempFilePaths
          img.onload=()=>{
            ctx.drawImage(img,0,0,canvas.width/dpr,canvas.height/dpr)
          }
          // ctx.beginPath()
          // ctx.fillStyle="green"
          // ctx.arc(this.data.eyePupil[0],this.data.eyePupil[1],20,0,2*Math.PI,false)
          // ctx.moveTo(this.data.eyePupil[2],this.data.eyePupil[3])
          // ctx.arc(this.data.eyePupil[2],this.data.eyePupil[3],20,0,2*Math.PI,false)
          // ctx.fill()
          // // ctx.fillText('边缘薄', this.data.eyePupil[0],this.data.eyePupil[1])
          // ctx.closePath();
        }
      )
  },
  rotate:function(e){
    this.setData({
      rotate:e.detail.value,
    })
  },
  
  start:function(e){
    this.setData({
      isRun1:false,
    })
  },
  move:function(e){
    console.log(e.detail.x)
    if(e.currentTarget.dataset.id=="left"){
      this.computerPosition(e,0);
    }
   
    else{
      this.computerPosition(e,1);
    }
    
    // let temp;
    // if(!this.data.isHidden)
    // {
    //   temp=this.data.tableData;
    //   temp[0]=this.data.heightPupil[0].toFixed(2);
    //   temp[1]=this.data.heightPupil_1[0].toFixed(2);
    //   temp[2]=this.data.eyeDistance[0].toFixed(2);
    // }
    // else{
    //   temp=this.data.tableContent;
    //   temp[0]=this.data.heightPupil[1].toFixed(2);
    //   temp[1]=this.data.heightPupil_1[1].toFixed(2);
    //   temp[2]=this.data.eyeDistance[1].toFixed(2);
    // }
  },
  end:function(e){
    let x=e.changedTouches[0].pageX;
    let y=e.changedTouches[0].pageY;
    this.setData({
      isRun1:true,
      X1:x,
      Y1:y,
    })
  },

  end_1:function(e){
    // let temp;
    let x=e.changedTouches[0].pageX;
    let y=e.changedTouches[0].pageY;
    this.setData({
      isRun1:true,
      X2:x,
      Y2:y,
    })
    let temp={touches:[{pageX:e.changedTouches[0].pageX,
                        pageY:e.changedTouches[0].pageY}]};
    this.computerPosition(temp,1);
  },
  
  
  clickThing:function(e){
    let heightContainer=this.data.heightContainer;
    let id=e.currentTarget.dataset.id;
    this.data.index=id;
    let newScale;
    let scaleWidth;
    let scaleHeight;
    switch(id)
    {
      case '1':
        this.setData({
          isRun:!this.data.isRun,
        })
        console.log("按钮1")
        if(!this.data.isRun){
          wx.showToast({
            title: '已固定',
            icon:'none',
            duration:1000,
          })
        }
        else{
          wx.showToast({
            title: '解除固定',
            icon:'none',
            duration:1000,
          })
        }
        break;
      case '2':
        var that = this;
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            console.log(res)
            that.setData({
              tempFilePaths:res.tempFilePaths
            })
            that.drawEyePupil()
            that.upload(res.tempFilePaths);
          }
        })
        break;
      case '3':
        if(this.data.isRun)
        {
          newScale = this.data.scale + 0.05
          // 为了防止缩放得太大，所以scale需要限制，同理最小值也是
            scaleWidth = newScale * this.data.baseWidth + 'px'
            scaleHeight = newScale * this.data.baseHeight + 'px'
            this.setData({
              scale: newScale,
              scaleWidth: scaleWidth,
              scaleHeight: scaleHeight,
            })
        }
        break;
      case '4':
        if(this.data.isRun)
        {
          newScale = this.data.scale - 0.05
          // 为了防止缩放得太大，所以scale需要限制，同理最小值也是
            scaleWidth = newScale * this.data.baseWidth + 'px'
            scaleHeight = newScale * this.data.baseHeight + 'px'
            this.setData({
              scale: newScale,
              scaleWidth: scaleWidth,
              scaleHeight: scaleHeight,
            })
        }
        break;
      default:
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDomInfo('.moveArea2');
    this.getDomInfo('.moveArea1');
    wx.getSystemInfo({
      success:(res) => {
        this.setData({
            scrollHeight: res.screenHeight,
        });
      }
  })
  this.drawEyePupil()
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.data.navBarHeight=app.globalData.navBarHeight;
    wx.showToast({
      title: '通过在左上角输入值,利用绿色校准线来求出瞳高和瞳距',
      icon:'none',
      duration:2000,
      success:function(res){
      }
    })
    var context = wx.createCanvasContext('ruler_');
    this.onDrawRuler_(context, 0.3*app.globalData.Width, 0.815*app.globalData.Width, 429.6/this.data.widthContainer, 80, 90, true);
    context.draw();
  },
  onDrawRuler: function (context, start, end, onemm, lineStart, lineEnd, isLeft) {
    var conunt = 0;
    var textPx = isLeft ? lineEnd + 3 : lineStart - 10
    for (var i = start+7; i < end; i += onemm) {
      var temp = 0;
      if (conunt % 10 == 0) {
        temp += 10;
        var tempTextPx = isLeft ? textPx + temp : textPx - temp
        context.fillText(conunt / 10, tempTextPx, end-i)
      } else if (conunt % 5 == 0) {
        temp += 5;
      }
      var tempLineStart = isLeft ? lineStart : lineStart - temp;
      var tempLineEnd = isLeft ? lineEnd + temp : lineEnd;
      context.setFontSize(10)
      context.moveTo(tempLineStart, end-i)
      context.lineTo(tempLineEnd,end-i)
      context.stroke();
      conunt++
    }
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