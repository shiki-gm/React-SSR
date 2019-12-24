import React from "react";
import styles from "./About.css";
import withStyle from './withStyle';

function About(props) {

  // if (props.staticContext) {
  //   props.staticContext.css.push(styles._getCss())
  // }

  return <div>
    <h1 className={styles.title}>登录页面</h1>
  </div>
}

export default About