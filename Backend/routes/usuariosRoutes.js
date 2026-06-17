//libreria express
const express = require("express")
//crea un objeto router => sirve para separar rutas por modulos 
const router = express.Router()

const {
Login,
Registrar,
SolicitarRecuperacion,
RestablecerContraseña
} = require("../controller/usuariosController")

//rutas post: registrar, login, solicitar, restablecer 
router.post("/registro", Registrar)
router.post("/login", Login)
router.post("/solicitar", SolicitarRecuperacion)
router.post("/restablecer", RestablecerContraseña)

//exportar todo
module.exports = router