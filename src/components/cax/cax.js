import cax from './index';
import wapi from 'babyfs-wxapp-api';
import compoundFunc from '../../util/compound.js';

const {
  UTYPE,
  compound
} = {
  ...compoundFunc
};
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    option: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    width: 0,
    height: 0,
    id: 'caxCanvas' + cax.caxCanvasId++,
    index: cax.caxCanvasId - 1,
    options: [],
    config: null
  },

  async ready() {
    await wapi.showLoadingAsync({
      title: '生成图片...'
    });
    this.data.options.push({
      type: UTYPE['IMG'],
      x: 0,
      y: 0,
      width: 100,
      height: 80,
      path: 'http://i.s.babyfs.cn/cb92c6f026d047078f5e16ba23692db8.jpg'
    });
    this.data.config = {
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

  /**
   * 组件的方法列表
   */
  methods: {

    getCaxCanvasId: function () {
      return this.data.id;
    },

    touchStart: function (evt) {
      this.stage.touchStartHandler(evt);
      this.stage.touchStart && this.stage.touchStart(evt);
    },

    touchMove: function (evt) {
      this.stage.touchMoveHandler(evt);
      this.stage.touchMove && this.stage.touchMove(evt);
    },

    touchEnd: function (evt) {
      this.stage.touchEndHandler(evt);
      this.stage.touchEnd && this.stage.touchEnd(evt);
    },

    drag(evt) {
      this.stage.dragHandler(evt);
      this.stage.drag && this.stage.drag(evt);
    },

    // 绘制
    async draw() {
      let response;
      try {
        response = await compound({
          canvasId: 'ocanvas',
          this: this.selectComponent('#ocanvas')
        }, this.data.options, this.data.config);
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
        this.data.options[0] = {
          type: UTYPE['IMG'],
          x: 0,
          y: 0,
          width: 220,
          height: 389,
          path: r.tempFilePaths[0]
        };
      }
    }
  }
});
