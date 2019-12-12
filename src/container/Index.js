import React, {useState, useEffect} from "react";
import {connect} from 'react-redux'
import {getIndexList} from '../store/index';

function Index(props) {

  const [count, setCount] = useState(1)

  useEffect(() => {
    props.getIndexList()
  }, [])
  return <div>
    <h1>我来学习 {count} 下 {props.title}</h1>
    
    <button onClick={() => {setCount(count + 1)}}>再来</button>

    <hr/>
    <ul>
      {props.list.map(i => {
        return <li key={i.id}>{i.name}</li>
      })}
    </ul>
  </div>
}

export default connect(
  state => ({list: state.index.list}),
  {getIndexList}
)(Index)