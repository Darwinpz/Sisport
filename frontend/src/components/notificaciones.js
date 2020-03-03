import React, { Component } from 'react'

export default class notificaciones extends Component {

    async componentWillMount(){
        
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

                        <div className="card mt-2">

                            <div className="card-header">
                                <strong>Darwin Pilaloa</strong> - 02/03/2020
                            </div>
                            <div className="card-body">
                                Portafolio ... Habilitado
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        )
    }
}
