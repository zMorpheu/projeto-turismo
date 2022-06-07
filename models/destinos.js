const conexao = require('../controllers/Infraestrutura/conexao')
const moment = require('moment')

class Destino {

  adicionaDestino(destinos, res) {
    const data_criacao = moment().format('YYYY-MM-DD HH:mm:ss')
    const nomeValidado = destinos.nome.length >= 5
    const destinoDatado = {...destinos, data_criacao}

    const validacoes = [
      {
        nome: 'nome',
        valido: nomeValidado,
        mensagem: 'O nome do destino precisa ter mais do que 5 letras.'
      }
    ]

    const erros = validacoes.filter(campo => !campo.valido)
    const existemErros = erros.length

    if(existemErros) {
      res.status(400).json(erros)
    } else {
      
      const sql = 'INSERT INTO destinos SET ?'

      conexao.query(sql, destinoDatado, (erro) => {
        if(erro) {
          res.status(400).json(erro)
        } else {
          res.status(200).json(destinos)
        }
      })
    }

  }

  listarDestinos(res){
    
    const sql = 'SELECT * FROM destinos WHERE status = 1'

    conexao.query(sql, (erro, resultados) => {
      if(erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultados)
      }
    })
  }
  
  listarDestinoPorId(id, res) {
    
    const sql = `SELECT * FROM destinos WHERE id_destino = ${id}`

    conexao.query(sql, (erro, resultados) => {
      if(erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultados)
      }
    })

  }

  alterarDestino(id, valores, res){
    const data_criacao = moment().format('YYYY-MM-DD HH:mm:ss')
    const nomeValidado = valores.nome.length >= 5

    const validacoes = [
      {
        nome: 'nome',
        valido: nomeValidado,
        mensagem: 'O nome do destino precisa ter mais do que 5 letras.'
      }
    ]

    const erros = validacoes.filter(campo => !campo.valido)
    const existemErros = erros.length

    if(existemErros) {
      res.status(400).json(erros)
    } else {

      const destinoValidado = {...valores, data_criacao}

      const sql = `UPDATE destinos SET ? WHERE id_destino=${id}`

      conexao.query(sql, destinoValidado, (erro) => {
        if(erro) {
          res.status(400).json(erro)
        } else {
          res.status(200).json({...valores, id})
        }
      })

    }
  }

  // uploadImgDestino(id, nomeArquivo, res) {

  //   const sql = `UPDATE destinos SET imagem_destino = ? WHERE id_destino = ${id}`

  //   conexao.query(sql, nomeArquivo, (erro) => {
  //     if(erro) {
  //       res.status(400).json(erro)
  //     } else {
  //       res.status(200).json('Imagem Cadastrada com sucesso.')
  //     }
  //   })
  // }

  deletarDestino(id, res) {
    
    const sql = 'DELETE FROM destinos WHERE id_destino = ?'

    conexao.query(sql, id, (erro) => {
      if(erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json({id})
      }
    })
  }
}

module.exports = new Destino