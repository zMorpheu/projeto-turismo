const Destinos = require('../models/destinos')
const multer = require('multer')
const crypto = require('crypto')

const storage = multer.diskStorage({
  destination:  (req, file, callback) => {
      callback(null, 'public/uploads/')
  },
  filename:  (req, file, callback) => {
      const extensaoArquivo = file.originalname.split('.')[1];
      const novoNomeArquivo = crypto.randomBytes(16).toString('hex');

      callback(null, `${novoNomeArquivo}.${extensaoArquivo}`)
  }
});

const upload = multer({storage});


module.exports = app => {
  app.get('/destinos', (req, res) => {
    Destinos.listarDestinos(res)
  })

  app.get('/destinos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    Destinos.listarDestinoPorId(id, res)
  })

  app.post('/destinos', upload.single('imagem_destino'), (req, res) => {
    const destinos = req.body
    console.log(req.body)
    Destinos.adicionaDestino(destinos, res)
  })

  // app.patch('/upload-imagem/:id', upload.single('imagem'), (req, res) => {
  //   const id = parseInt(req.params.id)
  //   const nomeArquivo = req.file.filename
  //   console.log(nomeArquivo)
  //   Destinos.uploadImgDestino(id, nomeArquivo, res)
  // });


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