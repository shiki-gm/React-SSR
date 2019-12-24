import React, {useState} from "react";
import {Route} from 'react-router-dom'
import Index from './container/Index';
import About from './container/About';
import User from './container/User';
import Notfound from './container/Notfound';

// import './App.css'

// 第二次
// export default (
//   <div>
//     <Route path="/" exact component={Index}></Route>
//     <Route path="/about" exact component={About}></Route>
//   </div>
// )

// 第三次
/**
 * 改造成js配置，才能获取组件
 * 再去改server.js
 */
export default [
  {
    path: '/',
    component: Index,
    // loadData: Index.loadData(),  // 可以直接把组件的方法定义在这里
    exact: true,
    key: 'index'
  },
  {
    path: '/about',
    component: About,
    exact: true,
    key: 'about'
  },
  {
    path: '/user',
    component: User,
    exact: true,
    key: 'user'
  },
  {
    path: '/wqert',
    component: Notfound,
    exact: true,
    key: 'wqert'
  }
]