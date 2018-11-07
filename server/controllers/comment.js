const DB = require('../utls/db.js')

module.exports = {
  // 添加影评
  post: async ctx => {
    let comment_type = !!(+ctx.request.body.comment_type)
    let user = ctx.state.$wxInfo.userinfo.openId
    let movie = ctx.request.body.movie
    let comment_words = ctx.request.body.comment_words
    let audio = ctx.request.body.audio
    let nickName = ctx.state.$wxInfo.userinfo.nickName
    let avatarUrl = ctx.state.$wxInfo.userinfo.avatarUrl

    if (!comment_type && comment_words) {
      await DB.query('INSERT INTO comment(comment_type, user, movie, comment_words, nickName, avatarUrl) VALUES(?, ?, ?, ?, ?, ?)', [comment_type, user, movie, comment_words, nickName, avatarUrl])
    } else if (comment_type && audio) {
      await DB.query('INSERT INTO comment(comment_type, user, movie, audio, nickName, avatarUrl) VALUES(?, ?, ?, ?, ?, ?)', [comment_type, user, movie, audio, nickName, avatarUrl])
    }
  },
  // 获取影评, 若 url 中有 Id 则返回影评详情
  get: async ctx => {
    let id = +ctx.params.id 

    if (id) {
      // 返回影评详情
      let comment = await DB.query('SELECT * FROM comment WHERE id=?', [id])
      ctx.state.data = comment[0]
    } else {
      // 返回影评列表
      let movie = +ctx.request.query.movie
      if (movie){
        ctx.state.data = await DB.query('SELECT * FROM comment WHERE movie=?', [movie])
      }
    }
  },
}