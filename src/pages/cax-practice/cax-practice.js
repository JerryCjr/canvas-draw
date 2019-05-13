import cax from '../../components/cax/src/index.js';

Page({
  data: {
    path: ''
  },
  async onLoad() {
    const info = wx.getSystemInfoSync();
    const stage = new cax.Stage(info.windowWidth, info.windowHeight / 2, 'ocanvas', this);

    const rect = new cax.Rect(100, 100, {
      fillStyle: 'black'
    });

    rect.originX = 0;
    rect.originY = 0;
    rect.x = 0;
    rect.y = 0;

    rect.on('touchstart', () => {
      // console.log('rect touchstart')
    });

    rect.on('touchmove', () => {
      // console.log('rect touchmove')
    });

    rect.on('touchend', () => {
      // console.log('rect touchend')
    });

    rect.on('tap', () => {
      // console.log('rect tap')
    });

    rect.on('drag', (evt) => {
      evt.target.x += evt.dx;
      evt.target.y += evt.dy;
      stage.update();
    });

    // const bitmap = new cax.Bitmap('../../images/local/tom_01.jpg');
    // bitmap.rect = [0, 0, 640, 640];
    // bitmap.x = 0;
    // bitmap.y = 0;
    // bitmap.scale = 0.1;
    // bitmap.cursor = 'pointer';
    // bitmap.on('drag', (evt) => {
    //   evt.target.x += evt.dx;
    //   evt.target.y += evt.dy;
    //   stage.update();
    // });

    stage.add(rect);
    // stage.add(bitmap);
    stage.update();
  }
});
