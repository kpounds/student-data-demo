const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'kpounds',
  password: 'Testing123',
  database: 'gm_database'
});

connection.connect();

module.exports = connection;
