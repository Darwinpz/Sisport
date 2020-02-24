const express = require("express");

const router = express.Router();

const usuarios = require("../controllers/usuarios");

//usuarios

router.get("/usuarios", usuarios.ver);
router.get("/usuarios/:id", usuarios.ver_perfil);
router.post("/usuarios/ingresar", usuarios.ingresar);
router.post("/usuarios", usuarios.guardar);
router.post("/usuarios/salir", usuarios.salir);


module.exports = router;
