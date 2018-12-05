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
    isPlaying: false,  // 是否正在播放音频
  },

  uploadAudio: function(cb) {
    let audio = this.data.audio
    wx.uploadFile({
      url: config.service.uploadUrl,
      filePath: audio.url,
      name: 'file',
      success: result => {
        const data = JSON.parse(result.data)
        console.log(result)
        typeof cb === "function" && cb()
      },
      fail: result => {

      }
    })
  },

  onTapPlayEnd: function () {
    let innerAudioContext = this.innerAudioContext
    if(this.data.isPlaying) {
      innerAudioContext.stop()
    } else {
      innerAudioContext.play()
    }
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },

  onTapAddComment: function () {
    // 需要登录
    let userInfo = app.data.userInfo
    if (!userInfo) {
      wx.showModal({
        title: '提示',
        content: '您需要登录才能进行操作',
        success: result => {
          if (result.confirm) {
            // 跳转到登录页面
            wx.navigateTo({
              url: '/pages/user/user?navBack=true',
            })
          }
        }
      })
    } else {
      // 询问添加何种类型的影评
      wx.showActionSheet({
        itemList: ['文字', '音频'],
        success: res => {
          let commentType = res.tapIndex  // 0为文字，1为音频
          let id = this.data.movie.id
          let image = this.data.movie.image
          let title = this.data.movie.title

          wx.navigateTo({
            url: `/pages/edit_comment/edit_comment?id=${id}&commentType=${commentType}&image=${image}&title=${title}`,
          })
        },
        fail: res => {

        }
      })
    }
  },

  /**
   * 发布影评
   */
  postComment: function() {
    let comment_type = this.data.commentType  // 这里命名不太好
    let id = this.data.movie.id
    let image = this.data.movie.image
    let title = this.data.movie.title
    if (comment_type === 0) {
      let comment_words = this.data.comment_words
      qcloud.request({
        url: config.service.postComment,
        login: true,
        method: 'POST',
        data: {
          comment_type,
          movie: id,
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
                url: `/pages/comment_list/comment_list?id=${id}&image=${image}&title=${title}`,
              })
            }, 2000)
          } else {
            console.log(result)          
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
    } else {
      console.log(this.data)
      this.uploadAudio()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let commentType = +options.commentType
    let preview = !!options.preview  // boolean化
    let id = options.id
    let image = options.image
    let title = options.title
    let comment_words = options.comment_words || null
    let url = decodeURIComponent(options.url) || null  // 解析URL
    let duration = Math.ceil(options.duration / 1000) || null
    
    // 设置音频对象
    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.src = url
    this.innerAudioContext.onEnded(() => {
      this.setData({
        isPlaying: false
      })
    })

    // 改变导航栏文字
    if (preview) {
      wx.setNavigationBarTitle({
        title: '影评预览',
      })
    } else {
      wx.setNavigationBarTitle({
        title: '影评详情',
      })
    }
    
    this.setData({
      preview,
      commentType,
      movie: {
        id,
        title,
        image
      },
      comment_words,
      audio: { url, duration},
      userInfo: app.data.userInfo,
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