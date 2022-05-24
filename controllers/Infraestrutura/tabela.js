class Tabelas {
    init (conexao){
        this.conexao = conexao
        this.criarClientes()
    }

    criarClientes(){
        const sql = 'CREATE TABLE IF NOT EXISTS cliente (id_cliente INT NOT NULL AUTO_INCREMENT, nome VARCHAR(100) NOT NULL, data_nascimento DATE NOT NULL, cpf VARCHAR(13) NOT NULL, contato VARCHAR(45) NULL, sexo VARCHAR(45) NULL, status TINYINT NOT NULL, PRIMARY KEY (id_cliente))'
          
        this.conexao.query(sql, erro => {
            if (erro){
                console.log(erro)
            }else{
                console.log('Tabela Clientes criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas