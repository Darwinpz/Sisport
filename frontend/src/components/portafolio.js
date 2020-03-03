import React, { Component } from 'react'

import axios from 'axios';
import config from '../header_session'


export default class portafolio extends Component {

    state = {

        portafolio: [],
        responsables: []

    }

    async componentWillMount() {

        await axios.post('http://192.168.50.124:4000/api/portafolio/ver', {

            cod_asignatura: window.location.pathname.split("/")[2].split("-")[0],
            cod_periodo: window.location.pathname.split("/")[2].split("-")[1],

        }, config[0])
            .then((response) => {

                if (response.status === 200) {

                    this.setState({ responsables: response.data.responsables, portafolio: response.data.portafolio[0] });

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

                <div className="row">

                    <div className="col">

                    </div>

                    <div className="col">

                        <div className="row">

                            {this.state.responsables.map((estudiante, index) =>
                                (
                                    <div className="col-md-6" key={index}>

                                        <div className="card mb-2">

                                            <div className="card-body" >
                                                <h6 className="card-title">{estudiante.per_nombres.split(" ")[0] + " " + estudiante.per_apellidos.split(" ")[0]}</h6>
                                                <p className="card-text text-muted">{estudiante.per_correo.split(".")[0]}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>

                    </div>
                </div>
                
            </div>

        )
    }
}
