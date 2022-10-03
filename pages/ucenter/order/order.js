const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');

Page({
  data:{
    orderList: [],
    loading: true
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.getOrderList();
  },
  async getOrderList(){
    const order = await util.request(api.OrderList);
    const data = await Promise.all(order.data.data.map(async e => {
      const goods = await this.getGoodsInfo(e.goodsId);
      e.goods = goods.data;
      return e;
    }));
    this.setData({
      orderList: data,
      loading:false
    });
  },
  async getGoodsInfo(id) {
    return await util.request(api.GoodsList + '/' + id);
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})