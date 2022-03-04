import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as usuariosActions from '../../actions/users.actions';
import {Fatal} from '../general/Fatal';
import { Spinner } from '../general/Spinner';
import Tabla from './Tabla';


class Users extends Component  {

  // constructor() {
  //   super();
  //   this.state = {
  //     usuarios: []
  //   }
  // }

  componentDidMount() {
    if (!this.props.usuarios.length > 0) {
      this.props.traerTodos();
    }
    this.props.ejemplo()
  }

  ponercontenido = () => {
    if (this.props.cargando) {
      return (
        <Spinner/>
      )
    }
    if (this.props.error) {
      return (<Fatal message={this.props.error} />)
    }
    return (
      <>
      <h1>Usuarios</h1>
        <Tabla/>
      </>
    )
  }

  ponerFilas = () => (
    this.props.usuarios.map(u => (
      <tr key={u.id}>
        <td>{u.name}</td>
        <td>{u.email}</td>
        <td>{u.website}</td>
      </tr>
    ))
  );
  render() {
    console.log({props: this.props});
    (!this.props.cargando && <h2>Cargando</h2>)
    return (
      <div>
        {this.ponercontenido()}
      </div>
    )
  }
}

// se recibe por defecto todos los reducers
const mapStateProps = (reducers) => {
  // se indica qué reducers será los que el componente usará
  return reducers.userReducer;
}

export default connect(mapStateProps, usuariosActions)(Users);
