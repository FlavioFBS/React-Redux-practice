
// el dispatch dispara la llamada y contacta al
// reducer para que haga el cambio de estado

import axios from "axios";
import { CARGANDO, EJEMPLO, ERROR, TRAER_TODOS } from "../types/usuariosTypes";

export const traerTodos = () => async (dispatch) => {
  dispatch({
    type: CARGANDO
  });
  try {
    const req = await axios.get('https://jsonplaceholder.typicode.com/users')
    dispatch({
      type: TRAER_TODOS,
      payload: req.data
    })
  } catch (error) {
    console.log({error});
    dispatch({
      type: ERROR,
      payload: 'Algo salió mal. Información de usuario no disponible'
    })
  }
  
}

export const ejemplo = () => async (dispatch) => {
  dispatch({
    type: EJEMPLO,
    payload: {name: 'pepe'}
  })
}
