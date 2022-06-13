import React from 'react';
import { Header } from './components/ui/Header';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";

import { TipoView } from './components/tipos/TipoView';
import { MarcaView } from './components/marcas/MarcaView';
import { EstadoView } from './components/estados/EstadoView';
import { UsuarioView } from './components/usuarios/UsuarioView';
import { InventarioView } from './components/inventarios/InventarioView';
import { inventarioUpdate } from './components/inventarios/inventarioUpdate';


const App = () => {

    return <Router>
        <Header/>
        <Switch>
            <Route exact path='/' component={ InventarioView }/>
            <Route exact path='/usuarios' component={ UsuarioView }/>
            <Route exact path='/marcas' component={ MarcaView }/>
            <Route exact path='/marcas/:marcaId' component={ MarcaView }/>
            <Route exact path='/estados' component={ EstadoView }/>
            <Route exact path='/tipos' component={ TipoView }/>
            {/* <Route exact path='/inventarios/edit/:id/:serial' component={ inventarioUpdate }/> */}
            <Route exact path='/inventarios/edit/:inventarioId' component={ inventarioUpdate }/>
            <Redirect to='/' />
        </Switch>
    </Router>
}

export {
    App
}