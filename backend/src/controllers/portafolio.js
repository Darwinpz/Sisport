
const Portafolio = require("../models/portafolio");

const pool = require("../database/postgresql");

const Portafolioctrl = {};

Portafolioctrl.ver = async (req, res) => {

    try {

        if (req.session.per_id != null) {



        } else {

            res.status(403).json("No tienes un usuario actualmente activo");

        }

    } catch (e) {

        res.status(500).json(e);

    }

}

Portafolioctrl.activar = async (req, res) => {

    try {

        if (req.session.per_id != null) {

            const { cod_presidente, cod_docente, cod_periodo, cod_asignatura, peri_fecha_inicio, peri_fecha_fin } = req.body;

            const newPortafolio = new Portafolio();

            newPortafolio.datos_informativos.cod_asignatura = cod_asignatura;
            newPortafolio.datos_informativos.cod_presidente = cod_presidente;
            newPortafolio.datos_informativos.cod_docente = cod_docente;
            newPortafolio.datos_informativos.cod_periodo = cod_periodo;

            newPortafolio.elementos_curriculares.syllabus = '';
            newPortafolio.elementos_curriculares.expectativas = '';
            newPortafolio.elementos_curriculares.asistencia = '';
            newPortafolio.elementos_curriculares.expectativas = '';
            newPortafolio.informe_final = '';

            var semanas = total_semanas(peri_fecha_inicio, peri_fecha_fin);

            const horario = await pool.query("Select *from horarios where asig_id = $1 and peri_id = $2 order by hor_num_dia", [cod_asignatura, cod_periodo]);

            const responsables = await pool.query("SELECT p.per_id, p.per_nombres,per_apellidos,per_correo"
                + " FROM persona as p,det_persona_asignaturas as d"
                + " where p.per_id = d.per_id and asig_id = $1 and peri_id = $2 and p.per_tipo = 'Estudiante'", [cod_asignatura, cod_periodo]);


            var num_diario = 0;

            var fecha_inicio = new Date(peri_fecha_inicio);

            for (let index = 0; index < semanas; index++) {

                horario.rows.forEach(dia => {

                    json_diario = {
                        "cod_estudiante_resp": "", "num_diario": "", "tiempo": "", "fecha": "", "unidad": "",
                        "tema": "", "problema": "", "contenidos": "", "objetivos": "", "actividades": "", "estrategias": "",
                        "resumen": "", "reflexion": "", "anexos": "", "modificacion": ""
                    }

                    num_diario++;

                    var fecha_diario = new Date(fecha_inicio);

                    fecha_diario.setDate(fecha_diario.getDate() + (dia.hor_num_dia - 1));

                    var pos_estudiante = Math.abs(Math.round(Math.random() * ((responsables.rowCount - 1) - 0) + 0));

                    json_diario["cod_estudiante_resp"] = responsables.rows[pos_estudiante].per_id;
                    json_diario["num_diario"] = num_diario;
                    json_diario["tiempo"] = dia.hor_cant_horas;
                    json_diario["fecha"] = dia.hor_dia + ", " + fecha_diario.getDate() + " de " + obtener_mes(fecha_diario.getMonth()) + " del " + fecha_diario.getFullYear();
                    json_diario["unidad"] = "";
                    json_diario["tema"] = "";
                    json_diario["problema"] = "";
                    json_diario["contenidos"] = "";
                    json_diario["objetivos"] = "";
                    json_diario["actividades"] = "";
                    json_diario["estrategias"] = "";
                    json_diario["resumen"] = "";
                    json_diario["reflexion"] = "";
                    json_diario["estrategias"] = "";
                    json_diario["anexos"] = "";
                    json_diario["modificacion"] = Date.now;

                    newPortafolio.elementos_curriculares.apuntes.push(json_diario);

                });

                fecha_inicio.setDate(fecha_inicio.getDate() + 7);

            }

            await newPortafolio.save();

            res.status(200).json("Portafolio activado con éxito");

        } else {

            res.status(403).json("No tienes un usuario actualmente activo");

        }

    } catch (e) {

        res.status(500).json(e);

    }

}


function obtener_mes(num_mes) {

    var meses = ['Enero', 'Febero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    return meses[num_mes];

}

function total_semanas(fecha_inicio, fecha_fin) {

    var inicio = new Date(fecha_inicio);
    var fin = new Date(fecha_fin);
    var cant_dias = fin.getTime() - inicio.getTime();

    return Math.round(cant_dias / (1000 * 60 * 60 * 24 * 7));
}

module.exports = Portafolioctrl;