const fastify = require('fastify')
const app = fastify()
const controller = require('./controller/pokemon')
const hpController = require('./controller/hp')
const jwt = require('jwt-simple')

const unauthorized = new Error('Login ou senha inálido')
    // 401 Nâo autorizado
    unauthorized.status = 401

const auth = (req, res, done) => {
    const token = req.query.token || req.headers.authorization

    if (!token) throw unauthorized
    try {
        const decoded = jwt.decode(token, 'senha secreta')
        const isExpired = (new Date(decoded.exp)).getTime() < (new Date().getTime())

        if(isExpired) throw unauthorized
        done()
    } catch (e) {
        throw unauthorized
    }
    
}

app.get('/', (req, res) => res.send('pong'))
app.get('/pokemons', {
    preHandler: auth,
    handler: controller.list
})
app.get('/pokemons/:id', controller.byId)
app.post('/pokemons', controller.create)
app.put('/pokemons/:id', controller.update)
app.delete('/pokemons/:id', controller.delete)

app.get('/harry-potter', {
    preHandler: auth,
    handler: hpController.list
})

app.post('/login', (req, res) => {
    //destructuring
    const { username, password } = req.body

    if(username === 'novatec' && password === '123'){
        const today = new Date()
        today.setMinutes(today.getMinutes() + 5)
        const token = jwt.encode({
            user: username,
            exp: today
        }, 'senha secreta')
        return res.send({ token })
    }

    throw unauthorized
})

app.setNotFoundHandler((req, res) =>{
    res.status(404).send('Not Found')
})

app.setErrorHandler((error, req, res) =>{
    console.error(error)
    res.status((error.status || 500))
    res.send(error.message || 'Algo deu errado')
})

module.exports = app