const Cliente = require('../models/clientes')

module.exports = app => {

    app.get('/clientes', (req, res) => {
        Cliente.listarClientes(res)
    })

    app.get('/clientes/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Cliente.listarClientePorId(id, res)
    })

    app.post('/clientes', (req, res) => {        
        const clientes = req.body
        Cliente.adicionaClientes(clientes, res)
    })

    app.patch('/clientes/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        Cliente.alteraCliente(id, valores, res)
    })

    app.delete('/clientes/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Cliente.deletaCliente(id, res)
    })

}