
// el dispatch dispara la llamada y contacta al
// reducer para que haga el cambio de estado

import axios from "axios";
import { ACTUALIZAR, CAMBIO_TITULO, CAMBIO_USUARIO_ID, CARGANDO, ERROR, GUARDAR, LIMPIAR, TRAER_TAREAS } from "../types/TareasTypes";

export const traerTareas = () => async (dispatch) => {
  dispatch({
    type: CARGANDO
  });
  try {
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos')

    const tareas = {}
    respuesta.data.map(tar => (
      tareas[tar.userId] = {
        ...tareas[tar.userId],
        [tar.id]: {
          ...tar
        }
      }
    ))

    dispatch({
      type: TRAER_TAREAS,
      payload: tareas
    })
  } catch (error) {
    console.log({error});
    dispatch({
      type: ERROR,
      payload: 'Algo salió mal. Información de usuario no disponible'
    })
  } 
}

export const cambioUsuarioId = (usuario_id) => (dispatch) => {
  dispatch({
    type: CAMBIO_USUARIO_ID,
    payload: usuario_id
  })
}

export const cambioTitulo = (titulo) => (dispatch) => {
  dispatch({
    type: CAMBIO_TITULO,
    payload: titulo
  })
}

export const agregar = (nuevaTarea) => async (dispatch) => {
  console.log({nuevaTarea});
  dispatch({
    type: CARGANDO
  })

  try {
    const url = 'https://jsonplaceholder.typicode.com/todos'
    const respuesta = await axios.post(url, nuevaTarea)

    console.log({respuesta});
    dispatch({
      type: GUARDAR
    })

  } catch (error) {
    console.log({error_tareas: error});
    dispatch({
      type: ERROR,
      payload: 'Intente más tarde ._.'
    })
  }
}

export const editar = (tarea_editada) => async (dispatch) => {
  console.log({tarea_editada});
  dispatch({
    type: CARGANDO
  })

  try {
    const url = `https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`
    const respuesta = await axios.put(url, tarea_editada)

    dispatch({
      type: GUARDAR
    })

  } catch (error) {
    console.log({error_tareas: error});
    dispatch({
      type: ERROR,
      payload: 'Intente más tarde ._.'
    })
  }
}

export const toggleDone = (userId, tareaId) => (dispatch, getState) => {
  const {tareas} = getState().tareasReducer
  const tarea_seleccionada = tareas[userId][tareaId]

  // actualizacion a datos del primer nivel de objeto
  const tareas_actualizadas = {
    ...tareas
  }
  // actualizacion a datos del segundo nivel de objeto
  tareas_actualizadas[userId] = {
    ...tareas[userId]
  }
  // actualizacion a datos del tercer nivel de objeto
  tareas_actualizadas[userId][tareaId] = {
    ...tareas[userId][tareaId],
    completed: !tarea_seleccionada.completed
  }

  dispatch({
    type: ACTUALIZAR,
    payload: tareas_actualizadas
  })
}

export const eliminar = (tareaId) => async (dispatch) => {
  dispatch({
    type: CARGANDO
  })
  try {
    const url = `https://jsonplaceholder.typicode.com/todos/${tareaId}`
    const respuesta = await axios.delete(url)
    console.log({eliminar: respuesta});
    dispatch({
      type: TRAER_TAREAS,
      payload: {}
    })
  } catch (error) {
    console.log({error_eliminar: error});
    dispatch({
      type: ERROR,
      payload: 'Servicio no disponible'
    })
  }
}

export const limpiarForma = () => (dispatch) => {
  dispatch({
    type: LIMPIAR
  })
}