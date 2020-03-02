import React, { Component } from 'react'

import axios from 'axios';
import config from '../header_session'

import { Link } from 'react-router-dom'

import { If, Then, Else } from 'react-if';

export default class principal extends Component {

    state = {

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

                    }

                }

            })).catch(err => {

                console.log(err.response);

            });


    }

    getAsignaturas = async () => {

        return await axios.get('http://localhost:4000/api/usuarios/asignaturas', config[0]);

    }

    getsesion = async () => {

        return await axios.get('http://localhost:4000/api/usuarios/conectado', config[0]);

    }


    activar_portafolio = async (asignatura) => {

        await axios.post('http://localhost:4000/api/portafolio/activar', {

            cod_asignatura: asignatura.asig_id,
            cod_presidente: this.state.per_id,
            cod_docente: asignatura.docente_id,
            cod_periodo: asignatura.peri_id,
            peri_fecha_inicio: asignatura.peri_fecha_inicio,
            peri_fecha_fin: asignatura.peri_fecha_fin

        }, config[0])
            .then((response) => {

                if (response.status === 200) {

                    //window.location.href= "/principal";

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
                                        <div className="card " style={{ boxShadow: "0 2px 10px rgba(0,0,0,.075)", borderTop: "4px solid #0ea0ff" }}>
                                            <div className="card-body">

                                                <h5 className="card-title">{asignatura.asig_nombre}</h5>
                                                <Link className="card-text mb-1" style={{ color: "black" }} to={"/perfil/" + asignatura.docente_id} >{asignatura.docente}</Link>
                                                <p className="card-text mb-1"><small className="text-muted">{asignatura.sem_nombre} SEMESTRE</small></p>
                                                <p className="card-text"><small className="text-muted">-{asignatura.asig_id}-</small></p>

                                                <If condition={asignatura.activo}>

                                                    <Then>

                                                        <button type="submit" className="btn btn-primary float-right" >Ver Portafolio</button>

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
