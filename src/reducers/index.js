import { combineReducers } from 'redux';
import {user} from './user_reducer'
import {bio} from './bio_reducer'

const rootReducer = combineReducers({
  user,
  bio
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;
