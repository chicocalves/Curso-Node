const fastify = require('fastify')
const app = fastify()
const controller = require('./controller/pokemon')
const hpController = require('./controller/hp')
const loginController = require('./controller/login')

app.register(require('@fastify/multipart'))

app.post('/upload', async (req,res) => {
    const data = await req.file

    console.log('file', data)
    res.send('OK, recebido')
})

app.get('/', (req, res) => res.send('pong'))
app.get('/pokemons', {
    preHandler: loginController.auth,
    handler: controller.list
})
app.get('/pokemons/:id', controller.byId)
app.post('/pokemons', controller.create)
app.put('/pokemons/:id', controller.update)
app.delete('/pokemons/:id', controller.delete)

app.get('/harry-potter', {
    preHandler: loginController.auth,
    handler: hpController.list,
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: { type: 'string'},
                        actor: { type: 'string'}
                    }
                }
            }
        }
    }
})

app.post('/login', {
    handler: loginController.login,
    schema: {
        body: {
            type: 'object',
            properties: {
                username: { type: 'string'},
                password: { type: 'string'}
            },
            required: ['username', 'password']
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    token: { type: 'string'}
                }
            }
        }
    }
})

app.setNotFoundHandler((req, res) =>{
    res.status(404).send('Not Found')
})

app.setErrorHandler((error, req, res) =>{
    console.error(error)
    res.status((error.status || error.statusCode || 500))
    res.send(error.message || 'Algo deu errado')
})

module.exports = app