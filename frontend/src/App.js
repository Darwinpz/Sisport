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
import Notificaciones from './components/notificaciones';


function App() {
  return (

    <Router>

      <Navbar />

      <div className="container mt-5 p-5">

        <Route path="/" exact component={Main} />

        <Route path="/principal" component={Principal} />
        
        <Route path="/notificaciones" component={Notificaciones} />
        
        <Route path="/portafolio" component={Portafolio} />

        <Route path="/perfil/:id" component={Perfil} />

        
      </div>

    </Router>
  );
}

export default App;
