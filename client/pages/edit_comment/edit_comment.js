// client/pages/edit_comment/edit_comment.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasContent: false,
    style: '',
  },

  onTouchStartRecord: function(event) {
    this.setData({
      style: 'border: 5rpx solid #00bd00;position: relative;top: -1rpx;'
    })
    let recorderManager = wx.getRecorderManager()
    recorderManager.start({
      duration: 120000,  // 最长2min
    })
    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    recorderManager.onStop((res) => {
      if(res.duration > 120000) {
        wx.showToast({
          title: '最长只能120s哦~',
          icon: 'none'
        })
      }
      console.log('recorder stop', res)
      let { tempFilePath } = res
    })
  },

  onTouchEndRecord: function(event) {
    this.setData({
      style: ''
    })
    let recorderManager = wx.getRecorderManager()
    recorderManager.stop()
  },

  onBlur: function(event) {
    if(event.detail.value) {
      this.setData({
        hasContent: true
      })
    } else {
      this.setData({
        hasContent: false
      })
    }
  },

  onSubmit: function(event) {
    // 若没有评论内容则返回
    let hasContent = this.data.hasContent
    if (!hasContent) return

    let commentType = this.data.commentType
    if (commentType === '0') {
      let comment_words = event.detail.value.comment_words
      let movie = this.data.movie
      // 跳转到预览页面
      wx.navigateTo({
        url: `/pages/comment/comment?commentType=${commentType}&preview=true&id=${movie.id}&image=${movie.image}&title=${movie.title}&comment_words=${comment_words}`,
      })
    } else {
      // 处理音频文件
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    let image = options.image
    let title = options.title
    let commentType = options.commentType  // 0 为文字，1 为音频
    this.setData({
      commentType,
      movie: {
        id,
        title,
        image
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