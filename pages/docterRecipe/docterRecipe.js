// pages/docterRecipe/docterRecipe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str:['个人记录','屈光度','散光','轴位','矫正视力'],
    str_1:['综合验光','屈光度','散光','轴位','瞳距','矫正视力'],
    gender:[{sex:"男",value:1,checked:true},{sex:'女',value:0}],
    goal:[{str:'复查',value:0},{str:'换眼镜',value:1},{str:'隐形',value:2},{str:'太阳眼镜',value:3},{str:'其他',value:4}],
    time:[{time:'半年之内'},{time:'半年'},{time:'一年'},{time:'两年'},{time:'三年以及以上'}],
    style:[{style:'日常戴'},{style:'偶尔隔夜戴'},{style:'长期隔夜戴'},{style:'框架轮流戴'}],
    history:[{history:'初戴'},{history:'一年以上'},{history:'三年以上'}],
    period:[{period:'日抛'},{period:'月抛'},{period:'季/半年抛'},{period:'年抛'}],
    local:[{local:'室内'},{local:'室外'}],
    isHidden:false,
    name:'',
    age:'',
    job:'',
    listData:[{col1:'建议使用镜片',col2:'周边离焦性近视防控镜片'},{col1:'建议折射率',col2:'1.61、MR-8高阿贝数镜片'},{col1:'是否需要视觉功能训练',col2:'是'},{col1:'训练项目',col2:'避免长期近距离用眼，多看远'},{col1:'视觉健康辅助方案',col2:'口服叶黄素一疗程，可能存在调节问题'},{col1:'医生提醒',col2:'新眼镜因透光率，折射率，屈光度，镜面等等因素变化，前一周可能出现轻度不适反应为正常症状'},{col1:'眼镜正确使用方法',col2:'一、因镜片表面油脂性附着物不易被擦拭，造成像散，影响视觉质量，增加视觉疲劳，加深近视度数。二、镜架使用过程中易微变形，造成镜片中心点偏移，产生棱镜效应，改变屈光度，加深近视度数'}],
  },
  submit:function(e){
    let list=e.detail.value;
    this.setData({
      isHidden:true,
      name:list.name,
      age:list.age,
      job:list.job,
    })
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