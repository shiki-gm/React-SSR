import axios from "axios";

// 首页逻辑
// actionType
const USER_INFO = 'USER/USER_INFO'

// actionCreator
const changeList = data => ({
  type: USER_INFO,
  data
})

export const getUserInfo = server => {
  return (dispatch, getState, $axios) => {
    return $axios.get('/api/user/info')
      .then(res => {
        const {data} = res.data
        dispatch(changeList(data))
      })
  }
}

const defaultState = {
  userinfo: []
}


export default (state=defaultState, action)=>{
  switch (action.type) {
    case USER_INFO:
      const newState = {
        ...state,
        userinfo: action.data
      }
      return newState;
    default:
      return state;
  }
}