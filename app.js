const api = require('./config/api.js');

App({
  onLaunch: function () {
    const cacheManager = wx.createCacheManager({
      origin: api.ApiRootUrl,
    })
    
    cacheManager.addRules([
      '/channels',
      '/goods',
    ])
    cacheManager.on('enterWeakNetwork', () => {
      console.log('enterWeakNetwork')
    })
    cacheManager.on('exitWeakNetwork', () => {
      console.log('exitWeakNetwork')
    })
    cacheManager.on('request', evt => {
      return new Promise((resolve, reject) => {
        const matchRes = cacheManager.match(evt)
        if (matchRes) {
          resolve(matchRes.data || null)
        } else {
          reject({errMsg: `catch not found: ${evt.url}`})
        }
      })
    })
    try {
      this.globalData.userInfo = wx.getStorageSync('userInfo');
      this.globalData.token = wx.getStorageSync('token');
    } catch (e) {
      console.log(e);
    }
  },

  globalData: {
    userInfo: {
      nickname: '点击登录',
      avatar: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    },
    token: '',
  }
})