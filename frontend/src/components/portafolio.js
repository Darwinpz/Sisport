import React, { Component } from 'react'

import axios from 'axios';
import config from '../header_session'

import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CheckboxTree from 'react-checkbox-tree';

import { If } from 'react-if';



export default class portafolio extends Component {


    state = {

        responsables: [],
        checked: [],
        expanded: [],
        per_cargo: ''
    }

    async componentWillMount() {
        
        await axios.all([this.getsesion(), this.getPortafolio()])
            .then(axios.spread((conectado, asignaturas) => {
                
                if (conectado.status === 200) {

                    if (conectado.data.cargo !== null) {
                        
                        this.setState({ per_cargo: conectado.data.cargo.per_cargo });
                    }
                }
                if(asignaturas.status ===  200){

                    this.setState({ responsables: asignaturas.data.responsables});

                }

            })).catch((error) => {

                if (error.response) {

                    console.log(error.response.data);
                }

            });
            

    }


    getPortafolio = async () => {

        return await axios.post('http://localhost:4000/api/portafolio/ver', {

            cod_asignatura: window.location.pathname.split("/")[2].split("-")[0],
            cod_periodo: window.location.pathname.split("/")[2].split("-")[1],

        }, config[0]);

    }

    getsesion = async () => {

        return await axios.get('http://localhost:4000/api/usuarios/conectado', config[0]);

    }


    render() {

        const estructura_portafolio = [{
            value: window.location.pathname.split("/")[2].split("-")[0] + "-" + window.location.pathname.split("/")[2].split("-")[1],
            label: window.location.pathname.split("/")[2].split("-")[0] + "-" + window.location.pathname.split("/")[2].split("-")[1],
            children: [
                {
                    value: 'datos Informativos', label: 'Datos Informativos',

                    children: [
                        { value: 'informacion_general', label: 'Información general' }
                    ]

                },
                {
                    value: 'elementos_curriculares', label: 'Elementos curriculares',
                    children: [
                        { value: 'syllabus', label: 'Syllabus' },
                        { value: 'expectativas', label: 'Expectativas' },
                        { value: 'apuntes', label: 'Apuntes' },
                        { value: 'evaluaciones', label: 'Evaluaciones' },
                        { value: 'investigaciones', label: 'Investigaciones' },
                        { value: 'practicas_lab', label: 'Practicas de laboratorio' },
                        { value: 'proyectos', label: 'Proyectos' },
                        { value: 'casos_estudio', label: 'Casos de estudio' },
                        { value: 'problemas', label: 'Problemas' },
                        { value: 'talleres', label: 'Talleres' },
                        { value: 'autonomos', label: 'Trabajos Autonomos' },
                        { value: 'refuerzo', label: 'Refuerzo' },
                        { value: 'asistencia', label: 'Asistencia' }
                    ]
                },
                { value: 'informe_final', label: 'informe_final' },

            ],
        }];
        return (

            <div className="container">

                <div className="row">

                    <div className="col">

                        <CheckboxTree
                            nodes={estructura_portafolio}
                            expanded={this.state.expanded}
                            onCheck={checked => this.setState({ checked })}
                            onExpand={expanded => this.setState({ expanded })}
                            showExpandAll
                        />

                        <If condition={this.state.per_cargo !== ''}>

                            <div className="row">

                                <button className="btn btn-success btn-block mt-3 ">Descargar Portafolio</button>

                                <button className="btn btn-danger btn-block mt-2 mb-2">Eliminar Portafolio</button>

                            </div>

                        </If>

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
                                                <p className="card-text mb-1">Diarios:</p>
                                                <p className="card-text text-muted">{estudiante.num_diarios.split("undefined,")[1]}</p>
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
