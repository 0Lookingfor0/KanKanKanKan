const DB = require('../utls/db.js')

module.exports = {
  // 返回电影信息
  get: async ctx => {
    if (ctx.params.id){
      let id = +ctx.params.id
      if(id === 0) {
        // 随机获取一部电影
        let movies = await DB.query('SELECT * FROM movies')
        let i = 0 | Math.random() * (movies.length - 1)
        ctx.state.data = movies[i]
      } else {
        // 获取指定电影
        ctx.state.data = (await DB.query('SELECT * FROM movies WHERE id = ?', [id]))[0]
      }
    } else {
        // 获取电影列表
      let movies = await DB.query('SELECT * FROM movies')
      ctx.state.data = movies
    }
  }
}