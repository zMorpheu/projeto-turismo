const moment = require('moment')

class ValoresIniciais {
  init(conexao){
    this.conexao = conexao
    this.inserirClientes()
    this.insereDestinos()
    this.insereViagens()
    this.inserePagamentos()
  }

  inserirClientes() {

    const select = 'SELECT * FROM cliente'

    this.conexao.query(select, (erro, resultados) => {
      if(erro) {
        console.log(erro)
      } else {
        if(resultados.length === 0) {

          const data_criacao = moment().format('YYYY-MM-DD HH:mm:ss')

          for(var i=1; i < 11; i++) {

            const cliente = {
                nome: `Cliente ${i}`,
                data_nascimento: "1996-03-05",
                cpf: "123456789",
                contato: "teste@teste.com",
                sexo: "F",
                status: 1,
                data_criacao: data_criacao
              }
            
            const sql = "INSERT INTO cliente SET ?"
        
            this.conexao.query(sql, cliente, (erro) => {
              if(erro) {
                console.log(erro)
              } else {
                console.log("Clientes inseridos com sucesso")
              }
            })
          }
        }
      }
    })
  }

  insereDestinos() {

    const select = 'SELECT * FROM destinos'

    this.conexao.query(select, (erro, resultados) => {
      if(erro) {
        console.log(erro)
      } else {
        if(resultados.length === 0) {

          const data_criacao = moment().format('YYYY-MM-DD HH:mm:ss')

          for(var i=1; i < 11; i++) {

            const destino = {
              nome: `Destino ${i}`,
              estado: "Pernambuco",
              cidade: "Fernando de Noronha",
              status:1,
              data_criacao: data_criacao
            }
            
            const sql = "INSERT INTO destinos SET ?"
        
            this.conexao.query(sql, destino, (erro) => {
              if(erro) {
                console.log(erro)
              } else {
                console.log("Destinos inseridos com sucesso")
              }
            })
          }
        }
      }
    })

  }

  insereViagens() {

    const select = 'SELECT * FROM viagem'

    this.conexao.query(select, (erro, resultados) => {
      if(erro) {
        console.log(erro)
      } else {
        if(resultados.length === 0) {
          const data_criacao = moment().format('YYYY-MM-DD HH:mm:ss')

          for(var i=1; i < 11; i++) {

            const viagem = {
              id_viajante: i,
              id_destino: i,
              data_viagem: "2022-06-23",
              data_retorno: "2022-06-25",
              status: 1,
              data_criacao: data_criacao
            }
            
            const sql = "INSERT INTO viagem SET ?"
        
            this.conexao.query(sql, viagem, (erro) => {
              if(erro) {
                console.log(erro)
              } else {
                console.log("Viagens inseridas com sucesso")
              }
            })
          }
        }
      }
    })
  }

  inserePagamentos() {

    const select = 'SELECT * FROM pagamento'

    this.conexao.query(select, (erro, resultados) => {
      if(erro){
        console.log(erro)
      } else {
        if(resultados.length === 0 ) {

          const data_criacao = moment().format('YYYY-MM-DD HH:mm:ss')

          for(var i=1; i < 11; i++) {

            const pagamento = {
              valor: 200,
              data_pagamento: "2022-05-25",
              id_cliente: i,
              status: 1,
              data_criacao: data_criacao
            }
            
            const sql = "INSERT INTO pagamento SET ?"
        
            this.conexao.query(sql, pagamento, (erro) => {
              if(erro) {
                console.log(erro)
              } else {
                console.log("Pagamentos inseridos com sucesso")
              }
            })
          }
        }
      }
    })
  }
}

module.exports = new ValoresIniciais 