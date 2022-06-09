const Pagamento = require('../models/pagamentos')

module.exports = app => {
    app.get('/pagamentos', (req,res) => {
        Pagamento.listarPagamentos(res)
    })

    app.get('/pagamentos/:id',(req,res) => {
        const id = parseInt(req.params.id)
        Pagamento.listarPagamentoPorId(id, res)
    })

    app.post('/pagamentos', (req,res) => {
        const pagamentos = req.body
        Pagamento.adicionarPagamentos(pagamentos,res)
    })
    
    app.patch('/pagamentos/:id', (req,res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        Pagamento.atualizarPagamento(id, valores, res)
    })

    app.delete('/pagamentos/:id', (req,res) => {
        const id = parseInt(req.params.id)
        Pagamento.deletarPagamento(id,res)
    })
}
