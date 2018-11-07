// client/pages/comment/comment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    preview: false, // 是否是预览界面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let commentType = options.commentType 
    let preview = !!options.preview  // boolean化
    let id = options.id
    let image = options.image
    let title = options.title
    let comment_words = options.comment_words

    if (preview) {
      this.setData({
        preview,
        commentType,
        movie: {
          id,
          title,
          image
        },
        comment_words,
        userInfo: app.data.userInfo,
      })
      wx.setNavigationBarTitle({
        title: '评论预览',
      })
    }
  },

  /**
   * 发布影评
   */
  postComment: function() {
    let comment_type = this.data.commentType
    let movie = this.data.movie.id
    let comment_words = this.data.comment_words

    qcloud.request({
      url: config.service.postComment,
      login: true,
      method: 'POST',
      data: {
        comment_type,
        movie,
        comment_words
      },
      success: result => {
        let data = result.data
        if (!data.code) {
          wx.showToast({
            title: '发布成功!',
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/comment_list/comment_list?movie=' + movie,
            })
          }, 2000)
        } else {
          wx.showToast({
            title: '发布失败！',
            icon: 'none'
          })
        }
      },
      fail: result => {
        console.log(result)
        wx.showToast({
          title: '发布失败！',
          icon: 'none'
        })
      }
    })
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
    // 这个是 DEBUG 用的
    // setTimeout(() => {
    //   this.setData({
    //     userInfo: app.data.userInfo
    //   })
    //   console.log(this.data.userInfo)
    // }, 1000)
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