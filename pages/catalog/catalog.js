const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({
  data: {
    navList: [],
    categoryList: [],
    currentCategory: {},
    goods: [],
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    loading: true
  },
  onLoad: function () {
    this.getCatalog();
  },
  getCatalog: function () {
    //CatalogList
    // wx.showLoading({
    //   title: '加载中...',
    // });
    util.request(api.CatalogList)
      .then( (res) => {
        this.setData({
          navList: res.data,
          currentCategory: res.data[0]
        });
        // wx.hideLoading();
    })
    .then(() => {
      this.getGoods(this.data.currentCategory.id)
    })
  },
  getCurrentCategory: function (id) {
    this.setData({
      currentCategory: this.data.navList[id - 1]
    });
  },
  getGoods(id) {
    util.request(api.GoodsList + '?channelId=' + id).then((res) => {
      this.setData({
        goods: res.data,
        loading: false
      });
    });
  },
  goGoodsDetail(event) {
    const data = event.currentTarget.dataset.data;
    console.log(data)
    wx.navigateTo({
      url: '../goods/goods?data=' + data
    });
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
  switchCate: function (event) {
    if (this.data.currentCategory.id == event.currentTarget.dataset.id) {
      return false;
    }
    this.getCurrentCategory(event.currentTarget.dataset.id);
    this.getGoods(event.currentTarget.dataset.id)
  }
})