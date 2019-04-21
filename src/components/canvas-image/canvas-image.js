import wapi from 'babyfs-wxapp-api';

const device = wx.getSystemInfoSync();
Component({

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  behaviors: [],

  properties: {
    configuration: {
      type: Object, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: {
        width: device.windowWidth,
        height: device.windowHeight,
        array: []
      }, // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        // console.log(newVal);
        // console.log(oldVal);
      }
    }
  },
  data: {}, // 私有数据，可用于模板渲染

  // 生命周期函数
  created() {},
  attached() {},
  ready() {
    const ctx = wx.createCanvasContext('ocanvas');
    console.log(this);
    let target = this.properties.configuration;
    console.log(this.properties.configuration);
    ctx.draw();
  },
  moved() {},
  detached() {},

  methods: {
    onMyButtonTap() {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      });
    },
    // 内部方法建议以下划线开头
    _myPrivateMethod() {
      // 这里将 data.A[0].B 设为 'myPrivateData'
      this.setData({
        'A[0].B': 'myPrivateData'
      });
    },
    _propertyChange(newVal, oldVal) {

    },
    _canvasIdErrorCallback(e) {
      console.error(e.detail.errMsg);
    }
  }

});
