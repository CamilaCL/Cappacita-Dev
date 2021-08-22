// importar o módulo express
const express = require('express')
// instanciar o express
const app = express()

// instanciar o dataBase
const dataBase = require('./dataBase')

// instanciar o módulo body-parser
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

// criar uma requisição para mostrar todos os pokemons
app.get('/pokemons', (req, res) => {
    res.send(dataBase.mostrarPokemons())
}) 

// criar uma requisição para mostrar um pokemon de acordo com o parâmetro passado
// o parâmetro é passado na url no formato /:parametro
app.get('/pokemons/:id', (req, res) => {
    res.send(dataBase.mostrarPokemon(req.params.id))  // req.params.id : comando para acessar o parâmetro que está na url
}) 

// criar uma requisição para cadastrar um pokemon
app.post('/pokemons', (req, res) => {
    const pokemon = dataBase.cadastrarPokemon({  // as características do pokemon serão cadastradas no body da requisição
        nome: req.body.nome,
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        hp: 100  // como hp é um valor fixo, não precisa passar no body
    })
    res.send(pokemon)
}) 

// criar uma requisição para atualizar um pokemon
app.put('/pokemons/:id', (req, res) => {
    const pokemon = dataBase.atualizarPokemon(req.params.id, {
        nome: req.body.nome,
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        hp: 100,
        id: parseInt(req.params.id)   
    })
    res.send(pokemon)
}) 

// criar uma requisição para deletar um pokemon
app.delete('/pokemons/:id', (req, res) => {
    res.send(dataBase.deletarPokemon(req.params.id))
}) 

// criar uma requisição para a batalha pokemon
app.post('/batalha', (req, res) => {
    res.send(dataBase.batalhaPokemon(req.body.id1, req.body.id2))
}) 

// criar uma requisição para curar um pokemon
app.post('/curaPokemon', (req, res) => {
    res.send(dataBase.curarPokemon(req.body.id))
}) 

// ligar o servidor
app.listen(3003)

