// client/pages/comment_list/comment_list.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
  },

  getCommentList(movie) {
    wx.showLoading({
      title: '获取列表',
    })
    qcloud.request({
      url: config.service.getComment + `?movie=${movie}`,
      success: result => {
        wx.hideLoading()
        let data = result.data
        if (!data.code) {
          this.setData({
            comments: data.data
          })
          // console.log(this.data.comments)
        } else {
          wx.showToast({
            title: '获取列表失败',
            icon: 'none'
          })
          console.log(result)
        }
      },
      fail: result => {
        wx.hideLoading()
        wx.showToast({
          title: '获取列表失败',
          icon: "none"
        })
        console.log(result)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movie: options.movie
    })
    this.getCommentList(options.movie)
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
    this.getCommentList(this.data.movie)
    wx.stopPullDownRefresh()
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