const conexao = require('../controllers/Infraestrutura/conexao')
const moment = require('moment')

class Viagem {
  
  adicionarViagem(viagem, res) {

    const data_criacao = moment().format('YYYY-MM-DD HH:mm:ss')
    const data_viagem = viagem.data_viagem
    const data_retorno = viagem.data_retorno

    const dataViagemIdaValida = moment(data_viagem).isSameOrAfter(data_criacao)
    const dataRetornoValida = moment(data_viagem).isSameOrAfter(data_criacao)

    const dataIdaeVolta = moment(data_retorno).isSameOrAfter(data_viagem)
    const viagemDatada = {...viagem, data_viagem, data_retorno, data_criacao}

    const validacoes = [
      {
        nome: 'data_ida_valida',
        valido: dataViagemIdaValida,
        mensagem: 'A Data da ida deve ser maior ou igual a data atual'
      },
      {
        nome: 'data_volta_valida',
        valido: dataRetornoValida,
        mensagem: 'A Data da volta deve ser maior ou igual a data atual'
      },
      {
        nome: 'data_ida_volta_valida',
        valido: dataIdaeVolta,
        mensagem: 'A data da volta deve ser maior ou igual a data da ida'
      }
    ]

    const erros = validacoes.filter(campo => !campo.valido)
    const existemErros = erros.length

    if(existemErros) {
      res.status(400).json(erros)
    } else {
      
      const sql = 'INSERT INTO viagem SET ?'

      conexao.query(sql, viagemDatada, (erro) => {
        if(erro) {
          res.status(400).json(erro)
        } else {
          res.status(200).json(viagem)
        }
      })
    }
  }

  listarViagens(res) {

    const sql = 'SELECT v.id_viagem, DATE_FORMAT(v.data_viagem, "%d/%m/%Y") as data_viagem , DATE_FORMAT(v.data_retorno, "%d/%m/%Y") AS data_retorno, c.nome as nome_cliente, d.nome as destino, v.status FROM viagem v INNER JOIN cliente c ON c.id_cliente = v.id_viajante INNER JOIN destinos d ON d.id_destino = v.id_destino'
    
    conexao.query(sql, (erro, resultados) => {
      if(erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultados)
      }
    })
  }

  listarViagemPorId(id, res) {
    
    const sql = `SELECT v.id_viagem, DATE_FORMAT(v.data_viagem, "%d/%m/%Y") as data_viagem , DATE_FORMAT(v.data_retorno, "%d/%m/%Y") AS data_retorno, c.id_cliente ,c.nome as nome_cliente, d.id_destino, d.nome as destino, v.status FROM viagem v INNER JOIN cliente c ON c.id_cliente = v.id_viajante INNER JOIN destinos d ON d.id_destino = v.id_destino WHERE id_viagem = ${id}`

    conexao.query(sql, (erro, resultados) => {
      if(erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultados)
      }
    })
  }

  atualizarViagem(id, valores, res) {
    const data_criacao = moment().format('YYYY-MM-DD HH:mm:ss')
    const data_viagem = valores.data_viagem
    const data_retorno = valores.data_retorno

    const dataViagemIdaValida = moment(data_viagem).isSameOrAfter(data_criacao)
    const dataRetornoValida = moment(data_viagem).isSameOrAfter(data_criacao)

    const dataIdaeVolta = moment(data_retorno).isSameOrAfter(data_viagem)

    const validacoes = [
      {
        nome: 'data_ida_valida',
        valido: dataViagemIdaValida,
        mensagem: 'A Data da ida deve ser maior ou igual a data atual'
      },
      {
        nome: 'data_volta_valida',
        valido: dataRetornoValida,
        mensagem: 'A Data da volta deve ser maior ou igual a data atual'
      },
      {
        nome: 'data_ida_volta_valida',
        valido: dataIdaeVolta,
        mensagem: 'A data da volta deve ser maior ou igual a data da ida'
      }
    ]

    const erros = validacoes.filter(campo => !campo.valido)
    const existemErros = erros.length

    if(existemErros) {
      res.status(400).json(erros)
    } else {

      const viagemDatada = {...valores, data_viagem, data_retorno, data_criacao}

      const sql = `UPDATE viagem SET ? WHERE id_viagem=${id}`

      conexao.query(sql, viagemDatada, (erro) => {
        if(erro){
          res.status(400).json(erro)
        } else {
          res.status(200).json({...valores, id})
        }
      })
    } 
  }

  deletarViagem(id, res) {

    const sql = 'DELETE FROM viagem WHERE id_viagem = ?'

    conexao.query(sql, id, (erro) => {
      if(erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json({id})
      }
    })
  }
}

module.exports = new Viagem