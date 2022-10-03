const ApiRootUrl = 'http://192.168.0.108:3000/api/';

module.exports = {
    ApiRootUrl,
    IndexUrl: ApiRootUrl + 'banners', //首页数据接口
    CatalogList: ApiRootUrl + 'channels',  // 歌曲分类数据接口
    AuthLoginByWeixin: ApiRootUrl + 'auth/wx/login', //微信登录
    GoodsList: ApiRootUrl + 'goods',  //获得商品列表
    OrderSubmit: ApiRootUrl + 'orders', // 提交订单
    OrderList: ApiRootUrl + 'orders',  //订单列表
};