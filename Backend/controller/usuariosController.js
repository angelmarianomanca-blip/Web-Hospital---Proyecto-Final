//importamos la conexion aqui
const conectarDb = require("../config/mysql")
//nativo de node para generar codigo al azar
const crypto = require("crypto")

//metodo post
async function Login(datos,respuesta) {
let conexion
try{
//instancia de la conexion
conexion = await conectarDb()

//datos obtenidos del front
const {gmail, contraseña} = datos.body

//validacion
if(!gmail || !contraseña){
return respuesta.status(400).json({mensaje:"Por favor completar campos"})
}

//hacemos la consulta en una variable
const consulta = "SELECT * FROM Usuarios WHERE gmail = ?"
const [usuarios] = await conexion.query(consulta, [gmail])

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
//para posibles errores
catch(error){
 console.log(error)
 respuesta.status(500).json({ mensaje: "Hubo un error en el servidor" })
}
//cierra la conexion
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
usuario,
gmail,
contraseña,
rol,
telefono
} = datos.body

//validacion
if(!usuario||!gmail||!contraseña){
return respuesta.status(400).json({mensaje:"Porfavor completar campos"})
}

//si existe gmail o no 
const consulta = "SELECT * FROM Usuarios WHERE gmail = ? "
const [usuarios]= await conexion.query(consulta,[gmail])
if(usuarios.length > 0){
return respuesta.status(400).json({mensaje: "Email existente ingresar otro"})
}

//si existe telefono o no 
const consulta1 = "SELECT * FROM Usuarios WHERE telefono = ?"
const [usuarios1] = await conexion.query(consulta1, [telefono])
if(usuarios1.length > 0 ){
return respuesta.status(400).json({mensaje:"Nro existente ingresar otro"})
}

//insertamos datos
const insertar = "INSERT INTO Usuarios (usuario, gmail, contraseña, rol, telefono) VALUES (?, ?, ?, ?, ?)"
await conexion.query(insertar,[usuario, gmail, contraseña, rol, telefono])
respuesta.status(201).json({mensaje:"Usuaario agregado"})
}
//posibles errores
catch(error){
console.log(error)
respuesta.status(500).json({mensaje: "error al registrar"})
}
//cierra la conexion
finally{
if(conexion){
 await conexion.end();
}
}
}

//para solicitar recuperacion
async function SolicitarRecuperacion(datos,respuesta) {
let conexion
try{
conexion = await conectarDb()
//datos enviados del front
const {gmail} = datos.body
//hacemos la consulta
const consulta = "SELECT * FROM Usuarios WHERE gmail = ?"
//ejecutamos
const [usuarios] = await conexion.query(consulta, [gmail])
//verifica si existe
if(usuarios.length === 0){
return respuesta.status(404).json({mensaje: "No hay ningun usuario con ese gmail"})
}
//generar codigo de 6
const codigo = Math.floor(100000 + Math.random() * 900000).toString()
//definir la expiracion del codigo
const expiracion = new Date(Date.now() + 15 * 60 * 1000)
//consulta modificar
const modificar = "UPDATE Usuarios SET reset_Token = ?, reset_Expira = ? WHERE gmail = ?"
//guardar token y expiracion en la db
await conexion.query(modificar, [codigo, expiracion, gmail])

//aqui envio el codigo o sms
console.log(`Código enviado a ${gmail}: ${codigo}`)
}
//para posibles errores
catch(error){
console.log(error)
respuesta.status(500).json({mensaje: "Error al solicitar recupercacion"})
}
//cerramos la conexion
finally{
if(conexion){
await conexion.end()
}
}
}

//restablecer contra
async function RestablecerContraseña(datos,respuesta) {
let conexion
try{
conexion = await conectarDb()
//datos del front
const {gmail, codigo, nuevacontraseña} = datos.body
//buscar usuario q tenga ese codigo y que no haya expirado
const consulta = "SELECT * FROM Usuarios WHERE gmail = ? AND reset_token = ? AND reset_Expira > NOW()"
const [usuarios] = await conexion.query(consulta, [gmail, codigo])
//verificamos el codigo
if(usuarios.length === 0){
return respuesta.status(400).json({mensaje:"El codigo es invalido o ya expiro"})
} 
//cambiar contra y limpiar los campos para q no se vuelva a usar
const modificar = "UPDATE Usuarios SET Contraseña = ?, reset_Token = NULL, reset_expira = NULL WHERE gmail = ?"
await conexion.query(modificar, [nuevacontraseña, gmail])
respuesta.status(200).json({mensaje: "Contraseña cambiada con exito"})
}
catch(error){
console.log(error)
respuesta.status(500).json({mensaje:"error al cambiar contra"})
}
//cerrar conexion
finally{
if(conexion){
await conexion.end()
}
}
}

//exportamos todo
module.exports = {Login, Registrar, SolicitarRecuperacion, RestablecerContraseña}