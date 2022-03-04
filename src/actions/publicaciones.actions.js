
// el dispatch dispara la llamada y contacta al
// reducer para que haga el cambio de estado

import axios from "axios";
import { CARGANDO, ERROR, ACTUALIZAR_PUBLICACIONES, COM_CARGANDO, COM_ERROR, ACTUALIZAR_COMENTARIOS } from "../types/publicacionesTypes";
import * as usuariosTypes from '../types/usuariosTypes'

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes

const linkPosts = 'https://jsonplaceholder.typicode.com/posts'

export const traerPorUsuarios = (id) => async (dispatch, getState) => {
  dispatch({
    type: CARGANDO
  })
  const { usuarios } = getState().userReducer
  const { publicaciones } = getState().publicacionesReducer
  const usuario_id = usuarios[id].id
  try {
    let existPost = null
    for (let i = 0; i < publicaciones.length; i++) {
      if (publicaciones[i].userId === usuario_id) {
        existPost = publicaciones[i]
        break
      }
    }
    if (!existPost) {
      const respuesta = await axios.get(`${linkPosts}?userId=${usuario_id}`)
      
      const nuevasPublicaciones = respuesta.data.map((publicacion) => ({
        ...publicacion,
        comentarios: [],
        abierto: false
      }))
      
      // TODO: Las acciones no debería usar ni tocar el estado actual, eso lo deben hacer los reducers
      const publicacionesActualizadas = [
        ...publicaciones,
        // ...respuesta.data
        nuevasPublicaciones
      ]

      dispatch({
        type: ACTUALIZAR_PUBLICACIONES,
        payload: publicacionesActualizadas
      })

      // la ultima casillas de las publicaciones:
      const publicaciones_key = publicacionesActualizadas.length - 1

      // actualizar usuarios:
      const usuarios_actualizados = [...usuarios]
      usuarios_actualizados[id] = {
        ...usuarios[id],
        publicaciones_key
      }

      dispatch({
        type: USUARIOS_TRAER_TODOS,
        payload: usuarios_actualizados
      })
    }
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Error al cargar los posts'
    })
  }
}

export const abrirCerrar = (publicacion_key, comentarioKey) => (dispatch, getState) => {
  console.log(`${publicacion_key}, ${comentarioKey}`)
  const {publicaciones} = getState().publicacionesReducer
  const publicacionSelect = publicaciones[publicacion_key][comentarioKey]

  const publicacionActualizada = {
    ...publicacionSelect,
    abierto: !publicacionSelect.abierto
  }

  const publicacionesActualizadas = [...publicaciones]
  publicacionesActualizadas[publicacion_key] = [
    ...publicaciones[publicacion_key]
  ]

  publicacionesActualizadas[publicacion_key][comentarioKey] = publicacionActualizada

  dispatch({
    type: ACTUALIZAR_PUBLICACIONES,
    payload: publicacionesActualizadas
  })
}

export const traerComentarios = (publicacion_key, comentarioKey) => async (dispatch, getState) => {
  const {publicaciones} = getState().publicacionesReducer
  const publicacionSelect = publicaciones[publicacion_key][comentarioKey]

  dispatch({
    type: COM_CARGANDO
  })
  try {
    const link = 'https://jsonplaceholder.typicode.com/comments?postId='
    const respuesta = await axios.get(`${link}${publicacionSelect.id}`)
    console.log('cargando----comentarios.........')
    const publicacionActualizada = {
      ...publicacionSelect,
      comentarios: respuesta.data
    }

    // para mantener la inmutabilidad: 
    /**
     * se toman las publicaciones actuales
     * se agregan los cambios en donde corresponda (en este caso, es agregar los comentarios)
     * se actualiza el state con ese nuevo valor de "publicaciones"
     */
    let publicacionesActualizadas = [...publicaciones]
    publicacionesActualizadas[publicacion_key] = [
      ...publicaciones[publicacion_key]
    ]

    publicacionesActualizadas[publicacion_key][comentarioKey] = publicacionActualizada

    // dispatch({
    //   type: ACTUALIZAR_PUBLICACIONES,
    //   payload: publicacionesActualizadas
    // })
    dispatch({
      type: ACTUALIZAR_COMENTARIOS,
      payload: publicacionesActualizadas
    })
  } catch (error) {
    dispatch({
      type: COM_ERROR,
      payload: 'Comentarios no disponibles'
    })
  }
}
