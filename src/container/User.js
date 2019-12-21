import React from "react";
import {connect} from 'react-redux'
import {getUserInfo} from '../store/user';
import { Redirect } from "react-router-dom";

function User(props) {

  // 比如登录逻辑判断 
  // 没登录要跳转登录

  
  return <Redirect to="/about"></Redirect>



  // return <div>
  //   不仅仅是{props.userinfo.name}, 还是{props.userinfo.base}
  // </div>
}

  // 第三次
  // 在组件中 定义loadData方法，在server层也就是node服务中，直接调用前端方法，服务端获取数据存到store中
  // 此时 初始化客户端代码的时候，store里面已经是有值了
User.loadData = (store) => {
  return store.dispatch(getUserInfo())
}


export default connect(
  state => ({userinfo: state.user.userinfo}),
  // {getUserInfo}
)(User)