// components/ruler.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isRotate:{
      type:Boolean,
      value:true
    },
    icon_path: {
      type: String,
      value: ""
    },//标尺左上角图标路径
    icon_text: {
      type: String,
      value: "体重"
    },//图标旁文字
    icon_size: {
      type: Number,
      value: 20
    },//图标的宽高，单位像素
    icon_font: {
      type: Number,
      value: 20
    },//图标旁的字体大小，单位像素
    font_color: {
      type: String,
      value: "white",
    },//所有的字体颜色
    unit_text: {
      type: String,
      value: "cm"
    },//单位
    unit_sizt: {
      type: Number,
      value: 5
    },//单位字体大小
    cursor_font_size: {
      type: Number,
      value: 25
    },//游标上方字体的大小
    cm_width: {
      type: Number,
      value: 100
    },//尺子刻度每一厘米占用的宽度，单位像素！像素！像素！！！
    scale_size: {
      type: Number,
      value: 15
    },//刻度值字体的大小
    left_margin: {
      type: Number,
      value: 0
    },//尺子距屏幕左边的距离单位像素
    minValue: {
      type: Number,
      value: 0
    },//标尺的最小值
    maxValue: {
      type: Number,
      value: 100
    },//标尺的最大值
    interval: {
      type: Number,
      value: 10
    },//标尺每段的间隔，会影响结果保留几位小数
    cursor_color: {
      type: String,
      value: "yellow"
    },//指针的颜色，目前只支持红色和黄色
    defaultNum: {
      type: Number,
      value: 0
    },//指针默认指向的值
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentNum: 0,//当前数值
    loopNum:0,//控制循环次数
    cursor_url: "../pages/image/gobottom.png",
    navigateScroll: 0,
  },
  attached: function () {
    this.setData({
      loopNum: (this.properties.maxValue - (this.properties.minValue - this.properties.interval)) / this.properties.interval,
      navigateScroll: Math.round(this.properties.defaultNum / this.properties.interval * this.properties.cm_width)
    })
    if(this.properties.cursor_color == "red"){
      this.setData({
        cursor_url: "../pages/image/gobottom.png"
      })
    }
  }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () { },
  /**
   * 组件的方法列表
   */
  methods: {
    rulerScroll: function (e) {
      let that = this
      let result = e.detail.scrollLeft / that.data.cm_width * that.properties.interval
      if(that.properties.interval == 1){
        result = result.toFixed(1)
      }else{
        result = result.toFixed(0)
      }
      that.setData({
        currentNum: result
      })
      var myEventDetail = { currentNum: that.data.currentNum} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('mymoveevent', myEventDetail)
    },
  }
})
