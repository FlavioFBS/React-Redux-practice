import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Menu } from './Menu'
import Publicaciones from './Publicaciones'
import Tareas from './Tareas'
import TareasGuardar from './Tareas/Guardar'
import Users from './users'

const App = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch className="margen">
        <Route exact={true} path='/' component={Users} />
        <Route exact={true} path='/tareas' component={Tareas} />
        <Route exact={true} path='/tareas/guardar' component={TareasGuardar} />
        <Route exact={true} path='/publicaciones/:key' component={Publicaciones} />
        <Route exact={true} path='/tareas/guardar/:userId/:tareaId' component={TareasGuardar} />

    
      </Switch>
    </BrowserRouter>
  )
}
export default App;
