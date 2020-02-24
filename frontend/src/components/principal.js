import React, { Component } from 'react'

export default class principal extends Component {
    render() {
        return (

            <div className="container">

                <div className="row mb-3">

                    <div className="col text-center">

                        <h2>PORTAFOLIOS DE LAS ASIGNATURAS - PERIODO  </h2>

                    </div>
                    
                </div>

                <div className="row">

                    <div className="col-md-6 col-lg-4 mb-3">
                        <div className="card card-principal">
                            <div className="card-body">

                                <h5 className="card-title">ADMINISTRACION DE CENTROS DE COMPUTO</h5>
                                <p className="card-text mb-1" >Ing. Nancy Loja, Mgs.</p>
                                <p className="card-text"><small className="text-muted">NOVENO SEMESTRE</small></p>

                                <form>

                                    <button type="submit" className="btn btn-danger float-right">Activar</button>
                                
                                </form>

                            </div>
                        </div>
                    </div>

                </div>

            </div>

        )
    }
}
