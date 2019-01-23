import {SET_USER} from '../actions/user'

export const user = (state = {username: null, authenticated: false}, action) => {
  switch(action.type) {
    case SET_USER:
      state = Object.assign({}, state, {username: action.username, authenticated: true})
      console.log("in reducer")
      return state;

    default:
      return state;
  }
}
