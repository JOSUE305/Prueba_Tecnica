const express = require ("express")
const router = require("./router/user")

const app= express()


app.use(router)

app.listen(8080,()=>{
console.log("servidor se ha activado correctamente en el puerto 8080")
})