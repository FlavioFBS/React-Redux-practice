import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

const Tabla = (props) => {
  
  const ponerFilas = () => (
    props.usuarios.map((u, key) => (
      <tr key={u.id}>
        <td>{u.name}</td>
        <td>{u.email}</td>
        <td>{u.website}</td>
        <td>
          <Link to={`/publicaciones/${key}`} >
            <div className="eye-solid icon">

            </div>
          </Link>
        </td>
      </tr>
    ))
  );
  return (
    <>
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>
          {ponerFilas()}
        </tbody>
      </table>
    </>
  )
}

const mapStateProps = (reducers) => {
  return reducers.userReducer;
}

export default connect(mapStateProps)(Tabla);
