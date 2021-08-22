// criar uma sequência que atualiza o id quando ele não é passado como parâmetro
const sequence = {
    _id: 1,
    get id() {return this._id++}
}

// criar o array que simulará o banco de dados
const pokemons = []

// criar uma função para cadastrar um pokemon
function cadastrarPokemon(pokemon) {
    if(!pokemon.id) pokemon.id = sequence.id
    pokemons[pokemon.id] = pokemon
    return pokemon
}

// criar uma função para mostrar um pokemon
function mostrarPokemon(id) {
    return pokemons[id] || {}
}

// criar uma função para mostrar todos os pokemons
function mostrarPokemons() {
    return Object.values(pokemons)
}

// criar uma função para atualizar um pokemon
function atualizarPokemon(id, pokemon) {
    pokemons[id] = pokemon
    return pokemon
}

// criar uma função para deletar um pokemon
function deletarPokemon(id) {
    sequence._id = sequence._id - 1
    const pokemonDeletado = pokemons[id]
    pokemons.splice(id, 1)
    pokemons.forEach(pokemon => {
        if(pokemon.id > id) {
            pokemon.id = pokemon.id - 1
        }
    })
    return pokemonDeletado
}

// criar uma função para a batalha pokemon
function batalhaPokemon(id1, id2) {
    const superEfetivo = 40
    const efetivo = 20
    const naoEfetivo = 10

    const pokemon1 = pokemons[id1]
    const pokemon2 = pokemons[id2]

    if(pokemon1.hp != 0 && pokemon2.hp != 0) {
        if(pokemon1.tipo == pokemon2.fraqueza) {
            pokemon2.hp = pokemon2.hp - superEfetivo
        } else if(pokemon1.tipo == pokemon2.resistencia) {
            pokemon2.hp = pokemon2.hp - naoEfetivo
        } else {
            pokemon2.hp = pokemon2.hp - efetivo
        }
    }

    if(pokemon1.hp != 0 && pokemon2.hp != 0) {
        if(pokemon2.tipo == pokemon1.fraqueza) {
            pokemon1.hp = pokemon1.hp - superEfetivo
        } else if(pokemon2.tipo == pokemon1.resistencia) {
            pokemon1.hp = pokemon1.hp - naoEfetivo
        } else {
            pokemon1.hp = pokemon1.hp - efetivo
        }
    }

    if(pokemon1.hp < 0) pokemon1.hp = 0
    if(pokemon2.hp < 0) pokemon2.hp = 0

    return `${pokemon1.nome}: ${pokemon1.hp} / ${pokemon2.nome}: ${pokemon2.hp}`
}

// criar uma função para curar um pokemon
function curarPokemon(id) {
    const pocaoCura = 20

    if(pokemons[id].hp < 100) {
        pokemons[id].hp = pokemons[id].hp + pocaoCura
    }

    if(pokemons[id].hp > 100) pokemons[id].hp = 100

    return `${pokemons[id].nome}: ${pokemons[id].hp}`
}

// exportar as funções para o server.js conseguir acessá-las
module.exports = { cadastrarPokemon, mostrarPokemon, mostrarPokemons, atualizarPokemon, deletarPokemon, batalhaPokemon, curarPokemon }
