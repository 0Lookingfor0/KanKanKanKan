// client/pages/user/user.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config')
const app = getApp()

const UNPROMPTED = 0
const UNAUTHORIZED = 1
const AUTHORIZED = 2

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 为何此处获取的数据，如果没有onShow中的函数， console.log(this.data) 就没有userInfo?
    locationAuthType: app.data.locationAuthType,
    userInfo: app.data.userInfo,
    navBack: null,
  },

  // 点击登录
  onTapLogin() {
    wx.showLoading({
      title: '正在登录',
    })
    app.login({
      success: () => {
        wx.hideLoading()
        if(this.data.navBack) {
          setTimeout(() => {
            wx.navigateBack()
          }, 1000)
        } else {
          this.setData({
            userInfo: app.data.userInfo,
            locationAuthType: app.data.locationAuthType
          })
          wx.showToast({
            title: '登录成功',
          })
        }
      },
      error: () => {
        wx.hideLoading()
        this.setData({
          locationAuthType: app.data.locationAuthType
        })
        wx.showToast({
          title: '登录失败',
          icon: 'none',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 是否需要跳转回原来页面
    let navBack = options.navBack
    if(navBack) {
      this.setData({
        navBack
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(this.data)
    // console.log(app.data)
    this.setData({
      // userInfo: app.data.userInfo,
      locationAuthType: app.data.locationAuthType
    })
    app.checkSession({
      success: ({ userInfo }) => {
        this.setData({
          userInfo
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})