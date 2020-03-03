import React, { Component } from 'react'
import axios from 'axios';

import config from '../header_session'

export default class perfil extends Component {


    state = {

        per_obj: {}

    }

    async componentWillMount() {

        const user_id = window.location.pathname.split("/")[2];

        if (user_id != null) {

            await axios.get('http://192.168.50.124:4000/api/usuarios/' + user_id, config[0])
                .then((response) => {

                    if (response.status === 200) {

                        this.setState({ per_obj: response.data });

                    }

                }).catch((error) => {

                    if (error.response) {

                        console.log(error.response.data);
                    }

                });

        }

    }


    render() {
        return (

            <div className="row mt-2">

                <div className="col-md-5 mb-3 mx-auto">

                    <div className="container text-center ">

                        <img src={'/logo_utmach.png'} width="90%" alt="" className="img-fluid" />

                    </div>

                </div>
                <div className="col-md-7 mx-auto">


                    <div className="card border-danger">

                        <div className="card-header text-white bg-danger">

                            <div className="card-title"><h4>Perfil</h4></div>

                        </div>

                        <div className="card-body">
                            <div className="row ">
                                <div className="col">
                                    <h3 className="text-center ">{this.state.per_obj["per_nombres"]} {this.state.per_obj["per_apellidos"]}</h3>

                                </div>

                            </div>
                            <div className="row">

                                <div className="col">
                                    <p className="text-left"><strong>Correo:</strong></p>
                                    <p className="text-nowrap text-left">{this.state.per_obj["per_correo"]}</p>
                                    <p className="text-left"><strong>Tipo de Usuario:</strong></p>
                                    <p className="text-left">{this.state.per_obj["per_tipo"]}</p>
                                    <p className="text-left"><strong>Titulo</strong></p>
                                    <p className="text-left">{this.state.per_obj["per_titulo"]}</p>

                                </div>

                                <div className="col">
                                    <p className="text-left"><strong>Direccion:</strong></p>
                                    <p className="text-nowrap text-left">{this.state.per_obj["per_direccion"]}</p>
                                    <p className="text-left"><strong>Celular:</strong></p>
                                    <p className="text-left">{this.state.per_obj["per_celular"]}</p>
                                    <p className="text-left"><strong>Sexo</strong></p>
                                    <p className="text-left">{this.state.per_obj["per_sexo"]}</p>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>

            </div>


        )
    }
}
