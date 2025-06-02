// ** Redux Imports
import { combineReducers } from 'redux';

// ** Reducers Imports
import auth from './auth/reducer';
import snackbar from './snakbar/reducer';
import kanban from './kanban/reducer';
import chat from './chat/reducer';
import menu from './menu/reducer';

const rootReducer = combineReducers({
  snackbar,
  kanban,
  chat,
  menu,
  auth
});

export default rootReducer;
