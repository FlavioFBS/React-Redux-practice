import { combineReducers } from 'redux';
import userReducer from './users.reducer';
import publicacionesReducer from './publicaciones.reducer';
import tareasReducer from './tareas.reducer';

export default combineReducers({
  userReducer,
  publicacionesReducer,
  tareasReducer
});
