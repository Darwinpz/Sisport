import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios';

export default class main extends Component {

    state ={

        Per_cedula:'',
        Per_contraseña: '',
        Per_token: ''

    }

    onInputChange = (e) => {

        this.setState({

            [e.target.name]: e.target.value

        })

    }


    onSubmit = async (e) => {

        e.preventDefault();

        const response = await axios.post('http://localhost:4000/sisport/api/usuarios/ingresar', {
            per_cedula: this.state.Per_cedula,
            per_contraseña: this.state.Per_contraseña
        });

        this.setState({Per_token:response.data})

        //window.location.href = "/principal"

    }

    render() {
        return (

            <div className="row mt-2">

                <div className="col-ml-6 mx-auto">

                    <div className="container text-center">

                        <img src={'/logo_utmach.png'} width="50%" alt="" />

                    </div>

                    <div className="card mt-5">

                        <div className="card-body">
                            <h5 className="card-title">Inicio de Sesión</h5>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Cédula" name="Per_cedula" onChange={this.onInputChange} value={this.state.Per_cedula}></input>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Contraseña" name="Per_contraseña" onChange={this.onInputChange} value={this.state.Per_contraseña}></input>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary" type="submit">Ingresar</button>
                                    <Link className="btn btn-link" to="/">¿Ha olvidado su contraseña?</Link>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}
