//importamos la conexion aqui
const conectarDb = require("../config/mysql")

//metodo post
async function Login(datos,respuesta) {
let conexion
try{
//instancia de la conexion
conexion = await conectarDb()

const {email, contraseña} = datos.body

//validacion
if(!email || !contraseña){
return respuesta.status(400).json({mensaje:"Por favor completar campos"})
}

//hacemos la consulta en una variable
const consulta = "SELECT * FROM Usuarios WHERE email = ?"
const [usuarios] = await conexion.query(consulta, [email])

//si existe o no existe
if(usuarios.length === 0){
return respuesta.status(404).json({mensaje:"Usuario no existe"})
}

//validar contra
if( usuarios[0].contraseña !== contraseña){
return respuesta.status(401).json({mensaje:"Contraseña Incorrecta"})
}

respuesta.status(200).json({mensaje:"Bienvenido"})
}
catch(error){
 console.log(error)
 respuesta.status(500).json({ mensaje: "Hubo un error en el servidor" })
}
finally{
if(conexion){
 await conexion.end()
}
}
} 

//metodo post
async function Registrar(datos,respuesta) {
let conexion
try{
//instancia de la conexion
conexion = await conectarDb()

//obtenemos datos del front
const {
nombre,
email,
contraseña
} = datos.body

//validacion
if(!nombre||!email||!contraseña){
return respuesta.status(400).json({mensaje:"Porfavor completar campos"})
}

//si existe o no 
const consulta = "SELECT * FROM Usuarios WHERE email = ? "
const [usuarios]= await conexion.query(consulta,[email])
if(usuarios.length > 0){
return respuesta.status(400).json({mensaje: "Email existente ingresar otro"})
}

//insertamos datos
const insertar = "INSERT INTO Usuarios (nombre,email,contraseña) VALUES (?, ?, ?)"
await conexion.query(insertar,[nombre, email, contraseña])

respuesta.status(201).json({mensaje:"Usuaario agregado"})
}
catch(error){
console.log(error)
respuesta.status(500).json({mensaje: "error al registrar"})
}
finally{
if(conexion){
 await conexion.end();
}
}
}

//exportamos todo
module.exports = {Login,Registrar}