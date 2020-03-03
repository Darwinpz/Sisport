
const usuarios = require("../controllers/usuarios");
const portafolio = require("../controllers/portafolio");
const notificaciones = require("../controllers/notificaciones");
const multer = require("../libs/multer");

module.exports = (app) =>{

    //usuarios
    app.get("/api/usuarios/ver", usuarios.ver);
    app.post("/api/usuarios/ingresar", usuarios.ingresar);
    app.get("/api/usuarios/salir", usuarios.salir);
    app.get("/api/usuarios/conectado", usuarios.conectado);
    app.get("/api/usuarios/sesion", usuarios.sesion);
    app.get("/api/usuarios/asignaturas", usuarios.asignaturas);
    app.get("/api/usuarios/:id", usuarios.perfil);
   
    //portafolio
    app.post("/api/portafolio/ver", portafolio.ver);
    app.post("/api/portafolio/activar", portafolio.activar);

    app.post("/api/portafolio/subir_documento",multer.single("file"),portafolio.subir_documento);


    //Notificaciones

    app.get("/api/notificaciones/ver", notificaciones.ver_notificaciones);
    app.post("/api/notificaciones/guardar", notificaciones.guardar_notificacion);

    

}
