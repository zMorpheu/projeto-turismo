const Viagem = require('../models/viagem')

module.exports = app => {
  
  app.get('/viagens', (req, res) => {
    Viagem.listarViagens(res)
  })

  app.get('/viagens/:id', (req, res) => {
    const id = parseInt(req.params.id)
    Viagem.listarViagemPorId(id, res)
  })

  app.post('/viagens', (req, res) => {
    const viagem = req.body
    Viagem.adicionarViagem(viagem, res)
  })

  app.patch('/viagens/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const valores = req.body

    Viagem.atualizarViagem(id, valores, res)
  })

  app.delete('/viagens/:id', (req, res) => {
    const id = parseInt(req.params.id)
    Viagem.deletarViagem(id, res)
  })
}