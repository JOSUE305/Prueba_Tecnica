import sqlite3 from "sqlite3";

//conexion a la base de datos
const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err.message);
    } else {
        console.log("Conectado a la base de datos SQLite.");
    }
});

export default db;
