const { error } = require('console')
const fastify = require('fastify')
const { rmSync } = require('fs')
const { err } = require('pino-std-serializers')
const app = fastify()
const controller = require('./controller/pokemon')

app.get('/', (req, res) => res.send('pong'))
app.get('/pokemons', controller.list)
app.get('/pokemons/:id', controller.byId)
app.post('/pokemons', controller.create)
app.put('/pokemons/:id', controller.update)
app.delete('/pokemons/:id', controller.delete)

app.setErrorHandler((error, req, res) =>{
    res.status((error.status || 500))
    res.send(error.message || 'Algo deu errado')
})

module.exports = app