// import { CARGANDO, EJEMPLO, ERROR, TRAER_USUARIOS } from "../types/usuariosTypes"

import { ERROR, ACTUALIZAR_PUBLICACIONES, TRAER_TODOS, CARGANDO, COM_CARGANDO, COM_ERROR, ACTUALIZAR_COMENTARIOS } from "../types/publicacionesTypes"

const INITIAL_STATE = {
  publicaciones: [],
  cargando: false,
  error: '',
  comentarioCargando: false,
  comentarioError: ''
}

const publicacionesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case TRAER_TODOS:
      return {
        ...state,
        publicaciones: action.payload,
        cargando: false,
        error: ''
      }
    case ACTUALIZAR_PUBLICACIONES:
      return {
        ...state,
        publicaciones: action.payload,
        cargando: false,
        error: ''
      }

    case CARGANDO:
      return { ...state, cargando: true }

    case ERROR: 
      return {
        ...state,
        error: action.payload,
        cargando: false
      }

    case ACTUALIZAR_COMENTARIOS:
      return {
        ...state,
        publicaciones: action.payload,
        cargando: false,
        error: '',
        comentarioCargando: false,
        comentarioError: ''
      }

    case COM_CARGANDO:
      return { ...state, comentarioCargando: true }

    case COM_ERROR:
      return {
        ...state,
        comentarioError: action.payload,
        comentarioCargando: false
      }

    default:
    return state
  }
}
export default publicacionesReducer
