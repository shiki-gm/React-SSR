// 这里写node代码，会用babel处理
import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import {StaticRouter, matchPath, Route} from 'react-router-dom';

import {getServerStore} from '../src/store/store';
import { Provider } from "react-redux";
import routes from '../src/App';

import Header from "../src/component/Header";

const store = getServerStore()

const app = express()
app.use(express.static('public'))


// 接所有请求，接到后在内部通过静态路由来控制
app.get('*', (req, res) => {
  // 第三次课
  /**
   * 1.获取根据路由渲染的组件, 2.拿到loadData方法，获取数据
   *  1.去改router结构
   *  2.改完再来取方法
   */
  // 存储所有网络请求
  const promise = []

  routes.some(route => {
    const match = matchPath(req.path, route)
    if (match) {
      const { loadData } = route.component
      if (loadData) {
        promise.push(
          loadData(store)
        )
      }
    }
  })

  // 等待所有网络请求结束后
  Promise.all(promise).then(() => {


    // 第一次
    // const Page = <App title="SSR"></App>
    // 第二次课
    // 把react组件，解析成html
    // 静态路由  StaticRouter  包裹App
    //替换掉 前端路由BrowserRouter
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url}>
          <Header></Header>
          {/* 三 */}
          {routes.map(route => <Route {...route}></Route>)}
          {/* 二 */}
          {/* {App} */}
        </StaticRouter>
      </Provider>
    )
    // 字符串模板
    res.send(`
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>react ssr</title>
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
