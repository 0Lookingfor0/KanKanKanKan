// client/pages/movie_detail/movie_detail.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.data.userInfo,
    movie: {},
    // movie: {
    //   id: 1,
    //   title: '千与千寻',
    //   image: 'https://movie-1255691973.cos.ap-shanghai.myqcloud.com/p1606727862.jpg',
    //   category: '剧情 / 动画 / 奇幻',
    //   description: '千寻和爸爸妈妈一同驱车前往新家，在郊外的小路上不慎进入了神秘的隧道——他们去到了另外一个诡异世界—一个中世纪的小镇。远处飘来食物的香味，爸爸妈妈大快朵颐，孰料之后变成了猪！这时小镇上渐渐来了许多样子古怪、半透明的人。千寻仓皇逃出，一个叫小白的人救了他，喂了她阻止身体消 失的药，并且告诉她怎样去找锅炉爷爷以及汤婆婆，而且必须获得一分工作才能不被魔法变成别的东西。千寻在小白的帮助下幸运地获得了一份在浴池打杂的工作。渐渐她不再被那些怪模怪样的人吓倒，并从小玲那儿知道了小白是凶恶的汤婆婆的弟子。 一次，千寻发现小白被一群白色飞舞的纸人打伤，为了救受伤的小白，她用河神送给她的药丸驱出了小白身体内的封印以及守封印的小妖精，但小白还是没有醒过来。 为了救小白，千寻又踏上了她的冒险之旅。',
    //   createTime: '2018-10-28T05:41:31.000Z'
    // },
  },

  onTapAddComment: function() {
    // 需要登录
    let userInfo = this.data.userInfo
    if (!userInfo) {
      wx.showModal({
        title: '提示',
        content: '您需要登录才能进行操作',
        success: result => {
          if(result.confirm) {
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
          let commentType = res.tapIndex
          // let id = event.currentTarget.dataset.id
          let id = this.data.movie.id
          let image = this.data.movie.image
          let title = this.data.movie.title

          wx.navigateTo({
            url: `/pages/edit_comment/edit_comment?id=${id}&commentType=${commentType}&image=${image}&title=${title}`,
          })
        },
        fail: res => {
          console.log(res)
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    // 获取电影详情
    qcloud.request({
      url: config.service.getMovies + '/' + id,
      success: result => {
        let data = result.data
        if(!data.code) {
          this.setData({
            movie: data.data
          })
        } else {
          wx.showToast({
            title: '获取失败',
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 2000)
        }
      },
      fail: result => {
        wx.showToast({
          title: '获取失败',
          icon: 'none'
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
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
    // 更新用户信息
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