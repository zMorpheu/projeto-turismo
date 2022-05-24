const conexao = require('../controllers/Infraestrutura/conexao')

class Cliente {
    adiciona(clientes){
        const sql = 'INSERT INTO Cliente SET ?'
        conexao.query(sql, clientes, (erro, resultados) => {
            if(erro){
                console.log(erro)
            }else{
                console.log(resultados)
            }
        })

    }
}

module.exports = new Cliente 