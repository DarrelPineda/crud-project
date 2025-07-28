const mysql = require('mysql2');

const pool = mysql.createPool({
  user: 'root',
  password: '', 
  host: 'localhost',
  database: 'crud'
});

module.exports = pool.promise();
