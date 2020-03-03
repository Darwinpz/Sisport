import React, { Component } from 'react'

import axios from 'axios';

import config from '../header_session'

export default class notificaciones extends Component {

    state = {

        notificaciones: []
    }

    async componentWillMount(){
        
        await axios.get('http://172.31.44.79:4000/api/notificaciones/ver', config[0])
            .then((response) => {

                if (response.status === 200) {

                    this.setState({ notificaciones: response.data });

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

                <div className="row mb-3">
                    
                    <div className="col text-center">

                        <h2>Notificaciones</h2>

                    </div>

                </div>
                <div className="row">

                    <div className="col">

                    { this.state.notificaciones.map((notificacion,index)=>(
                    
                        <div className="card mt-2" key={index} >

                            <div className="card-header">
                                <strong>{notificacion.emisor}</strong> - {notificacion.timestamp}
                            </div>
                            <div className="card-body">
                                {notificacion.actividad}
                            </div>

                        </div>
                        ))

                    }

                    </div>

                </div>

            </div>
        )
    }
}
