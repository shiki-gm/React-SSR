import React from 'react';
import ReactDom from 'react-dom';

import App from '../src/App';

import {BrowserRouter} from 'react-router-dom';

// 客户端路由包裹
const Page = <BrowserRouter>
  {App}
</BrowserRouter>
// 注入
ReactDom.hydrate(Page, document.getElementById('root'))

