// 存储入口

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import indexReducer from './index';
import userReducer from './user';

const reducer = combineReducers({
  index: indexReducer,
  user: userReducer
})

// 创建store
// const store = createStore(reducer, applyMiddleware(thunk))
// 二
// export default store

// 三
export const getServerStore = () => {
  // 通过server的dispatch获取和充实
  return createStore(reducer, applyMiddleware(thunk))
}
export const getClientStore = () => {
  // 客户端用的store , 通过window.__context获取数据
  const defaultState = window.__context ? window.__context : {}
  return createStore(reducer, defaultState, applyMiddleware(thunk))
}
