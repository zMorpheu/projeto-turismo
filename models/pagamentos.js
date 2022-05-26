const conexao = require('../controllers/Infraestrutura/conexao')
const moment = require('moment')

class Pagamento {
    listarPagamentos(res){

        const sql = 'SELECT p.valor, p.data_pagamento, p.status, c.nome AS nome_cliente FROM pagamento p INNER JOIN cliente c ON c.id_cliente = p.id_cliente'

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }

        })
    } 

    listarPagamentoPorId(id,res){

        const sql = `SELECT p.valor, p.data_pagamento, p.status, c.nome AS nome_cliente FROM pagamento p INNER JOIN cliente c ON c.id_cliente = p.id_cliente WHERE id_pagamento=${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    adicionarPagamentos(pagamentos,res){

        const data_criacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data_pagamento = moment(pagamentos.data_pagamento,'DD/MM/YYYY').format('YYYY-MM-DD')
        
        const valorPagamentoValido = pagamentos.valor > 0
        
        const validacoes = [
            { 
                nome:'valor_pagamento_valido',
                valido:valorPagamentoValido,
                mensagem:'Pagamento obrigatoriamente tem que ser maior que zero'
            }
        ]
        
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }else{
            
            const pagamentoDatado = {...pagamentos,data_pagamento,data_criacao}

            const sql = 'INSERT INTO pagamento SET ?'

            conexao.query(sql,pagamentoDatado,(erro) => {

                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(200).json(pagamentos)
                }
            })
        }
    }

    atualizarPagamento(id, valores, res){
        const data_criacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data_pagamento = moment(valores.data_pagamento,'DD/MM/YYYY').format('YYYY-MM-DD')
        
        const valorPagamentoValido = valores.valor > 0
        
        const validacoes = [
            { 
                nome:'valor_pagamento_valido',
                valido:valorPagamentoValido,
                mensagem:'Pagamento obrigatoriamente tem que ser maior que zero'
            }
        ]
        
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }else{
            const pagamentoDatado = {...valores,data_pagamento,data_criacao}

            const sql = `UPDATE pagamento SET ? WHERE id_pagamento = ${id}`

            conexao.query(sql,pagamentoDatado,(erro) => {
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(200).json({...valores, id})
                }
            })
        }
    }

    deletarPagamento(id,res){

        const sql = 'DELETE FROM pagamento WHERE id_pagamento = ?'

        conexao.query(sql, id, (erro) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({id})
            }
        })
    }
}
module.exports = new Pagamento