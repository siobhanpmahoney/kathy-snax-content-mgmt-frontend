import { combineReducers } from 'redux';
import {user} from './user_reducer'
import {bio} from './bio_reducer'
import {announcements} from './announcement_reducer'

const rootReducer = combineReducers({
  user,
  bio,
  announcements
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;
