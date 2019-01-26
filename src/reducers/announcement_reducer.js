import {FETCH_ANNOUNCEMENTS, CREATE_ANNOUNCEMENT, UPDATE_ANNOUNCEMENT} from '../actions'

export const announcements = (state = [], action) => {
  switch(action.type) {
    case FETCH_ANNOUNCEMENTS:
      state = action.payload
      return state

    case CREATE_ANNOUNCEMENT:
      let announcementState = state.slice(0)
      state = [action.payload,...announcementState]
      return state

    case UPDATE_ANNOUNCEMENT:
      let ann_state = state.slice(0)
      let idx = state.indexOf(state.find((a) => a.id == action.id))
      state = [...ann_state.slice(0, idx),... action.payload,...ann_state.slice(idx+1)]
      return state

    default:
      return state
  }
}
