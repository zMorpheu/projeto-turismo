const Destinos = require('../models/destinos')

module.exports = app => {
  app.get('/destinos', (req, res) => {
    Destinos.listarDestinos(res)
  })

  app.get('/destinos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    Destinos.listarDestinoPorId(id, res)
  })

  app.post('/destinos', (req, res) => {
    const destinos = req.body
    Destinos.adicionaDestino(destinos, res)
  })

  app.patch('/destinos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const valores = req.body
    Destinos.alterarDestino(id, valores, res)
  })

  app.delete('/destinos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    Destinos.deletarDestino(id, res)
  })


}