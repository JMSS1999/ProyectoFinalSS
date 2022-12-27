const mysql = require('mysql');
const { promisify }= require('util');
const { database } = require('./keys');
const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('La conexion de base de datos fue cerrada.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Existen muchas conexiones a la BD');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('La conexion a la BD ha sido rechazada.');
    }
  }
  if (connection) connection.release();
  console.log('DB SportsNotes conectada');
  return;
});
// Promisify Pool Querys
pool.query = promisify(pool.query);
module.exports = pool;