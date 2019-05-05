import wapi from 'babyfs-wxapp-api';
import compoundFunc from '../../util/compound.js';
const {
  UTYPE,
  compound
} = {
  ...compoundFunc
};
Page({
  data: {
    path: ''
  },
  customData: {
    options: [],
    config: null
  },
  async onReady() {
    await wapi.showLoadingAsync({
      title: '生成图片...'
    });
    const len = 100;
    for (let index = 0; index < len; index++) {
      this.customData.options.push({
        type: UTYPE['IMG'],
        x: 0 + index,
        y: 0,
        width: 100,
        height: 80,
        path: 'http://i.s.babyfs.cn/cb92c6f026d047078f5e16ba23692db8.jpg'
      });
    }
    for (let index = 0; index < len; index++) {
      this.customData.options.push({
        type: UTYPE['IMG'],
        x: 0 + index,
        y: 80,
        width: 100,
        height: 80,
        path: 'http://i.s.babyfs.cn/cb92c6f026d047078f5e16ba23692db8.jpg'
      });
    }
    for (let index = 0; index < len; index++) {
      this.customData.options.push({
        type: UTYPE['IMG'],
        x: 0 + index,
        y: 160,
        width: 100,
        height: 80,
        path: 'http://i.s.babyfs.cn/cb92c6f026d047078f5e16ba23692db8.jpg'
      });
    }
    for (let index = 0; index < len; index++) {
      this.customData.options.push({
        type: UTYPE['TEXT'],
        x: 0,
        y: 300,
        text: `TEST ${index === len - 1 ? index : ''}`,
        color: '#098fe1',
        textAlign: 'left',
        fontSize: 20,
        font: 'italic normal 700 24px/3 courier'
      });
    }
    this.customData.config = {
      reserve: true,
      // x: 0,
      // y: 0,
      destWidth: 750,
      destHeight: 1334,
      fileType: 'jpg',
      quality: 1
    };
    await this.draw();
    wapi.hideLoading();
  },
  // 绘制
  async draw() {
    let response;
    try {
      response = await compound('ocanvas', this.customData.options, this.customData.config);
    } catch (error) {
      console.log(error);
    }
    if (response.errMsg === 'canvasToTempFilePath:ok') {
      this.setData({
        path: response.tempFilePath
      });
    }
  },
  // 保存到本地
  async store() {
    const path = this.data.path;
    let r;
    if (path) {
      console.log('store');
      try {
        r = await wapi.saveImageToPhotosAlbumAsync({
          filePath: path
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (r) {
      console.log(r);
    }
  },
  // 从本地相册选择
  async choose() {
    let r;
    try {
      r = await wapi.chooseImageAsync({
        count: 1
      });
    } catch (error) {
      console.log(error);
    }
    if (r && r.tempFilePaths) {
      this.customData.options[0] = {
        type: UTYPE['IMG'],
        x: 0,
        y: 0,
        width: 220,
        height: 389,
        path: r.tempFilePaths[0]
      };
    }
  }
});
