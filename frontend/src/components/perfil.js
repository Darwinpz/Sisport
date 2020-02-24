import React, { Component } from 'react'
import axios from 'axios';

export default class perfil extends Component {


    state = {

        Per_id: 1,

        Per_obj: {}

    }

    async componentDidMount() {

        const respuesta = await axios.get('http://localhost:4000/sisport/api/usuarios/' + this.state.Per_id);

        this.setState({ Per_obj: respuesta.data });


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

                            <h3 className="text-center">{this.state.Per_obj["per_nombres"]} {this.state.Per_obj["per_apellidos"]}</h3>
                            <p className="text-left"><strong>Correo:</strong></p>
                            <p className="text-nowrap text-left">{this.state.Per_obj["per_correo"]}</p>
                            <p className="text-left"><strong>Tipo de Usuario:</strong></p>
                            <p className="text-left">{this.state.Per_obj["per_tipo"]}</p>
                            <p className="text-left"><strong>Titulo</strong></p>
                            <p className="text-left">{this.state.Per_obj["per_titulo"]}</p>

                        </div>
                    </div>

                </div>

            </div>


        )
    }
}
