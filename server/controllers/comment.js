const DB = require('../utls/db.js')

module.exports = {
  // 添加影评
  post: async ctx => {
    let comment_type = !!(+ctx.request.body.comment_type)
    let user = ctx.state.$wxInfo.userinfo.openId
    let movie = ctx.request.body.movie
    let comment_words = ctx.request.body.comment_words
    let audio = ctx.request.body.audio

    if (!comment_type && comment_words) {
      DB.query('INSERT INTO comment(comment_type, user, movie, comment_words) VALUES(?, ?, ?, ?)', [comment_type, user, movie, comment_words])
    } else if (comment_type && audio) {
      DB.query('INSERT INTO comment(comment_type, user, movie, audio) VALUES(?, ?, ?, ?)', [comment_type, user, movie, audio])
    }
  },
}