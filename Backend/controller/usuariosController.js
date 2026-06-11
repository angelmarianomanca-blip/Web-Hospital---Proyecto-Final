//importamos la conexion aqui
const conectarDb = require("../config/mysql")

//instancia de la conexion
const conexion = await conectarDb()

//metodo get
async function Login(datos,respuesta) {
try{
const {email, contraseña} = datos.body

//validacion
if(!email || !contraseña){
return respuesta.status(400).json({mensaje:"Por favor completar campos"})
}

//hacemos la consulta en una variable
const query = "SELECT * FROM Usuarios"
const ejecutar = await conexion.query 

respuesta.json(ejecutar)
}
catch(error){
 console.log(error)
 respuesta.status(500).json({ mensaje: "Hubo un error en el servidor" })
}
} 

//metodo post
async function Registrar(datos,respuesta) {
try{
//obtenemos datos del front
const {
nombre,
gmail,
contraseña
} = datos.body

//insertamos datos
const query = "INSERT INTO Usuarios (nombre,gmail,contraseña) VALUES (?, ?, ?, ?, ?)"
const ejecutar = await query [nombre, gmail, contraseña]
respuesta.status(201).json({mensaje:"Usuaario agregado"})
}
catch(error){
console.log(error)
respuesta.status(500).json({mensaje: "error al registrar"})
}
    
}