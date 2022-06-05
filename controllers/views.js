module.exports = app => {
 
  app.get('/', (req, res) => {
    res.render('home');
  })
  
  app.get('/cliente', (req, res, ) => {
    res.render('cliente');
  });

  app.get('/viagem', (req, res, ) => {
    res.render('viagem');
  });

  app.get('/destino', (req, res, ) => {
    res.render('destino');
  });

  app.get('/pagamento', (req, res, ) => {
    res.render('pagamento');
  });

  app.get('/formularioCliente', (req, res) => {
    res.render('formularioCliente')
  });

}