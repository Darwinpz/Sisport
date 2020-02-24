
const pool = require("../database/postgresql");

//const jwt = require('jsonwebtoken');


const Usuarioctrl = {};


Usuarioctrl.ver = async(req,res) =>{

    
    try{
      
        const usuarios = await pool.query('SELECT *FROM persona ');

        res.status(200).json(usuarios.rows);

    }catch(e){

        res.status(500).json({mensaje:"Error",error:e});

    }

}

Usuarioctrl.ver_perfil = async(req,res) =>{

    console.log("id: "+req.session.Per_id);
    
    try{
    
        const per_id = req.params.id;
                
        const usuario = await pool.query('SELECT *FROM persona where per_id =$1',[per_id]);
        
        if(usuario.rowCount >0){

            res.status(200).json(usuario.rows[0]);

        }else{

            res.status(200).json({});

        }
        
    }catch(e){

        res.status(500).json({mensaje:"Error",error:e});

    }

}

Usuarioctrl.ingresar = async(req,res)=>{

    try{

        const {per_cedula, per_contraseña} = req.body;

        const per_id = await pool.query('SELECT per_id FROM persona where per_cedula =$1 and per_contraseña = $2',[per_cedula,per_contraseña]);

        if(per_id.rowCount>0){

            //const token = jwt.sign({_id:per_id},process.env.SECRET_KEY);

            req.session.Object = {

                Per_id: per_id
             
            }

            res.status(200).json({mensaje:true});

            //res.status(200).json({token:req.session.Token});

        }else{

            res.status(200).json({mensaje:false});

        }

        
    }catch(e){

        res.status(500).json({mensaje:"Error",error:e});

    }
 

}

Usuarioctrl.guardar = async(req,res)=>{

    try{
    
        const {per_cedula, per_nombres, per_apellidos, per_correo, per_contraseña, per_tipo, per_titulo} = req.body;

        await pool.query("BEGIN");

        await pool.query("INSERT INTO persona (per_cedula, per_nombres, per_apellidos, per_correo, per_contraseña, per_tipo, per_titulo) "+
                        " VALUES($1,$2,$3,$4,$5,$6,$7)",[per_cedula, per_nombres, per_apellidos, per_correo, per_contraseña, per_tipo, per_titulo]);
        
        await pool.query('COMMIT')

        res.status(200).json({mensaje:"Usuario agregado exitosamente"})
        
    }catch(e){

        await pool.query('ROLLBACK');
        
        res.status(500).json({mensaje:"Rollback",error:e});

    }


}


Usuarioctrl.salir = async(req,res)=>{

    req.session.destroy();

    res.status(200).json({mensaje:"Sesión cerrada"})

}
/*function verificarToken(req,res, next){

    const payload = jwt.verify(token,process.env.SECRET_KEY);

    console.log(payload);
    
    next();

}*/


module.exports = Usuarioctrl;