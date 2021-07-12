// pages/visualTrainingIntervent/visualTrainingIntervent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diopter:0,
    index:0,
    age:[],
    str:"良好的用眼卫生、科学的视觉训练，佩戴功能性镜片，可有效的延缓度数加深",
    column:['年龄','不干预','25%防控','50%防控','75%防控'],
    tableContent:[[2,0,0,0,0],[4,-100,-75,-50,-25],[6,-300,-225,-150,-75],[8,-500,-373,-250,-125],[10,-700,-525,-350,-175],[12,-900,-675,-450,-225],[14,-1100,-825,-550,-275],[16,-1300,-975,-650,-325],[18,-1500,-1125,-750,-375]],
    isHidden:false,
  },
  sumbit_1:function(e){
    let list=e.detail.value;
    let age=list['age'];
    let astigmatism=parseFloat(list['astigmatism']);
    let list_1=this.data.tableContent
    console.log(list);
    for(let i=0;i<list_1.length;i++)
    {
      if(age>list_1[i][0]){
        list_1.splice(0,i+1)
        // list_1.splice(9-i)
      }
    }
    list_1[0].splice(1,4,astigmatism,astigmatism,astigmatism,astigmatism);
    for(let x=1;x<list_1.length;x++)
      {
          list_1[x].splice(1,4,astigmatism,astigmatism*0.75,astigmatism*0.5,astigmatism*0.25);
          astigmatism=astigmatism-200;
      }
    this.setData({
      tableContent:list_1,     
    })
    
  },
  begin:function(e){
    this.setData({
      isHidden:!this.data.isHidden,
    })
  },
  listenerPickerSelected: function(e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value
    });
}, 
  decrease_1:function(){
    this.setData({
      diopter:this.data.diopter-25,
    })
  },
  increase_1:function(){
    if(this.data.diopter<0)
    {
      this.setData({
        diopter:this.data.diopter+25,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arr=new Array(18)
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