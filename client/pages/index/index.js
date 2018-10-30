//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    // userInfo: {},
    // logged: false,
    // takeSession: false,
    // requestResult: '',

    movie: {}
    // movie: {
    //   id: 1,
    //   title: '千与千寻',
    //   image: 'https://movie-1255691973.cos.ap-shanghai.myqcloud.com/p1606727862.jpg',
    //   category: '剧情 / 动画 / 奇幻',
    //   description: '千寻和爸爸妈妈一同驱车前往新家，在郊外的小路上不慎进入了神秘的隧道——他们去到了另外一个诡异世界—一个中世纪的小镇。远处飘来食物的香味，爸爸妈妈大快朵颐，孰料之后变成了猪！这时小镇上渐渐来了许多样子古怪、半透明的人。千寻仓皇逃出，一个叫小白的人救了他，喂了她阻止身体消 失的药，并且告诉她怎样去找锅炉爷爷以及汤婆婆，而且必须获得一分工作才能不被魔法变成别的东西。千寻在小白的帮助下幸运地获得了一份在浴池打杂的工作。渐渐她不再被那些怪模怪样的人吓倒，并从小玲那儿知道了小白是凶恶的汤婆婆的弟子。 一次，千寻发现小白被一群白色飞舞的纸人打伤，为了救受伤的小白，她用河神送给她的药丸驱出了小白身体内的封印以及守封印的小妖精，但小白还是没有醒过来。 为了救小白，千寻又踏上了她的冒险之旅。',
    //   createTime: '2018-10-28T05:41:31.000Z'
    // }
  },

  // 随机获取电影
  getRandomMovie: function () {
    qcloud.request({
      url: config.service.getMovies + '/0',
      success: result => {
        let data = result.data
        if (!data.code) {
          this.setData({
            movie: data.data
          })
        } else {
          wx.showToast({
            title: '获取信息失败',
            icon: 'none'
          })
        }
      },
      fail: result => {
        wx.showToast({
          title: '获取信息失败',
          icon: 'none'
        })
      }
    })
  },

  onPullDownRefresh() {
    this.getRandomMovie()
    wx.stopPullDownRefresh()
  },

  onLoad: function (options) {
    this.getRandomMovie()
  },

  // // 用户登录示例
  // bindGetUserInfo: function () {
  //     if (this.data.logged) return

  //     util.showBusy('正在登录')

  //     const session = qcloud.Session.get()

  //     if (session) {
  //         // 第二次登录
  //         // 或者本地已经有登录态
  //         // 可使用本函数更新登录态
  //         qcloud.loginWithCode({
  //             success: res => {
  //                 this.setData({ userInfo: res, logged: true })
  //                 util.showSuccess('登录成功')
  //             },
  //             fail: err => {
  //                 console.error(err)
  //                 util.showModel('登录错误', err.message)
  //             }
  //         })
  //     } else {
  //         // 首次登录
  //         qcloud.login({
  //             success: res => {
  //                 this.setData({ userInfo: res, logged: true })
  //                 util.showSuccess('登录成功')
  //             },
  //             fail: err => {
  //                 console.error(err)
  //                 util.showModel('登录错误', err.message)
  //             }
  //         })
  //     }
  // },

  // // 切换是否带有登录态
  // switchRequestMode: function (e) {
  //     this.setData({
  //         takeSession: e.detail.value
  //     })
  //     this.doRequest()
  // },

  // doRequest: function () {
  //     util.showBusy('请求中...')
  //     var that = this
  //     var options = {
  //         url: config.service.requestUrl,
  //         login: true,
  //         success (result) {
  //             util.showSuccess('请求成功完成')
  //             console.log('request success', result)
  //             that.setData({
  //                 requestResult: JSON.stringify(result.data)
  //             })
  //         },
  //         fail (error) {
  //             util.showModel('请求失败', error);
  //             console.log('request fail', error);
  //         }
  //     }
  //     if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录
  //         qcloud.request(options)
  //     } else {    // 使用 wx.request 则不带登录态
  //         wx.request(options)
  //     }
  // },

  // // 上传图片接口
  // doUpload: function () {
  //     var that = this

  //     // 选择图片
  //     wx.chooseImage({
  //         count: 1,
  //         sizeType: ['compressed'],
  //         sourceType: ['album', 'camera'],
  //         success: function(res){
  //             util.showBusy('正在上传')
  //             var filePath = res.tempFilePaths[0]

  //             // 上传图片
  //             wx.uploadFile({
  //                 url: config.service.uploadUrl,
  //                 filePath: filePath,
  //                 name: 'file',

  //                 success: function(res){
  //                     util.showSuccess('上传图片成功')
  //                     console.log(res)
  //                     res = JSON.parse(res.data)
  //                     console.log(res)
  //                     that.setData({
  //                         imgUrl: res.data.imgUrl
  //                     })
  //                 },

  //                 fail: function(e) {
  //                     util.showModel('上传图片失败')
  //                 }
  //             })

  //         },
  //         fail: function(e) {
  //             console.error(e)
  //         }
  //     })
  // },

  // // 预览图片
  // previewImg: function () {
  //     wx.previewImage({
  //         current: this.data.imgUrl,
  //         urls: [this.data.imgUrl]
  //     })
  // },

  // // 切换信道的按钮
  // switchChange: function (e) {
  //     var checked = e.detail.value

  //     if (checked) {
  //         this.openTunnel()
  //     } else {
  //         this.closeTunnel()
  //     }
  // },

  // openTunnel: function () {
  //     util.showBusy('信道连接中...')
  //     // 创建信道，需要给定后台服务地址
  //     var tunnel = this.tunnel = new qcloud.Tunnel(config.service.tunnelUrl)

  //     // 监听信道内置消息，包括 connect/close/reconnecting/reconnect/error
  //     tunnel.on('connect', () => {
  //         util.showSuccess('信道已连接')
  //         console.log('WebSocket 信道已连接')
  //         this.setData({ tunnelStatus: 'connected' })
  //     })

  //     tunnel.on('close', () => {
  //         util.showSuccess('信道已断开')
  //         console.log('WebSocket 信道已断开')
  //         this.setData({ tunnelStatus: 'closed' })
  //     })

  //     tunnel.on('reconnecting', () => {
  //         console.log('WebSocket 信道正在重连...')
  //         util.showBusy('正在重连')
  //     })

  //     tunnel.on('reconnect', () => {
  //         console.log('WebSocket 信道重连成功')
  //         util.showSuccess('重连成功')
  //     })

  //     tunnel.on('error', error => {
  //         util.showModel('信道发生错误', error)
  //         console.error('信道发生错误：', error)
  //     })

  //     // 监听自定义消息（服务器进行推送）
  //     tunnel.on('speak', speak => {
  //         util.showModel('信道消息', speak)
  //         console.log('收到说话消息：', speak)
  //     })

  //     // 打开信道
  //     tunnel.open()

  //     this.setData({ tunnelStatus: 'connecting' })
  // },

  // /**
  //  * 点击「发送消息」按钮，测试使用信道发送消息
  //  */
  // sendMessage() {
  //     if (!this.data.tunnelStatus || !this.data.tunnelStatus === 'connected') return
  //     // 使用 tunnel.isActive() 来检测当前信道是否处于可用状态
  //     if (this.tunnel && this.tunnel.isActive()) {
  //         // 使用信道给服务器推送「speak」消息
  //         this.tunnel.emit('speak', {
  //             'word': 'I say something at ' + new Date(),
  //         });
  //     }
  // },

  // /**
  //  * 点击「关闭信道」按钮，关闭已经打开的信道
  //  */
  // closeTunnel() {
  //     if (this.tunnel) {
  //         this.tunnel.close();
  //     }
  //     util.showBusy('信道连接中...')
  //     this.setData({ tunnelStatus: 'closed' })
  // }
})
