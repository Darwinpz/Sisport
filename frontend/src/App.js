import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'popper.js';

import Navbar from './components/navbar';
import Main from './components/main';
import Principal from './components/principal';
import Portafolio from './components/portafolio';
import Perfil from './components/perfil'

import Prueba from './components/prueba'

function App() {
  return (

    <Router>

      <Navbar />

      <div className="container p-4">

        <Route path="/" exact component={Main} />

        <Route path="/principal" component={Principal} />

        <Route path="/portafolio/:id" component={Portafolio} />

        <Route path="/perfil" component={Perfil} />

        <Route path="/prueba" component={Prueba} />

      </div>

    </Router>
  );
}

export default App;
