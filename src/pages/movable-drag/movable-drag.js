Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '../../images/mine-default.png',
    x: 150,
    y: 200
  },

  customData: {
    touchBase: null, // touch x y
    movableBase: null, // moveView x y
    backView: null, // 底部视图左边信息 此处业务: 为系统默认海报图
    cusView: null, // custom view
    doubleTouchesTimeStamp: 0,
    lastStamp: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() { },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 获取backView的坐标信息
    const _this = this;
    const query = wx.createSelectorQuery();
    query.select('.back-view').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
      const info = res[0];
      _this.customData.backView = {
        x: info.width,
        y: info.height,
        left: info.left,
        top: info.top
      };
      console.log('backView: ', _this.customData.backView);
    });
  },

  ts(e) {
    // console.log(e);
    const touches = e.touches;
    this.customData.lastStamp = e.timeStamp;
    if (touches.length && touches.length === 1) {
      const cur = touches[0];
      this.customData.touchBase = {
        x: cur.clientX,
        y: cur.clientY
      };
      this.customData.movableBase = {
        x: this.data.x,
        y: this.data.y
      };
      console.log(this.customData);
    }
  },

  tm(e) {
    // console.log(e);
    if (!e.touches || !e.touches.length) return false;

    if (e.timeStamp - this.customData.lastStamp <= 100) {
      return;
    };
    this.customData.lastStamp = e.timeStamp;
    const touches = e.touches;

    // 多指
    if (touches.length > 1) {
      this.customData.doubleTouchesTimeStamp = e.timeStamp;
    } else {
      // 单指
      if (e.timeStamp - this.customData.doubleTouchesTimeStamp <= 100) {
        // 边缘案例
        return false;
      }
      const cur = touches[0];
      const durationX = parseInt(cur.clientX - this.customData.touchBase.x);
      const durationY = parseInt(cur.clientY - this.customData.touchBase.y);

      let computedX = this.customData.movableBase.x + durationX;
      let computedY = this.customData.movableBase.y + durationY;

      // 边界
      if (computedX < 0) {
        computedX = 0;
      }

      if (computedX > this.customData.backView.x) {
        computedX = this.customData.backView.x;
      }

      if (computedY < 0) {
        computedY = 0;
      }

      if (computedY > this.customData.backView.y) {
        computedY = this.customData.backView.y;
      }

      this.setData({
        x: parseInt(computedX),
        y: parseInt(computedY)
      });

      console.log('duration: ', durationX, durationY);
      console.log('coordinate: ', this.data.x, this.data.y);
    }
  },

  te(e) {
    // 获取backView的坐标信息
    const _this = this;
    const query = wx.createSelectorQuery();
    query.select('.cus-view').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
      const info = res[0];
      _this.customData.cusView = {
        x: info.width,
        y: info.height,
        left: info.left - _this.customData.backView.left,
        top: info.top - _this.customData.backView.top
      };
      console.log('cusView: ', _this.customData.cusView);
    });
  },

  scaleHandler(e) {
    console.log(e);
  },

  changeHandler(e) {
    // console.log(e);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.customData = {
      touchBase: null,
      movableBase: null,
      backView: null,
      cusView: null,
      doubleTouchesTimeStamp: 0
    };
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
});
