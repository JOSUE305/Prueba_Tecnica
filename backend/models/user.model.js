// models/user.model.js
import db from '../config/db.js';
import bcrypt from 'bcrypt';

export const createUser = (data, callback) => {
  const { username, password, role } = data;

 const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10; 
 const hashedPassword = bcrypt.hashSync(password, saltRounds);
 
  const sql = `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`;
  db.run(sql, [username, hashedPassword, role], function(err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID, username, role });
  });
};

export const findUserByUsername = (username, callback) => {
  const sql = `SELECT * FROM users WHERE username = ?`;
  db.get(sql, [username], (err, row) => {
    if (err) return callback(err);
    callback(null, row);
  });
};
