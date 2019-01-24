import {SET_USER} from '../actions'

export const user = (state = {id: null, username: null, authenticated: false}, action) => {
  switch(action.type) {
    case SET_USER:
    
      state = {id: action.payload.id, username: action.payload.username, authenticated: true}
      console.log("in reducer — state: ", state, "payload: ", action.payload)
      return state;

    default:
      return state;
  }
}
