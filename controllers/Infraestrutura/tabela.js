class Tabelas {
    init (conexao){
        this.conexao = conexao
        this.criarClientes()
        this.criarDestinos()
        this.criarViagem()
        this.criarPagamento()
    }

    criarClientes(){
        const sql = "CREATE TABLE IF NOT EXISTS cliente (id_cliente INT NOT NULL AUTO_INCREMENT, nome VARCHAR(100) NOT NULL, data_nascimento DATE NOT NULL, cpf VARCHAR(13) NOT NULL, contato VARCHAR(45) NULL, sexo VARCHAR(45) NULL, status TINYINT NOT NULL, data_criacao DATETIME NOT NULL, PRIMARY KEY (id_cliente))"
          
        this.conexao.query(sql, erro => {
            if (erro){
                console.log(erro)
            }else{
                console.log("Tabela clientes criada com sucesso")
            }
        })
    }

    criarDestinos() {
        const sql = "CREATE TABLE IF NOT EXISTS destinos (id_destino INT NOT NULL AUTO_INCREMENT, nome VARCHAR(45) NOT NULL, estado VARCHAR(45) NOT NULL, cidade VARCHAR(45) NOT NULL, status TINYINT NOT NULL, data_criacao DATETIME NOT NULL, PRIMARY KEY (id_destino))"

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log("Tabela Destinos criada com sucesso")
            }
        })
    }

    criarViagem() {
        const sql = "CREATE TABLE IF NOT EXISTS viagem (id_viagem INT NOT NULL AUTO_INCREMENT, id_viajante INT NOT NULL,id_destino INT NOT NULL, data_viagem DATE NOT NULL, data_retorno DATE NOT NULL, status TINYINT NOT NULL, data_criacao DATETIME NOT NULL, PRIMARY KEY (id_viagem))"

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log("Tabela Viagem criada com sucesso")
            }
        })
    }

    criarPagamento() {
        const sql = "CREATE TABLE IF NOT EXISTS pagamento (id_pagamento INT NOT NULL AUTO_INCREMENT, valor VARCHAR(45) NOT NULL, data_pagamento DATE NOT NULL, id_cliente INT NOT NULL, status TINYINT NOT NULL, data_criacao DATETIME NOT NULL, PRIMARY KEY (id_pagamento))"

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log("Tabela Pagamento criada com sucesso")
            }
        })
    }

}

module.exports = new Tabelas