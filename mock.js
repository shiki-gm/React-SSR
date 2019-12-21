// 模拟接口
let express = require('express')
const app = express()

// 注意api前面有/
app.get('/api/user/info', (req, res) => {
  // 支持跨域
  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE')
  // res.header('Content-Type', 'application/json;charset=utf-8')
  res.json({
    code: 0,
    data: {
      name: '前端大神',
      base: '后端大神'
    }
  })
})

// 注意api前面有/
app.get('/api/course/list', (req, res) => {
  // 支持跨域
  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE')
  // res.header('Content-Type', 'application/json;charset=utf-8')
  res.json({
    code: 0,
    list: [
      {name: '大明学全栈', id: 1},
      {name: '全栈工程师', id: 2},
      {name: '前端大神', id: 3},
      {name: 'node大神', id: 4}
    ]
  })
})

app.listen(9090, () => {
  console.log('mock启动完毕');
})