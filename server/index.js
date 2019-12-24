// 这里写node代码，会用babel处理
import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import {StaticRouter, matchPath, Route, Switch} from 'react-router-dom';

import {getServerStore} from '../src/store/store';
import { Provider } from "react-redux";
import routes from '../src/App';

import Header from "../src/component/Header";
import proxy from "http-proxy-middleware";

import path from 'path'
import fs from 'fs';

const store = getServerStore()

const app = express()
app.use(express.static('public'))

app.use(
  '/api',
  proxy({ target: 'http://localhost:9090/', changeOrigin: true })
);

function csrRender(res) {
  // 读取csr文件，返回
  const filename = path.resolve(process.cwd(), 'public/index.csr.html')
  const html = fs.readFileSync(filename, 'utf-8')
  return res.send(html)
}

// 接所有请求，接到后在内部通过静态路由来控制
app.get('*', (req, res) => {

  if (req.query._mode === 'csr') {
    console.log('开启降级渲染');
    return csrRender(res)
  }

  // 配置开关开启csr
  // 服务器负载过高，开启csr
  // 第三次课
  /**
   * 1.获取根据路由渲染的组件, 2.拿到loadData方法，获取数据
   *  1.去改router结构
   *  2.改完再来取方法
   */
  // 存储所有网络请求
  const promises = []

  routes.some(route => {
    const match = matchPath(req.path, route)
    if (match) {
      const { loadData } = route.component
      if (loadData) {
        // 1.
        const promise = new Promise((resolve, reject) => {
          loadData(store).then(resolve).catch(resolve)
        })
        promises.push(
          promise
        )
        // promises.push(
        //   loadData(store)
        // )
      }
    }
  })

  // 等待所有网络请求结束后
  // 2.
  // Promise.allSettled(promises).then(() => {
  Promise.all(promises).then(() => {

    const context = {
      css: []
    }

    // 第一次
    // const Page = <App title="SSR"></App>
    // 第二次课
    // 把react组件，解析成html
    // 静态路由  StaticRouter  包裹App
    //替换掉 前端路由BrowserRouter
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Header></Header>
          {/* 三 */}
          <Switch>
            {routes.map(route => <Route {...route}></Route>)}
          </Switch>
          {/* 二 */}
          {/* {App} */}
        </StaticRouter>
      </Provider>
    )
    console.log('context', context);
    

    if(context.statuscode) {
      // 状态切换页面跳转
      res.status(context.statuscode)
    }

    if(context.action === 'REPLACE') {
      res.redirect(301, context.url)
    }

    const css = context.css.join('\n')

    // 字符串模板
    res.send(`
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>react ssr</title>
          <script>
            ${css}
          </script>
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
          window.__context=${JSON.stringify(store.getState())}
          </script>
          <script src="/bundle.js"></script>
        </body>
      </html>
    `)
  })
})

app.listen(9093, ()=>{
  console.log('监听中');
  
})
