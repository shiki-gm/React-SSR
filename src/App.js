import React, {useState} from "react";

function App(props) {

  const [count, setCount] = useState(1)
  return <div>
    <h1>我来学习 {count} 下 {props.title}</h1>
    
    <button onClick={() => {setCount(count + 1)}}>再来</button>
  </div>
}

export default <App title="SSR"></App>