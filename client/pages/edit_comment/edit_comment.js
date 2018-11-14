// client/pages/edit_comment/edit_comment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
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
    hasContent: false,
    style: '',
  },

  // checkAuth: function() {
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.record']) {
  //         app.data.authInfo.record = AUTHORIZED
  //         this.setData({
  //           authInfo: app.data.authInfo
  //         })
  //       }
  //     },
  //   })
  // },

  onTouchStartRecord: function(event) {
    this.setData({
      style: 'border: 5rpx solid #00bd00;position: relative;top: -1rpx;'
    })
    let recorderManager = wx.getRecorderManager()
    recorderManager.start({
      duration: 120000,  // 最长2min
      format: 'mp3',
    })
    // recorderManager.onStart(() => {
    //   console.log('recorder start')
    // })
    recorderManager.onStop((res) => {
      if(res.duration >= 120000) {
        wx.showToast({
          title: '最长只能120s哦~',
          icon: 'none'
        })
      }
      // console.log('recorder stop', res)
      let { tempFilePath, duration } = res
      // wx.saveFile({
      //   tempFilePath,
      //   success: result => {
      //     this.setData({
      //       audio: result.savedFilePath,
      //       hasContent: true
      //     })
      //   }
      // })
      this.setData({
        audio: {
          url: tempFilePath,
          duration
        },
        hasContent: true
      })
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

    let movie = this.data.movie
    let commentType = this.data.commentType
    if (commentType === '0') {
      let comment_words = event.detail.value.comment_words
      // 跳转到预览页面
      wx.navigateTo({
        url: `/pages/comment/comment?commentType=${commentType}&preview=true&id=${movie.id}&image=${movie.image}&title=${movie.title}&comment_words=${comment_words}`,
      })
    } else {
      // 处理音频文件
      let audio = this.data.audio
      wx.navigateTo({
        url: `/pages/comment/comment?commentType=${commentType}&preview=true&id=${movie.id}&image=${movie.image}&title=${movie.title}&url=${encodeURIComponent(audio.url)}&duration=${audio.duration}`,  // 编码后传输，避免URL不正确解析
      })
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
    // 判断是否有录音权限
    wx.authorize({
      scope: 'scope.record',
      success: result => {
        let authInfo = app.data.authInfo
        authInfo.record = AUTHORIZED              
        this.setData({
          authInfo
        })
      },
      fail: result => {
        wx.showToast({
          title: '需要授权',
          icon: 'none'
        })
        let authInfo = app.data.authInfo
        authInfo.record = UNAUTHORIZED
        this.setData({
          authInfo
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