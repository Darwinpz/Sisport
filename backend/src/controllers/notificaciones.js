const Notificaciones = require("../models/notificaciones");

const pool = require("../database/postgresql");

const Notificacionesctrl = {};


Notificacionesctrl.guardar_notificacion = async (req, res) => {

    try {
        if (req.session.per_id != null) {

            const { emisor, actividad,cod_asignatura,cod_periodo } = req.body;

            const responsables = await pool.query("SELECT p.per_id, p.per_nombres,per_apellidos,per_correo"
                + " FROM persona as p,det_persona_asignaturas as d"
                + " where p.per_id = d.per_id and asig_id = $1 and peri_id = $2 and p.per_tipo = 'Estudiante'", [cod_asignatura, cod_periodo]);


            for (const responsable of responsables.rows) {
                
                if(emisor != responsable.per_id){

                    const NewNotificacion = new Notificaciones({

                        per_id: responsable.per_id,
                        actividad: actividad,
                        emisor: emisor
                    })
                    
                    await NewNotificacion.save();

                }

            }

            
            res.status(200).json("Notificaciones guardadas con éxito");

        } else {

            res.status(403).json("No tienes un usuario actualmente activo");

        }

    } catch (e) {

        res.status(500).json(e);

    }


}


Notificacionesctrl.ver_notificaciones = async (req, res) => {

    if (req.session.per_id != null) {

        const notificaciones = await Notificaciones.find({ per_id: req.session.per_id });

        for (const notificacion of notificaciones) {
            
            const emisor = await pool.query("SELECT per_nombres ||' '||per_apellidos as nombre from Persona where per_id=$1", [notificacion.emisor]);

            notificacion.emisor = emisor.rows[0].nombre;

        }

        res.status(200).json(notificaciones);

    } else {

        res.status(403).json("No tienes un usuario actualmente activo");

    }

}



module.exports = Notificacionesctrl;