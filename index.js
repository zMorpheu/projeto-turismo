const customExpress = require('./config/customExpress')
const conexao = require('./controllers/Infraestrutura/conexao')
const Tabelas = require('./controllers/Infraestrutura/tabela')
const ValoresIniciais = require('./controllers/Infraestrutura/valoresIniciais')

conexao.connect(erro => {
    if(erro){
        console.log(erro)
    } else {
        console.log('Conectado com sucesso')
        Tabelas.init(conexao)
        ValoresIniciais.init(conexao)

        const app = customExpress()

        app.set('views', './views');
        app.set('view engine', 'ejs');


        app.listen(3000, () => console.log('servidor rodando na porta 3000'))
        
    }
})
