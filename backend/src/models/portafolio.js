const mongoose = require('mongoose');

const { Schema } = mongoose;

const PortafolioSchema = new Schema(
    {

        datos_informativos: {
            
            cod_asignatura: {type: String},
            cod_presidente: { type: String },
            cod_docente: { type: String },
            cod_periodo: { type: String },
            cod_semestre: { type: String }
        },

        elementos_curriculares: {

            syllabus: { type: String },
            expectativas: { type: String },
            apuntes: [],
            evaluaciones: [],
            investigaciones: [],
            practicas_lab: [],
            proyectos: [],
            casos_estudio: [],
            problemas: [],
            asistencia: { type: String },
            observaciones: { type: String },
            talleres: [],
            autonomos: [],
            refuerzo: []

        },

        informe_final: { type: String }

    }
);

module.exports = mongoose.model('Portafolios', PortafolioSchema);