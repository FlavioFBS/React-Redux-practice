import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as usuariosActions from '../../actions/users.actions';
import * as publicacionesActions from '../../actions/publicaciones.actions';
import { Spinner } from '../general/Spinner';
import { Fatal } from '../general/Fatal';
import Comentarios from './Comentarios';

const { traerTodos: usuariosTraerTodos} = usuariosActions
const { 
  traerPorUsuarios: publicacionesTraerPorUsuario, 
  abrirCerrar, 
  traerComentarios
} = publicacionesActions

class Publicaciones extends Component {

  async componentDidMount() {

    const {
      usuariosTraerTodos,
      publicacionesTraerPorUsuario,
      match: {params: {key}}
    } = this.props

    if (!this.props.userReducer.usuarios.length) {
      // llamar usuarios
      await usuariosTraerTodos()
    }
    if (this.props.userReducer.error) {return}
    // se verificará si el usuario tiene el prop publicaciones_key, el cual indica si ya se hizo alguna peticion de sus posts
    if (!('publicaciones_key' in 
      this.props.userReducer.usuarios[key])) {
        await publicacionesTraerPorUsuario(key)
    }
  }

  ponerUsuario = () => {
    const {
      userReducer,
      match: {params: {key}}
    } = this.props
    if (userReducer.error) {
      return (<Fatal message={userReducer.error} />)
    }
    if (!userReducer.usuarios.length || userReducer.cargando) {
      return (
        <Spinner/>
      )
    }

    const nombre = userReducer.usuarios[key].name

    return (
      <h2 className="text-center mt-3">Publicaciones de {nombre}</h2>
    )
    
  }

  ponerPublicaciones = () => {
    const {
      userReducer,
      userReducer: {usuarios},
      publicacionesReducer,
      publicacionesReducer: {publicaciones},
      match: {params: {key}}
    } = this.props

    console.log({
      datos_props: {
        userReducer,
        usuarios,
        publicaciones,
        key,
        publicacionesReducer
      }
    });

    if (!usuarios.length) return
    if (userReducer.error.length) return
    if (publicacionesReducer.cargando) {
      return <Spinner />
    }
    if (publicacionesReducer.error.length) {
      return <Fatal message={publicacionesReducer.error}/>
    }
    if (!publicaciones.length) return
    if (!('publicaciones_key' in usuarios[key])) {
      return
    }
    const {publicaciones_key} = usuarios[key]
    return this.mostrarInfo(publicaciones, publicaciones_key)
  }

  mostrarInfo = (publicaciones, publicaciones_key) => {
    return publicaciones[publicaciones_key].map((publicacion, comentarioKey) => (
      <div className="bg-light" key={publicacion.id}
        onClick={()=> this.mostrarComentarios(publicaciones_key, comentarioKey, publicacion.comentarios) }
      >
        <h2>{publicacion.title}</h2>
        <p>
          {publicacion.body}
        </p>
        {
          (publicacion.abierto) ? <Comentarios comentarios={publicacion.comentarios}/> : ''
        }
        <br />
      </div>
    ))
  }

  mostrarComentarios = (publicaciones_key, comentarioKey, comentarios) => {
    this.props.abrirCerrar(publicaciones_key, comentarioKey)
    if (comentarios.length === 0) {
      console.log('traer--comentarios')
      this.props.traerComentarios(publicaciones_key, comentarioKey)
    }

  }


  render() {
    console.log({props: this.props});
    return (
      <div className="container">
        {/* {this.props.match.params.key} */}
        {this.ponerUsuario()}
        <hr />
        {this.ponerPublicaciones()}
      </div>
    )
  }
}

const mapStateToProps = ({userReducer, publicacionesReducer}) => {
  return {
    userReducer,
    publicacionesReducer
  }
}

const mapDispatchToProps = {
  usuariosTraerTodos,
  publicacionesTraerPorUsuario,
  abrirCerrar,
  traerComentarios
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
