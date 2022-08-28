const ENDPOINT = 'http://hp-api.herokuapp.com/api/characters'
const axios = require('axios')

const controller = {
    list(req, res) {
        return axios.get(ENDPOINT)
            .then(result => {
                const data = result.data.map(item =>{
                    return {
                        name: item.name,
                        actor: item.actor
                    }
                })
                res.send(data)
        })
    }
}

module.exports = controller