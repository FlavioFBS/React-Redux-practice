import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import * as tareasActions from '../../actions/tareas.actions';
import { Fatal } from '../general/Fatal';
import { Spinner } from '../general/Spinner';

class Tareas extends Component {

  componentDidMount() {
    if (!Object.keys(this.props.tareas).length) {
      this.props.traerTareas()
    }
  }

  async componentDidUpdate() {
    const {
      tareas, cargando, traerTareas
    } = this.props
    if (!Object.keys(this.props.tareas).length && !cargando) {
      traerTareas()
    }
  }

  ponerTareas = (userId) => {
    const {tareas, toggleDone, eliminar} = this.props
    const byUser = {
      ...tareas[userId]
    }
    return Object.keys(byUser).map(tareaId => (
      <div className="tareaItem mt-3" key={tareaId}>
        <input 
          type="checkbox" 
          defaultChecked={byUser[tareaId].completed} 
          onChange={() => {toggleDone(userId, tareaId)}}
        />
        {
          byUser[tareaId].title
        }
        <span>   </span>
        <button className="btn btn-warning mr-3">
          <Link to={`/tareas/guardar/${userId}/${tareaId}`}>
            Editar
          </Link>
        </button>
        <button 
          className="btn btn-danger"
          onClick={() => eliminar(tareaId)}
        >
          Eliminar</button>
      </div>
    ))
  }

  mostrarTareas = () => {
    const {tareas, cargando, error} = this.props

    if (cargando) {
      return <Spinner />
    }
    if (error.length) {
      return <Fatal message={error} />
    }
    return Object.keys(tareas).map(userId => (
      <div key={userId} className="bg-light tareasUserItem">
        <h2>
          Usuario {userId}
        </h2>
        <div className="tareasUsuarioContainer">
          {this.ponerTareas(userId)}
        </div>
      </div>
    ))
  }

  render() {
    return (
      <div className="container tareas-container">
        <button className="btn">
        <Link to="/tareas/guardar">Agregar</Link>
        </button>
        {this.mostrarTareas()}
      </div>
    )
  }
}

const mapStateToProps = ({tareasReducer}) => tareasReducer

export default connect(mapStateToProps, tareasActions)(Tareas)
