const mysql = require ('mysql2')

const conexao = mysql.createConnection({

    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Bunda1',
    database: 'projeto-turismo'
})

module.exports = conexao
