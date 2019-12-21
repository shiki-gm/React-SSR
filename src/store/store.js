// 存储入口

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import indexReducer from './index';
import userReducer from './user';

import axios from 'axios';

const reducer = combineReducers({
  index: indexReducer,
  user: userReducer
})

const serverAxios = axios.create({
  baseURL: 'http://localhost:9090/'
})
const clientAxios = axios.create({
  baseURL: '/'
})

// 创建store
// const store = createStore(reducer, applyMiddleware(thunk))
// 二
// export default store

// 三
export const getServerStore = () => {
  // 通过server的dispatch获取和充实
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)))
}
export const getClientStore = () => {
  // 客户端用的store , 通过window.__context获取数据
  const defaultState = window.__context ? window.__context : {}
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}
