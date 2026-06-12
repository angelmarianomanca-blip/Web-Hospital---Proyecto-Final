//libreria express
const express = require("express")
const router = express.Router()

const {
Login,
Registrar,
} = require("../controller/usuariosController")

//ruta post: registrar 
router.post("/registro", Registrar)
//ruta post : login
router.post("/login", Login)

//exportar todo
module.exports = router