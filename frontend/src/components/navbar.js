import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import config from '../header_session'
import { If, Else, Then } from 'react-if';

export default class navbar extends Component {


    state = {

        conectado: false,
        per_id: '',
        per_correo: '',
        per_url_foto: ''

    }


    async componentWillMount() {

        await axios.get('http://192.168.50.124:4000/api/usuarios/sesion', config[0])
            .then((response) => {

                if (response.status === 200) {

                    this.setState({ conectado: true, per_id: response.data.per_id, per_correo: response.data.per_correo.split("@")[0], per_url_foto: response.data.per_url_foto });

                }

            }).catch((error) => {

                if (error.response) {

                    this.setState({ conectado: false});
                    console.log(error.response.data);
                }

            });

    }

    salir = async()=>{
        
        await axios.get('http://192.168.50.124:4000/api/usuarios/salir', config[0])
        .then((response) => {

            if (response.status === 200) {

                this.setState({ conectado: false });

                window.location.href="/"

                
            }

        }).catch((error) => {

            if (error.response) {

                console.log(error.response.data);
            }

        });


    }

    render() {

        return (

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top p-1 navbar-static-top">

                <div className="container">

                    <If condition={this.state.conectado}>
                        <Then>
                            <Link className="navbar-brand" to="/principal">Sistema de Gestión de Portafolios</Link>
                        </Then>

                        <Else>
                            <Link className="navbar-brand" to="/">Sistema de Gestión de Portafolios</Link>
                        </Else>
                    </If>

                    
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    
                    <If condition={this.state.conectado}>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto flex-row flex justify-content-around">
                                <li className="nav-item active">

                                    <Link type="button" to="/notificaciones" className="nav-link px-sm-5 px-lg-1" ><strong className="notificacion">0</strong><i className="fas fa-bell fa-lg px-2"></i></Link>
                                
                                </li>

                                <li className="nav-item dropdown active">
                                    
                                    <Link className="nav-link dropdown-toggle" to="/" data-toggle="dropdown">{this.state.per_correo}
                                    <img src={'https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg'} width="25" height="25" className="rounded-circle ml-2" alt="" />
                                    </Link>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item" to={"/perfil/"+this.state.per_id}>Perfil</Link>
                                        <button className="dropdown-item" onClick={()=>this.salir()}>Salir</button>

                                    </div>
                                </li>
                            </ul>
                        </div>
                    </If>

                </div>
            </nav>
        )
    }
}
