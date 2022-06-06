const conexao = require('../controllers/Infraestrutura/conexao')
const moment = require('moment')

class Cliente {

    adicionaClientes(clientes, res){
        //formatações
        const data_criacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const clientesDatado = {...clientes, data_criacao}
        const idadeCliente = this.calculaIdade(clientes)

        // condicionais boleanas
        const nomeValido = clientes.nome.length >= 5
        const idadeValida = idadeCliente >= 18
      

        const validacoes = [
            {
                nome: 'nome',
                valido: nomeValido,
                mensagem: 'O nome do cliente deve ter pelo menos cinco caracteres'
            },
            {
                nome: 'idade',
                valido: idadeValida,
                mensagem: 'O cliente precisa ser maior do que 18 anos.'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        } else {

            const sql = 'INSERT INTO Cliente SET ?'

            conexao.query(sql, clientesDatado, (erro) => {
                if(erro) {
                    res.status(400).json(erro)
                    } else {
                    res.status(200).json(clientes)
                }
            })
        }

     
    }

    listarClientes(res) {

        const sql = 'SELECT * FROM cliente WHERE status = 1'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                console.log(resultados)
                resultados.forEach(res => {
                    moment(res.data_nascimento, 'YYYY-MM-DD').format('DD/MM/YYYY')
                })
                res.status(200).json(resultados)
            }
        })
    }

    listarClientePorId(id, res) {
        
        const sql = `SELECT * FROM cliente WHERE id_cliente = ${id}`

        conexao.query(sql, (erro, resultados) => {
            
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })

    }

    alteraCliente(id, valores, res) {
        const data_criacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const idadeCliente = this.calculaIdade(valores)
        
        // condicionais boleanas
        const nomeValido = valores.nome.length >= 5
        const idadeValida = idadeCliente >= 18
      

        const validacoes = [
            {
                nome: 'nome',
                valido: nomeValido,
                mensagem: 'O nome do cliente deve ter pelo menos cinco caracteres'
            },
            {
                nome: 'idade',
                valido: idadeValida,
                mensagem: 'O cliente precisa ser maior do que 18 anos.'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        } else {

            const clienteValidado = {...valores, data_criacao}

            const sql = `UPDATE cliente SET ? WHERE id_cliente = ${id}`

            conexao.query(sql, clienteValidado, (erro) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(200).json({...valores, id})
                }
            })

        }
    }

    deletaCliente(id, res) {

        const sql = 'DELETE FROM cliente WHERE id_cliente = ?'

        conexao.query(sql, id, (erro) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }

    calculaIdade(clientes) {
        const anoDeNascimento = moment(clientes.data_nascimento, 'YYYY-MM-DD').format('YYYY')
        const anoAtual = moment().format('YYYY')
        const idadeCliente = anoAtual - anoDeNascimento

        return idadeCliente
    }
}

module.exports = new Cliente 