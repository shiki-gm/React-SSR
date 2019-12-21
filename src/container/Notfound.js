import React from "react";
import { Route } from "react-router-dom";

function Status({code, children}) {
  return <Route render={({staticContext}) => {
    if(staticContext){
      staticContext.statuscode = code
    }
    return children
  }}></Route>
}

function Notfound(props) {
  console.log('Notfound', props);
  // 渲染了这个组件，可以给staticContexdt赋值，statuscode=404
  return <Status code={404}>
    <h1>别找了，没有这页面</h1>
    <img id="img-404" src="./404.jpg" alt=""/>
  </Status>
}

export default Notfound
