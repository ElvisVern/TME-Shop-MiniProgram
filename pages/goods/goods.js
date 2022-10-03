const app = getApp();
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({
  data: {
    goods: {},
    coverList: [],
    priceList: [],
    priceValue: null,
  },
  getGoodsInfo: function (id) {
    util.request(api.GoodsList + '/' + id)
    .then((res) => {
      if (res.statusCode == 200) {
        const prices = res.data.prices.map(e => {
          return {
            ...e,
            value: e.id
          }
        })
        this.setData({
          goods: res.data,
          coverList: [res.data.cover],
          priceList: prices
        });
      }
    });
  },
  radioChange: function (e) {
    this.data.priceValue = e.detail.value;
    const items = this.data.priceList;
    for (let i = 0; i < items.length; ++i) {
      items[i].checked = items[i].value == e.detail.value
    }
    this.setData({
      priceList: items
    });
  },
  handleOrder() {
    if(!this.data.priceValue) {
      util.showErrorToast('请选择套餐')
      return;
    }
    if (!wx.getStorageSync('token')) {
      util.showErrorToast('请先登录！')
      return;
    }
    util.request(api.OrderSubmit, { goodsId: this.data.goods.id, priceId: this.data.priceValue }, 'POST')
      .then((res) => {
        if(res.statusCode == 200) {
          wx.showToast({
            title: '下单成功~',
          }).then(() => {
            this._timer = setTimeout(() => {
              wx.switchTab({
                url: '/pages/catalog/catalog'
              });
            },2000)
          });
        } else {
          util.showErrorToast('下单失败！');
        }
      })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getGoodsInfo(options.data);
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
    clearInterval(this._timer)
  }
})