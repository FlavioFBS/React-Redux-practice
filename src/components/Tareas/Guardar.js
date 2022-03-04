import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import * as tareasActions from '../../actions/tareas.actions';
import { Fatal } from '../general/Fatal';
import { Spinner } from '../general/Spinner';

class Guardar extends Component {

  async componentDidMount() {
    if (!this.props.tareas.length) {
      await this.props.traerTareas()
    }
    const {
      match: {params: {userId, tareaId}},
      tareas,
      cambioUsuarioId,
      cambioTitulo,
      limpiarForma
    } = this.props

    if (userId && tareaId) {
      const tarea = tareas[userId][tareaId]
      cambioUsuarioId(tarea.userId)
      cambioTitulo(tarea.title)
    } else {
      limpiarForma()
    }
  }

  cambioUsuarioId = (event) => {
    this.props.cambioUsuarioId(event.target.value)
  }

  cambioTitulo = (event) => {
    this.props.cambioTitulo(event.target.value)
  }

  guardar = async () => {
    const {
      usuario_id, 
      titulo, 
      agregar,
      match: {params: {userId, tareaId}},
      tareas,
      editar
    } = this.props
    const nuevaTarea = {
      userId: usuario_id,
      title: titulo,
      completed: false
    }
    if (userId && tareaId) {
      const tarea = tareas[userId][tareaId]
      const tarea_editada = {
        ...nuevaTarea,
        completed: tarea.completed,
        id: tarea.id
      }
      editar(tarea_editada)
    } else {
      await agregar(nuevaTarea)
    }
  }

  deshabilitar = () => {
    const {usuario_id, titulo, cargando } = this.props
    if (cargando) {
      return true
    }
    if (!usuario_id || !titulo) {
      return true
    }
    return false
  }

  mostrarAction = () => {
    const {error, cargando} = this.props
    if (cargando) {
      return <Spinner />
    }
    if (error.length) {
      return <Fatal message={this.error}/>
    }
  }

  render() {
    return (
      <div className="container">
        {
          this.props.regresar ? <Redirect to="/tareas"/> : null
        }
        <h2>Registro de tarea</h2>
        <div className="form-group">
          <label>Usuario id</label>
          <input type="number" 
            value={this.props.usuario_id}
            name="" id="" className="form-control" 
            onChange={this.cambioUsuarioId}
            placeholder="" aria-describedby="helpId" required />
        </div>
        <div className="form-group">
          <label>Título</label>
          <input type="text"
            value={this.props.titulo || ''}
            onChange={this.cambioTitulo}
            name="" id="" className="form-control" placeholder=""
            aria-describedby="helpId"
            required
          />
        </div>
        <button
          onClick={this.guardar}
          className="btn btn-primary"
          disabled={this.deshabilitar()}
         >Guardar</button>
        {this.mostrarAction()}
      </div>
    )
  }
}

const mapStateToProps = ({tareasReducer}) => tareasReducer

export default connect(mapStateToProps, tareasActions)(Guardar)
