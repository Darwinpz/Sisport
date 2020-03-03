import React, { Component } from 'react'

import axios from 'axios';
import config from '../header_session'

import { Link } from 'react-router-dom'

import { If, Then, Else } from 'react-if';

import socketIOClient from 'socket.io-client';

var socket;

export default class principal extends Component {

    state = {

        server: "http://172.31.44.79:4000",
        datos_asignaturas: [],
        per_id: '',
        per_cargo: ''

    }

    async componentWillMount() {

        await axios.all([this.getsesion(), this.getAsignaturas()])
            .then(axios.spread((conectado, asignaturas) => {

                if (conectado.status !== 200) {

                    window.location.href = "/";

                } else {

                    if (asignaturas.status === 200) {

                        if (conectado.data.cargo !== null) {

                            this.setState({ per_cargo: conectado.data.cargo.per_cargo });

                        }
                        this.setState({ per_id: conectado.data.per_id });
                        this.setState({ datos_asignaturas: asignaturas.data });

                        socket = socketIOClient(this.state.server);

                        socket.on("activar_diario", data => {

                            this.state.datos_asignaturas.forEach(datos => {

                                if (datos["peri_id"] === data.cod_periodo) {

                                    datos.asignaturas.forEach(asig => {

                                        if (asig["asig_id"] === data.cod_asignatura) {

                                            asig["activo"] = true;

                                            const asig_id = asig['asig_id'];
                                            const peri_id = asig['peri_id'];

                                            var button = document.createElement('a');
                                            button.className = "btn btn-primary float-right";
                                            button.innerText = "Ver Portafolio";
                                            button.href = "/portafolio/"+asig_id+"-"+peri_id;

                                            if(document.getElementsByClassName(asig_id+"-"+peri_id)[0] !== undefined){

                                                document.getElementsByClassName(asig_id+"-"+peri_id)[0].children[0].append(button);

                                            }
                                            
                                            var num = parseInt(document.getElementsByClassName("notificacion")[0].innerText);

                                            document.getElementsByClassName("notificacion")[0].innerText = (num + 1);
                                            
                                            
                                        }

                                    });

                                }

                            });

                        });


                    }

                }

            })).catch(err => {

                console.log(err.response);

            });

    }

    getAsignaturas = async () => {

        return await axios.get('http://172.31.44.79:4000/api/usuarios/asignaturas', config[0]);

    }

    getsesion = async () => {

        return await axios.get('http://172.31.44.79:4000/api/usuarios/conectado', config[0]);

    }

    guardar_notificacion = async(actividad,cod_asignatura,cod_periodo) =>{

        await axios.post('http://172.31.44.79:4000/api/notificaciones/guardar', {

            actividad: actividad,
            emisor: this.state.per_id,
            cod_asignatura:cod_asignatura,
            cod_periodo:cod_periodo

        }, config[0])
            .then((response) => {

                if (response.status === 200) {
                    
                    console.log(response);
                    
                }

            }).catch((error) => {

                if (error.response) {

                    console.log(error.response.data);
                }

            });


    }


    activar_portafolio = async (asignatura) => {

        await axios.post('http://172.31.44.79:4000/api/portafolio/activar', {

            cod_asignatura: asignatura.asig_id,
            cod_presidente: this.state.per_id,
            cod_docente: asignatura.docente_id,
            cod_periodo: asignatura.peri_id,
            peri_fecha_inicio: asignatura.peri_fecha_inicio,
            peri_fecha_fin: asignatura.peri_fecha_fin

        }, config[0])
            .then((response) => {

                if (response.status === 200) {

                    
                    socket.emit("activar_diario", {

                        cod_asignatura: asignatura.asig_id,
                        cod_periodo: asignatura.peri_id,
                        cod_presidente: this.state.per_id,

                    });

                    this.guardar_notificacion("EL PORTAFOLIO DE "+asignatura.asig_nombre +" ESTÁ HABILITADO",asignatura.asig_id,asignatura.peri_id);

                    window.location.href= "/portafolio/"+asignatura.asig_id+"-"+asignatura.peri_id;
                   
                }

            }).catch((error) => {

                if (error.response) {

                    console.log(error.response.data);
                }

            });

    }


    render() {
        return (

            <div className="container">

                {
                    this.state.datos_asignaturas.map((datos, index) => (

                        <div key={index}>

                            <div className="row mb-3">

                                <div className="col text-center">

                                    <h2>PORTAFOLIOS DE LAS ASIGNATURAS - PERIODO  {datos.peri_nombre}</h2>

                                </div>

                            </div>

                            <div className="row">

                                {datos.asignaturas.map((asignatura, index) => (

                                    <div className="col-md-6 col-lg-4 mb-3" key={index}>
                                        <div className={"card "+asignatura.asig_id + "-" + asignatura.peri_id} style={{ boxShadow: "0 2px 10px rgba(0,0,0,.075)", borderTop: "4px solid #0ea0ff" }} >
                                            <div className="card-body">

                                                <h5 className="card-title">{asignatura.asig_nombre}</h5>
                                                <Link className="card-text mb-1" style={{ color: "black" }} to={"/perfil/" + asignatura.docente_id} >{asignatura.docente}</Link>
                                                <p className="card-text mb-1"><small className="text-muted">{asignatura.sem_nombre} SEMESTRE</small></p>
                                                <p className="card-text"><small className="text-muted">-{asignatura.asig_id}-</small></p>

                                                <If condition={asignatura.activo}>

                                                    <Then>

                                                        <Link  className="btn btn-primary float-right " to={"/portafolio/"+asignatura.asig_id+"-"+asignatura.peri_id} >Ver Portafolio</Link>

                                                    </Then>

                                                    <Else>

                                                        <If condition={this.state.per_cargo !== ''}>

                                                            <button type="submit" className="btn btn-success float-right ml-2" onClick={() => this.activar_portafolio(asignatura)}>Activar Portafolio</button>

                                                        </If>
                                                    </Else>

                                                </If>

                                            </div>
                                        </div>

                                    </div>
                                ))}

                            </div>


                        </div>

                    ))
                }


            </div>

        )
    }
}
