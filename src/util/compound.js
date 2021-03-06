import wapi from 'babyfs-wxapp-api';

const IMG = Symbol('IMG');
const TEXT = Symbol('TEXT');

// 支持合成图片 文本 二维码
const UTYPE = {
  IMG,
  TEXT
};

/**
 * @description 获取canvas上下文
 * @param {String} canvasId required
 * @returns canvas ctx
 */
function getInstance(canvasId) {
  if (!canvasId) {
    throw new Error('canvasid is required');
  }
  return wapi.createCanvasContext(canvasId);
};

// 合成图片
const _drawImg = async function ({
  path,
  x = 0,
  y = 0,
  width = 256,
  height = 256
}) {
  if (!path) return;
  let r;
  try {
    r = await wapi.getImageInfoAsync({
      src: path
    });
  } catch (error) {
    throw new Error(error);
  }
  if (r) {
    this.drawImage(r.path, x, y, width, height);
  }
};

/**
 * @function 生成文字
 * @param {string} argv.text 在画布上输出的文本
 * @param {number} argv.x 文字的左上角在目标canvas上x轴的位置
 * @param {number} argv.y 文字的左上角在目标canvas上y轴的位置
 * @param {string} argv.color 绘制的颜色 默认黑色, 可选
 * @param {number} argv.font  当前字体样式的属性 符合CSS font 语法的DOMString字符串 至少需要提供字体大小和字体族名 可选 https://developer.mozilla.org/zh-CN/docs/Web/CSS/font
 * @param {number} argv.fontSize 绘制的字体大小 默认14 可选
 * @param {string} argv.textAlign 绘制的文字的对齐方式 默认left 合法值为: left center right 可选
 * @param {string} argv.textBaseline 绘制的文字的竖直对齐方式 默认normal 合法值为: top bottom middle normal
 * @param {number} argv.maxWidth 需要绘制的最大宽度，-1会隐藏 可选
 * @param {number} argv.maxLength 需要绘制的最大长度， 可选
 */
const _drawText = async function ({
  text,
  x,
  y,
  color = '#000000',
  font = '10px sans-serif',
  fontSize = 10,
  textAlign = 'left',
  textBaseline = 'normal',
  maxWidth,
  maxLength
}) {
  if (!text) return;

  if (Number(maxLength) && String(text).length > Number(maxLength)) {
    console.log('最大长度限制溢出截断');
    text = text.slice(0, Number(maxLength));
  }

  // font fillStyle api版本兼容
  // >= 1.9.90
  this.fillStyle = color;
  this.font = font;
  // < 1.9.90
  // this.setFillStyle(String(color));
  // this.setFontSize(Number(fontSize));

  this.setTextAlign(textAlign);
  this.setTextBaseline(textBaseline);

  if (Number(maxWidth)) {
    this.fillText(String(text), x, y, Number(maxWidth));
  } else {
    this.fillText(String(text), x, y, null);
  }
};

/**
 * @function 绘制 canvas.draw() 支持传入回调
 * @param {*} canvasId canvasid
 * @param {*} argv canvasToTempFilePath: https://developers.weixin.qq.com/miniprogram/dev/api/wx.canvasToTempFilePath.html
 */
const _draw = async function (canvasId = '', argv = {}) {
  return new Promise((resolve, reject) => {
    this.draw(Boolean(argv['reserve']), async () => {
      let r;
      try {
        r = await wapi.canvasToTempFilePathAsync({
          ...argv,
          canvasId
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
      if (r) {
        resolve(r);
      }
    });
  });
};

/**
 * @function 自定义合成
 * @param {string} canvasId canvasId
 * @param {array} options 合成选项配置 元素的先后顺序决定了层级顺序
 * @param {Object} config 绘制成功的配置信息
 */
const compound = async function (canvasId, options, config) {
  const ctx = getInstance(canvasId);
  for (let index = 0; index < options.length; index++) {
    const element = options[index];
    switch (element.type) {
      case UTYPE['TEXT']:
        await _drawText.call(ctx, element);
        break;
      default:
        await _drawImg.call(ctx, element);
        break;
    }
  }
  let r = await _draw.call(ctx, canvasId, config);
  return Promise.resolve(r);
};

export default {
  compound,
  UTYPE
};
