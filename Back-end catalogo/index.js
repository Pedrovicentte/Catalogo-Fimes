const express = require('express')// importa o express
const mysql = require('mysql2')//importa a biblioteca mysql2
const cors = require('cors')

//configurações do banco de dados

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'pedro098hd',
    database: 'filmes'
}

//Criando a conexão com o Banco de Dados 

const connection = mysql.createConnection(dbConfig)

//Verificar se a conexão com o Banco de Dados foi estabelecida com sucesso.

connection.connect((err)=>{
    if(err){
        console.error('Erro ao conectar ao banco de dados.', err)
        throw err
    }
    console.log('Conexão estabelecida com sucesso!')
})

//Adicionando o middleware cors -> serve para proteger minimamente nossa página web, é utilizado pelo.

const app = express()

app.use(cors())

//Rota que vai chamar todos os filmes da database.
//req (requisição) res(resposta)

app.get('/filme', (req, res) =>{
    connection.query('SELECT * FROM filme',(err, resultados)=>{
        if(err){
            console.error('Erro ao executar a consulta:', err)
            res.status(500).json({error: 'Erro ao buscar filmes'}) 
        }else{
            res.json(resultados) 
        }
    })

})

app.get('/filme/:id', (req, res)=>{
    const filmeId = req.params.id
    //Obtem o parâmetro de ID do filme da URL usando req.params.id
    //por exemplo, se a url for '/filme/1' o valor do filmeId será 1

    connection.query('SELECT * FROM filme WHERE id = ?', [filmeId], (err, resultados)=>{
      //executa uma consulta SQL para obter o filme com o id especificado.

      if(err){
        console.error('Erro ao executar a consulta: ', err)
        res.status(500).json({error: 'Erro ao buscar filme.'})
      } else{
        if(resultados.length > 0){
          res.json(resultados[0])
        }else{
          res.status(404).json({error: 'Filme não encontrado.'})
        }
      }

    }
    )
})








app.listen(3001, ()=>{
  console.log('API ESTÁ RODANDO NA PORTA 3001')
})




//pessoa = {nome:'',cpf:'',email: ''}

//verificar se a conexão com o banco de dados foi estabelecido