const mysql = require('mysql2')

//create object
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'raymond6',
    database: 'todotaskmanager'
})

module.exports = connection;