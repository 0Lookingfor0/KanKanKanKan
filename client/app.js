//app.js
const qcloud = require('./vendor/wafer2-client-sdk/index')
const config = require('./config')

const UNPROMPTED = 0
const UNAUTHORIZED = 1
const AUTHORIZED = 2

App({
  data: {
    locationAuthType: UNPROMPTED,  // 默认未弹窗询问是否授权
  },

  login({ success, error }) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] === false) {
          this.data.locationAuthType = UNAUTHORIZED  // 拒绝授权
          wx.showModal({
            title: '提示',
            content: '请授权我们访问您的用户信息',
            showCancel: false
          })
          error && error()
        } else {
          this.data.locationAuthType = AUTHORIZED
          this.doQcloudLogin({ success, error })
        }
      }
    })
  },

  doQcloudLogin({ success, error }) {
    qcloud.login({
      success: result => {
        if (result) {
          let userInfo = result
          this.data.userInfo = userInfo,          
          success && success({ userInfo })
        } else {
          // 非首次登录不会返回用户信息
          this.getUserInfo({ success, error })
        }
      },
      fail: result => {
        error && error()
      }
    })
  },

  // 获取用户信息
  getUserInfo({ success, error }) {
    qcloud.request({
      url: config.service.requestUrl,
      login: true,
      success: result => {
        let data = result.data
        if (!data.code) {
          let userInfo = data.data
          this.data.userInfo = userInfo,          
          success && success({ userInfo })
        } else {
          error && error()
        }
      },
      fail: result => {
        error && error()
      }
    })
  },

  checkSession({ success, error }) {
    // 检查会话，检测用户是否登录
    wx.checkSession({
      success: () => {
        this.getUserInfo({ success, error })
      },
      fail: () => {
        error && error()
      }
    })
  },


  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)
    this.checkSession({
      success: ({ userInfo }) => {
        // 若用户已登录则将用户信息全局化
        this.data.userInfo = userInfo,
        this.data.locationAuthType = AUTHORIZED
      },
      error: () => {

      }
    })
  },

})