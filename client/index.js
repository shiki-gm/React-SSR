import React from 'react';
import ReactDom from 'react-dom';

import routes from '../src/App';
import {getClientStore} from '../src/store/store';
import { Provider } from "react-redux";

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from "../src/component/Header";

const store = getClientStore()
// 客户端路由包裹
const Page = 
  (<Provider store={store}>
    <BrowserRouter>
      <Header></Header>
      {/* 三 */}
      <Switch>
        {routes.map(route => <Route {...route}></Route>)}
      </Switch>
      {/* 二 */}
      {/* {App} */}
    </BrowserRouter>
  </Provider>)

// 注水， 水合
ReactDom.hydrate(Page, document.getElementById('root'))

