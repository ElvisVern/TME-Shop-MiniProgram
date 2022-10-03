const util = require('../../utils/util.js');
const api = require('../../config/api.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    banner: [],
  },
  onShareAppMessage: function () {
    return {
      title: 'NideShop',
      desc: 'TME曲多多',
      path: '/pages/index/index'
    }
  },

  getIndexData: function () {
    util.request(api.IndexUrl).then((res) => {
      if (res.statusCode == 200) {
        this.setData({
          banner: res.data,
        });
      }
    });
  },
  onLoad: function (options) {
    this.getIndexData();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
})
