// ** Redux Imports
import { combineReducers } from 'redux';

// ** Reducers Imports
import snackbar from './snakbar/reducer';
import kanban from './kanban/reducer';
import chat from './chat/reducer';
import menu from './menu/reducer';
import auth from './auth/reducer';
import users from './users/reducer';

const rootReducer = combineReducers({
  snackbar,
  kanban,
  chat,
  menu,
  auth,
  users
});

export default rootReducer;
