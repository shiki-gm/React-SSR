import React from 'react';
import ReactDom from 'react-dom';

import App from '../src/App';
import store from '../src/store/store';
import { Provider } from "react-redux";

import {BrowserRouter} from 'react-router-dom';

// 客户端路由包裹
const Page = 
  (<Provider store={store}>
    <BrowserRouter>
      {App}
    </BrowserRouter>
  </Provider>)

// 注入
ReactDom.hydrate(Page, document.getElementById('root'))

