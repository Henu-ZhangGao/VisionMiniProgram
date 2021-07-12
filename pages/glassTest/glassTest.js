// pages/glassTest/glassTest.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url:"http://139.196.151.36:8080/img/rule_1.png",
    url_1:"http://139.196.151.36:8080/img/rule.png",
    url_red:"http://139.196.151.36:8080/img/red.png",
    urlred:"http://139.196.151.36:8080/img/_red.png",
    urlyellow:"http://139.196.151.36:8080/img/_yellow.png",
    url_yellow:"http://139.196.151.36:8080/img/yellow.png",
    btn_1:[{id:'1',text:'固定'},{id:'2',text:'照片'},{id:'3',text:'+'},{id:'4',text:'-'}],
    heightContainer:70,
    length:40,
    length_:80,
    width:80,
    width_:59.5,
    top:30,
    top_:0,
    left_:12.75,
    left:0,
    lastX:90,
    lastX_1:200,
    heightPupil:0,
    tempFilePaths:"http://139.196.151.36:8080/img/glassesTest.jpg",
    change:true,
    str1:"保存",
    str2:"重测",
    isHidden:false,
    distance:0,
    scale:1,
    scaleWidth:0,
    scaleHeight:0,
    diff:0,
    rotate:0,
    isRun:true,
    tableHead:['右瞳高(mm)','左瞳高(mm)','落差(mm)'],
    tableData:['0.00','0.00','0.00'],
    heightPupil_1:0,
    column:['距离','瞳距','左眼','右眼'],
    tableContent:[[30,0,0,0],[50,0,0,0],[100,0,0,0],['+∞',0,0,0]],
    eyeDistance:0,
    zindex:-1,
    x:0,
    y:0,
    _xMove:0,
    _yMove:0,
    scrollHeight:0,
  },
  changeImage:function(e){
    if(this.data.zindex>-1){
      this.setData({
        zindex:this.data.zindex-1,
      })
    }
    else{
      this.setData({
        zindex:this.data.zindex+1,
      })
    }
  },
  changeHeight:function(e){
    let value=e.detail.value
    if(value<=100&&value>=50)
    this.setData({
      heightContainer:parseFloat(value),
      top:20+30*(100-value)/100,
      length:60*value/100,
      left_:85*(100-value)/200,
      width_:85*value/100,
    })
  },
  imgload(e){
    this.setData({
      baseWidth: e.detail.width, //获取图片真实宽度
      baseHeight: e.detail.height, //获取图片真实高度
      scaleWidth: this.data.baseWidth+"px", //给图片设置宽度
      scaleHeight: this.data.baseHeight+"px", //给图片设置高度
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
    let scaleWidth = newScale * this.data.baseWidth + 'px'
    let scaleHeight = newScale * this.data.baseHeight + 'px'
      this.setData({
        distance: distance,
        scale: newScale,
        scaleWidth: scaleWidth,
        scaleHeight: scaleHeight,
        diff: distanceDiff,
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
  inputGlass(e){
    this.setData({
      heightContainer:e.detail.value,
    })
  },
  location(){
    this.setData({
      isHidden:!this.data.isHidden,
    })
  },
  save(){
    this.setData({
      tableData:[this.data.heightPupil.toFixed(2),this.data.heightPupil_1.toFixed(2),(this.data.heightPupil-this.data.heightPupil_1).toFixed(2)],
      change:!this.data.change,
    })
  },
  rotate:function(e){
    this.setData({
      rotate:e.detail.value,
    })
  },
  start:function(e){
    this.setData({
      isRun:false,
    })
    let scrollHeight=this.data.scrollHeight;
    if(!this.data.isHidden)
    {
      this.setData({
        heightPupil:e.touches[0].pageY*100/(scrollHeight*0.6),
        eyeDistance:(this.data.heightPupil_1-this.data.heightPupil),
        //纵向
      })
    }
    else{
      this.setData({
        heightPupil:e.touches[0].pageX*100/(scrollHeight*0.6),
        eyeDistance:(this.data.heightPupil_1-this.data.heightPupil),
        //横向
      })
    }
  },
  move:function(e){
    
    let scrollHeight=this.data.scrollHeight;
    let temp;
    if(!this.data.isHidden)
    {
      temp=this.data.tableData;
      temp[0]=this.data.heightPupil.toFixed(2);
      temp[1]=this.data.heightPupil_1.toFixed(2);
      temp[2]=this.data.eyeDistance.toFixed(2);
    }
    else{
      temp=this.data.tableContent;
      for(let i=0;i<temp.length;i++)
      {
          temp[i][1]=(this.data.heightPupil).toFixed(2);
          temp[i][2]=(this.data.heightPupil_1).toFixed(2);
          temp[i][3]=(this.data.eyeDistance).toFixed(2);
      }
    }
    if(!this.data.isHidden){
      this.setData({
        heightPupil:e.touches[0].pageY*100/(scrollHeight*0.6),
        eyeDistance:(this.data.heightPupil_1-this.data.heightPupil),
        tableData:temp,
      })
    }
    else{
      this.setData({
        heightPupil:e.touches[0].pageX*100/(scrollHeight*0.6),
        eyeDistance:(this.data.heightPupil_1-this.data.heightPupil),
        tableContent:temp, //
      })
    }
    
  },
  end:function(e){
    this.setData({
      isRun:true,
    })
  },
  start_1:function(e){
    this.setData({
      isRun:false,
    })
    let scrollHeight=this.data.scrollHeight;
    if(!this.data.isHidden)
    {
        this.setData({
        heightPupil_1:e.touches[0].pageY*100/(scrollHeight*0.6),
        eyeDistance:(this.data.heightPupil_1-this.data.heightPupil),
      })
    }
    else{
      this.setData({
        heightPupil_1:e.touches[0].pageX*100/(scrollHeight*0.6),
        eyeDistance:(this.data.heightPupil_1-this.data.heightPupil),
      })
    }
    console.log(this.data.eyeDistance)
  },
  move_1:function(e){
    let scrollHeight=this.data.scrollHeight;
    let temp;
    if(!this.data.isHidden)
    {
      temp=this.data.tableData;
      temp[0]=this.data.heightPupil.toFixed(2);
      temp[1]=this.data.heightPupil_1.toFixed(2);
      temp[2]=this.data.eyeDistance.toFixed(2);
    }
    else{
      temp=this.data.tableContent;
      for(let i=0;i<temp.length;i++)
        {
          temp[i][1]=(this.data.heightPupil).toFixed(2);
          temp[i][2]=(this.data.heightPupil_1).toFixed(2);
          temp[i][3]=(this.data.eyeDistance).toFixed(2);
        }
    }
    if(!this.data.isHidden)
    {
      this.setData({
        heightPupil_1:e.touches[0].pageY*100/(scrollHeight*0.6),
        eyeDistance:(this.data.heightPupil_1-this.data.heightPupil),
        tableData:temp,
      })
    }
    else{
      this.setData({
        heightPupil_1:e.touches[0].pageX*100/(scrollHeight*0.6),
        eyeDistance:(this.data.heightPupil_1-this.data.heightPupil),
        tableContent:temp,
      })
    }
  },
  clickThing:function(e){
    let heightContainer=this.data.heightContainer;
    let id=e.currentTarget.dataset.id;
    let newScale;
    let scaleWidth;
    let scaleHeight;
    switch(id)
    {
      case '1':
        this.setData({
          isRun:!this.data.isRun,
        })
        break;
      case '2':
        var that = this;
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            that.setData({
              tempFilePaths:res.tempFilePaths
            })
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
        // if(heightContainer<100)
        // {
        //   this.setData({
        //     heightContainer:heightContainer+10,
        //     top:20+30*(90-heightContainer)/100,
        //     length:60*(heightContainer+10)/100,
        //     left_:85*(90-heightContainer)/200,
        //     width_:85*(heightContainer+10)/100,
        //   })
        // }
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
        // if(heightContainer>40)
        // {
        //   this.setData({
        //     heightContainer:heightContainer-10,
        //     top:20+30*(110-heightContainer)/100,
        //     length:60*(heightContainer-10)/100,
        //     left_:85*(110-heightContainer)/200,
        //     width_:85*(heightContainer-10)/100,
        //   })
        // }
        break;
      default:
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success:(res) => {
        this.setData({
            scrollHeight: res.screenHeight,
        });
      }
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