// pages/glassTest/glassTest.js
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Mode: true,
    ctx: null,
    navBarHeight: 0,
    str: ["保存", "重测"],
    eyePositionIndex: 0,
    eyePosition: ["左", "右", "双"],
    btn_1: [
      { id: "1", text: "固定" },
      { id: "2", text: "照片" },
      { id: "3", text: "+" },
      { id: "4", text: "-" },
    ],
    //按钮组
    heightContainer: 0,
    widthContainer: 0,
    heightPupil: [
      [0, 0],
      [0, 0],
    ],
    eyeDistance: [0, 0],
    isRun: [true, true],
    change: [true, true],
    isHidden: false,
    distance: 0,
    scale: 1,
    baseHeight: 299,
    baseWidth: 353,
    scaleWidth: "353px",
    scaleHeight: "299px",
    diff: 0,
    rotate: 0,
    x: 0,
    y: 0,
    _xMove: 0,
    _yMove: 0,
    isShow: true,
    X1: 0,
    X2: 0,
    Y1: 0.2 * app.globalData.Height,
    Y2: 0,
    //保存下次选项
    index: 1,
    isDisappear: false,
    res: [],
    eyePupil: [],
    biasValue: [0, 0],
    url: [
      "http://119.45.23.48:8080/img/rule_1.png",
      "http://119.45.23.48:8080/img/rule.png",
      "http://119.45.23.48:8080/img/red.png",
      "http://119.45.23.48:8080/img/_red.png",
      "http://119.45.23.48:8080/img/_yellow.png",
    ],
    tempFilePaths: ["", ""],
    // tableHead:['左瞳高(mm)','右瞳高(mm)','落差(mm)'],
    // tableData:['0.00','0.00','0.00'],
    // column:['左眼(mm)','右眼(mm)','瞳距差(mm)'],
    // tableContent:['0.00','0.00','0.00'],
  },
  changePosition(e) {
    this.setData({
      eyePositionIndex: e.detail.value,
    });
  },
  /*
    params:
      eyeLocation:眼睛编号
      e:Dom的信息集合
  */
  changeBias: function (e) {
    let arr = e.currentTarget.dataset.status;
    let b;
    let bias;
    if (arr == "-") {
      b = 10;
    } else {
      b = -10;
    }
    if (this.data.Mode) {
      bias = [b, 0, this.data.eyePositionIndex];
    } else {
      bias = [0, b, this.data.eyePositionIndex];
    }
    this.setData({
      biasValue: bias,
    });
    // this.drawEyePupil();
    this.drawCrossLine();
  },
  computerPosition: function (e, eyeLocation) {
    if (!this.data.isHidden) {
      console.log(e.detail.y);
      this.setData({
        ["heightPupil[" + eyeLocation + "][0]"]:
          (1 - e.detail.y / this.data.areaHeight) * this.data.heightContainer,
        // 2.3*(this.data.res[0].top+this.data.res[0].height-this.data.navBarHeight-e.touches[0].pageY)/(app.globalData.Height-this.data.navBarHeight)*this.data.heightContainer,
        "eyeDistance[0]":
          this.data.heightPupil[1][0] - this.data.heightPupil[0][0],
        //纵向模式
      });
    } else {
      if (eyeLocation == 1) {
        this.setData({
          ["heightPupil[" + eyeLocation + "][1]"]:
            (e.detail.x / this.data.res[1].width - 1 / 2) *
            this.data.widthContainer,
          "eyeDistance[1]": Math.abs(
            this.data.heightPupil[1][1] - this.data.heightPupil[0][1]
          ),
          //横向模式
        });
      } else {
        this.setData({
          ["heightPupil[" + eyeLocation + "][1]"]:
            (1 / 2 - e.detail.x / this.data.res[1].width) *
            this.data.widthContainer,
          "eyeDistance[1]": Math.abs(
            this.data.heightPupil[1][1] - this.data.heightPupil[0][1]
          ),
          //横向模式
        });
      }
    }
  },
  getDomInfo(ClassOrId) {
    let that = this;
    var temp = this.data.res;
    let query = wx.createSelectorQuery();
    query
      .select(ClassOrId)
      .fields({
        size: true,
        rect: true,
      })
      .exec((res) => {
        //res就是 该元素的信息 数组
        temp.push(res[0]);
        that.data.res = temp;
      });
  },
  changeMode: function (e) {
    console.log(this.data.Mode);
    this.setData({
      Mode: !this.data.Mode,
    });
  },
  changeImage: function (e) {
    this.setData({
      isShow: !this.data.isShow,
    });
    if (!this.data.isShow) {
      wx.showToast({
        title: "数据已隐藏,再次点击即可显示",
        icon: "none",
        duration: 1000,
      });
    } else {
      wx.showToast({
        title: "数据已显示",
        icon: "none",
        duration: 1000,
      });
    }
  },
  changeHeight: function (e) {
    let that = this;
    let value = e.detail.value;
    if (parseFloat(value) == NaN || value < 0) {
      return 0;
    }
    this.setData({
      heightContainer: parseFloat(value),
    });
    this.setData({
      "heightPupil[0][0]":
        (10 / 6) *
        ((this.data.res[0].top + this.data.res[0].height - this.data.Y1) /
          app.globalData.Height) *
        this.data.heightContainer,
      "heightPupil[1][1]":
        (10 / 7) *
        (0.6 - this.data.Y2 / app.globalData.Width) *
        this.data.heightContainer,
      "eyeDistance[0]":
        this.data.heightPupil[1][0] - this.data.heightPupil[0][0],
    });
    this.setData({
      tableData: [
        this.data.heightPupil[0][0].toFixed(2),
        this.data.heightPupil[1][0].toFixed(2),
        this.data.eyeDistance[0].toFixed(2),
      ],
    });
    wx.createSelectorQuery()
      .select("#ruler")
      .fields({
        size: true,
        node: true,
      })
      .exec((res) => {
        let canvas = res[0].node;
        canvas.width = res[0].width;
        canvas.height = res[0].height;
        that.onDrawRuler(
          canvas.getContext("2d"),
          0,
          this.data.areaHeight,
          this.data.areaHeight / this.data.heightContainer,
          250,
          260,
          true
        );
      });
  },
  imgload(e) {
    this.setData({
      baseWidth: e.detail.width, //获取图片真实宽度,一号线和二号线的差距()
      baseHeight: e.detail.height, //获取图片真实高度
      scaleWidth: e.detail.width + "px", //给图片设置宽度
      scaleHeight: e.detail.height + "px", //给图片设置高度
    });
  },
  upload(path) {
    let that = this;
    wx.getImageInfo({
      src: path,
      success(res) {
        that.setData({
          baseWidth: res.width,
          baseHeight: res.height,
        });
      },
    });
    wx.showToast({
      icon: "loading",
      title: "正在上传",
    }),
      wx.uploadFile({
        url: "https://heshuo.wang:5000/FileUploadServlet",
        filePath: path,
        name: "pic",
        header: { "Content-Type": "multipart/form-data" },
        success: function (res) {
          console.log(res);
          if (res.statusCode != 200) {
            wx.showModal({
              title: "提示",
              content: "上传失败",
              showCancel: false,
            });
            return;
          }
          let list = res.data;
          let temp;
          console.log(list);
          if (list == []) {
            temp = [0, 0, 0, 0];
          }
          var reg = /\d+\.?\d/gm;
          list = list.match(reg);
          temp = [
            parseFloat(list[0]),
            parseFloat(list[1]),
            parseFloat(list[2]),
            parseFloat(list[3]),
          ];
          that.setData({
            eyePupil: temp,
          });
        },
        fail: function (e) {
          wx.showModal({
            title: "提示",
            content: "上传失败",
            showCancel: false,
          });
        },
        complete: function () {
          wx.hideToast(); //隐藏Toast
        },
      });
  },

  touchstartCallback: function (e) {
    // 单手指缩放开始，不做任何处理
    if (e.touches.length == 1) {
      this.setData({
        _xMove: e.touches[0].clientX,
        _yMove: e.touches[0].clientY,
      });
      return;
    }
    // 当两根手指放上去的时候，将距离(distance)初始化。
    let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    //计算开始触发两个手指坐标的距离
    let distance = Math.sqrt(xMove * xMove + yMove * yMove);
    this.setData({
      distance: distance,
    });
  },
  touchmoveCallback: function (e) {
    // 单手指缩放不做任何操作
    if (e.touches.length == 1) {
      let xMove = e.touches[0].clientX - this.data._xMove;
      let yMove = e.touches[0].clientY - this.data._yMove;
      this.setData({
        x: this.data.x + xMove,
        y: this.data.y + yMove,
        _xMove: e.touches[0].clientX,
        _yMove: e.touches[0].clientY,
      });
      return;
    }
    //双手指运动 x移动后的坐标和y移动后的坐标
    let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    //双手指运动新的 ditance
    let distance = Math.sqrt(xMove * xMove + yMove * yMove);
    //计算移动的过程中实际移动了多少的距离
    let distanceDiff = distance - this.data.distance;
    let newScale = this.data.scale + 0.005 * distanceDiff;
    let baseWidth = newScale * this.data.baseWidth;
    let baseHeight = newScale * this.data.baseHeight;
    // 为了防止缩放得太大，所以scale需要限制，同理最小值也是
    this.setData({
      distance: distance,
      scale: newScale,
      scaleWidth: baseWidth + "px",
      scaleHeight: baseHeight + "px",
      // baseWidth:baseWidth,
      // baseHeight:baseHeight,
      diff: distanceDiff,
    });
    //为了防止缩放得太小，所以scale需要限制
    // this.setData({
    //   distance: distance,
    //   scale: newScale,
    //   scaleWidth: '100%',
    //   scaleHeight: '100%',
    //   diff: distanceDiff
    // })
  },
  changeWidth: function (e) {
    let that=this;
    let value=e.detail.value
    if (parseFloat(value) == NaN || value < 0) {
      return 0;
    }
    this.setData({
      widthContainer: parseFloat(value),
    });
    this.setData({
      "heightPupil[0][1]":
        (10 / 7) *
        (0.42 - this.data.X1 / app.globalData.Width) *
        this.data.widthContainer,
      "heightPupil[1][1]":
        (10 / 7) *
        (this.data.X2 / app.globalData.Width - 0.42) *
        this.data.widthContainer,
    });
    this.setData({
      "eyeDistance[1]": parseFloat(
        Math.abs(this.data.heightPupil[1][1] - this.data.heightPupil[0][1])
      ),
    });
    // this.setData({
    //   tableContent:[this.data.heightPupil[1].toFixed(2),this.data.heightPupil_1[1].toFixed(2),this.data.eyeDistance[1].toFixed(2)]
    // })
    wx.createSelectorQuery()
      .select("#ruler_")
      .fields({
        size: true,
        node: true,
      })
      .exec((res) => {
        let canvas = res[0].node;
        canvas.width = res[0].width;
        canvas.height = res[0].height;
        that.onDrawRuler_(
          canvas.getContext("2d"),
          this.data.areaWidth/2,
          this.data.areaWidth,
          this.data.areaWidth / this.data.widthContainer,
          50,
          60,
          true
        );
      });
  },
  onDrawRuler_: function (
    context,
    start,
    end,
    onemm,
    lineStart,
    lineEnd,
    isLeft
  ) {
    var conunt = 0;
    var textPx = isLeft ? lineEnd + 3 : lineStart - 10;
    for (var i = start; i < end; i += onemm) {
      var temp = 0;
      if (conunt % 10 == 0) {
        temp += 10;
        var tempTextPx = isLeft ? textPx + temp + 10 : textPx - temp;
        context.fillText(conunt / 10, i, tempTextPx);
      } else if (conunt % 5 == 0) {
        temp += 5;
      }
      var tempLineStart = isLeft ? lineStart : lineStart - temp;
      var tempLineEnd = isLeft ? lineEnd + temp : lineEnd;
      context.fontSize=10;
      context.moveTo(i, tempLineStart);
      context.lineTo(i, tempLineEnd);
      context.stroke();
      conunt++;
    }
    conunt = 0;
    for (var i = start; i > 2 * start - end; i -= onemm) {
      var temp = 0;
      if (conunt % 10 == 0) {
        temp += 10;
        var tempTextPx = isLeft ? textPx + temp + 10 : textPx - temp;
        context.fillText(conunt / 10, i, tempTextPx);
      } else if (conunt % 5 == 0) {
        temp += 5;
      }
      var tempLineStart = isLeft ? lineStart : lineStart - temp;
      var tempLineEnd = isLeft ? lineEnd + temp : lineEnd;
      context.fontSize=10;
      context.moveTo(i, tempLineStart);
      context.lineTo(i, tempLineEnd);
      context.stroke();
      conunt++;
    }
  },
  location() {
    this.setData({
      isHidden: !this.data.isHidden,
      "isRun[0]": true,
    });
    if (!this.data.change[0]) {
      this.setData({
        tableData: this.data.temp[0],
      });
    }
    if (!this.data.isHidden) {
      this.setData({
        isDisappear: !this.data.change[0],
      });
    } else {
      this.setData({
        isDisappear: !this.data.change[1],
      });
    }
  },
  onSave() {
    if (!this.data.isHidden) {
      this.setData({
        "temp[0]": this.data.tableData,
        "change[0]": !this.data.change[0],
      });
      this.setData({
        isDisappear: !this.data.change[0],
      });
    } else {
      this.setData({
        "temp[1]": this.data.tableContent,
        "change[1]": !this.data.change[1],
      });
      this.setData({
        isDisappear: !this.data.change[1],
      });
    }
  },
  //画瞳点
  drawCrossLine() {
    let eyePupil = [
      this.data.eyePupil[0] - this.data.biasValue[0],
      this.data.eyePupil[1] - this.data.biasValue[1],
      this.data.eyePupil[2] - this.data.biasValue[0],
      this.data.eyePupil[3] - this.data.biasValue[1],
    ];
    const query = wx.createSelectorQuery();
    query
      .select("#eyePupuil")
      .fields({
        node: true,
        size: true,
      })
      .exec((res) => {
        let canvas = res[0].node;
        let ctx = canvas.getContext("2d");
        let r = 10;

        ctx.clearRect(0, 0, res[0].width / 2 - 1, res[0].height);
        ctx.clearRect(res[0].width / 2 + 1, 0, res[0].width, res[0].height);
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        if (this.data.biasValue[2] == 1) {
          eyePupil[0] = this.data.eyePupil[0];
          eyePupil[1] = this.data.eyePupil[1];
        } else if (this.data.biasValue[2] == 0) {
          eyePupil[3] = this.data.eyePupil[3];
          eyePupil[2] = this.data.eyePupil[2];
        }
        this.data.eyePupil = eyePupil;
        ctx.beginPath();
        ctx.moveTo(eyePupil[0], eyePupil[1] - r);
        ctx.lineTo(eyePupil[0], eyePupil[1] + r);
        ctx.moveTo(eyePupil[0] - r, eyePupil[1]);
        ctx.lineTo(eyePupil[0] + r, eyePupil[1]);
        ctx.stroke();
        ctx.arc(eyePupil[0], eyePupil[1], r / 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(eyePupil[2], eyePupil[3] - r);
        ctx.lineTo(eyePupil[2], eyePupil[3] + r);
        ctx.moveTo(eyePupil[2] - r, eyePupil[3]);
        ctx.lineTo(eyePupil[2] + r, eyePupil[3]);
        ctx.stroke();
        ctx.arc(eyePupil[2], eyePupil[3], r / 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      });
  },
  drawEyePupil() {
    const query = wx.createSelectorQuery();
    query
      .select("#eyePupuil")
      .fields({
        node: true,
        size: true,
      })
      .exec((res) => {
        let canvas = res[0].node;
        let ctx = canvas.getContext("2d");
        let dpr = wx.getSystemInfoSync().pixelRatio;
        let img = canvas.createImage();

        canvas.width = this.data.baseWidth * dpr;
        canvas.height = this.data.baseHeight * dpr;
        ctx.scale(dpr, dpr);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        img.onload = () => {
          ctx.drawImage(img, 0, 0, this.data.baseWidth, this.data.baseHeight);
        };
        img.src = this.data.tempFilePaths[0];
      });
  },
  rotateImg: function (e) {
    this.setData({
      rotate: e.detail.value,
    });
  },

  touchStart: function (e) {
    this.setData({
      "isRun[1]": false,
    });
  },
  touchMove: function (e) {
    if (e.currentTarget.dataset.id == "left") {
      this.computerPosition(e, 0);
    } else {
      this.computerPosition(e, 1);
    }
  },
  touchEnd: function (e) {
    let x = e.changedTouches[0].pageX;
    let y = e.changedTouches[0].pageY;
    this.setData({
      "isRun[1]": true,
      X1: x,
      Y1: y,
    });
  },

  onClick: function (e) {
    let id = e.currentTarget.dataset.id;
    let newScale;
    let scaleWidth;
    let scaleHeight;
    let that = this;
    this.data.index = id;
    switch (id) {
      case "1":
        this.setData({
          "isRun[0]": !this.data.isRun[0],
        });
        if (!this.data.isRun[0]) {
          wx.showToast({
            title: "已固定",
            icon: "none",
            duration: 1000,
          });
        } else {
          wx.showToast({
            title: "解除固定",
            icon: "none",
            duration: 1000,
          });
          const query = wx.createSelectorQuery();
          query
            .select("#eyePupuil")
            .fields({
              node: true,
              size: true,
            })
            .exec((res) => {
              let canvas = res[0].node;
              let ctx = canvas.getContext("2d");
              ctx.clearRect(0, 0, res[0].width / 2 - 1, res[0].height);
              ctx.clearRect(
                res[0].width / 2 + 1,
                0,
                res[0].width,
                res[0].height
              );
            });
        }
        break;
      case "2":
        wx.chooseImage({
          count: 1, // 默认9
          // mediaType: ["image"],
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            that.setData({
              // "tempFilePaths[0]": res.tempFiles[0].tempFilePath,
              "tempFilePaths[1]": res.tempFilePaths[0],
            });
            // that.drawEyePupil();
            // that.upload(res.tempFiles[0].tempFilePath);
          },
        });
        break;
      case "3":
        if (this.data.isRun[0]) {
          newScale = this.data.scale + 0.05;
          // 为了防止缩放得太大，所以scale需要限制，同理最小值也是
          scaleWidth = newScale * this.data.baseWidth + "px";
          scaleHeight = newScale * this.data.baseHeight + "px";
          this.setData({
            scale: newScale,
            scaleWidth: scaleWidth,
            scaleHeight: scaleHeight,
          });
        }
        break;
      case "4":
        if (this.data.isRun[0]) {
          newScale = this.data.scale - 0.05;
          // 为了防止缩放得太大，所以scale需要限制，同理最小值也是
          scaleWidth = newScale * this.data.baseWidth + "px";
          scaleHeight = newScale * this.data.baseHeight + "px";
          this.setData({
            scale: newScale,
            scaleWidth: scaleWidth,
            scaleHeight: scaleHeight,
          });
        }
        break;
      default:
    }
  },
  onDrawPoint() {
    if (this.data.isRun[0]) {
      wx.showToast({
        title: "请先固定再进行定位",
        icon: "none",
        duration: 1000,
      });
      return;
    }
    this.drawCrossLine();
    //

    // let that = this;
    // const query = wx.createSelectorQuery();
    // query
    //   .select("#eyePupuil")
    //   .fields({
    //     node: true,
    //     size: true,
    //   })
    //   .exec((res) => {
    //     let canvas = res[0].node;
    //     let ctx = canvas.getContext("2d");
    //     let dpr = wx.getSystemInfoSync().pixelRatio;

    //     wx.canvasToTempFilePath({
    //       fileType: "jpg",
    //       x: 0,
    //       y: 0,
    //       width: this.data.baseWidth * dpr,
    //       height: this.data.baseHeight * dpr,
    //       destWidth: this.data.baseWidth,
    //       destHeight: this.data.baseHeight,
    //       canvas: canvas,
    //       success: function (res) {
    //         that.setData({
    //           "tempFilePaths[1]": res.tempFilePath,
    //         });
    //       },
    //     });
    //   });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDomInfo(".moveArea2");
    this.getDomInfo(".moveArea1");
    let query = wx.createSelectorQuery();
    query.select(".moveArea2").fields({
      size: true,
    });
    query.select(".imgContainer").fields({
        size: true,
      });
    query.select(".moveArea1").fields({
        size: true,
    });
    query.select(".imgContainer_").fields({
      size: true,
    }).exec((res) => {
        this.data.areaHeight = res[0].height - res[1].height;
        this.data.areaWidth = res[2].width - res[3].width;
      });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.data.navBarHeight = app.globalData.navBarHeight;
    wx.showToast({
      title: "通过在左上角输入值,利用绿色校准线来求出瞳高和瞳距",
      icon: "none",
      duration: 2000,
    });
    let temp = [];
    let that = this;
    let size;
    let query = wx.createSelectorQuery();
    query
      .select("#eyePupuil")
      .fields({
        size: true,
        node: true,
      })
      .exec((res) => {
        size = res[0];
        temp = temp.concat(
          size.width * (1 / 2 - 1 / 6),
          (size.height * 1) / 3,
          size.width * (1 / 2 + 1 / 6),
          (size.height * 1) / 3
        );
        that.data.eyePupil = temp;
        let dpr = wx.getSystemInfoSync().pixelRatio;
        let canvas = res[0].node;
        let ctx = canvas.getContext("2d");
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.moveTo(res[0].width / 2, 0);
        ctx.lineTo(res[0].width / 2, res[0].height);
        ctx.stroke();
      });
  },
  onDrawRuler: function (
    context,
    start,
    end,
    onemm,
    lineStart,
    lineEnd,
    isLeft
  ) {
    var conunt = 0;
    var textPx = isLeft ? lineEnd + 3 : lineStart - 10;
    context.fontSize = 10;
    for (var i = start - 5; i < end; i += onemm) {
      var temp = 0;
      if (conunt % 10 == 0) {
        temp += 10;
        var tempTextPx = isLeft ? textPx + temp : textPx - temp;
        context.fillText(conunt / 10, tempTextPx, end - i);
      } else if (conunt % 5 == 0) {
        temp += 5;
      }
      var tempLineStart = isLeft ? lineStart : lineStart - temp;
      var tempLineEnd = isLeft ? lineEnd + temp : lineEnd;
      context.moveTo(tempLineStart, end - i);
      context.lineTo(tempLineEnd, end - i);
      context.stroke();
      conunt++;
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
