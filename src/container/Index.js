import React, {useState, useEffect} from "react";
import {connect} from 'react-redux'
import {getIndexList} from '../store/index';
import styles from './Index.css';
import withStyle from "./withStyle";
// server端特有方法
// console.log(styles._getCss());

function Index(props) {

  const [count, setCount] = useState(1)

  // 三
  // 前端获取数据 didmount之后，请求数据后才存储到store中， 这时候前端显示出了数据，但是server层并没有数据，所以dom中没有数据
  //  浏览器后台dom： <div id="root"><div><div><h1>我来学习 <!-- -->1<!-- --> 下 </h1><button>再来</button><hr/><ul></ul></div></div></div>
    // 为了让dom层也能在首屏渲染出数据来，则注释掉上面代码，不再在client层请求数据
    useEffect(() => {
      if (!props.list.length) {
        props.getIndexList()
      }
    }, [])
    // 第二次课用到这个
  // useEffect(() => {
  //   props.getIndexList()
  // }, [])

  return <div className={styles.container}>
    <h1 className={styles.title}>我来学习 {count} 下 {props.title}</h1>
    
    <button onClick={() => {setCount(count + 1)}}>再来</button>

    <hr/>
    <ul>
      {props.list.map(i => {
        return <li key={i.id}>{i.name}</li>
      })}
    </ul>
  </div>
}

  // 第三次
  // 在组件中 定义loadData方法，在server层也就是node服务中，直接调用前端方法，服务端获取数据存到store中
  // 此时 初始化客户端代码的时候，store里面已经是有值了
Index.loadData = (store) => {
  return store.dispatch(getIndexList())
}


export default connect(
  state => ({list: state.index.list}),
  {getIndexList}
)(Index)
// )(withStyle(Index, styles))