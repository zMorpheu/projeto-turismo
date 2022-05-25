const conexao = require('../controllers/Infraestrutura/conexao')
const moment = require('moment')

class Cliente {
    adiciona(clientes, res){
        const data_criacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data_nascimento = moment(clientes.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD')
        const clientesDatado = {...clientes, data_nascimento, data_criacao}

        const sql = 'INSERT INTO Cliente SET ?'
        conexao.query(sql, clientesDatado, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
                } else {
                res.status(200).json(clientes)
            }
        })

    }
}

module.exports = new Cliente 