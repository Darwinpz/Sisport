import React, { Component } from 'react'

import axios from 'axios';

import config from '../header_session'


export default class main extends Component {

    state ={

        per_cedula:'',
        per_clave: '',
        conectado: false
    }

    onInputChange = (e) => {

        this.setState({

            [e.target.name]: e.target.value

        })

    }


    onSubmit = async (e) => {

        e.preventDefault();

        await axios.post('http://localhost:4000/api/usuarios/ingresar', {
            per_cedula: this.state.per_cedula,
            per_clave: this.state.per_clave

        },config[0])
        .then((response)=>{
            
            if(response.status === 200){

                window.location.href= "/principal";

            }
           
        }).catch((error)=>{

           if(error.response){

                console.log(error.response.data);
           }

        });

    }

    async componentWillMount(){

        await axios.get('http://localhost:4000/api/usuarios/conectado',config[0])
        .then((response)=>{
            
            if(response.status === 200){

                window.location.href= "/principal";
                
            }
           
        }).catch((error)=>{

           if(error.response){

                console.log(error.response.data);
           }

        });

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
                                    <input type="text" className="form-control" placeholder="Cédula" name="per_cedula" onChange={this.onInputChange} value={this.state.per_cedula}></input>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Contraseña" name="per_clave" onChange={this.onInputChange} value={this.state.per_clave}></input>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-block btn-primary" type="submit">Ingresar</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}
