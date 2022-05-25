const Cliente = require('../models/clientes')

module.exports = app => {

    app.get('/clientes', (req, res) => res.send('servidor rodando, tudo ok'))

    app.post('/clientes', (req, res) => {        
        const clientes = req.body
        Cliente.adiciona(clientes, res)
    })

}