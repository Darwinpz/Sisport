
const Portafolio = require("../models/portafolio");

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

            const {cod_presidente,cod_docente,cod_periodo,cod_asignatura} = req.body;

            const newPortafolio = new Portafolio();

            newPortafolio.datos_informativos.cod_asignatura = cod_asignatura;
            newPortafolio.datos_informativos.cod_presidente = cod_presidente;
            newPortafolio.datos_informativos.cod_docente = cod_docente;
            newPortafolio.datos_informativos.cod_periodo = cod_periodo;
    
            await newPortafolio.save();
            
            res.status(200).json("Portafolio activado con éxito");

        } else {

            res.status(403).json("No tienes un usuario actualmente activo");

        }

    } catch (e) {

        res.status(500).json(e);

    }

}

module.exports = Portafolioctrl;