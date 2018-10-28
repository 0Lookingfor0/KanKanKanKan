const DB = require('../utls/db.js')

module.exports = {
  // 返回电影列表
  get: async ctx => {
    let movies = await DB.query('SELECT * FROM movies')
    ctx.state.data = movies
  }
}