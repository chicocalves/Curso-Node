const jwt = require('jwt-simple')

const unauthorized = new Error('Login ou senha inálido')
// 401 Nâo autorizado
unauthorized.status = 401

const controller = {
    auth: (req, res, done) => {
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
        
    },

    login: (req, res) =>{
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
    }
}

module.exports = controller