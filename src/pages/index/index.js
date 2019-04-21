import wxapi from 'babyfs-wxapp-api';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startX: 0,
    startY: 0
  },

  customData: {
    canvasCtx: null
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  async onReady(e) {
    await this.compound(0, 0);
    // this.store(true);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.customData['canvasCtx'] = wx.createCanvasContext('ocanvas');
  },

  /**
   * @func 合成图片
   * @param {*} x 自定义图x轴
   * @param {*} y 自定义图y轴
   */
  async compound(x, y) {
    let imageInfoArray = [];
    const _this = this;
    const ctx = this.customData.canvasCtx;
    const srcArray = ['http://ppbd7ianm.bkt.clouddn.com/post_02.jpg', 'http://ppbd7ianm.bkt.clouddn.com/tom_01.jpeg'];
    const priomises = srcArray.map(async (url, index) => {
      let r = await wxapi.getImageInfo({ src: url });
      imageInfoArray[index] = r;
    });
    await Promise.all(priomises);

    ctx.drawImage(imageInfoArray[0].path, 0, 0, 300, 400); // 底图
    ctx.drawImage(imageInfoArray[1].path, x, y, 100, 100); // 自定义图
    ctx.setFontSize(20);
    ctx.fillText('hello world', 100, 20);
    ctx.draw(true, () => {
      wx.canvasToTempFilePath({
        // x: 0,
        // y: 0,
        // width: 300,
        // height: 400,
        destWidth: 375,
        destHeight: 400,
        canvasId: 'ocanvas',
        success(res) {
          console.log(res);
          // _this.store(res.tempFilePath);
        }
      });
    });
  },

  store(path) {
    // 保存图片到本地相册
    wx.saveImageToPhotosAlbum({
      filePath: path,
      success(res) {
        console.log(res);
      }
    });
  },

  tsHandler(e) {
    this.setData({
      startX: e.touches[0].pageX,
      startY: e.touches[0].pageY
    });
  },

  tmHandler(e) {
    console.log(e);
    // let duX = e.touches[0].pageX - this.data.startX;
    // let duY = e.touches[0].pageX - this.data.startY;
    // console.log(duX);
    // console.log(duY);
  },

  teHandler(e) {

  }
});
