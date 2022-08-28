const { error } = require('console')
const fastify = require('fastify')
const { rmSync } = require('fs')
const { err } = require('pino-std-serializers')
const app = fastify()
const controller = require('./controller/pokemon')
const hpController = require('./controller/hp')

app.get('/', (req, res) => res.send('pong'))
app.get('/pokemons', controller.list)
app.get('/pokemons/:id', controller.byId)
app.post('/pokemons', controller.create)
app.put('/pokemons/:id', controller.update)
app.delete('/pokemons/:id', controller.delete)

app.get('/harry-potter', hpController.list)

app.setNotFoundHandler((req, res) =>{
    res.status(404).send('Not Found')
})

app.setErrorHandler((error, req, res) =>{
    console.error(error)
    res.status((error.status || 500))
    res.send(error.message || 'Algo deu errado')
})

module.exports = app