//importa la libreria para la coneccion con la db
const db = require ("mysql2/promise")

async function conectarDb(){

try{
const conexion = await db.createConnection({
host : "localhost",
user : "root",
password : "manca123",
database : "Hospital"
})
console.log("Coneccion bien")
return conexion
}
catch(error){
console.log(error)
}

}

//exportamos
module.exports = conectarDb