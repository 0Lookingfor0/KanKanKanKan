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

  onTapDetail(event) {
    let index = event.currentTarget.dataset.index
    let comment = this.data.comments[index]
    let movie = this.data.movie
    wx.navigateTo({
      url: `/pages/comment/comment?id=${movie.id}&commentType=${comment.comment_type}&image=${movie.image}&title=${movie.title}&comment_words=${comment.comment_words}`,
    })
  },

  getCommentList(id) {
    wx.showLoading({
      title: '获取列表',
    })
    qcloud.request({
      url: config.service.getComment + `?movie=${id}`,
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
      movie: {
        id: options.id,
        image: options.image,
        title: options.title
      }
    })
    this.getCommentList(options.id)
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
    this.getCommentList(this.data.movie.id)
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