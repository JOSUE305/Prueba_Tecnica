import sqlite3 from "sqlite3";
import fs from "fs";

// conexión a la base de datos
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err.message);
  } else {
    console.log("Conectado a la base de datos SQLite.");

    // leer el archivo schema.sql
    const schema = fs.readFileSync("./schema.sql", "utf8");

    // ejecutar el script de creación de tablas
    db.exec(schema, (err) => {
      if (err) {
        console.error("Error al inicializar la base de datos:", err.message);
      } else {
        console.log("Base de datos inicializada ✅");
      }
    });
  }
});

export default db;
