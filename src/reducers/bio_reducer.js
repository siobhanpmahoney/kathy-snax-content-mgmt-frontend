import { LOAD_BIO, UPDATE_BIO } from "../actions";

export const bio = (state = { content: null }, action) => {
  switch (action.type) {
    case LOAD_BIO:
      state = Object.assign({}, state, {
        content: action.payload.content
      });
      console.log("in bio", state)
      return state;

   case UPDATE_BIO:
    console.log("in update bio, payload: ", action.payload)
      state = Object.assign({}, state, {content: action.payload.content});
      return state;

   default:
    return state;
 }
};
