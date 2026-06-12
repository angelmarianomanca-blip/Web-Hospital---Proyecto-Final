//libreria expres
const express = require ("express")
//permite comunicacion entre el front y back
const cors = require ("cors")

//ruta usuarios 
const usuariosRoutes = require ("./routes/usuariosRoutes")

//crea el servidor express
const app = express()

//middleware cors
app.use(cors())
//middleware json: convierte json en body.
app.use(express.json())

//conectar rutas de usuarios
app.use("/api/usuarios", usuariosRoutes)

//ruta principal responde cuando alguien entra al http localhost
app.get("/",(datos,respuesta)=>{
respuesta.send("Servidor funcionando")
})

//levanta el servidor
app.listen(3000, ()=> {
console.log("Servidor funcionando en puerto 3000")
})
