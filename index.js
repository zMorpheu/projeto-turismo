const customExpress = require('./backend/config/customExpress')
const conexao = require('./backend/controllers/Infraestrutura/conexao')
const Tabelas = require('./backend/controllers/Infraestrutura/tabela')
const ValoresIniciais = require('./backend/controllers/Infraestrutura/valoresIniciais')

conexao.connect(erro => {
    if(erro){
        console.log(erro)
    } else {
        console.log('Conectado com sucesso')
        Tabelas.init(conexao)
        ValoresIniciais.init(conexao)

        const app = customExpress()

        app.set('views', './frontend/views');
        app.set('view engine', 'ejs');


        app.listen(3000, () => console.log('servidor rodando na porta 3000'))
        
    }
})
