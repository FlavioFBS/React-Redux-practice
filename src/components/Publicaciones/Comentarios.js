import React from 'react'
import { connect } from 'react-redux'
import { Fatal } from '../general/Fatal'
import { Spinner } from '../general/Spinner'

const Comentarios = (props) => {

  if (props.comentarioError) {
    return <Fatal  message={props.comentarioError}/>
  }
  if (props.comentarioCargando && !props.comentarios.length) {
    return <Spinner/>
  }
  
  const ponerComentarios = () => (
    props.comentarios?.map((c) => (
      <li key={c.id} className="comentario-container">
        <b>
          <u>{c.email}</u>
        </b>
        <br />
        <p>{c.body}</p>
      </li>
    ))
  )

  return (
   <>
    <p className="comentario-title">Comentarios</p>
    <ul className="mt-4">
      {ponerComentarios()}
    </ul>
   </>
  )
}

const mapStateToProps = ({publicacionesReducer}) => publicacionesReducer

export default connect(mapStateToProps)(Comentarios)
