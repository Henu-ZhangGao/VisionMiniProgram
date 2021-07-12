// pages/eye_axis/medical_predict/medical_predict.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    setHidden:[true,false,false],
    diopters:0,
    formHidden:false,
    age:[],
    url:"http://139.196.151.36:8080/img/eye_base_0.png",
    degress:0,
    index:0,
    pageTimes:0,
    sex:[
      {name:0,value:'男',checked:'true'},
      {name:1,value:'女'},
    ],
    range:[
      {name:0,value:'正常',checked:'true'},
      {name:5,value:'超前'},
      {name:-5,value:'滞后'},
    ],
    isSufficientSleep:[
      {name:0,value:'是',checked:'true'},
      {name:5,value:'否'},
    ],
    preferenceDegree:[
      {name:0,value:'偶尔摄入',checked:'true'},
      {name:5,value:'每天摄入'},
    ],
    isSport:[
      {name:0,value:'是',checked:'true'},
      {name:5,value:'否'},
    ],
    isMyopia:[
      {name:0,value:'都不是',checked:'true'},
      {name:5,value:'一方是'},
      {name:10,value:'双方都是'},
    ],
    isFussyFood:[
      {name:0,value:'是',checked:'true'},
      {name:5,value:'否'},
    ],
    growthStatus:[
      {name:0,value:'正常',checked:'true'},
      {name:5,value:'否'},
    ],
    isClear:[
      {name:0,value:'是',checked:'true'},
      {name:5,value:'否'},
    ],
    usingElectronicsStatus:[
      {name:0,value:'一小时之内',checked:'true'},
      {name:5,value:'一小时之上'},
    ],
    isWellPosture:[
      {name:0,value:'是',checked:'true'},
      {name:5,value:'否'},
    ],
    seatLocal:[
      {name:0,value:'前面',checked:'true'},
      {name:-5,value:'中间'},
      {name:-10,value:'后面'}
    ],
    isSex:"0",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  clickSwitch:function(e){
    this.setData({
      pageTimes:this.data.pageTimes+1,})
    this.changePage();
  },
  changePage:function(){
      this.setData({
        setHidden:[false,false,false],
        ["setHidden["+this.data.pageTimes+"]"]:true,
      });
  },
  decrease:function(){
    if(this.data.degress<-1500)
    {
      this.setData({
        degress:this.data.degress-25,
      })
    }
    
  },
  increase:function(){
    if(this.data.degress<0){
      this.setData({
        degress:this.data.degress+25,
      })
    }
  },
  formSubmit:function(e){
    var list=e.detail.value;
    var myopiaStatus=parseInt(list["myopiaStatus"]);
    var fussyFood=parseInt(list["fussyFood"]);
    var growthStatus=parseInt(list["growthStatus"]);
    var clear=parseInt(list["Clear"]);
    var electronicsStatus=parseInt(list["electronicsStatus"]);
    var wellPosture=parseInt(list["wellPosture"]);
    var seatLocal=parseInt(list["seatLocal"]);
    var age=e.detail.value.age;
    var degress=parseInt(e.detail.value.glassDegress);
    var adjustStatus=parseInt(e.detail.value.adjustStatus);
    var sleep=parseInt(e.detail.value.Sleep);
    var preference=parseInt(e.detail.value.preferenceSugar);
    var sport=parseInt(e.detail.value.sport);
    var sum=-1190+degress-(age-1)*(adjustStatus+sleep+preference+sport+myopiaStatus+fussyFood+growthStatus+clear+electronicsStatus+wellPosture+seatLocal-70);
    this.setData({
      formHidden:true,
      diopters:sum,
    })
    if(sum>1000)
    {
      this.setData({
        url:"http://139.196.151.36:8080/img/eye_base_2.png",
      })
    }
    else if(300<sum<=800)
    {
      this.setData({
        url:"http://139.196.151.36:8080/img/eye_base_1.png",
      })
    }
    else{
      this.setData({
        url:"http://139.196.151.36:8080/img/eye_base_0.png",
      })
    }
  },

  listenerPickerSelected: function(e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value
    });
}, 
  onLoad: function (options) {
    var arr=new Array(100)
    for(var i=0;i<arr.length;i++)
    {
      arr[i]=i+1;
    }
    this.setData({
      age:arr
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