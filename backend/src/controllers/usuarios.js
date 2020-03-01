
const pool = require("../database/postgresql");

const Usuarioctrl = {};


Usuarioctrl.ver = async (req, res) => {


    try {

        const usuarios = await pool.query('SELECT *FROM persona ');

        res.status(200).json(usuarios.rows);

    } catch (e) {

        res.status(500).json(e);

    }

}

Usuarioctrl.conectado = (req, res) => {


    if (req.session.per_id != null) {

        res.status(200).json(req.session.per_id);

    } else {

        res.status(403).json("No tienes un usuario actualmente activo");

    }


}

Usuarioctrl.sesion = async (req, res) => {

    try {
        if (req.session.per_id != null) {

            const per_id = req.session.per_id;

            const usuario = await pool.query('SELECT per_id, per_nombres, per_apellidos, per_correo, per_tipo, per_titulo,per_url_foto FROM persona where per_id =$1', [per_id]);

            if (usuario.rowCount > 0) {

                res.status(200).json(usuario.rows[0]);

            } else {

                res.status(204).json("El usuario no tiene datos");

            }

        } else {

            res.status(403).json("No tienes un usuario actualmente activo");

        }

    } catch (e) {

        res.status(500).json(e);

    }

}


Usuarioctrl.perfil = async (req, res) => {

    try {

        if (req.session.per_id != null) {

            const per_id = req.params["id"];

            const usuario = await pool.query('SELECT *FROM persona where per_id =$1', [per_id]);

            if (usuario.rowCount > 0) {

                res.status(200).json(usuario.rows[0]);

            } else {

                res.status(204).json("El usuario no tiene datos");

            }

        } else {

            res.status(403).json("No tienes un usuario actualmente activo");

        }

    } catch (e) {

        res.status(500).json(e);

    }

}

Usuarioctrl.ingresar = async (req, res) => {

    try {


        const { per_cedula, per_clave } = req.body;

        const usuario = await pool.query('SELECT per_id FROM persona where per_cedula =$1 and per_clave = $2', [per_cedula, per_clave]);

        if (usuario.rowCount > 0) {

            req.session.per_id = usuario.rows[0].per_id;

            res.status(200).json("Sesión iniciada correctamente");


        } else {

            res.status(403).json("Correo o clave inválido");

        }


    } catch (e) {

        res.status(500).json(e);

    }


}

Usuarioctrl.salir = async (req, res) => {

    try {

        if (req.session.per_id != null) {

            req.session.destroy();

            res.status(200).json("Sesión cerrada correctamente");

        } else {

            res.status(403).json("No tienes un usuario actualmente activo");

        }

    } catch (e) {

        res.status(500).json(e);

    }

}


Usuarioctrl.asignaturas = async (req, res) => {

    try {

        if (req.session.per_id != null) {

            var datos = [];

            const per_id = req.session.per_id;

            const periodos = await pool.query("SELECT *FROM periodo where peri_id IN (SELECT peri_id FROM det_persona_asignaturas where per_id = $1 INTERSECT SELECT peri_id FROM periodo)",[per_id]);

            periodos.rows.forEach(element => {
                
               datos.push(Object.assign({}, element, {asignaturas:[]}));

            });

            

            const list_asignaturas = await pool.query(
                "SELECT s.sem_nombre,d.asig_id,a.asig_nombre, vi.per_id as docente_id, p.per_titulo||' '||p.per_nombres ||' '|| p.per_apellidos as docente, d.peri_id"
                +" FROM det_persona_asignaturas as d,asignaturas as a, vi_docentes_asignaturas as vi , persona as p, semestre as s"
                +" WHERE d.asig_id = a.asig_id"
                +" and vi.asig_id = d.asig_id"
                +" and vi.peri_id = d.peri_id"
                +" and p.per_id = vi.per_id"
                +" and a.sem_id = s.sem_id"
                +" and d.per_id = $1"
                +" order by d.peri_id", [per_id]);


            if (list_asignaturas.rowCount > 0) {

                list_asignaturas.rows.forEach(asig => {
                    
                    datos.forEach(peri => {
                
                        if(peri["peri_id"] == asig["peri_id"]){
                        
                            peri["asignaturas"].push(asig);

                        }

                    });

                });


                res.status(200).json(datos);

            } else {

                res.status(204).json("El usuario no tiene asignaturas");

            }

        } else {

            res.status(403).json("No tienes un usuario actualmente activo");

        }

    } catch (e) {

        res.status(500).json(e);

    }

}

module.exports = Usuarioctrl;